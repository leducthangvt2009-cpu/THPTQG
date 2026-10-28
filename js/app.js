(function () {
  'use strict';

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(s) {
    var h = esc(s);
    h = h.replace(/\((\d+)\)\s*_+/g, function (m, n) { return '<button type="button" class="blank" data-act="blank" data-n="' + n + '">(' + n + ') ______</button>'; });
    h = h.replace(/_{3,}/g, '<span class="gap"></span>');
    return h;
  }

  /* =====================================================
     CẤU HÌNH ADMIN & LƯU TRỮ
     ===================================================== */
  var ADMIN_EMAILS = ['admin@gmail.com', 'leducthangvt2009@gmail.com'];
  var DEFAULT_ADMIN_PASS = 'admin123';

  var store = {
    get: function (k, f) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function mmss(s) { var sec = Math.max(0, parseInt(s, 10) || 0); return pad(Math.floor(sec / 60)) + ':' + pad(sec % 60); }
  function modeName(m) { return m === 'exam' ? 'Thi thử' : 'Luyện tập'; }

  function ask(msg, ok, cancel) {
    return new Promise(function (res) {
      var d = $('#dlg');
      if (!d || typeof d.showModal !== 'function') { res(window.confirm(msg)); return; }
      $('#dlg-msg').textContent = msg;
      $('#dlg-ok').textContent = ok || 'Đồng ý';
      $('#dlg-cancel').textContent = cancel || 'Hủy';
      d.returnValue = '';
      var onClose = function () { d.removeEventListener('close', onClose); res(d.returnValue === 'ok'); };
      d.addEventListener('close', onClose);
      d.showModal();
    });
  }

  function setVars() {
    var hh = $('#site-header'); if (hh) document.documentElement.style.setProperty('--header-h', hh.offsetHeight + 'px');
    var rb = $('#runbar .runbar-in'); document.documentElement.style.setProperty('--runbar-h', (rb ? rb.offsetHeight : 56) + 'px');
  }
  window.addEventListener('resize', setVars);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setVars);

  /* =====================================================
     HỆ THỐNG ĐĂNG NHẬP / ĐĂNG KÝ & QUẢN LÝ NGƯỜI DÙNG (ADMIN)
     ===================================================== */
  var USERS_KEY = 'ontap:users';
  var SESSION_KEY = 'ontap:current_user';

  function encodePass(p) {
    try { return btoa(unescape(encodeURIComponent('mono_salt_' + p))); } catch (e) { return p; }
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
        passHash: encodePass(DEFAULT_ADMIN_PASS),
        role: 'admin',
        createdAt: Date.now()
      });
      store.set(USERS_KEY, list);
    }
    return list;
  }

  function saveUsers(list) {
    store.set(USERS_KEY, list);
  }

  function getCurrentUser() {
    var email = store.get(SESSION_KEY, null);
    if (!email) return null;
    var users = getUsers();
    var found = users.filter(function (u) { return u.email === email; })[0];
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
    var btnLabel = 'Đăng nhập';

    if (user) {
      var isAdm = user.role === 'admin' || isAdminEmail(user.email);
      btnClass += isAdm ? ' is-admin' : ' logged-in';
      btnLabel = (isAdm ? '[Admin] ' : '') + esc(user.nickname);
    }

    var path = location.pathname.split('/').pop() || 'index.html';
    var links = [
      ['index.html', 'Bàn cờ'],
      ['anh.html', 'Tiếng Anh'],
      ['tu-vung.html', 'Từ vựng'],
      ['hoa.html', 'Hóa học'],
      ['sinh.html', 'Sinh học']
    ].map(function (item) {
      var cur = path === item[0] ? ' aria-current="page"' : '';
      return '<a href="' + item[0] + '"' + cur + '>' + item[1] + '</a>';
    }).join('');

    nav.innerHTML = links + '<button type="button" class="' + btnClass + '" id="nav-auth-btn">' + btnLabel + '</button>';

    var btn = $('#nav-auth-btn');
    if (btn) btn.addEventListener('click', openAuthModal);
  }

  function renderAdminSection() {
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
        : '<button type="button" class="btn-del-user" data-del-email="' + esc(u.email) + '">Xóa tài khoản</button>';

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
        '<h3>Quản lý người dùng (Chỉ Admin hiển thị)</h3>' +
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

  function openAuthModal() {
    var d = ensureAuthDialog();
    var user = getCurrentUser();

    if (user) {
      var isAdm = user.role === 'admin' || isAdminEmail(user.email);
      d.innerHTML =
        '<div class="auth-head">' +
          '<strong>' + (isAdm ? 'Hồ sơ Admin' : 'Hồ sơ người học') + '</strong>' +
          '<button type="button" class="auth-close" id="auth-close-btn">✕</button>' +
        '</div>' +
        '<div class="auth-body">' +
          '<div class="auth-field"><label>Tài khoản Gmail</label><input type="text" value="' + esc(user.email) + '" disabled></div>' +
          '<div class="auth-field"><label>Biệt danh hiển thị</label><input type="text" id="prof-nickname" value="' + esc(user.nickname) + '" maxlength="28"></div>' +
          '<p class="auth-msg ok" id="prof-msg" hidden></p>' +
          '<div class="btn-row" style="justify-content:space-between;margin-top:.25rem">' +
            '<button type="button" class="btn small" id="btn-save-nick">Lưu biệt danh</button>' +
            '<button type="button" class="btn small ghost" id="btn-logout">Đăng xuất</button>' +
          '</div>' +
        '</div>';

      $('#auth-close-btn', d).onclick = function () { d.close(); };
      $('#btn-save-nick', d).onclick = function () {
        var newNick = ($('#prof-nickname', d).value || '').trim();
        var msg = $('#prof-msg', d);
        if (newNick.length < 2) {
          msg.textContent = 'Biệt danh cần ít nhất 2 ký tự.';
          msg.className = 'auth-msg err';
          msg.hidden = false;
          return;
        }
        var users = getUsers();
        users.forEach(function (u) { if (u.email === user.email) u.nickname = newNick; });
        saveUsers(users);
        msg.textContent = '✓ Đã cập nhật biệt danh thành công!';
        msg.className = 'auth-msg ok';
        msg.hidden = false;
        updateNavbarAuth();
        renderAdminSection();
      };
      $('#btn-logout', d).onclick = function () {
        store.del(SESSION_KEY);
        d.close();
        updateNavbarAuth();
        renderAdminSection();
      };

      if (typeof d.showModal === 'function') d.showModal();
      return;
    }

    renderAuthForms(d, 'login');
    if (typeof d.showModal === 'function') d.showModal();
  }

  function renderAuthForms(d, tab) {
    var isLogin = tab === 'login';
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
        (!isLogin ? '<div class="auth-field"><label>Biệt danh của bạn</label><input type="text" id="auth-nick" placeholder="VD: Tỷ Phú Hóa Học" required maxlength="28"></div>' : '') +
        '<div class="auth-field"><label>Tài khoản Gmail</label><input type="email" id="auth-email" placeholder="tenban@gmail.com" required></div>' +
        '<div class="auth-field"><label>Mật khẩu</label><input type="password" id="auth-pass" placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)" required></div>' +
        '<p class="auth-msg err" id="auth-err" hidden></p>' +
        '<button type="submit" class="btn" style="width:100%">' + (isLogin ? 'Vào bàn cờ ngay' : '✓ Tạo tài khoản') + '</button>' +
      '</form>';

    $('#auth-close-btn', d).onclick = function () { d.close(); };
    d.querySelectorAll('[data-tab]').forEach(function (btn) {
      btn.onclick = function () { renderAuthForms(d, btn.getAttribute('data-tab')); };
    });

    $('#auth-form', d).onsubmit = function (e) {
      e.preventDefault();
      var email = ($('#auth-email', d).value || '').trim().toLowerCase();
      var pass = $('#auth-pass', d).value || '';
      var errEl = $('#auth-err', d);

      function showErr(txt) {
        errEl.textContent = txt;
        errEl.hidden = false;
      }

      if (!/^[a-z0-9._%+-]+@gmail\.com$/i.test(email)) {
        showErr('Vui lòng sử dụng đúng địa chỉ @gmail.com hợp lệ.');
        return;
      }
      if (pass.length < 6) {
        showErr('Mật khẩu cần có ít nhất 6 ký tự.');
        return;
      }

      var users = getUsers();
      var existing = users.filter(function (u) { return u.email === email; })[0];

      if (isLogin) {
        if (!existing || existing.passHash !== encodePass(pass)) {
          showErr('Tài khoản Gmail hoặc mật khẩu không chính xác.');
          return;
        }
        store.set(SESSION_KEY, existing.email);
        d.close();
        updateNavbarAuth();
        renderAdminSection();
      } else {
        var nick = ($('#auth-nick', d).value || '').trim();
        if (nick.length < 2) {
          showErr('Biệt danh cần có ít nhất 2 ký tự.');
          return;
        }
        if (existing) {
          showErr('Tài khoản Gmail này đã được đăng ký. Vui lòng chuyển sang Đăng nhập.');
          return;
        }
        var role = isAdminEmail(email) ? 'admin' : 'user';
        users.push({
          email: email,
          nickname: nick,
          passHash: encodePass(pass),
          role: role,
          createdAt: Date.now()
        });
        saveUsers(users);
        store.set(SESSION_KEY, email);
        d.close();
        updateNavbarAuth();
        renderAdminSection();
      }
    };
  }

  function initAuthSystem() {
    getUsers();
    updateNavbarAuth();
    renderAdminSection();
  }
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
     TRANG TIẾNG ANH (LÀM BÀI, CHẤM ĐIỂM, XEM LẠI)
     ===================================================== */
  window.initEnglishApp = function () {
    var app = $('#app');
    if (!app || !window.TESTS) return;

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

    var S = {
      test: null, qmap: null, mode: 'practice', label: '', qids: [], answers: {}, flags: {}, blockIdx: 0,
      startMs: 0, secs: 0, submitted: false, review: false, onlyWrong: false, result: null, timer: null, paletteOpen: false
    };

    function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

    function startAttempt(test, mode, qids, label) {
      S.test = test; S.qmap = buildMap(test); S.mode = mode; S.qids = qids.slice(); S.label = label || '';
      S.answers = {}; S.flags = {}; S.blockIdx = 0; S.secs = 0; S.startMs = Date.now();
      S.submitted = false; S.review = false; S.onlyWrong = false; S.result = null; S.paletteOpen = false;
      saveProgress();
      go('#lam-bai');
    }

    function resumeAttempt(test) {
      var p = store.get(progKey(test.id), null);
      if (!p || !p.qids || !p.qids.length) return false;
      S.test = test; S.qmap = buildMap(test); S.mode = p.mode || 'practice'; S.qids = p.qids; S.label = p.label || '';
      S.answers = p.answers || {}; S.flags = p.flags || {}; S.blockIdx = p.blockIdx || 0; S.secs = p.secs || 0;
      S.startMs = Date.now() - S.secs * 1000;
      S.submitted = false; S.review = false; S.onlyWrong = false; S.result = null; S.paletteOpen = false;
      go('#lam-bai');
      return true;
    }

    function saveProgress() {
      if (!S.test || S.submitted) return;
      store.set(progKey(S.test.id), {
        v: 1, mode: S.mode, label: S.label, qids: S.qids,
        answers: S.answers, flags: S.flags, blockIdx: S.blockIdx, secs: S.secs
      });
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

var selectedTestId = TESTS[0] ? TESTS[0].id : 'anh-test-01';

    function renderEnglish() {
      var tests = TESTS.filter(function (t) { return t.subject === 'anh'; });
      var t = getTest(selectedTestId) || tests[0];
      if (!t) return;
      selectedTestId = t.id;

      /* Thanh chọn nhanh Test 01 -> Test 05 */
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

      app.innerHTML =
        '<section class="page-head"><div class="page-head-in">' +
          '<a class="crumb" href="index.html">← Quay lại bàn cờ môn học</a>' +
          '<h1>Tiếng Anh (5 Đề · 250 Câu)</h1>' +
          '<p>Chọn một đề bên dưới để bắt đầu luyện tập, thi thử bấm giờ hoặc ôn theo từng phần.</p>' +
        '</div></section>' +
        '<div class="page-body">' +
          '<div class="test-selector" role="tablist" aria-label="Chọn đề thi">' + tabs + '</div>' +
          card +
        '</div>';
    }
    app.addEventListener('click', function (e) {
      var el = e.target.closest('[data-act]'); if (!el) return;
      var act = el.getAttribute('data-act');
      var test = el.getAttribute('data-test') ? getTest(el.getAttribute('data-test')) : null;
      switch (act) {
          case 'select-test':
          if (test) { selectedTestId = test.id; renderEnglish(); }
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
        case 'toggle-passage': {
          var pas = document.getElementById('active-passage');
          if (pas) {
            var collapsed = pas.classList.toggle('is-collapsed');
            el.textContent = collapsed ? 'Mở bài đọc ▼' : 'Thu gọn ▲';
          }
          break;
        }
        case 'blank': {
          var tn = el.getAttribute('data-n'), tq = document.getElementById('q-' + tn);
          if (tq) {
            tq.scrollIntoView({ behavior: 'smooth', block: 'center' });
            tq.focus({ preventScroll: true });
          }
          break;
        }
      }
    });

    window.addEventListener('hashchange', route);
    window.addEventListener('pagehide', function () {
      if (S.timer) { S.secs = Math.floor((Date.now() - S.startMs) / 1000); saveProgress(); }
    });
    route();
  };

  /* =====================================================
     TỰ ĐỘNG THU GỌN HEADER KHI LƯỚT XUỐNG
     ===================================================== */
  (function initSmartHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var lastY = window.scrollY || 0;
    var ticking = false;

    function onScroll() {
      var curY = window.scrollY || 0;
      var delta = curY - lastY;

      if (curY <= 40) {
        header.classList.remove('header-hidden');
        document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
      } else if (delta > 8) {
        header.classList.add('header-hidden');
        document.documentElement.style.setProperty('--header-h', '0px');
      } else if (delta < -8) {
        header.classList.remove('header-hidden');
        document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
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
