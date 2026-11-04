(function () {
  'use strict';

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(s) {
    var h = esc(s);
    h = h.replace(/\((\d+)\)\s*_+/g, function (m, n) {
      return '<button type="button" class="blank" data-act="blank" data-n="' + n + '">(' + n + ') ______</button>';
    });
    h = h.replace(/_{3,}/g, '<span class="gap"></span>');
    return h;
  }

  /* =====================================================
     CẤU HÌNH ADMIN & LƯU TRỮ AN TOÀN
     ===================================================== */
  var ADMIN_EMAILS = ['admin@gmail.com', 'leducthangvt2009@gmail.com'];
  var DEFAULT_ADMIN_PASS = 'admin123';

  var store = {
    get: function (k, f) {
      try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
    },
    del: function (k) {
      try { localStorage.removeItem(k); } catch (e) {}
    }
  };

  /* Lớp mây dùng chung: Firebase khi có cấu hình, local khi chưa cấu hình. */
  function cloudApi() { return window.OntapCloud || null; }
  function cloudConfigured() {
    var c = cloudApi();
    return !!(c && typeof c.isConfigured === 'function' && c.isConfigured());
  }
  function cloudManaged() {
    var c = cloudApi();
    if (!c || typeof c.status !== 'function') return false;
    var s = c.status();
    return !!(s.configured && s.mode !== 'local');
  }
  function notifyAuthChange() {
    try {
      window.dispatchEvent(new CustomEvent('ontap:authchange', { detail: getCurrentUser() }));
    } catch (e) { /* bỏ qua */ }
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function mmss(s) {
    var sec = Math.max(0, parseInt(s, 10) || 0);
    return pad(Math.floor(sec / 60)) + ':' + pad(sec % 60);
  }
  function modeName(m) { return m === 'exam' ? 'Thi thử' : 'Luyện tập'; }

  function ask(msg, ok, cancel) {
    return new Promise(function (res) {
      var d = $('#dlg');
      if (!d || typeof d.showModal !== 'function') {
        res(window.confirm(msg));
        return;
      }
      var okBtn = $('#dlg-ok');
      var cancelBtn = $('#dlg-cancel');
      var settled = false;
      function finish(val) {
        if (settled) return;
        settled = true;
        try { d.close(); } catch (e) {}
        res(val);
      }
      d.returnValue = '';
      $('#dlg-msg').textContent = msg;
      okBtn.textContent = ok || 'Đồng ý';
      cancelBtn.textContent = cancel || 'Hủy';
      // Không dựa vào sự kiện "close" (một số bản Chromium không phát sự kiện này
      // khi form method="dialog" đóng hộp thoại) — xử lý trực tiếp trên nút bấm.
      okBtn.onclick = function (e) { e.preventDefault(); finish(true); };
      cancelBtn.onclick = function (e) { e.preventDefault(); finish(false); };
      d.oncancel = function (e) { e.preventDefault(); finish(false); };
      try { d.showModal(); } catch (e) { finish(window.confirm(msg)); }
    });
  }

  function setVars() {
    var hh = $('#site-header');
    if (hh) document.documentElement.style.setProperty('--header-h', hh.offsetHeight + 'px');
    var bar = $('#runbar');
    if (bar && !window.matchMedia('(max-width: 959px)').matches) bar.classList.remove('runbar-hidden');
    var rb = bar && bar.querySelector('.runbar-in');
    var hidden = bar && bar.classList.contains('runbar-hidden');
    document.documentElement.style.setProperty('--runbar-h', hidden ? '0px' : ((rb ? rb.offsetHeight : 56) + 'px'));
  }
  window.addEventListener('resize', setVars);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setVars);

  /* =====================================================
     HỆ THỐNG ĐĂNG NHẬP / ĐĂNG KÝ & QUẢN LÝ NGƯỜI DÙNG (ADMIN)
     Bảo mật: SHA-256 + salt riêng, session token có hạn.
     ===================================================== */
  var USERS_KEY = 'ontap:users';
  var SESSION_KEY = 'ontap:session';
  var LEGACY_SESSION_KEY = 'ontap:current_user';
  var SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

  function bytesToHex(bytes) {
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += ('0' + bytes[i].toString(16)).slice(-2);
    }
    return hex;
  }

  function randomHex(len) {
    try {
      var arr = new Uint8Array(len);
      if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(arr);
        return bytesToHex(arr);
      }
    } catch (e) {}
    var s = '';
    for (var i = 0; i < len; i++) s += ('0' + Math.floor(Math.random() * 256).toString(16)).slice(-2);
    return s;
  }

  async function sha256Hex(str) {
    try {
      if (window.crypto && window.crypto.subtle && window.TextEncoder) {
        var data = new TextEncoder().encode(str);
        var buf = await window.crypto.subtle.digest('SHA-256', data);
        return bytesToHex(new Uint8Array(buf));
      }
    } catch (e) {}
    // Fallback cho trình duyệt cũ: vẫn tốt hơn base64 thuần
    var h = 5381;
    for (var i = 0; i < str.length; i++) {
      h = ((h * 33) ^ str.charCodeAt(i)) >>> 0;
    }
    return 'fb_' + h.toString(16);
  }

  function legacyEncodePass(p) {
    try { return btoa(unescape(encodeURIComponent('mono_salt_' + p))); } catch (e) { return p; }
  }

  async function hashPassword(p, saltHex) {
    var salt = saltHex || randomHex(16);
    var hash = await sha256Hex(salt + '|' + p);
    return { hash: hash, salt: salt, algo: 'sha256-v1' };
  }

  async function verifyPassword(p, user) {
    if (!user) return { ok: false, upgraded: false };
    if (user.hashAlgo === 'sha256-v1' && user.salt && user.passHash) {
      var res = await hashPassword(p, user.salt);
      return { ok: res.hash === user.passHash, upgraded: false };
    }
    if (user.passHash && user.passHash === legacyEncodePass(p)) {
      return { ok: true, upgraded: true };
    }
    return { ok: false, upgraded: false };
  }

  function isAdminEmail(email) {
    return ADMIN_EMAILS.indexOf(String(email || '').toLowerCase().trim()) !== -1;
  }

  function getUsers() {
    var list = store.get(USERS_KEY, []);
    if (!Array.isArray(list)) list = [];
    var hasAdmin = list.some(function (u) { return u.email === 'admin@gmail.com'; });
    if (!hasAdmin) {
      list.unshift({
        email: 'admin@gmail.com',
        nickname: 'Admin Tỷ Phú',
        passHash: legacyEncodePass(DEFAULT_ADMIN_PASS),
        salt: '',
        hashAlgo: 'legacy',
        role: 'admin',
        createdAt: Date.now(),
        mustChangePass: true
      });
      store.set(USERS_KEY, list);
    }
    return list;
  }

  function saveUsers(list) {
    store.set(USERS_KEY, list);
  }

  function createSession(user) {
    var token = randomHex(32);
    store.set(SESSION_KEY, { token: token, email: user.email, exp: Date.now() + SESSION_TTL });
    store.del(LEGACY_SESSION_KEY);
    return token;
  }

  function getCurrentSession() {
    var s = store.get(SESSION_KEY, null);
    if (!s || !s.token || !s.email) {
      var le = store.get(LEGACY_SESSION_KEY, null);
      if (le) {
        var users = getUsers();
        var fu = users.filter(function (u) { return u.email === le; })[0];
        if (fu) {
          createSession(fu);
          return store.get(SESSION_KEY, null);
        }
        store.del(LEGACY_SESSION_KEY);
      }
      return null;
    }
    if (s.exp && Date.now() > s.exp) {
      store.del(SESSION_KEY);
      return null;
    }
    return s;
  }

  function getCurrentUser() {
    var c = cloudApi();
    if (cloudManaged() && c && typeof c.currentUser === 'function') return c.currentUser() || null;
    var sess = getCurrentSession();
    if (!sess || !sess.email) return null;
    var users = getUsers();
    var found = users.filter(function (u) { return u.email === sess.email; })[0];
    if (!found) {
      store.del(SESSION_KEY);
      return null;
    }
    return found;
  }

  function updateNavbarAuth() {
    var nav = $('.site-header .nav');
    if (!nav) return;
    var user = getCurrentUser();
    var btnClass = 'nav-box';
    var btnLabel = '👤 Đăng nhập / Đăng ký';
    var isAdm = false;
    var contentAdmin = false;

    if (user) {
      var providers = Array.isArray(user.providerIds) ? user.providerIds : [];
      var googleUser = providers.indexOf('google.com') !== -1 || user.providerId === 'google.com';
      isAdm = user.role === 'admin' || isAdminEmail(user.email);
      contentAdmin = googleUser && String(user.email || '').toLowerCase().trim() === 'leducthangvt2009@gmail.com';
      btnClass += isAdm ? ' is-admin' : ' logged-in';
      btnLabel = (isAdm ? '[ADMIN] ' : '👤 ') + esc(user.nickname);
    }

    var oldBtn = $('#nav-auth-btn', nav);
    if (oldBtn) oldBtn.remove();

    var oldAdmin = $('#nav-admin-link', nav);
    if (oldAdmin) oldAdmin.remove();

    if (contentAdmin) {
      var adminLink = document.createElement('a');
      adminLink.id = 'nav-admin-link';
      adminLink.className = 'nav-box is-admin';
      adminLink.href = 'admin.html';
      adminLink.textContent = '⚙️ Quản trị';
      nav.appendChild(adminLink);
    }

    var authBtn = document.createElement('button');
    authBtn.type = 'button';
    authBtn.className = btnClass;
    authBtn.id = 'nav-auth-btn';
    authBtn.innerHTML = btnLabel;
    authBtn.addEventListener('click', openAuthModal);
    nav.appendChild(authBtn);
  }

  function renderAdminSection() {
    if (cloudManaged()) {
      var cloudAdminBox = $('#admin-user-manager');
      if (cloudAdminBox) cloudAdminBox.remove();
      return;
    }
    var user = getCurrentUser();
    var isAdm = user && (user.role === 'admin' || isAdminEmail(user.email));
    var existing = $('#admin-user-manager');

    if (!isAdm) {
      if (existing) existing.remove();
      return;
    }

    var host = $('.subjects-in') || $('.page-body');
    if (!host) return;

    if (!existing) {
      existing = document.createElement('div');
      existing.id = 'admin-user-manager';
      existing.className = 'admin-section';
      host.appendChild(existing);
    }

    var users = getUsers();
    var rows = users.map(function (u, idx) {
      var uIsAdm = u.role === 'admin' || isAdminEmail(u.email);
      var dateStr = u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : 'Mặc định';
      var actionBtn = uIsAdm
        ? '<span style="font-size:.78rem;color:var(--muted);font-weight:700">Bảo vệ</span>'
        : '<button type="button" class="btn-del-user" data-del-email="' + esc(u.email) + '">🗑️ Xóa tài khoản</button>';

      return '<tr>' +
        '<td><b>' + (idx + 1) + '</b></td>' +
        '<td><b>' + esc(u.nickname) + '</b></td>' +
        '<td>' + esc(u.email) + '</td>' +
        '<td><span style="letter-spacing:2px;color:var(--muted)">••••••••</span></td>' +
        '<td><span class="badge-role ' + (uIsAdm ? 'admin' : 'user') + '">' + (uIsAdm ? 'Admin' : 'Thành viên') + '</span> · <small>' + dateStr + '</small></td>' +
        '<td>' + actionBtn + '</td>' +
      '</tr>';
    }).join('');

    existing.innerHTML =
      '<div class="admin-banner">' +
        '<h3>👑 Quản lý người dùng (Chỉ Admin hiển thị)</h3>' +
        '<span>Tổng số: <b>' + users.length + ' tài khoản</b></span>' +
      '</div>' +
      '<div class="admin-table-wrap">' +
        '<table class="admin-table">' +
          '<thead><tr><th>STT</th><th>Biệt danh</th><th>Tài khoản Gmail</th><th>Mật khẩu</th><th>Vai trò</th><th>Thao tác</th></tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>';

    existing.querySelectorAll('[data-del-email]').forEach(function (b) {
      b.addEventListener('click', function () {
        var targetEmail = b.getAttribute('data-del-email');
        if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản "' + targetEmail + '" khỏi hệ thống?')) {
          var updated = getUsers().filter(function (item) { return item.email !== targetEmail; });
          saveUsers(updated);
          renderAdminSection();
        }
      });
    });
  }

  function ensureAuthDialog() {
    var d = $('#auth-dlg');
    if (d) return d;
    d = document.createElement('dialog');
    d.id = 'auth-dlg';
    d.className = 'auth-dlg';
    document.body.appendChild(d);
    return d;
  }

  function openChangePassDialog(user) {
    var old = $('#changepass-dlg');
    if (old) old.remove();

    var d = document.createElement('dialog');
    d.id = 'changepass-dlg';
    d.className = 'auth-dlg';
    d.innerHTML =
      '<div class="auth-head">' +
        '<strong>🔐 Đổi mật khẩu bắt buộc</strong>' +
      '</div>' +
      '<div class="auth-body">' +
        '<p style="margin:0;font-size:.9rem">Vì lý do bảo mật, bạn cần đổi mật khẩu mặc định trước khi tiếp tục sử dụng.</p>' +
        '<div class="auth-field"><label>Mật khẩu mới</label><input type="password" id="cp-new1" placeholder="Tối thiểu 6 ký tự"></div>' +
        '<div class="auth-field"><label>Nhập lại mật khẩu mới</label><input type="password" id="cp-new2" placeholder="Nhập lại mật khẩu"></div>' +
        '<p class="auth-msg err" id="cp-err" hidden></p>' +
        '<button type="button" class="btn" id="cp-save" style="width:100%">Cập nhật mật khẩu</button>' +
      '</div>';
    document.body.appendChild(d);

    var saveBtn = $('#cp-save', d);
    saveBtn.addEventListener('click', async function () {
      var p1 = ($('#cp-new1', d).value || '');
      var p2 = ($('#cp-new2', d).value || '');
      var err = $('#cp-err', d);
      function showErr(msg) { err.textContent = msg; err.hidden = false; }

      if (p1.length < 6) { showErr('Mật khẩu cần ít nhất 6 ký tự.'); return; }
      if (p1 !== p2) { showErr('Mật khẩu nhập lại không khớp.'); return; }
      if (p1 === DEFAULT_ADMIN_PASS) { showErr('Vui lòng không dùng lại mật khẩu mặc định.'); return; }

      saveBtn.disabled = true;
      var hp = await hashPassword(p1);
      var users = getUsers();
      users.forEach(function (u) {
        if (u.email === user.email) {
          u.passHash = hp.hash;
          u.salt = hp.salt;
          u.hashAlgo = hp.algo;
          delete u.mustChangePass;
        }
      });
      saveUsers(users);
      d.close();
      d.remove();
      updateNavbarAuth();
      renderAdminSection();
    });

    if (typeof d.showModal === 'function') d.showModal();
  }

  function openAuthModal() {
    var d = ensureAuthDialog();
    var user = getCurrentUser();
    var isCloud = cloudManaged();

    if (user) {
      if (user.mustChangePass && !isCloud) {
        try { d.close(); } catch (e) {}
        openChangePassDialog(user);
        return;
      }

      var isAdm = user.role === 'admin' || isAdminEmail(user.email);
      d.innerHTML =
        '<div class="auth-head">' +
          '<strong>' + (isAdm ? '👑 Hồ sơ Admin' : '👤 Hồ sơ người học') + '</strong>' +
          '<button type="button" class="auth-close" id="auth-close-btn">✕</button>' +
        '</div>' +
        '<div class="auth-body">' +
          '<div class="auth-field"><label>' + (isCloud ? 'Email' : 'Tài khoản Gmail') + '</label><input type="text" value="' + esc(user.email) + '" disabled></div>' +
          '<div class="auth-field"><label>Biệt danh hiển thị</label><input type="text" id="prof-nickname" value="' + esc(user.nickname) + '" maxlength="28"></div>' +
          '<p class="auth-msg ok" id="prof-msg" hidden></p>' +
          (isCloud ? '<p class="auth-status">Tài khoản Firebase · tiến trình và điểm xếp hạng được đồng bộ khi có mạng.</p>' : '') +
          '<div class="btn-row" style="justify-content:space-between;margin-top:.25rem">' +
            '<button type="button" class="btn small" id="btn-save-nick">Lưu biệt danh</button>' +
            '<button type="button" class="btn small ghost" id="btn-logout">Đăng xuất</button>' +
          '</div>' +
        '</div>';

      $('#auth-close-btn', d).onclick = function () { d.close(); };
      $('#btn-save-nick', d).onclick = async function () {
        var newNick = ($('#prof-nickname', d).value || '').trim();
        var msg = $('#prof-msg', d);
        var saveBtn = $('#btn-save-nick', d);
        function show(msgText, ok) {
          msg.textContent = msgText;
          msg.className = 'auth-msg ' + (ok ? 'ok' : 'err');
          msg.hidden = false;
        }
        if (newNick.length < 2) { show('Biệt danh cần ít nhất 2 ký tự.', false); return; }

        if (isCloud) {
          var c = cloudApi();
          if (!c) return;
          saveBtn.disabled = true;
          try {
            await c.updateNickname(newNick);
            show('✓ Đã cập nhật biệt danh thành công!', true);
            updateNavbarAuth();
          } catch (e) {
            show(c.errorMessage ? c.errorMessage(e) : 'Không cập nhật được biệt danh.', false);
          } finally {
            saveBtn.disabled = false;
          }
          return;
        }

        var users = getUsers();
        users.forEach(function (u) { if (u.email === user.email) u.nickname = newNick; });
        saveUsers(users);
        show('✓ Đã cập nhật biệt danh thành công!', true);
        updateNavbarAuth();
        renderAdminSection();
        notifyAuthChange();
      };
      $('#btn-logout', d).onclick = function () {
        if (isCloud) {
          var c = cloudApi();
          var logoutBtn = $('#btn-logout', d);
          if (logoutBtn) logoutBtn.disabled = true;
          Promise.resolve(c && c.signOut()).catch(function () {}).then(function () {
            d.close();
            updateNavbarAuth();
            renderAdminSection();
          });
          return;
        }
        store.del(SESSION_KEY);
        store.del(LEGACY_SESSION_KEY);
        d.close();
        updateNavbarAuth();
        renderAdminSection();
        notifyAuthChange();
      };

      if (typeof d.showModal === 'function') d.showModal();
      return;
    }

    renderAuthForms(d, 'login');
    if (typeof d.showModal === 'function') d.showModal();
  }

  function renderAuthForms(d, tab) {
    var isLogin = tab === 'login';
    var isCloud = cloudManaged();
    var authNote = isCloud
      ? 'Bảo mật bởi Firebase Authentication · dùng được trên nhiều thiết bị.'
      : (cloudConfigured()
        ? 'Firebase chưa tải được, đang dùng đăng nhập cục bộ trên thiết bị này.'
        : 'Đăng nhập cục bộ trên thiết bị · điền js/firebase-config.js để bật đồng bộ.');

    d.innerHTML =
      '<div class="auth-head">' +
        '<strong>' + (isLogin ? 'Đăng nhập tài khoản' : 'Đăng ký tài khoản mới') + '</strong>' +
        '<button type="button" class="auth-close" id="auth-close-btn">✕</button>' +
      '</div>' +
      '<div class="auth-tabs">' +
        '<button type="button" class="auth-tab ' + (isLogin ? 'active' : '') + '" data-tab="login">Đăng nhập</button>' +
        '<button type="button" class="auth-tab ' + (!isLogin ? 'active' : '') + '" data-tab="register">Đăng ký</button>' +
      '</div>' +
      '<form class="auth-body" id="auth-form">' +
        (!isLogin ? '<div class="auth-field"><label>Biệt danh của bạn</label><input type="text" id="auth-nick" placeholder="VD: LEGIT" required maxlength="28"></div>' : '') +
        '<div class="auth-field"><label>' + (isCloud ? 'Email' : 'Tài khoản Gmail') + '</label><input type="email" id="auth-email" placeholder="tenban@gmail.com" required></div>' +
        '<div class="auth-field"><label>Mật khẩu</label><input type="password" id="auth-pass" placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)" required></div>' +
        (isCloud && isLogin ? '<button type="button" class="auth-forgot" id="auth-forgot">Quên mật khẩu?</button>' : '') +
        '<p class="auth-msg err" id="auth-err" hidden></p>' +
        '<button type="submit" class="btn" id="auth-submit" style="width:100%">' + (isLogin ? '🎲 Vào bàn cờ ngay' : '✓ Tạo tài khoản') + '</button>' +
      '</form>' +
      (isCloud
        ? '<div class="auth-body" style="padding-top:0;gap:.75rem"><div class="auth-or">hoặc</div>' +
          '<button type="button" class="auth-google" id="auth-google"><span class="auth-google-mark">G</span> Tiếp tục với Google</button></div>'
        : '') +
      '<p class="auth-status">' + esc(authNote) + '</p>';

    $('#auth-close-btn', d).onclick = function () { d.close(); };
    d.querySelectorAll('[data-tab]').forEach(function (btn) {
      btn.onclick = function () { renderAuthForms(d, btn.getAttribute('data-tab')); };
    });

    function showMsg(txt, ok) {
      var errEl = $('#auth-err', d);
      if (!errEl) return;
      errEl.textContent = txt;
      errEl.className = 'auth-msg ' + (ok ? 'ok' : 'err');
      errEl.hidden = false;
    }

    function closeAfterAuth() {
      try { d.close(); } catch (e) { /* bỏ qua */ }
      updateNavbarAuth();
      renderAdminSection();
    }

    var googleBtn = $('#auth-google', d);
    if (googleBtn) {
      googleBtn.onclick = async function () {
        var c = cloudApi();
        if (!c) return;
        googleBtn.disabled = true;
        try {
          await c.signInWithGoogle();
          closeAfterAuth();
        } catch (e) {
          showMsg(c.errorMessage ? c.errorMessage(e) : 'Không đăng nhập được Google.', false);
          googleBtn.disabled = false;
        }
      };
    }

    var forgotBtn = $('#auth-forgot', d);
    if (forgotBtn) {
      forgotBtn.onclick = async function () {
        var c = cloudApi();
        var email = ($('#auth-email', d).value || '').trim().toLowerCase();
        if (!c) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showMsg('Nhập email của bạn trước khi đặt lại mật khẩu.', false);
          return;
        }
        forgotBtn.disabled = true;
        try {
          await c.resetPassword(email);
          showMsg('✓ Đã gửi email đặt lại mật khẩu tới ' + email + '.', true);
        } catch (e) {
          showMsg(c.errorMessage ? c.errorMessage(e) : 'Không gửi được email đặt lại mật khẩu.', false);
        } finally {
          forgotBtn.disabled = false;
        }
      };
    }

    $('#auth-form', d).onsubmit = async function (e) {
      e.preventDefault();
      var email = ($('#auth-email', d).value || '').trim().toLowerCase();
      var pass = $('#auth-pass', d).value || '';
      var submitBtn = $('#auth-submit', d);

      if (isCloud) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showMsg('Vui lòng nhập địa chỉ email hợp lệ.', false);
          return;
        }
      } else if (!/^[a-z0-9._%+-]+@gmail\.com$/i.test(email)) {
        showMsg('Vui lòng sử dụng đúng địa chỉ @gmail.com hợp lệ.', false);
        return;
      }
      if (pass.length < 6) {
        showMsg('Mật khẩu cần có ít nhất 6 ký tự.', false);
        return;
      }

      if (isCloud) {
        var c = cloudApi();
        if (!c) return;
        var nick = !isLogin ? ($('#auth-nick', d).value || '').trim() : '';
        if (!isLogin && nick.length < 2) {
          showMsg('Biệt danh cần có ít nhất 2 ký tự.', false);
          return;
        }
        submitBtn.disabled = true;
        try {
          if (isLogin) await c.signIn(email, pass);
          else await c.signUp(email, pass, nick);
          closeAfterAuth();
        } catch (err) {
          submitBtn.disabled = false;
          showMsg(c.errorMessage ? c.errorMessage(err) : 'Không đăng nhập được. Vui lòng thử lại.', false);
        }
        return;
      }

      var users = getUsers();
      var existing = users.filter(function (u) { return u.email === email; })[0];

      if (isLogin) {
        if (!existing) {
          showMsg('Tài khoản Gmail hoặc mật khẩu không chính xác.', false);
          return;
        }
        submitBtn.disabled = true;
        var v = await verifyPassword(pass, existing);
        if (!v.ok) {
          submitBtn.disabled = false;
          showMsg('Tài khoản Gmail hoặc mật khẩu không chính xác.', false);
          return;
        }
        // Nâng cấp tài khoản legacy sang SHA-256 ngay khi đăng nhập thành công
        if (v.upgraded) {
          var hp = await hashPassword(pass);
          users.forEach(function (u) {
            if (u.email === email) {
              u.passHash = hp.hash;
              u.salt = hp.salt;
              u.hashAlgo = hp.algo;
            }
          });
          saveUsers(users);
          existing = getUsers().filter(function (u) { return u.email === email; })[0];
        }
        createSession(existing);
        closeAfterAuth();
        notifyAuthChange();
        if (existing.mustChangePass) openChangePassDialog(existing);
        return;
      }

      var nickLocal = ($('#auth-nick', d).value || '').trim();
      if (nickLocal.length < 2) {
        showMsg('Biệt danh cần có ít nhất 2 ký tự.', false);
        return;
      }
      if (existing) {
        showMsg('Tài khoản Gmail này đã được đăng ký. Vui lòng chuyển sang Đăng nhập.', false);
        return;
      }

      submitBtn.disabled = true;
      var hpNew = await hashPassword(pass);
      users.push({
        email: email,
        nickname: nickLocal,
        passHash: hpNew.hash,
        salt: hpNew.salt,
        hashAlgo: hpNew.algo,
        role: isAdminEmail(email) ? 'admin' : 'user',
        createdAt: Date.now()
      });
      saveUsers(users);
      var created = getUsers().filter(function (u) { return u.email === email; })[0];
      createSession(created);
      closeAfterAuth();
      notifyAuthChange();
    };
  }

  function initAuthSystem() {
    var c = cloudApi();
    if (c && typeof c.onAuthChange === 'function') {
      c.onAuthChange(function () {
        updateNavbarAuth();
        renderAdminSection();
      });
    }
    if (!cloudManaged()) getUsers();
    updateNavbarAuth();
    renderAdminSection();
    var user = getCurrentUser();
    if (user && user.mustChangePass && !cloudManaged()) {
      setTimeout(function () { openChangePassDialog(user); }, 400);
    }
    if (c && c.ready && typeof c.ready.then === 'function') {
      c.ready.then(function () {
        updateNavbarAuth();
        renderAdminSection();
      });
    }
  }
  window.openAuthModal = openAuthModal;
  window.updateNavbarAuth = updateNavbarAuth;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthSystem);
  } else {
    initAuthSystem();
  }

  /* =====================================================
     TRANG CHỦ: VẼ BÀN CỜ & LỊCH SỬ
     ===================================================== */
  window.initMonopolyHero = function () {
    setVars();
    var host = $('#diamonds');
    if (host) {
      var spots = [[7,16,32,0],[15,74,20,1],[25,8,26,0],[32,52,18,1],[42,90,38,0],[49,28,22,1],[58,64,28,0],[66,12,42,1],[74,82,18,0],[82,44,24,1]];
      var h = '';
      spots.forEach(function (s, i) {
        h += '<i class="diamond' + (s[3] ? ' glow' : '') + '" style="top:' + s[0] + '%;left:' + s[1] + '%;width:' + s[2] + 'px;height:' + s[2] + 'px;animation-delay:-' + (i * 1.4) + 's"></i>';
      });
      host.innerHTML = h;
    }

    var f = $('#mono-art');
    if (f) {
      var out = '';
      function box(x, y, w, h, c) { out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + c + '"/>'; }
      function px(x, y, c) { box(x, y, 1, 1, c); }

      box(2, 16, 24, 2, '#164a28');
      box(3, 16, 22, 1, '#2b7a46');
      box(4, 8, 8, 8, '#111613'); box(5, 9, 6, 7, '#d9232a');
      box(3, 7, 10, 2, '#111613'); box(4, 6, 8, 2, '#ff4d54');
      px(6, 10, '#f5b800'); px(9, 10, '#f5b800'); px(6, 12, '#f5b800'); px(9, 12, '#f5b800');
      box(7, 14, 2, 2, '#ffffff');
      box(13, 11, 6, 5, '#111613'); box(14, 12, 4, 4, '#248f46');
      box(12, 10, 8, 2, '#111613'); box(13, 9, 6, 2, '#41c46b');
      px(15, 13, '#ffffff'); px(16, 13, '#ffffff');
      box(19, 9, 7, 7, '#111613'); box(20, 10, 5, 5, '#ffffff');
      px(21, 11, '#111613'); px(23, 11, '#111613'); px(22, 12, '#d9232a'); px(21, 13, '#111613'); px(23, 13, '#111613');
      [[6,3],[15,4],[22,4],[11,2]].forEach(function (p) { px(p[0], p[1], '#f5b800'); });
      f.innerHTML = out;
    }
  };

  window.renderHistoryBox = function () {
    var box = $('#history-box');
    if (!box) return;
    var h = store.get('ontap:history', []);
    if (!h.length) {
      box.innerHTML = '<div class="empty"><p>Chưa có bài làm nào. Chọn một môn học để khởi hành.</p></div>';
      return;
    }
    box.innerHTML =
      '<ul class="hist">' + h.map(function (x) {
        return '<li><div class="t">' + esc(x.title) + ' · ' + modeName(x.mode) + (x.label ? ' · ' + esc(x.label) : '') + '</div>' +
          '<div class="d">' + new Date(x.ts).toLocaleString('vi-VN') + ' · ' + mmss(x.secs || 0) + '</div>' +
          '<div class="s">' + x.correct + '/' + x.total + '</div></li>';
      }).join('') + '</ul>' +
      '<button class="btn small ghost" id="btn-clear-hist" type="button">Xóa lịch sử</button>';

    var btn = $('#btn-clear-hist');
    if (btn) {
      btn.addEventListener('click', function () {
        ask('Xóa toàn bộ lịch sử làm bài trên thiết bị này?', 'Xóa', 'Giữ lại').then(function (ok) {
          if (ok) { store.del('ontap:history'); window.renderHistoryBox(); }
        });
      });
    }
  };

  /* =====================================================
     TRANG TIẾNG ANH (CHỌN ĐỀ, LÀM BÀI, CHẤM ĐIỂM)
     ===================================================== */
  var englishInitialized = false;
  window.initEnglishApp = function () {
    if (englishInitialized) return;
    var app = $('#app');
    if (!app) return;

    if (window.OntapContentReady && window.OntapContent && window.OntapContent.state && !window.OntapContent.state.ready) {
      if (!window.initEnglishApp._waiting) {
        window.initEnglishApp._waiting = true;
        window.OntapContentReady.then(function () {
          window.initEnglishApp._waiting = false;
          window.initEnglishApp();
        }, function () {
          window.initEnglishApp._waiting = false;
          window.initEnglishApp();
        });
      }
      return;
    }

    if (!window.TESTS || !Array.isArray(window.TESTS) || !window.TESTS.length) {
      app.innerHTML =
        '<div class="page-body"><div class="panel">' +
          '<h2 style="margin-top:0;color:var(--bad)">⚠️ Chưa tải được dữ liệu đề thi (js/data-anh.js)</h2>' +
          '<p>Vui lòng kiểm tra lại file <b>js/data-anh.js</b> trên GitHub xem đã được dán đầy đủ đến dấu <code>];</code> cuối cùng chưa.</p>' +
        '</div></div>';
      return;
    }

    englishInitialized = true;

    function getTest(id) { for (var i = 0; i < TESTS.length; i++) if (TESTS[i].id === id) return TESTS[i]; return null; }
    function buildMap(test) {
      var m = {};
      test.blocks.forEach(function (b, bi) { b.questions.forEach(function (q) { m[q.n] = { q: q, bi: bi }; }); });
      return m;
    }
    function allQids(test) { var r = []; test.blocks.forEach(function (b) { b.questions.forEach(function (q) { r.push(q.n); }); }); return r; }
    function total(test) { return allQids(test).length; }
    function progKey(id) { return 'ontap:progress:' + id; }
    function histAll() { return store.get('ontap:history', []); }
    function progressCategory(id) { return 'anh:' + id; }
    function scoreCategory(id, mode) { return 'anh:' + id + ':' + (mode === 'exam' ? 'exam' : 'practice'); }

    var selectedTestId = TESTS[0].id;
    var lbMode = 'exam';
    var S = {
      test: null, qmap: null, mode: 'practice', label: '', qids: [], answers: {}, flags: {}, blockIdx: 0,
      startMs: 0, secs: 0, submitted: false, review: false, onlyWrong: false, result: null, timer: null, paletteOpen: false,
      scoreKey: ''
    };

    function submitCloudScore() {
      var c = cloudApi();
      if (!c || typeof c.submitScore !== 'function' || !S.result || !S.submitted || !S.test) return;
      if (S.qids.length !== total(S.test)) return; // chỉ xếp hạng khi làm trọn đề

      var identityKey;
      if (c.status && c.status().mode === 'firebase') {
        var u = c.currentUser && c.currentUser();
        identityKey = u ? u.uid : 'signed-out';
      } else {
        var localId = c.localIdentity && c.localIdentity();
        identityKey = localId ? localId.uid : 'local';
      }
      if (S.scoreKey === identityKey) return;
      S.scoreKey = identityKey;

      var r = S.result;
      var pct = r.total ? Math.round(r.correct / r.total * 10000) / 100 : 0;
      Promise.resolve(c.submitScore(scoreCategory(S.test.id, S.mode), {
        score: r.correct,
        max: r.total,
        percent: pct,
        correct: r.correct,
        total: r.total,
        timeSec: r.secs,
        mode: S.mode,
        modeLabel: modeName(S.mode),
        examId: S.test.id,
        title: S.test.title
      })).catch(function () { /* không chặn kết quả */ });
    }

    function syncCloudProgress() {
      var c = cloudApi();
      if (!c || typeof c.pullAllProgress !== 'function') return;
      Promise.resolve(c.pullAllProgress()).then(function (map) {
        if (!map) return;
        var changed = false;
        TESTS.filter(function (t) { return t.subject === 'anh'; }).forEach(function (t) {
          var cat = progressCategory(t.id);
          var rec = map[cat];
          var local = store.get(progKey(t.id), null);
          var remoteAt = rec ? Number(rec.updatedAt || (rec.payload && rec.payload.updatedAt) || 0) : 0;
          var localAt = local ? Number(local.updatedAt || 0) : 0;
          if (rec && rec.payload && remoteAt > localAt) {
            store.set(progKey(t.id), rec.payload);
            changed = true;
          } else if (local && localAt > remoteAt && typeof c.saveProgress === 'function') {
            c.saveProgress(cat, local);
          }
        });
        if (changed) {
          var h = location.hash.replace(/^#\/?/, '');
          if (h !== 'lam-bai' && h !== 'ket-qua') renderEnglish();
        }
      }).catch(function () { /* bỏ qua lỗi đồng bộ */ });
    }

    function mountEnglishLeaderboard(test) {
      var host = $('#englishLeaderboard');
      var c = cloudApi();
      if (!host || !c || typeof c.mountLeaderboard !== 'function' || !test) return;
      c.mountLeaderboard(host, scoreCategory(test.id, lbMode), {
        title: 'Bảng xếp hạng · ' + test.title,
        subtitle: (lbMode === 'exam' ? 'Thi thử' : 'Luyện tập') + ' · điểm cao nhất của mỗi tài khoản',
        limit: 10
      });
    }

    function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

    function startAttempt(test, mode, qids, label) {
      S.test = test; S.qmap = buildMap(test); S.mode = mode; S.qids = qids.slice(); S.label = label || '';
      S.answers = {}; S.flags = {}; S.blockIdx = 0; S.secs = 0; S.startMs = Date.now();
      S.submitted = false; S.review = false; S.onlyWrong = false; S.result = null; S.paletteOpen = false; S.scoreKey = '';
      saveProgress();
      go('#lam-bai');
    }

    function resumeAttempt(test) {
      var p = store.get(progKey(test.id), null);
      if (!p || !p.qids || !p.qids.length) return false;
      S.test = test; S.qmap = buildMap(test); S.mode = p.mode || 'practice'; S.qids = p.qids; S.label = p.label || '';
      S.answers = p.answers || {}; S.flags = p.flags || {}; S.blockIdx = p.blockIdx || 0; S.secs = p.secs || 0;
      S.startMs = Date.now() - S.secs * 1000;
      S.submitted = false; S.review = false; S.onlyWrong = false; S.result = null; S.paletteOpen = false; S.scoreKey = '';
      go('#lam-bai');
      return true;
    }

    function saveProgress() {
      if (!S.test || S.submitted) return;
      var payload = {
        v: 1, mode: S.mode, label: S.label, qids: S.qids,
        answers: S.answers, flags: S.flags, blockIdx: S.blockIdx, secs: S.secs,
        updatedAt: Date.now()
      };
      store.set(progKey(S.test.id), payload);
      var c = cloudApi();
      if (c && typeof c.saveProgress === 'function' && cloudManaged()) {
        c.saveProgress(progressCategory(S.test.id), payload);
      }
    }

    function startTimer() {
      if (S.timer || S.submitted) return;
      S.timer = setInterval(function () {
        S.secs = Math.floor((Date.now() - S.startMs) / 1000);
        var el = $('#rb-time'); if (el) el.textContent = mmss(S.secs);
        if (S.secs % 5 === 0) saveProgress();
      }, 1000);
    }
    function stopTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } }

    function reveal(n) { return S.submitted || (S.mode === 'practice' && !!S.answers[n]); }
    function visibleQids() {
      var ids = S.qids;
      if (S.review && S.onlyWrong) ids = ids.filter(function (n) { return S.answers[n] !== S.qmap[n].q.ans; });
      return ids;
    }
    function visibleBlocks() {
      var set = {}; visibleQids().forEach(function (n) { set[n] = 1; });
      return S.test.blocks.map(function (b, i) { return { b: b, i: i, qs: b.questions.filter(function (q) { return set[q.n]; }) }; })
        .filter(function (x) { return x.qs.length; });
    }
    function answeredCount() { return S.qids.filter(function (n) { return !!S.answers[n]; }).length; }

    function renderEnglish() {
      var tests = TESTS.filter(function (t) { return t.subject === 'anh'; });
      var t = getTest(selectedTestId) || tests[0];
      if (!t) return;
      selectedTestId = t.id;

      var tabs = tests.map(function (item) {
        var n = total(item);
        var hist = histAll().filter(function (h) { return h.testId === item.id; });
        var full = hist.filter(function (h) { return h.total === n; });
        var best = full.reduce(function (m, h) { return Math.max(m, h.correct); }, -1);
        var prog = store.get(progKey(item.id), null);
        var isAct = item.id === selectedTestId;
        var badge = prog && prog.qids && prog.qids.length ? 'Đang làm' : (best >= 0 ? best + '/' + n : n + ' câu');

        return '<button type="button" class="test-tab' + (isAct ? ' active' : '') + '" data-act="select-test" data-test="' + item.id + '">' +
          '<div class="test-tab-top"><b>' + esc(item.title) + '</b><span class="test-tab-badge">' + esc(badge) + '</span></div>' +
          '<div class="test-tab-sub">' + item.blocks.length + ' phần · Đã làm ' + hist.length + ' lần</div>' +
        '</button>';
      }).join('');

      var n = total(t);
      var hist = histAll().filter(function (h) { return h.testId === t.id; });
      var full = hist.filter(function (h) { return h.total === n; });
      var best = full.reduce(function (m, h) { return Math.max(m, h.correct); }, -1);
      var prog = store.get(progKey(t.id), null);
      var last = hist[0];

      var kpis = '<div class="kpis"><span><b>' + n + '</b> câu</span><span><b>' + t.blocks.length + '</b> phần</span>' +
        '<span>Đã làm: <b>' + hist.length + '</b> lần</span>' +
        (best >= 0 ? '<span>Kỷ lục (cả đề): <b>' + best + '/' + n + '</b></span>' : '') + '</div>';

      var resume = '';
      if (prog && prog.qids && prog.qids.length) {
        var done = prog.qids.filter(function (x) { return prog.answers && prog.answers[x]; }).length;
        resume = '<div class="resume"><p><b>Bài đang làm dở (' + esc(t.title) + ')</b> · ' + modeName(prog.mode) + (prog.label ? ' · ' + esc(prog.label) : '') + ' · ' + done + '/' + prog.qids.length + ' câu · ' + mmss(prog.secs || 0) + '</p>' +
          '<button class="btn small" type="button" data-act="resume" data-test="' + t.id + '">Tiếp tục</button></div>';
      }
      var retry = (last && last.wrong && last.wrong.length)
        ? '<button class="btn ghost" type="button" data-act="retry-last" data-test="' + t.id + '">Làm lại ' + last.wrong.length + ' câu sai gần nhất</button>' : '';

      var parts = t.blocks.map(function (b) {
        var ns = b.questions.map(function (q) { return q.n; });
        return '<li class="part-item"><div><div class="t">' + esc(b.short) + '</div><div class="r">Câu ' + ns[0] + (ns.length > 1 ? '–' + ns[ns.length - 1] : '') + ' · ' + ns.length + ' câu</div></div>' +
          '<button class="btn small ghost" type="button" data-act="part" data-test="' + t.id + '" data-block="' + b.id + '">Luyện phần này</button></li>';
      }).join('');

      var totalAllQuestions = tests.reduce(function (sum, item) { return sum + total(item); }, 0);

      var card = '<article class="panel test-card">' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:.5rem">' +
          '<div><h3>' + esc(t.title) + '</h3><p class="sub">Lexico-Grammar, Arrangement &amp; Reading · Đề luyện thi THPT</p></div>' +
          kpis +
        '</div>' +
        resume +
        '<div class="modes">' +
          '<div class="mode"><h4>Luyện tập</h4><p>Chọn đáp án xong là thấy đúng/sai và lời giải ngay. Mỗi câu chỉ chọn một lần.</p><button class="btn" type="button" data-act="start" data-mode="practice" data-test="' + t.id + '">Bắt đầu luyện tập</button></div>' +
          '<div class="mode"><h4>Thi thử</h4><p>Làm cả đề có bấm giờ, được đổi đáp án và đánh dấu câu cần xem lại. Chấm điểm và xem lời giải sau khi nộp bài.</p><button class="btn" type="button" data-act="start" data-mode="exam" data-test="' + t.id + '">Bắt đầu thi thử</button></div>' +
        '</div>' +
        (retry ? '<div class="btn-row">' + retry + '</div>' : '') +
        '<div><h2 class="sec" style="margin-top:.5rem">Luyện theo từng phần (' + esc(t.title) + ')</h2><ul class="part-list">' + parts + '</ul></div>' +
      '</article>';

      var leaderboard = '<section class="exam-lb-section"><h2 class="h2-rule">Bảng xếp hạng đề này</h2>'
        + '<p class="exam-lb-lead">Mỗi đề và mỗi chế độ có bảng riêng; điểm cao nhất của tài khoản được giữ lại.</p>'
        + '<div class="lb-mode-tabs" role="tablist" aria-label="Chọn chế độ xếp hạng">'
        + '<button type="button" class="lb-mode-tab' + (lbMode === 'exam' ? ' on' : '') + '" data-act="lb-mode" data-mode="exam">Thi thử</button>'
        + '<button type="button" class="lb-mode-tab' + (lbMode === 'practice' ? ' on' : '') + '" data-act="lb-mode" data-mode="practice">Luyện tập</button>'
        + '</div><div id="englishLeaderboard"></div></section>';

      app.innerHTML =
        '<section class="page-head"><div class="page-head-in">' +
          '<a class="crumb" href="index.html">← Quay lại bàn cờ môn học</a>' +
          '<h1>Tiếng Anh (' + tests.length + ' Đề · ' + totalAllQuestions + ' Câu)</h1>' +
          '<p>Chọn một đề bên dưới để bắt đầu luyện tập, thi thử bấm giờ hoặc ôn theo từng phần.</p>' +
        '</div></section>' +
        '<div class="page-body">' +
          '<div class="test-selector" role="tablist" aria-label="Chọn đề thi">' + tabs + '</div>' +
          card + leaderboard +
        '</div>';
      mountEnglishLeaderboard(t);
    }

    function passageHTML(b) {
      if (!b.paras) return '';
      var h = '<article class="passage" tabindex="0" aria-label="Bài đọc">';
      if (b.passageTitle) h += '<h3>' + esc(b.passageTitle) + '</h3>';
      b.paras.forEach(function (p, i) {
        if (p.indexOf('## ') === 0) h += '<h4>' + esc(p.slice(3)) + '</h4>';
        else h += '<p>' + (b.numbered ? '<span class="pn" title="Đoạn ' + (i + 1) + '">' + (i + 1) + '</span>' : '') + fmt(p) + '</p>';
      });
      if (b.source) h += '<p class="src">' + esc(b.source) + '</p>';
      return h + '</article>';
    }

    function qHTML(q) {
      var a = S.answers[q.n], rv = reveal(q.n), L = ['A', 'B', 'C', 'D'];
      var opts = q.opts.map(function (t, i) {
        var l = L[i], cls = 'opt', mark = '', sr = '';
        if (a === l) cls += ' chosen';
        if (rv) {
          if (l === q.ans) { cls += ' correct'; mark = '<span class="mark" aria-hidden="true">✓</span>'; sr = '<span class="sr"> (đáp án đúng)</span>'; }
          else if (l === a) { cls += ' wrong'; mark = '<span class="mark" aria-hidden="true">✕</span>'; sr = '<span class="sr"> (bạn chọn, sai)</span>'; }
        }
        return '<label class="' + cls + '"><input type="radio" name="q' + q.n + '" value="' + l + '"' + (a === l ? ' checked' : '') + (rv ? ' disabled' : '') + '>' +
          '<span class="letter">' + l + '</span><span class="otext">' + fmt(t) + sr + '</span>' + mark + '</label>';
      }).join('');

      var stem = q.stem ? '<p class="q-stem" style="white-space:pre-line">' + fmt(q.stem) + '</p>' : '<p class="q-stem">Chọn đáp án đúng cho chỗ trống (' + q.n + ').</p>';
      var tools = '';
      if (S.mode === 'exam' && !S.submitted) {
        var on = !!S.flags[q.n];
        tools = '<div class="q-tools"><button type="button" class="flag' + (on ? ' on' : '') + '" data-act="flag" data-n="' + q.n + '" aria-pressed="' + on + '">⚑ ' + (on ? 'Bỏ đánh dấu' : 'Đánh dấu xem lại') + '</button></div>';
      }
      var exp = '';
      if (rv) {
        var verdict = a ? (a === q.ans ? 'Chính xác.' : 'Chưa đúng.') : 'Bạn chưa chọn đáp án.';
        exp = '<div class="exp"><p class="head">' + verdict + ' Đáp án đúng: ' + q.ans + '</p><p>' + esc(q.exp) + '</p></div>';
      }
      return '<fieldset class="q" id="q-' + q.n + '"><legend>Ô câu ' + q.n + '</legend>' + stem + '<div class="opts">' + opts + '</div>' + tools + exp + '</fieldset>';
    }

    function palStatus(n) {
      var a = S.answers[n], c = '';
      if (S.submitted) c = a ? (a === S.qmap[n].q.ans ? 'ok' : 'bad') : 'skip';
      else if (reveal(n)) c = (a === S.qmap[n].q.ans) ? 'ok' : 'bad';
      else if (a) c = 'done';
      if (S.flags[n] && !S.submitted) c += ' flagged';
      return c;
    }

    function paletteHTML(vb) {
      var cur = vb[S.blockIdx] ? vb[S.blockIdx].b.id : '';
      var groups = vb.map(function (x) {
        var btns = x.qs.map(function (q) {
          var st = palStatus(q.n);
          var label = 'Câu ' + q.n + (S.answers[q.n] ? ', đã trả lời' : ', chưa trả lời') + (S.flags[q.n] ? ', đã đánh dấu' : '');
          return '<button type="button" class="pal ' + st + (x.b.id === cur ? ' current' : '') + '" data-act="goto" data-n="' + q.n + '" aria-label="' + label + '">' + q.n + '</button>';
        }).join('');
        return '<div><h4>' + esc(x.b.short) + '</h4><div class="pal-grid">' + btns + '</div></div>';
      }).join('');
      var legend = S.submitted
        ? '<div class="legend"><span>Xanh: đúng</span><span>Đỏ: sai</span><span>Nét đứt: bỏ trống</span></div>'
        : '<div class="legend"><span>Xanh đậm: đã trả lời</span>' + (S.mode === 'exam' ? '<span>⚑: đã đánh dấu</span>' : '') + '<span>Viền vàng: phần đang xem</span></div>';
      return '<div class="palette-in">' + legend + groups + '</div>';
    }

    function renderRunner() {
      var vb = visibleBlocks();
      var barTitle = '<div class="rb-title">' + esc(S.test.title) + '<span>' + (S.review ? 'Xem lại bài làm' : modeName(S.mode)) + (S.label ? ' · ' + esc(S.label) : '') + '</span></div>';

      if (!vb.length) {
        app.innerHTML =
          '<div class="runbar" id="runbar"><div class="runbar-in">' + barTitle +
            '<label class="rb-check"><input type="checkbox" id="only-wrong" checked> Chỉ hiện câu sai</label>' +
            '<button class="btn small" type="button" data-act="results">Kết quả</button></div></div>' +
          '<div class="run-main"><div class="empty"><p><b>Không có câu sai nào để hiển thị.</b></p><button class="btn small" type="button" data-act="show-all">Hiện tất cả câu</button></div></div>';
        setVars(); return;
      }
      if (S.blockIdx >= vb.length) S.blockIdx = vb.length - 1;
      if (S.blockIdx < 0) S.blockIdx = 0;
      var cur = vb[S.blockIdx], b = cur.b;
      var hasP = !!b.paras;

      var right = S.review
        ? '<label class="rb-check"><input type="checkbox" id="only-wrong"' + (S.onlyWrong ? ' checked' : '') + '> Chỉ hiện câu sai</label>' +
          '<div class="rb-stat"><span>⏱ ' + mmss(S.secs) + '</span></div>' +
          '<button class="btn small ghost" type="button" data-act="palette" aria-expanded="' + S.paletteOpen + '">Bàn cờ câu hỏi</button>' +
          '<button class="btn small" type="button" data-act="results">Kết quả</button>'
        : '<div class="rb-stat"><span>⏱ <span id="rb-time">' + mmss(S.secs) + '</span></span><span id="rb-prog">' + answeredCount() + '/' + S.qids.length + ' câu</span></div>' +
          '<button class="btn small ghost" type="button" data-act="palette" aria-expanded="' + S.paletteOpen + '">Bàn cờ câu hỏi</button>' +
          '<button class="btn small" type="button" data-act="finish">' + (S.mode === 'exam' ? 'Nộp bài' : 'Xem kết quả') + '</button>';

      var isLast = S.blockIdx === vb.length - 1;
      var nextBtn;
      if (!isLast) nextBtn = '<button class="btn" type="button" data-act="next">Phần sau →</button>';
      else if (S.review) nextBtn = '<button class="btn" type="button" data-act="results">Xem kết quả</button>';
      else nextBtn = '<button class="btn" type="button" data-act="finish">' + (S.mode === 'exam' ? 'Nộp bài' : 'Xem kết quả') + '</button>';

      app.innerHTML =
        '<div class="runbar" id="runbar"><div class="runbar-in">' + barTitle + right + '</div>' +
          '<div class="palette" id="palette"' + (S.paletteOpen ? '' : ' hidden') + '>' + paletteHTML(vb) + '</div></div>' +
        '<div class="run-main">' +
          '<p class="part-kicker">' + esc(b.part) + ' · Phần ' + (S.blockIdx + 1) + '/' + vb.length + '</p>' +
          '<h2 class="block-title">' + esc(b.title) + '</h2>' +
          '<p class="instruction">' + esc(b.instruction) + '</p>' +
          '<div class="block-body' + (hasP ? ' has-passage' : '') + '">' +
            passageHTML(b) +
            '<div class="questions">' + cur.qs.map(qHTML).join('') + '</div>' +
          '</div>' +
          '<div class="block-nav">' +
            (S.blockIdx > 0 ? '<button class="btn ghost" type="button" data-act="prev">← Phần trước</button>' : '<span></span>') + nextBtn +
          '</div>' +
        '</div>';
      setVars();
      if (!S.submitted) startTimer();
    }

    function refreshChrome() {
      var vb = visibleBlocks();
      var pal = $('#palette'); if (pal) pal.innerHTML = paletteHTML(vb);
      var pr = $('#rb-prog'); if (pr) pr.textContent = answeredCount() + '/' + S.qids.length + ' câu';
    }

    function refreshQuestion(n) {
      var el = document.getElementById('q-' + n); if (!el) return;
      var tmp = document.createElement('div'); tmp.innerHTML = qHTML(S.qmap[n].q);
      var nextEl = tmp.firstElementChild;
      el.replaceWith(nextEl);
      var c = nextEl.querySelector('input:checked');
      if (c && !c.disabled) {
        c.focus({ preventScroll: true });
      } else {
        nextEl.setAttribute('tabindex', '-1');
        nextEl.focus({ preventScroll: true });
      }
      refreshChrome();
    }

    function setBlock(i) { S.blockIdx = i; saveProgress(); renderRunner(); window.scrollTo(0, 0); }

    function gotoQuestion(n) {
      var vb = visibleBlocks();
      for (var i = 0; i < vb.length; i++) {
        if (vb[i].qs.some(function (q) { return q.n === n; })) {
          S.paletteOpen = false;
          if (i !== S.blockIdx) { S.blockIdx = i; saveProgress(); renderRunner(); }
          else { var p = $('#palette'); if (p) p.hidden = true; var bt = $('[data-act="palette"]'); if (bt) bt.setAttribute('aria-expanded', 'false'); }
          requestAnimationFrame(function () { var el = document.getElementById('q-' + n); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
          return;
        }
      }
    }

    function finish() {
      var unanswered = S.qids.filter(function (n) { return !S.answers[n]; }).length;
      var p;
      if (unanswered > 0) {
        p = ask('Còn ' + unanswered + ' câu chưa làm. Câu bỏ trống sẽ tính là sai. Bạn vẫn muốn ' + (S.mode === 'exam' ? 'nộp bài' : 'xem kết quả') + '?', S.mode === 'exam' ? 'Nộp bài' : 'Xem kết quả', 'Làm tiếp');
      } else if (S.mode === 'exam') {
        p = ask('Bạn đã trả lời hết các câu. Nộp bài ngay?', 'Nộp bài', 'Xem lại');
      } else {
        p = Promise.resolve(true);
      }
      p.then(function (ok) { if (ok) doFinish(); });
    }

    function doFinish() {
      S.secs = Math.floor((Date.now() - S.startMs) / 1000);
      var wrong = S.qids.filter(function (n) { return S.answers[n] !== S.qmap[n].q.ans; });
      var skipped = S.qids.filter(function (n) { return !S.answers[n]; }).length;
      var per = S.test.blocks.map(function (b) {
        var ids = b.questions.map(function (q) { return q.n; }).filter(function (n) { return S.qids.indexOf(n) >= 0; });
        if (!ids.length) return null;
        return { title: b.short, total: ids.length, correct: ids.filter(function (n) { return S.answers[n] === S.qmap[n].q.ans; }).length };
      }).filter(Boolean);

      S.result = {
        correct: S.qids.length - wrong.length,
        total: S.qids.length,
        wrong: wrong,
        skipped: skipped,
        secs: S.secs,
        per: per
      };
      S.submitted = true;
      stopTimer();

      var h = histAll();
      h.unshift({
        ts: Date.now(), testId: S.test.id, title: S.test.title,
        mode: S.mode, label: S.label,
        correct: S.result.correct, total: S.result.total,
        secs: S.secs, wrong: wrong
      });
      store.set('ontap:history', h.slice(0, 60));
      store.del(progKey(S.test.id));
      var c = cloudApi();
      if (c && typeof c.deleteProgress === 'function' && cloudManaged()) c.deleteProgress(progressCategory(S.test.id));
      submitCloudScore();
      go('#ket-qua');
    }

    function renderResult() {
      var r = S.result, pct = r.total ? r.correct / r.total : 0;
      var ten = (pct * 10).toFixed(1).replace('.', ',');
      var partOnly = S.qids.length !== total(S.test);
      var msg = pct >= .8 ? 'Kết quả xuất sắc! Bạn đã thâu tóm gần hết các ô đất trong đề này.'
        : pct >= .5 ? 'Bạn đã nắm được phần lớn. Xem lại các câu sai để nâng cấp thêm.'
        : 'Cần ôn thêm. Làm lại các câu sai ở chế độ luyện tập để đọc kỹ lời giải.';
      var bars = r.per.map(function (p) {
        var w = p.total ? Math.round(p.correct / p.total * 100) : 0;
        return '<div class="bar-row"><div class="bar-label"><span>' + esc(p.title) + '</span><span>' + p.correct + '/' + p.total + '</span></div><div class="bar" role="img" aria-label="' + p.correct + ' trên ' + p.total + ' câu đúng"><i style="width:' + w + '%"></i></div></div>';
      }).join('');

      var lbBlock = partOnly
        ? '<div class="panel" style="margin-top:1rem"><p style="margin:0;font-size:.86rem;color:var(--muted)"><b>Bảng xếp hạng:</b> chỉ ghi nhận khi bạn làm trọn bộ đề. Hãy chọn “Làm lại từ đầu” để thi đấu toàn đề.</p></div>'
        : '<div id="englishResultLeaderboard" class="result-lb-wrap" style="margin-top:1rem"></div>';

      app.innerHTML =
        '<section class="page-head"><div class="page-head-in">' +
          '<a class="crumb" href="anh.html">← Danh sách đề Tiếng Anh</a>' +
          '<h1>Kết quả</h1>' +
          '<p>' + esc(S.test.title) + ' · ' + modeName(S.mode) + (S.label ? ' · ' + esc(S.label) : '') + '</p>' +
        '</div></section>' +
        '<div class="page-body"><div class="panel score-card">' +
          '<p class="big">' + r.correct + '<small>/' + r.total + '</small></p>' +
          '<div class="score-meta"><span>Điểm quy đổi: <b>' + ten + '/10</b></span><span>Đúng: <b>' + r.correct + '</b></span><span>Sai: <b>' + (r.total - r.correct - r.skipped) + '</b></span><span>Bỏ trống: <b>' + r.skipped + '</b></span><span>Thời gian: <b>' + mmss(r.secs) + '</b></span></div>' +
          '<p style="margin:0">' + msg + '</p>' +
          '<div class="bars">' + bars + '</div>' +
          '<div class="btn-row">' +
            '<button class="btn" type="button" data-act="review">Xem lại bài làm</button>' +
            (r.wrong.length ? '<button class="btn ghost" type="button" data-act="retry-wrong">Làm lại ' + r.wrong.length + ' câu sai</button>' : '') +
            '<button class="btn ghost" type="button" data-act="again">Làm lại từ đầu</button>' +
          '</div>' +
        '</div>' + lbBlock + '</div>';

      if (!partOnly) {
        var host = $('#englishResultLeaderboard');
        var c = cloudApi();
        if (host && c && typeof c.mountLeaderboard === 'function') {
          c.mountLeaderboard(host, scoreCategory(S.test.id, S.mode), {
            title: 'Bảng xếp hạng · ' + S.test.title,
            subtitle: modeName(S.mode) + ' · ' + r.correct + '/' + r.total + ' câu đúng',
            limit: 10
          });
        }
      }
    }

    function route() {
      stopTimer();
      var hash = location.hash.replace(/^#\/?/, '');
      if (hash === 'lam-bai') {
        if (!S.test || !S.qids.length) {
          var target = getTest(selectedTestId) || TESTS[0];
          if (target && resumeAttempt(target)) return;
          go('#');
          return;
        }
        renderRunner();
      } else if (hash === 'ket-qua') {
        if (!S.result) { go('#'); return; }
        renderResult();
      } else {
        renderEnglish();
      }
      window.scrollTo(0, 0);
      setVars();
    }

    app.addEventListener('keydown', function (e) {
      var t = e.target;
      if (!t.matches('.q input[type=radio]')) return;
      if (S.mode === 'practice' && !S.submitted) {
        var keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
        var idx = keys.indexOf(e.key);
        if (idx !== -1) {
          e.preventDefault();
          var qField = t.closest('.q');
          if (!qField) return;
          var radios = Array.prototype.slice.call(qField.querySelectorAll('input[type=radio]:not(:disabled)'));
          var curIdx = radios.indexOf(t);
          if (curIdx === -1 || !radios.length) return;
          var step = (idx < 2) ? 1 : -1;
          var nextIdx = (curIdx + step + radios.length) % radios.length;
          radios[nextIdx].focus();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          t.checked = true;
          t.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });

    app.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('.q input[type=radio]')) {
        var n = parseInt(t.name.slice(1), 10);
        if (S.submitted || (S.mode === 'practice' && S.answers[n])) return;
        S.answers[n] = t.value;
        saveProgress();
        refreshQuestion(n);
      } else if (t.id === 'only-wrong') {
        S.onlyWrong = t.checked;
        S.blockIdx = 0;
        renderRunner();
        window.scrollTo(0, 0);
      }
    });

    app.addEventListener('click', function (e) {
      var el = e.target.closest('[data-act]'); if (!el) return;
      var act = el.getAttribute('data-act');
      var test = el.getAttribute('data-test') ? getTest(el.getAttribute('data-test')) : null;
      switch (act) {
        case 'select-test':
          if (test) { selectedTestId = test.id; renderEnglish(); }
          break;
        case 'lb-mode':
          lbMode = el.getAttribute('data-mode') === 'practice' ? 'practice' : 'exam';
          renderEnglish();
          break;
        case 'start': startAttempt(test, el.getAttribute('data-mode'), allQids(test), ''); break;
        case 'resume': resumeAttempt(test); break;
        case 'part': {
          var bid = el.getAttribute('data-block');
          var blk = test.blocks.filter(function (b) { return b.id === bid; })[0];
          startAttempt(test, 'practice', blk.questions.map(function (q) { return q.n; }), blk.short);
          break;
        }
        case 'retry-last': {
          var last = histAll().filter(function (h) { return h.testId === test.id; })[0];
          if (last && last.wrong && last.wrong.length) startAttempt(test, 'practice', last.wrong, 'Câu sai');
          break;
        }
        case 'retry-wrong': startAttempt(S.test, 'practice', S.result.wrong, 'Câu sai'); break;
        case 'again': startAttempt(S.test, S.mode, allQids(S.test), S.label); break;
        case 'review': S.review = true; S.onlyWrong = false; S.blockIdx = 0; S.paletteOpen = false; go('#lam-bai'); break;
        case 'results': go('#ket-qua'); break;
        case 'show-all': S.onlyWrong = false; S.blockIdx = 0; renderRunner(); break;
        case 'prev': setBlock(S.blockIdx - 1); break;
        case 'next': setBlock(S.blockIdx + 1); break;
        case 'finish': finish(); break;
        case 'palette': {
          S.paletteOpen = !S.paletteOpen;
          var p = $('#palette'); if (p) p.hidden = !S.paletteOpen;
          el.setAttribute('aria-expanded', String(S.paletteOpen));
          break;
        }
        case 'goto': gotoQuestion(parseInt(el.getAttribute('data-n'), 10)); break;
        case 'flag': {
          var n = parseInt(el.getAttribute('data-n'), 10);
          if (S.flags[n]) delete S.flags[n]; else S.flags[n] = 1;
          saveProgress();
          refreshQuestion(n);
          var nb = document.querySelector('#q-' + n + ' .flag');
          if (nb) nb.focus({ preventScroll: true });
          break;
        }
        case 'blank': {
          var tn = el.getAttribute('data-n'), tq = document.getElementById('q-' + tn);
          if (tq) tq.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    });

    function flushCloudProgress() {
      var c = cloudApi();
      if (!c || typeof c.flushProgress !== 'function' || !S.test) return;
      if (!cloudManaged()) return;
      Promise.resolve(c.flushProgress(progressCategory(S.test.id))).catch(function () { /* bỏ qua */ });
    }

    window.addEventListener('hashchange', route);
    window.addEventListener('pagehide', function () {
      if (S.timer) { S.secs = Math.floor((Date.now() - S.startMs) / 1000); saveProgress(); }
      flushCloudProgress();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flushCloudProgress();
    });
    var cloud = cloudApi();
    if (cloud && typeof cloud.onAuthChange === 'function') {
      cloud.onAuthChange(function () {
        if (S.submitted && S.result) submitCloudScore();
        syncCloudProgress();
      });
    }
    window.addEventListener('ontap:authchange', function () {
      if (S.submitted && S.result) submitCloudScore();
      syncCloudProgress();
    });
    if (cloud && cloud.ready && typeof cloud.ready.then === 'function') cloud.ready.then(syncCloudProgress);
    route();
  };

  /* Tự động khởi chạy trang Tiếng Anh nếu đang ở trang anh.html */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if ($('#app')) window.initEnglishApp();
    });
  } else {
    if ($('#app')) window.initEnglishApp();
  }

  /* =====================================================
     TỰ ĐỘNG THU GỌN HEADER KHI LƯỚT XUỐNG
     ===================================================== */
  (function initSmartHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var lastY = window.scrollY || 0;
    var ticking = false;
    var mobile = window.matchMedia('(max-width: 959px)');

    function runbarHeight() {
      var bar = document.getElementById('runbar');
      var inner = bar && bar.querySelector('.runbar-in');
      return inner ? inner.offsetHeight : 56;
    }

    function setRunbarHidden(hidden) {
      var bar = document.getElementById('runbar');
      if (!bar) return;
      bar.classList.toggle('runbar-hidden', hidden);
      document.documentElement.style.setProperty('--runbar-h', hidden ? '0px' : (runbarHeight() + 'px'));
    }

    function onScroll() {
      var curY = window.scrollY || 0;
      var delta = curY - lastY;

      if (curY <= 40) {
        header.classList.remove('header-hidden');
        document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
        if (mobile.matches) setRunbarHidden(false);
      } else if (delta > 8) {
        header.classList.add('header-hidden');
        document.documentElement.style.setProperty('--header-h', '0px');
        if (mobile.matches) setRunbarHidden(curY > header.offsetHeight + 8);
      } else if (delta < -8) {
        header.classList.remove('header-hidden');
        document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
        if (mobile.matches) setRunbarHidden(false);
      }

      lastY = curY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  })();
})();
