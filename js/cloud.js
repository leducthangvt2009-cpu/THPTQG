/* ==========================================================================
   Ôn tập THPT · Lớp mây dùng chung
   --------------------------------------------------------------------------
   - Firebase Auth (email/password + Google) khi đã điền js/firebase-config.js.
   - Đồng bộ tiến trình làm bài lên Firestore: users/{uid}/progress/{category}
   - Bảng xếp hạng riêng từng đề: leaderboards/{category}/entries/{uid}
   - Khi chưa có cấu hình Firebase: giữ đăng nhập local cũ và BXH trên thiết bị,
     để toàn bộ website vẫn sử dụng được ngay.
   ========================================================================== */
(function (g) {
  'use strict';

  var SDK_VERSION = '10.14.1';
  var SDK_BASE = 'https://www.gstatic.com/firebasejs/' + SDK_VERSION + '/';
  var CONFIG = g.FIREBASE_CONFIG || {};
  var ADMIN_EMAILS = ['admin@gmail.com', 'leducthangvt2009@gmail.com'];

  var CONF = {
    configured: false,
    mode: 'local',        // local | loading | firebase
    ready: false,
    sdkError: null
  };

  var firebaseApp = null;
  var auth = null;
  var db = null;
  var api = null;
  var current = null;
  var profile = null;
  var listeners = [];
  var pendingProgress = {};
  var resolveReady;
  var ready = new Promise(function (resolve) { resolveReady = resolve; });
  var mountedSeq = 0;

  /* ------------------------------------------------------------------ */
  /* Tiện ích                                                            */
  /* ------------------------------------------------------------------ */
  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function safeJson(key, fallback) {
    try {
      var raw = g.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  function setJson(key, value) {
    try { g.localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
  }

  function randomId() {
    try {
      var arr = new Uint8Array(8);
      if (g.crypto && g.crypto.getRandomValues) g.crypto.getRandomValues(arr);
      else for (var i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
      var out = '';
      for (var j = 0; j < arr.length; j++) out += ('0' + arr[j].toString(16)).slice(-2);
      return out;
    } catch (e) {
      return String(Date.now()) + Math.random().toString(16).slice(2);
    }
  }

  function clean(value) {
    try { return JSON.parse(JSON.stringify(value)); } catch (e) { return value; }
  }

  /* Giới hạn thời gian chờ Firestore: nếu database chưa tạo / mất mạng,
     UI sẽ quay về bản lưu cục bộ thay vì quay vòng mãi. */
  function withTimeout(promise, ms, reason) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        reject(new Error(reason || 'firestore-timeout'));
      }, ms);
      Promise.resolve(promise).then(function (value) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(value);
      }, function (err) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  function isRealConfig(cfg) {
    var fields = ['apiKey', 'authDomain', 'projectId', 'appId'];
    for (var i = 0; i < fields.length; i++) {
      var v = String(cfg[fields[i]] || '').trim();
      if (!v || /PASTE|YOUR_|REPLACE|example\.com/i.test(v)) return false;
    }
    return true;
  }
  CONF.configured = isRealConfig(CONFIG);

  function isAdminEmail(email) {
    return ADMIN_EMAILS.indexOf(String(email || '').toLowerCase().trim()) !== -1;
  }

  function nicknameOf(email, displayName) {
    if (displayName && String(displayName).trim()) return String(displayName).trim();
    var mail = String(email || '').trim();
    if (!mail) return 'Người học';
    return mail.split('@')[0];
  }

  function normalizeFirebaseUser(user, prof) {
    if (!user) return null;
    var nick = (prof && prof.nickname) || user.displayName || nicknameOf(user.email);
    return {
      uid: user.uid,
      email: user.email || '',
      nickname: String(nick).slice(0, 28),
      displayName: user.displayName || nick,
      photoURL: user.photoURL || '',
      role: isAdminEmail(user.email) ? 'admin' : 'user',
      provider: 'firebase',
      isCloud: true,
      emailVerified: !!user.emailVerified
    };
  }

  function localIdentity() {
    var session = safeJson('ontap:session', null);
    var users = safeJson('ontap:users', []);
    if (session && session.email) {
      var found = Array.isArray(users) ? users.filter(function (u) {
        return String(u.email || '').toLowerCase() === String(session.email).toLowerCase();
      })[0] : null;
      return {
        uid: 'local:' + String(session.email).toLowerCase(),
        email: session.email,
        nickname: (found && found.nickname) || nicknameOf(session.email),
        role: (found && found.role) || (isAdminEmail(session.email) ? 'admin' : 'user'),
        provider: 'local',
        isCloud: false
      };
    }
    var device = safeJson('ontap:device_id', null);
    if (!device) {
      device = 'device_' + randomId();
      setJson('ontap:device_id', device);
    }
    return {
      uid: 'local:' + device,
      email: '',
      nickname: 'Khách',
      role: 'user',
      provider: 'local',
      isCloud: false,
      guest: true
    };
  }

  function currentIdentity() {
    if (CONF.mode === 'firebase' && current) return current;
    return localIdentity();
  }

  function emit() {
    var snap = current;
    listeners.slice().forEach(function (fn) {
      try { fn(snap); } catch (e) { /* bỏ qua lỗi UI */ }
    });
    try {
      g.dispatchEvent(new CustomEvent('ontap:authchange', { detail: snap }));
    } catch (e) {
      try {
        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('ontap:authchange', false, false, snap);
        g.dispatchEvent(ev);
      } catch (e2) { /* bỏ qua */ }
    }
    refreshAllLeaderboards();
  }

  function onAuthChange(fn) {
    if (typeof fn !== 'function') return function () {};
    listeners.push(fn);
    if (CONF.ready) {
      setTimeout(function () { try { fn(current); } catch (e) { /* bỏ qua */ } }, 0);
    }
    return function () {
      var i = listeners.indexOf(fn);
      if (i >= 0) listeners.splice(i, 1);
    };
  }

  /* ------------------------------------------------------------------ */
  /* Khởi động Firebase                                                  */
  /* ------------------------------------------------------------------ */
  function finishReady() {
    if (CONF.ready) return;
    CONF.ready = true;
    resolveReady();
  }

  function failFirebase(err) {
    CONF.sdkError = err || new Error('Không kết nối được Firebase');
    CONF.mode = 'local';
    finishReady();
    emit();
  }

  async function handleAuth(user) {
    try {
      if (user) {
        profile = null;
        if (db) {
          try {
            var snap = await withTimeout(api.fs.getDoc(api.fs.doc(db, 'users', user.uid)), 5000, 'profile-timeout');
            if (snap.exists()) profile = snap.data();
          } catch (e) { /* profile có thể chưa tạo hoặc mất mạng */ }
        }
        current = normalizeFirebaseUser(user, profile);
      } else {
        profile = null;
        current = null;
      }
    } catch (e) {
      current = user ? normalizeFirebaseUser(user, null) : null;
    } finally {
      CONF.mode = 'firebase';
      finishReady();
      emit();
    }
  }

  function ensureFirebase() {
    if (CONF.mode !== 'firebase' || !auth || !db) {
      return Promise.reject(new Error('Firebase chưa sẵn sàng.'));
    }
    return ready;
  }

  function loadFirebase() {
    CONF.mode = 'loading';
    Promise.all([
      import(SDK_BASE + 'firebase-app.js'),
      import(SDK_BASE + 'firebase-auth.js'),
      import(SDK_BASE + 'firebase-firestore.js')
    ]).then(function (mods) {
      api = { app: mods[0], auth: mods[1], fs: mods[2] };
      firebaseApp = api.app.initializeApp(CONFIG);
      auth = api.auth.getAuth(firebaseApp);
      db = api.fs.getFirestore(firebaseApp);

      if (CONFIG.useEmulator && CONFIG.emulatorHost) {
        try {
          api.auth.connectAuthEmulator(auth, 'http://' + CONFIG.emulatorHost + ':' + ((CONFIG.emulatorPorts && CONFIG.emulatorPorts.auth) || 9099), { disableWarnings: true });
          api.fs.connectFirestoreEmulator(db, CONFIG.emulatorHost, (CONFIG.emulatorPorts && CONFIG.emulatorPorts.firestore) || 8080);
        } catch (e) { /* emulator là tuỳ chọn */ }
      }

      if (api.auth.setPersistence && api.auth.browserLocalPersistence) {
        api.auth.setPersistence(auth, api.auth.browserLocalPersistence).catch(function () { /* dùng mặc định */ });
      }
      api.auth.onAuthStateChanged(auth, handleAuth, function (err) {
        failFirebase(err);
      });
    }).catch(failFirebase);
  }

  /* ------------------------------------------------------------------ */
  /* Firebase Auth                                                       */
  /* ------------------------------------------------------------------ */
  async function signIn(email, password) {
    await ready;
    await ensureFirebase();
    await api.auth.signInWithEmailAndPassword(auth, String(email || '').trim(), String(password || ''));
    return current;
  }

  async function signUp(email, password, nickname) {
    await ready;
    await ensureFirebase();
    var cred = await api.auth.createUserWithEmailAndPassword(auth, String(email || '').trim(), String(password || ''));
    var nick = String(nickname || '').trim() || nicknameOf(cred.user.email);
    try {
      await api.auth.updateProfile(cred.user, { displayName: nick });
    } catch (e) { /* vẫn có thể lưu profile Firestore */ }
    try {
      await withTimeout(api.fs.setDoc(api.fs.doc(db, 'users', cred.user.uid), {
        email: cred.user.email || '',
        nickname: nick,
        role: isAdminEmail(cred.user.email) ? 'admin' : 'user',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }, { merge: true }), 6000, 'profile-timeout');
    } catch (e) { /* rules có thể chặn nếu chưa publish */ }
    profile = { nickname: nick };
    current = normalizeFirebaseUser(cred.user, profile);
    emit();
    return current;
  }

  async function signInWithGoogle() {
    await ready;
    await ensureFirebase();
    var provider = new api.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await api.auth.signInWithPopup(auth, provider);
    if (auth.currentUser) {
      var nick = nicknameOf(auth.currentUser.email, auth.currentUser.displayName);
      try {
        await withTimeout(api.fs.setDoc(api.fs.doc(db, 'users', auth.currentUser.uid), {
          email: auth.currentUser.email || '',
          nickname: nick,
          role: isAdminEmail(auth.currentUser.email) ? 'admin' : 'user',
          updatedAt: Date.now()
        }, { merge: true }), 6000, 'profile-timeout');
      } catch (e) { /* bỏ qua */ }
    }
    return current;
  }

  async function signOut() {
    await ready;
    if (CONF.mode === 'firebase' && auth) await api.auth.signOut(auth);
    current = null;
    profile = null;
    emit();
  }

  async function updateNickname(nickname) {
    await ready;
    await ensureFirebase();
    var nick = String(nickname || '').trim();
    if (nick.length < 2) throw new Error('Biệt danh cần ít nhất 2 ký tự.');
    if (!auth.currentUser) throw new Error('Bạn chưa đăng nhập.');
    await api.auth.updateProfile(auth.currentUser, { displayName: nick });
    try {
      await withTimeout(api.fs.setDoc(api.fs.doc(db, 'users', auth.currentUser.uid), {
        nickname: nick,
        updatedAt: Date.now()
      }, { merge: true }), 6000, 'profile-timeout');
    } catch (e) { /* vẫn đổi tên hiển thị trên Auth */ }
    if (current) current.nickname = nick;
    profile = { nickname: nick };
    emit();
    return current;
  }

  async function resetPassword(email) {
    await ready;
    await ensureFirebase();
    await api.auth.sendPasswordResetEmail(auth, String(email || '').trim());
  }

  function errorMessage(err) {
    var code = err && (err.code || err.message) ? String(err.code || err.message) : '';
    var map = {
      'auth/email-already-in-use': 'Email này đã có tài khoản. Hãy chuyển sang Đăng nhập.',
      'auth/invalid-email': 'Email không hợp lệ.',
      'auth/weak-password': 'Mật khẩu cần ít nhất 6 ký tự.',
      'auth/user-not-found': 'Tài khoản hoặc mật khẩu không chính xác.',
      'auth/wrong-password': 'Tài khoản hoặc mật khẩu không chính xác.',
      'auth/invalid-credential': 'Tài khoản hoặc mật khẩu không chính xác.',
      'auth/invalid-login-credentials': 'Tài khoản hoặc mật khẩu không chính xác.',
      'auth/too-many-requests': 'Bạn đã thử quá nhiều lần. Vui lòng đợi vài phút rồi thử lại.',
      'auth/popup-closed-by-user': 'Bạn đã đóng cửa sổ đăng nhập Google.',
      'auth/popup-blocked': 'Trình duyệt đã chặn cửa sổ Google. Hãy cho phép pop-up rồi thử lại.',
      'auth/network-request-failed': 'Không có kết nối mạng. Vui lòng kiểm tra và thử lại.',
      'auth/operation-not-allowed': 'Phương thức đăng nhập này chưa được bật trong Firebase Console.',
      'auth/unauthorized-domain': 'Tên miền này chưa được thêm vào Authorized domains của Firebase.',
      'auth/requires-recent-login': 'Vui lòng đăng nhập lại để thực hiện thao tác này.',
      'auth/configuration-not-found': 'Firebase Authentication chưa được bật cho project này. Vào Firebase Console → Authentication → Get started, sau đó bật Email/Password và Google.',
      'auth/api-key-not-valid': 'API key Firebase không hợp lệ hoặc đang bị giới hạn. Kiểm tra Google Cloud Console → API key restrictions.',
      'auth/invalid-api-key': 'API key Firebase không hợp lệ. Kiểm tra lại js/firebase-config.js.'
    };
    if (code.indexOf('auth/requests-from-referer') === 0) {
      return 'Tên miền hiện tại đang bị API key Firebase chặn. Hãy thêm tên miền vào Authorized domains và API key restrictions.';
    }
    return map[code] || (err && err.message ? err.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
  }

  /* ------------------------------------------------------------------ */
  /* Tiến trình trên Firestore                                           */
  /* ------------------------------------------------------------------ */
  function flushProgress(category) {
    var item = pendingProgress[category];
    if (!item) return Promise.resolve();
    if (item.timer) clearTimeout(item.timer);
    delete pendingProgress[category];
    if (CONF.mode !== 'firebase' || !current || !db) return Promise.resolve();
    return withTimeout(api.fs.setDoc(
      api.fs.doc(db, 'users', current.uid, 'progress', category),
      { category: category, payload: clean(item.payload), updatedAt: item.updatedAt },
      { merge: false }
    ), 8000, 'progress-timeout').catch(function () { /* đồng bộ lỗi không được chặn bài làm */ });
  }

  function saveProgress(category, payload) {
    if (!category) return;
    var item = pendingProgress[category] || {};
    if (item.timer) clearTimeout(item.timer);
    item.payload = payload;
    item.updatedAt = (payload && payload.updatedAt) || Date.now();
    item.timer = setTimeout(function () { flushProgress(category); }, 800);
    pendingProgress[category] = item;
    return ready;
  }

  async function deleteProgress(category) {
    if (pendingProgress[category]) {
      if (pendingProgress[category].timer) clearTimeout(pendingProgress[category].timer);
      delete pendingProgress[category];
    }
    await ready;
    if (CONF.mode !== 'firebase' || !current || !db) return;
    try {
      await withTimeout(api.fs.deleteDoc(api.fs.doc(db, 'users', current.uid, 'progress', category)), 6000, 'progress-timeout');
    } catch (e) { /* bỏ qua */ }
  }

  async function pullAllProgress() {
    await ready;
    if (CONF.mode !== 'firebase' || !current || !db) return {};
    try {
      var snap = await withTimeout(api.fs.getDocs(api.fs.collection(db, 'users', current.uid, 'progress')), 8000, 'progress-timeout');
      var out = {};
      snap.forEach(function (docSnap) { out[docSnap.id] = docSnap.data(); });
      return out;
    } catch (e) {
      return {};
    }
  }

  async function pullProgress(category) {
    await ready;
    if (CONF.mode !== 'firebase' || !current || !db) return null;
    try {
      var snap = await withTimeout(api.fs.getDoc(api.fs.doc(db, 'users', current.uid, 'progress', category)), 6000, 'progress-timeout');
      return snap.exists() ? snap.data() : null;
    } catch (e) {
      return null;
    }
  }

  /* ------------------------------------------------------------------ */
  /* Bảng xếp hạng                                                       */
  /* ------------------------------------------------------------------ */
  function localBoardKey(category) { return 'ontap:leaderboard:v1:' + category; }

  function readLocalBoard(category) {
    var list = safeJson(localBoardKey(category), []);
    return Array.isArray(list) ? list : [];
  }

  function writeLocalBoard(category, list) {
    list.sort(boardSort);
    setJson(localBoardKey(category), list.slice(0, 100));
  }

  function boardSort(a, b) {
    var pa = Number(a.percent) || 0, pb = Number(b.percent) || 0;
    if (pb !== pa) return pb - pa;
    var ta = Number(a.timeSec) || 0, tb = Number(b.timeSec) || 0;
    if (ta !== tb) return ta - tb;
    return (Number(a.updatedAt) || 0) - (Number(b.updatedAt) || 0);
  }

  function percentOf(entry) {
    if (typeof entry.percent === 'number') return Math.max(0, Math.min(100, entry.percent));
    var max = Number(entry.max) || 0;
    var score = Number(entry.score) || 0;
    return max ? Math.round(score / max * 10000) / 100 : 0;
  }

  function normalizeScoreEntry(category, entry, identity) {
    var score = Number(entry.score) || 0;
    var max = Number(entry.max) || 0;
    return {
      uid: identity.uid,
      nickname: String(entry.nickname || identity.nickname || 'Người học').slice(0, 28),
      score: score,
      max: max,
      percent: typeof entry.percent === 'number' ? Math.max(0, Math.min(100, entry.percent)) : percentOf({ score: score, max: max }),
      correct: Number(entry.correct) || 0,
      total: Number(entry.total) || 0,
      timeSec: Math.max(0, Math.floor(Number(entry.timeSec) || 0)),
      mode: String(entry.mode || ''),
      modeLabel: String(entry.modeLabel || entry.mode || ''),
      examId: String(entry.examId || ''),
      title: String(entry.title || ''),
      category: category,
      updatedAt: Date.now()
    };
  }

  async function submitScore(category, entry) {
    if (!category) return { ok: false, reason: 'missing-category' };
    await ready;

    if (CONF.mode === 'firebase') {
      if (!current || !db) return { ok: false, reason: 'signed-out' };
      var cloudEntry = normalizeScoreEntry(category, entry, current);
      cloudEntry.uid = current.uid;
      var ref = api.fs.doc(db, 'leaderboards', category, 'entries', current.uid);
      try {
        var result = await withTimeout(api.fs.runTransaction(db, async function (tx) {
          var snap = await tx.get(ref);
          var prev = snap.exists() ? snap.data() : null;
          var attempts = ((prev && Number(prev.attempts)) || 0) + 1;
          var better = !prev ||
            cloudEntry.percent > (Number(prev.percent) || 0) ||
            (cloudEntry.percent === (Number(prev.percent) || 0) && cloudEntry.timeSec < (Number(prev.timeSec) || 0));
          if (better) {
            var next = clean(cloudEntry);
            next.attempts = attempts;
            next.createdAt = (prev && Number(prev.createdAt)) || Date.now();
            tx.set(ref, next);
          } else {
            tx.update(ref, {
              attempts: attempts,
              lastScore: cloudEntry.score,
              lastMax: cloudEntry.max,
              lastPercent: cloudEntry.percent,
              lastAt: Date.now()
            });
          }
          return { ok: true, source: 'cloud', updated: better, attempts: attempts, entry: better ? cloudEntry : prev };
        }), 10000, 'leaderboard-timeout');
        refreshAllLeaderboards();
        return result;
      } catch (e) {
        return { ok: false, reason: 'firestore-error', error: e };
      }
    }

    var identity = localIdentity();
    var localEntry = normalizeScoreEntry(category, entry, identity);
    localEntry.uid = identity.uid;
    var list = readLocalBoard(category);
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].uid === identity.uid) { idx = i; break; }
    }
    var old = idx >= 0 ? list[idx] : null;
    var attempts2 = ((old && Number(old.attempts)) || 0) + 1;
    var better2 = !old ||
      localEntry.percent > (Number(old.percent) || 0) ||
      (localEntry.percent === (Number(old.percent) || 0) && localEntry.timeSec < (Number(old.timeSec) || 0));
    if (better2) {
      localEntry.attempts = attempts2;
      localEntry.createdAt = (old && Number(old.createdAt)) || Date.now();
      if (idx >= 0) list[idx] = localEntry;
      else list.push(localEntry);
    } else {
      old.attempts = attempts2;
      old.lastScore = localEntry.score;
      old.lastMax = localEntry.max;
      old.lastPercent = localEntry.percent;
      old.lastAt = Date.now();
    }
    writeLocalBoard(category, list);
    refreshAllLeaderboards();
    return { ok: true, source: 'local', updated: better2, attempts: attempts2, entry: better2 ? localEntry : old };
  }

  async function getLeaderboard(category, limit) {
    await ready;
    limit = Math.max(1, Math.min(100, Number(limit) || 20));
    if (CONF.mode === 'firebase' && db) {
      try {
        var q = api.fs.query(
          api.fs.collection(db, 'leaderboards', category, 'entries'),
          api.fs.orderBy('percent', 'desc'),
          api.fs.limit(100)
        );
        var snap = await withTimeout(api.fs.getDocs(q), 6000, 'leaderboard-timeout');
        var entries = [];
        snap.forEach(function (docSnap) {
          var d = docSnap.data() || {};
          d.uid = d.uid || docSnap.id;
          entries.push(d);
        });
        entries.sort(boardSort);
        return { entries: entries.slice(0, limit), total: entries.length, source: 'cloud' };
      } catch (e) {
        var local = readLocalBoard(category);
        local.sort(boardSort);
        return { entries: local.slice(0, limit), total: local.length, source: 'local', error: e };
      }
    }
    var list = readLocalBoard(category);
    list.sort(boardSort);
    return { entries: list.slice(0, limit), total: list.length, source: 'local' };
  }

  function fmtNum(n, digits) {
    var d = digits === undefined ? 2 : digits;
    return (Math.round((Number(n) + 1e-9) * Math.pow(10, d)) / Math.pow(10, d))
      .toFixed(d).replace(/\.?0+$/, '').replace('.', ',');
  }

  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(Number(sec) || 0));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function leaderboardNote() {
    if (CONF.configured && CONF.sdkError) {
      return 'Không tải được Firebase. Bảng xếp hạng đang lưu tạm trên thiết bị.';
    }
    if (CONF.configured && CONF.mode === 'loading') {
      return 'Đang kết nối Firebase…';
    }
    if (CONF.mode === 'firebase') {
      if (!current) return 'Đăng nhập để lưu điểm của bạn lên bảng xếp hạng trực tuyến.';
      return 'Đã đồng bộ Firebase · điểm cao nhất của mỗi tài khoản được giữ lại.';
    }
    return 'Chưa cấu hình Firebase · bảng xếp hạng đang lưu trên thiết bị này.';
  }

  function scoreText(entry) {
    var score = Number(entry.score) || 0;
    var max = Number(entry.max) || 0;
    if (!max) return fmtNum(score, 2);
    return fmtNum(score, 2) + '<small>/' + fmtNum(max, 2) + '</small>';
  }

  function rowHTML(entry, rank, me) {
    var medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
    var mode = entry.modeLabel || entry.mode || '';
    var nick = entry.nickname || 'Người học';
    return '<li class="cloud-lb-row' + (me ? ' is-me' : '') + '">'
      + '<span class="cloud-lb-rank r' + rank + '">' + medal + '</span>'
      + '<div class="cloud-lb-who"><b>' + esc(nick) + '</b>' + (me ? '<span class="cloud-you">Bạn</span>' : '')
      + '<small>' + (mode ? esc(mode) + ' · ' : '') + '⏱ ' + fmtTime(entry.timeSec)
      + (entry.attempts ? ' · ' + entry.attempts + ' lượt' : '') + '</small></div>'
      + '<div class="cloud-lb-score"><b>' + scoreText(entry) + '</b><small>' + fmtNum(entry.percent || 0, 1) + '%</small></div>'
      + '</li>';
  }

  function noteHTML() {
    var text = leaderboardNote();
    var login = '';
    if (CONF.mode === 'firebase' && !current) {
      login = ' <button type="button" class="cloud-lb-login" data-cloud-action="login">Đăng nhập</button>';
    }
    var refresh = CONF.mode === 'firebase' ? ' <button type="button" class="cloud-lb-refresh" data-cloud-action="refresh" title="Tải lại">↻</button>' : '';
    return '<div class="cloud-lb-note">' + esc(text) + login + refresh + '</div>';
  }

  async function paintBoard(host) {
    var opts = host._lbOptions || {};
    var category = host._lbCategory;
    var seq = ++mountedSeq;
    host._lbSeq = seq;

    var title = opts.title || 'Bảng xếp hạng';
    var subtitle = opts.subtitle || '';
    host.innerHTML = '<section class="cloud-lb" aria-labelledby="cloud-lb-title-' + seq + '">'
      + '<div class="cloud-lb-head"><div><span class="cloud-kicker">🏆 XẾP HẠNG</span>'
      + '<h3 id="cloud-lb-title-' + seq + '">' + esc(title) + '</h3>'
      + (subtitle ? '<p>' + esc(subtitle) + '</p>' : '') + '</div>'
      + '<span class="cloud-lb-badge">' + (CONF.configured && !CONF.sdkError ? 'FIREBASE' : 'THIẾT BỊ') + '</span></div>'
      + noteHTML()
      + '<div class="cloud-lb-body"><div class="cloud-lb-loading">Đang tải bảng xếp hạng…</div></div></section>';

    var result;
    try {
      result = await getLeaderboard(category, opts.limit || 10);
    } catch (e) {
      result = { entries: [], source: 'local', error: e };
    }
    if (host._lbSeq !== seq || !host.isConnected) return;

    var me = currentIdentity();
    var meUid = me ? me.uid : null;
    var entries = result.entries || [];
    var body;
    if (!entries.length) {
      body = '<div class="cloud-lb-empty">Chưa có ai lưu điểm cho hạng mục này.'
        + '<small>Hãy hoàn thành bài và nộp để ghi tên mình.</small></div>';
    } else {
      body = '<ol class="cloud-lb-list">' + entries.map(function (e, i) {
        return rowHTML(e, i + 1, meUid && e.uid === meUid);
      }).join('') + '</ol>';
    }
    var foot = '';
    if (result.source === 'local' && CONF.configured) {
      foot = '<p class="cloud-lb-foot">Không đọc được dữ liệu trực tuyến; đang hiển thị bản lưu trên thiết bị.</p>';
    } else if (result.source === 'local') {
      foot = '<p class="cloud-lb-foot">BXH cục bộ · <a href="SETUP.md" target="_blank" rel="noopener">xem hướng dẫn bật Firebase</a>.</p>';
    }
    var box = host.querySelector('.cloud-lb-body');
    if (box) box.innerHTML = body + foot;
    var note = host.querySelector('.cloud-lb-note');
    if (note) {
      // noteHTML có nút nên chỉ vẽ lại phần ghi chú khi trạng thái đăng nhập đổi
      var tmp = document.createElement('div');
      tmp.innerHTML = noteHTML();
      note.replaceWith(tmp.firstElementChild);
    }
  }

  function mountLeaderboard(host, category, options) {
    if (!host || !category) return;
    host._lbCategory = category;
    host._lbOptions = options || {};
    host.setAttribute('data-cloud-category', category);
    host.classList.add('cloud-lb-host');
    paintBoard(host);
  }

  function refreshAllLeaderboards() {
    var nodes = document.querySelectorAll('[data-cloud-category]');
    Array.prototype.forEach.call(nodes, function (host) {
      if (host._lbCategory) paintBoard(host);
    });
  }

  function openAuth() {
    if (typeof g.openAuthModal === 'function') {
      g.openAuthModal();
      return;
    }
    try { g.dispatchEvent(new CustomEvent('ontap:request-auth')); } catch (e) { /* bỏ qua */ }
  }

  function wireGlobalUI() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cloud-action]');
      if (!btn) return;
      var act = btn.getAttribute('data-cloud-action');
      if (act === 'login') { openAuth(); return; }
      if (act === 'refresh') {
        var host = btn.closest('[data-cloud-category]');
        if (host) paintBoard(host);
      }
    });
    g.addEventListener('ontap:authchange', function () {
      setTimeout(refreshAllLeaderboards, 0);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Công khai API                                                       */
  /* ------------------------------------------------------------------ */
  var Cloud = {
    version: '20261101a',
    ready: ready,
    isConfigured: function () { return CONF.configured; },
    status: function () {
      return {
        configured: CONF.configured,
        mode: CONF.mode,
        ready: CONF.ready,
        sdkError: CONF.sdkError,
        signedIn: !!(CONF.mode === 'firebase' && current)
      };
    },
    currentUser: function () { return CONF.mode === 'firebase' ? current : null; },
    localIdentity: localIdentity,
    onAuthChange: onAuthChange,
    signIn: signIn,
    signUp: signUp,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    updateNickname: updateNickname,
    resetPassword: resetPassword,
    errorMessage: errorMessage,
    saveProgress: saveProgress,
    flushProgress: flushProgress,
    deleteProgress: deleteProgress,
    pullProgress: pullProgress,
    pullAllProgress: pullAllProgress,
    submitScore: submitScore,
    getLeaderboard: getLeaderboard,
    mountLeaderboard: mountLeaderboard,
    refreshLeaderboards: refreshAllLeaderboards,
    openAuth: openAuth,
    formatNumber: fmtNum,
    formatTime: fmtTime
  };

  g.OntapCloud = Cloud;

  wireGlobalUI();
  if (CONF.configured) loadFirebase();
  else { CONF.mode = 'local'; finishReady(); }
})(window);
