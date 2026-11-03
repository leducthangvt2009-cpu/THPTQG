/* ==========================================================================
   Quản trị nội dung · Ôn tập THPT
   --------------------------------------------------------------------------
   - Chỉ tài khoản Google leducthangvt2009@gmail.com được vào giao diện.
   - Nội dung được lưu vào content/*.json của repo bằng GitHub Git Data API
     (một commit duy nhất cho mỗi lần đăng).
   - Token GitHub do quản trị viên nhập, chỉ lưu trên trình duyệt của mình.
   ========================================================================== */
(function (g) {
  'use strict';

  var ADMIN_EMAIL = 'leducthangvt2009@gmail.com';
  var REPO = 'leducthangvt2009-cpu/THPTQG';
  var BRANCH = 'main';
  var API = 'https://api.github.com';
  var RAW = 'https://raw.githubusercontent.com/' + REPO + '/' + BRANCH + '/content/';
  var TOKEN_KEY = 'ontap:admin:github-token';
  var REMEMBER_KEY = 'ontap:admin:github-remember';
  var DRAFT_KEY = 'ontap:admin:draft:v1';

  function emptyContent() {
    return { english: [], hoa: { sections: [], exams: [] }, vocab: [] };
  }

  var state = {
    user: null,
    authed: false,
    authMessage: '',
    contentLoading: false,
    contentReady: false,
    contentSource: '',
    contentWarnings: [],
    content: emptyContent(),
    saved: emptyContent(),
    headSha: '',
    loadedAt: 0,
    draftRestored: false,
    tab: 'overview',
    editor: null,
    editorDirty: false,
    busy: false,
    status: null,
    token: readStoredToken(),
    tokenRemember: readRemember(),
    tokenValid: false,
    tokenMessage: '',
    vocabSearch: '',
    lastCommit: ''
  };

  var gate = null;
  var app = null;

  /* ------------------------------------------------------------------ */
  /* Tiện ích                                                            */
  /* ------------------------------------------------------------------ */
  function $(selector, root) { return (root || document).querySelector(selector); }
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function esc(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function text(value) {
    return String(value === undefined || value === null ? '' : value);
  }

  function clone(value) {
    try { return JSON.parse(JSON.stringify(value)); } catch (e) { return value; }
  }

  function same(a, b) {
    try { return JSON.stringify(a) === JSON.stringify(b); } catch (e) { return false; }
  }

  function arr(value) { return Array.isArray(value) ? value : []; }

  function slug(value, fallback) {
    var out = text(value).toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return out || fallback || 'moi';
  }

  function uid() {
    try {
      var bytes = new Uint8Array(3);
      g.crypto.getRandomValues(bytes);
      return Array.prototype.map.call(bytes, function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    } catch (e) {
      return String(Date.now()).slice(-6);
    }
  }

  function readStorage(store, key) {
    try { return store.getItem(key); } catch (e) { return null; }
  }

  function writeStorage(store, key, value) {
    try {
      if (value === null || value === undefined) store.removeItem(key);
      else store.setItem(key, value);
    } catch (e) { /* trình duyệt chặn bộ nhớ */ }
  }

  function readStoredToken() {
    return readStorage(g.localStorage, TOKEN_KEY) || readStorage(g.sessionStorage, TOKEN_KEY) || '';
  }

  function readRemember() {
    return readStorage(g.localStorage, REMEMBER_KEY) === '1';
  }

  function saveToken(token, remember) {
    token = text(token).trim();
    state.token = token;
    state.tokenRemember = !!remember;
    writeStorage(g.localStorage, REMEMBER_KEY, remember ? '1' : '0');
    if (!token) {
      writeStorage(g.localStorage, TOKEN_KEY, null);
      writeStorage(g.sessionStorage, TOKEN_KEY, null);
      return;
    }
    if (remember) {
      writeStorage(g.localStorage, TOKEN_KEY, token);
      writeStorage(g.sessionStorage, TOKEN_KEY, null);
    } else {
      writeStorage(g.sessionStorage, TOKEN_KEY, token);
      writeStorage(g.localStorage, TOKEN_KEY, null);
    }
  }

  function isAdminUser(user) {
    if (!user) return false;
    return text(user.email).toLowerCase().trim() === ADMIN_EMAIL;
  }

  function adminUser() {
    var cloud = g.OntapCloud;
    if (!cloud || typeof cloud.currentUser !== 'function') return null;
    var user = cloud.currentUser();
    return isAdminUser(user) ? user : null;
  }

  function setStatus(kind, html) {
    state.status = { kind: kind || 'info', html: html || '' };
    renderStatus();
  }

  function showErrors(title, errors) {
    var list = arr(errors).map(function (e) { return '• ' + esc(e); }).join('<br>');
    setStatus('bad', '<b>' + esc(title) + '</b><br>' + list);
  }

  function dateText(ts) {
    if (!ts) return '—';
    try {
      return new Date(ts).toLocaleString('vi-VN');
    } catch (e) { return '—'; }
  }

  function commitUrl(sha) {
    return 'https://github.com/' + REPO + '/commit/' + encodeURIComponent(sha);
  }

  /* ------------------------------------------------------------------ */
  /* GitHub API                                                          */
  /* ------------------------------------------------------------------ */
  function ghError(response, data) {
    var msg = data && data.message ? data.message : ('HTTP ' + response.status);
    if (response.status === 401) msg = 'Token GitHub không hợp lệ hoặc đã hết hạn.';
    else if (response.status === 403) msg = 'Token GitHub không có quyền ghi nội dung (cần Contents: Read and write).';
    else if (response.status === 404) msg = 'Không tìm thấy repo hoặc token không đủ quyền.';
    else if (response.status === 409 || response.status === 422) msg = 'Dữ liệu trên GitHub vừa thay đổi. Hãy tải lại rồi đăng lại.';
    var err = new Error(msg);
    err.status = response.status;
    err.data = data;
    return err;
  }

  async function gh(method, path, body, token) {
    var headers = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
    if (token) headers.Authorization = 'Bearer ' + token;
    if (body !== undefined) headers['Content-Type'] = 'application/json';

    var response = await fetch(API + path, {
      method: method,
      headers: headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store'
    });
    var data = null;
    try { data = await response.json(); } catch (e) { data = null; }
    if (!response.ok) throw ghError(response, data);
    return data;
  }

  async function validateToken(token) {
    token = text(token || state.token).trim();
    if (!token) throw new Error('Bạn chưa nhập token GitHub.');
    var repo = await gh('GET', '/repos/' + REPO, undefined, token);
    if (repo && repo.permissions && repo.permissions.push === false) {
      throw new Error('Token này chỉ có quyền đọc. Hãy tạo token fine-grained với quyền Contents: Read and write.');
    }
    return repo;
  }

  function decodeBase64Utf8(value) {
    var clean = text(value).replace(/\s+/g, '');
    var binary = atob(clean);
    try {
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
      return new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
      return decodeURIComponent(escape(binary));
    }
  }

  async function fetchRawJson(file) {
    var response = await fetch(RAW + file + '?t=' + Date.now(), { cache: 'no-store' });
    if (!response.ok) throw new Error(file + ': HTTP ' + response.status);
    return response.json();
  }

  async function fetchHeadSha(token) {
    var data = await gh('GET', '/repos/' + REPO + '/git/ref/heads/' + BRANCH, undefined, token);
    return data && data.object ? data.object.sha : '';
  }

  function draftStorage() {
    var raw = readStorage(g.localStorage, DRAFT_KEY);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.content) return null;
      return parsed;
    } catch (e) { return null; }
  }

  async function loadRepoContent() {
    if (state.contentLoading) return;
    state.contentLoading = true;
    state.contentWarnings = [];
    state.status = null;
    renderStatus();

    var loaded = emptyContent();
    var warnings = [];
    var jobs = [
      { key: 'english', file: 'english.json' },
      { key: 'hoa', file: 'hoa.json' },
      { key: 'vocab', file: 'vocab.json' }
    ];

    await Promise.all(jobs.map(async function (job) {
      try {
        var data = await fetchRawJson(job.file);
        if (job.key === 'hoa') {
          loaded.hoa = {
            sections: arr(data && data.sections),
            exams: arr(data && data.exams)
          };
        } else {
          loaded[job.key] = arr(data);
        }
      } catch (err) {
        var fallback = g.OntapContent && g.OntapContent.state;
        var fb = fallback ? fallback[job.key] : null;
        var message = err && err.message ? err.message : String(err);
        if (message.indexOf(job.file + ':') !== 0) message = job.file + ': ' + message;
        if (job.key === 'hoa') {
          loaded.hoa = fb && (arr(fb.sections).length || arr(fb.exams).length)
            ? { sections: arr(fb.sections), exams: arr(fb.exams) }
            : { sections: [], exams: [] };
        } else {
          loaded[job.key] = arr(fb);
        }
        warnings.push(message + ' (đang dùng bản dự phòng)');
      }
    }));

    try {
      state.headSha = await fetchHeadSha(state.token);
    } catch (e) {
      state.headSha = '';
      warnings.push('Không đọc được commit mới nhất: ' + (e.message || e));
    }

    state.saved = clone(loaded);
    var draft = draftStorage();
    if (draft && !same(draft.content, loaded)) {
      state.content = clone(draft.content);
      state.draftRestored = true;
      state.contentSource = 'draft';
    } else {
      state.content = clone(loaded);
      state.draftRestored = false;
      state.contentSource = warnings.length ? 'fallback' : 'github';
    }

    state.contentWarnings = warnings;
    state.contentReady = true;
    state.contentLoading = false;
    state.loadedAt = Date.now();

    if (state.draftRestored) {
      setStatus('info', 'Đang mở <b>bản nháp trên máy</b> khác với nội dung đã đăng. Bấm <b>Đăng lên website</b> để cập nhật, hoặc <b>Bỏ nháp</b> để tải lại bản trên GitHub.');
    } else if (warnings.length) {
      setStatus('info', 'Đã tải nội dung, nhưng có cảnh báo:<br>' + warnings.map(function (w) { return '• ' + esc(w); }).join('<br>'));
    } else {
      setStatus('ok', 'Đã tải nội dung mới nhất từ GitHub. Bạn có thể tạo đề, thêm từ vựng rồi bấm <b>Đăng lên website</b>.');
    }

    renderView();
    renderSavebar();
  }

  function writeDraft() {
    try {
      writeStorage(g.localStorage, DRAFT_KEY, JSON.stringify({
        at: Date.now(),
        content: state.content
      }));
      state.draftRestored = true;
      setStatus('ok', 'Đã lưu bản nháp trên máy. Bản nháp chỉ nằm trong trình duyệt này, chưa hiển thị cho người dùng.');
      renderSavebar();
    } catch (e) {
      setStatus('bad', 'Không lưu được bản nháp: ' + esc(e.message || e));
    }
  }

  function clearDraft(silent) {
    writeStorage(g.localStorage, DRAFT_KEY, null);
    state.draftRestored = false;
    if (!silent) {
      setStatus('info', 'Đã bỏ bản nháp trên máy. Nội dung đang mở là bản mới nhất tải từ GitHub.');
      renderView();
    }
    renderSavebar();
  }

  function contentDirty() {
    return !same(state.content, state.saved);
  }

  function filePayload() {
    return [
      { key: 'english', file: 'english.json', value: state.content.english },
      { key: 'hoa', file: 'hoa.json', value: state.content.hoa },
      { key: 'vocab', file: 'vocab.json', value: state.content.vocab }
    ];
  }

  async function publish() {
    if (state.busy) return;

    var errors = validateAll();
    if (errors.length) {
      showErrors('Chưa thể đăng vì nội dung còn lỗi:', errors.slice(0, 16));
      return;
    }

    var token = text(state.token).trim();
    if (!token) {
      state.tab = 'settings';
      state.editor = null;
      renderTabs();
      renderView();
      setStatus('bad', 'Bạn cần nhập token GitHub trước khi đăng nội dung. Token chỉ cần quyền <b>Contents: Read and write</b>.');
      var input = $('#gh-token');
      if (input) input.focus();
      return;
    }

    var changed = filePayload().filter(function (item) {
      return !same(item.value, state.saved[item.key]);
    });
    if (!changed.length) {
      setStatus('info', 'Không có thay đổi nào cần đăng.');
      return;
    }

    state.busy = true;
    renderSavebar();
    setStatus('info', '<span class="admin-spinner"></span> Đang tạo commit và đăng nội dung lên GitHub…');

    try {
      var head = await fetchHeadSha(token);
      if (state.headSha && head && head !== state.headSha) {
        throw new Error('Nội dung trên GitHub vừa thay đổi (có thể do một lần đăng khác). Hãy bấm “Tải lại từ GitHub” để tránh ghi đè.');
      }
      state.headSha = head || state.headSha;

      var commit = await gh('GET', '/repos/' + REPO + '/git/commits/' + head, undefined, token);
      var baseTree = commit && commit.tree ? commit.tree.sha : '';
      if (!baseTree) throw new Error('Không đọc được cây nội dung hiện tại của repo.');

      var entries = [];
      for (var i = 0; i < changed.length; i += 1) {
        var item = changed[i];
        var contentText = JSON.stringify(item.value, null, 2) + '\n';
        var blob = await gh('POST', '/repos/' + REPO + '/git/blobs', {
          content: contentText,
          encoding: 'utf-8'
        }, token);
        entries.push({
          path: 'content/' + item.file,
          mode: '100644',
          type: 'blob',
          sha: blob.sha
        });
      }

      var tree = await gh('POST', '/repos/' + REPO + '/git/trees', {
        base_tree: baseTree,
        tree: entries
      }, token);

      var message = 'content: cập nhật đề và từ vựng (' + new Date().toLocaleString('vi-VN') + ')';
      var newCommit = await gh('POST', '/repos/' + REPO + '/git/commits', {
        message: message,
        tree: tree.sha,
        parents: [head]
      }, token);

      await gh('PATCH', '/repos/' + REPO + '/git/refs/heads/' + BRANCH, {
        sha: newCommit.sha,
        force: false
      }, token);

      state.saved = clone(state.content);
      state.headSha = newCommit.sha;
      state.lastCommit = newCommit.sha;
      state.draftRestored = false;
      writeStorage(g.localStorage, DRAFT_KEY, null);

      if (g.OntapContent && typeof g.OntapContent.setLocal === 'function') {
        g.OntapContent.setLocal(state.content);
      }

      setStatus('ok', 'Đã đăng thành công lên GitHub. Commit: <a href="' + commitUrl(newCommit.sha) + '" target="_blank" rel="noopener"><b>' + esc(newCommit.sha.slice(0, 7)) + '</b></a>. '
        + 'GitHub Pages có thể mất 1–2 phút để cập nhật; người dùng chỉ cần tải lại trang.');
      renderView();
    } catch (err) {
      var msg = err && err.message ? err.message : String(err);
      if (err && (err.status === 401 || err.status === 403 || err.status === 404)) state.tokenValid = false;
      setStatus('bad', '<b>Đăng thất bại.</b> ' + esc(msg));
    } finally {
      state.busy = false;
      renderSavebar();
    }
  }

  /* ------------------------------------------------------------------ */
  /* Đăng nhập quản trị                                                  */
  /* ------------------------------------------------------------------ */
  function gateMessage(kind, html) {
    var msg = $('#admin-gate-msg');
    if (!msg) return;
    msg.className = 'admin-msg' + (kind ? ' ' + kind : '');
    msg.innerHTML = html || '';
  }

  function renderGate(message, kind) {
    if (!gate) return;
    var cloud = g.OntapCloud;
    var actions = $('#admin-gate-actions');
    var user = cloud && typeof cloud.currentUser === 'function' ? cloud.currentUser() : null;

    if (!cloud) {
      if (actions) actions.innerHTML = '';
      gateMessage('bad', 'Không tải được lớp xác thực Firebase. Hãy kiểm tra kết nối mạng rồi tải lại trang.');
      return;
    }

    if (!cloud.isConfigured || !cloud.isConfigured()) {
      if (actions) actions.innerHTML = '<a class="btn" href="index.html">Về trang người dùng</a>';
      gateMessage('bad', 'Firebase chưa được cấu hình trong <code>js/firebase-config.js</code>, nên chưa thể xác thực quản trị viên. Hãy điền cấu hình Firebase trước.');
      return;
    }

    if (user && !isAdminUser(user)) {
      if (actions) {
        actions.innerHTML = '<button type="button" class="btn ghost" data-act="admin-signout">Đăng xuất tài khoản này</button>';
      }
      gateMessage('bad', 'Tài khoản <b>' + esc(user.email || '') + '</b> không có quyền quản trị. Chỉ <b>' + ADMIN_EMAIL + '</b> được truy cập trang này.');
      return;
    }

    if (!user) {
      if (actions) {
        actions.innerHTML = '<button type="button" class="btn" data-act="admin-google">Đăng nhập bằng Google</button>'
          + '<a class="btn ghost" href="index.html">Về trang người dùng</a>';
      }
      if (message) gateMessage(kind || 'info', message);
      else gateMessage('', 'Đăng nhập đúng tài khoản Google quản trị để tiếp tục.');
      return;
    }

    if (actions) actions.innerHTML = '';
    gateMessage('ok', 'Đã xác thực quản trị viên. Đang mở bảng điều khiển…');
  }

  function showAdmin() {
    if (!app || !gate) return;
    state.authed = true;
    gate.hidden = true;
    app.hidden = false;
    renderShell();
    if (!state.contentReady && !state.contentLoading) loadRepoContent();
    if (state.token && !state.tokenValid && !state.tokenMessage) {
      state.tokenMessage = 'Token đã lưu trên trình duyệt. Bấm “Kiểm tra token” trong Cài đặt nếu muốn xác nhận quyền ghi.';
    }
  }

  function refreshAuth() {
    var user = adminUser();
    state.user = user;
    if (user) {
      if (!state.authed) showAdmin();
      return;
    }
    state.authed = false;
    if (gate) gate.hidden = false;
    if (app) app.hidden = true;
    renderGate();
  }

  async function signInGoogle() {
    var cloud = g.OntapCloud;
    if (!cloud || typeof cloud.signInWithGoogle !== 'function') return;
    var btn = $('[data-act="admin-google"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Đang mở Google…'; }
    gateMessage('info', 'Đang mở cửa sổ đăng nhập Google…');
    try {
      await cloud.signInWithGoogle();
      refreshAuth();
    } catch (err) {
      var msg = cloud.errorMessage ? cloud.errorMessage(err) : (err && err.message ? err.message : String(err));
      renderGate(msg, 'bad');
    }
  }

  async function signOutAdmin() {
    var cloud = g.OntapCloud;
    if (!cloud || typeof cloud.signOut !== 'function') return;
    try { await cloud.signOut(); } catch (e) { /* bỏ qua */ }
    state.authed = false;
    refreshAuth();
  }

  function initAuth() {
    var cloud = g.OntapCloud;
    if (!cloud) {
      renderGate();
      return;
    }
    if (typeof cloud.onAuthChange === 'function') cloud.onAuthChange(refreshAuth);
    if (cloud.ready && typeof cloud.ready.then === 'function') {
      cloud.ready.then(refreshAuth, refreshAuth);
    }
    setTimeout(refreshAuth, 0);
  }

  /* ------------------------------------------------------------------ */
  /* Khung giao diện                                                     */
  /* ------------------------------------------------------------------ */
  function renderShell() {
    if (!app) return;
    var email = state.user && state.user.email ? state.user.email : ADMIN_EMAIL;
    var nick = state.user && state.user.nickname ? state.user.nickname : 'Quản trị viên';

    app.innerHTML = '<div class="admin-hero">'
      + '<div><span class="tag">KHU VỰC QUẢN TRỊ</span>'
      + '<h1>Bảng điều khiển nội dung</h1>'
      + '<p>Tạo đề Tiếng Anh, đề Hóa và thêm từ vựng/idiom cho toàn bộ người dùng. Nội dung được đăng trực tiếp vào repo GitHub và tải về trang người dùng.</p></div>'
      + '<div class="admin-userbox"><b>👤 ' + esc(nick) + '</b><small>' + esc(email) + '</small>'
      + '<button type="button" class="btn small ghost" data-act="admin-signout">Đăng xuất</button></div>'
      + '</div>'
      + '<div class="admin-tabs" role="tablist" aria-label="Khu vực quản trị">'
      + '<button type="button" class="admin-tab" role="tab" data-act="tab" data-tab="overview">Tổng quan</button>'
      + '<button type="button" class="admin-tab" role="tab" data-act="tab" data-tab="english">Đề Tiếng Anh</button>'
      + '<button type="button" class="admin-tab" role="tab" data-act="tab" data-tab="hoa">Đề Hóa</button>'
      + '<button type="button" class="admin-tab" role="tab" data-act="tab" data-tab="vocab">Từ vựng &amp; Idiom</button>'
      + '<button type="button" class="admin-tab" role="tab" data-act="tab" data-tab="settings">Cài đặt &amp; GitHub</button>'
      + '</div>'
      + '<div class="admin-status info" id="admin-status" role="status" aria-live="polite">Đang tải nội dung…</div>'
      + '<div id="admin-view"></div>'
      + '<div class="admin-savebar" id="admin-savebar"></div>';

    renderStatus();
    renderTabs();
    renderView();
    renderSavebar();
  }

  function renderTabs() {
    $$('.admin-tab').forEach(function (btn) {
      var active = btn.getAttribute('data-tab') === state.tab;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function renderStatus() {
    var box = $('#admin-status');
    if (!box) return;
    if (!state.status) {
      box.className = 'admin-status info';
      box.innerHTML = state.contentLoading
        ? '<span class="admin-spinner"></span> Đang tải nội dung từ GitHub…'
        : 'Sẵn sàng.';
      return;
    }
    box.className = 'admin-status ' + (state.status.kind || 'info');
    box.innerHTML = state.status.html || '';
  }

  function renderSavebar() {
    var bar = $('#admin-savebar');
    if (!bar) return;
    var dirty = contentDirty();
    var draft = state.draftRestored;
    bar.innerHTML = '<div><b>' + (dirty ? 'Có thay đổi chưa đăng lên website' : 'Nội dung đang khớp với bản trên GitHub')
      + '</b><small>' + (draft ? 'Đang có bản nháp lưu trên máy.' : 'Bản nháp trên máy giúp bạn không mất bài khi lỡ đóng tab.')
      + '</small></div>'
      + '<div class="admin-savebar-actions">'
      + (draft ? '<button type="button" class="btn ghost small" data-act="discard-draft">Bỏ nháp</button>' : '')
      + '<button type="button" class="btn ghost small" data-act="save-draft">Lưu nháp trên máy</button>'
      + '<button type="button" class="btn small" data-act="publish"' + (state.busy ? ' disabled' : '') + '>'
      + (state.busy ? '<span class="admin-spinner"></span> Đang đăng…' : 'Đăng lên website') + '</button>'
      + '</div>';
  }

  function switchTab(tab) {
    if (state.editor && state.editorDirty && !g.confirm('Bạn đang sửa dở. Bỏ các thay đổi chưa lưu trong trình soạn thảo?')) return;
    state.editor = null;
    state.editorDirty = false;
    state.tab = tab;
    renderTabs();
    renderView();
    renderSavebar();
    var host = $('#admin-view');
    if (host) host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderView() {
    var host = $('#admin-view');
    if (!host) return;
    if (state.editor) {
      if (state.editor.kind === 'english') host.innerHTML = englishEditorHTML();
      else if (state.editor.kind === 'hoa') host.innerHTML = hoaEditorHTML();
      else if (state.editor.kind === 'hoa-section') host.innerHTML = hoaSectionEditorHTML();
      else if (state.editor.kind === 'vocab') host.innerHTML = vocabEditorHTML();
      else host.innerHTML = '<div class="admin-empty">Trình soạn thảo không hợp lệ.</div>';
      return;
    }
    if (state.tab === 'english') host.innerHTML = englishTabHTML();
    else if (state.tab === 'hoa') host.innerHTML = hoaTabHTML();
    else if (state.tab === 'vocab') host.innerHTML = vocabTabHTML();
    else if (state.tab === 'settings') host.innerHTML = settingsTabHTML();
    else host.innerHTML = overviewHTML();
  }

  function staticEnglishCount() {
    return arr(g.TESTS).filter(function (test) { return !test.__dynamic; }).length;
  }

  function staticHoaCount() {
    var h = g.HoaExams;
    return h && Array.isArray(h.meta) ? h.meta.filter(function (m) { return !m.__dynamic; }).length : 0;
  }

  function overviewHTML() {
    var c = state.content;
    var tokenLabel = state.token
      ? (state.tokenValid ? 'Hợp lệ, có quyền ghi' : 'Đã lưu, chưa kiểm tra')
      : 'Chưa nhập';
    var sourceLabel = state.contentSource === 'draft' ? 'Bản nháp trên máy'
      : state.contentSource === 'fallback' ? 'Bản dự phòng'
        : state.contentSource === 'github' ? 'GitHub (mới nhất)' : '—';

    return '<div class="admin-grid">'
      + '<div class="admin-card"><h2>Tình trạng nội dung</h2>'
      + '<div class="admin-stat-grid">'
      + '<div class="admin-stat"><b>' + c.english.length + '</b><span>Đề Anh động</span></div>'
      + '<div class="admin-stat"><b>' + c.hoa.exams.length + '</b><span>Đề Hóa động</span></div>'
      + '<div class="admin-stat"><b>' + c.vocab.length + '</b><span>Từ vựng mới</span></div>'
      + '<div class="admin-stat"><b>' + (staticEnglishCount() + staticHoaCount()) + '</b><span>Đề tĩnh có sẵn</span></div>'
      + '</div>'
      + '<p style="margin-top:1rem">Đề tĩnh trong <code>js/data-anh.js</code> và <code>js/exams-hoa/</code> vẫn giữ nguyên. Giao diện quản trị chỉ sửa nội dung động trong thư mục <code>content/</code>.</p>'
      + '<div class="admin-note">Nguồn đang mở: <b>' + esc(sourceLabel) + '</b> · Tải lúc: ' + esc(dateText(state.loadedAt))
      + (state.headSha ? ' · Commit: <code>' + esc(state.headSha.slice(0, 7)) + '</code>' : '') + '</div>'
      + '</div>'
      + '<div class="admin-card"><h2>Quy trình đăng</h2>'
      + '<ol style="margin:.4rem 0 0;padding-left:1.2rem">'
      + '<li>Tạo hoặc sửa đề ở các tab <b>Đề Tiếng Anh</b>, <b>Đề Hóa</b>, <b>Từ vựng</b>.</li>'
      + '<li>Bấm <b>Đăng lên website</b> ở thanh dưới cùng.</li>'
      + '<li>Hệ thống tạo một commit mới trên GitHub; trang người dùng tự tải nội dung mới khi mở lại.</li>'
      + '</ol>'
      + '<div class="admin-note" style="margin-top:1rem">Lần đầu sử dụng, hãy vào <b>Cài đặt &amp; GitHub</b> để dán token fine-grained có quyền <b>Contents: Read and write</b>.</div>'
      + '<div class="btn-row"><button type="button" class="btn small" data-act="tab" data-tab="settings">Mở cài đặt GitHub</button></div>'
      + '</div>'
      + '<div class="admin-card"><h2>Kết nối</h2>'
      + '<div class="admin-details-list">'
      + '<div><b>Quản trị viên:</b> ' + esc(ADMIN_EMAIL) + '</div>'
      + '<div><b>Repo:</b> <code>' + esc(REPO) + '</code> · nhánh <code>' + esc(BRANCH) + '</code></div>'
      + '<div><b>Token GitHub:</b> ' + esc(tokenLabel) + '</div>'
      + '<div><b>Nội dung:</b> ' + esc(sourceLabel) + '</div>'
      + '</div>'
      + '<div class="btn-row"><button type="button" class="btn ghost small" data-act="reload-content">Tải lại từ GitHub</button></div>'
      + '</div>'
      + '<div class="admin-card"><h2>Liên kết nhanh</h2>'
      + '<p>Mở trang người dùng để kiểm tra kết quả sau khi đăng.</p>'
      + '<div class="btn-row">'
      + '<a class="btn small ghost" href="anh.html" target="_blank" rel="noopener">Tiếng Anh</a>'
      + '<a class="btn small ghost" href="hoa-de-thi.html" target="_blank" rel="noopener">Đề Hóa</a>'
      + '<a class="btn small ghost" href="tu-vung.html" target="_blank" rel="noopener">Từ vựng</a>'
      + '<a class="btn small ghost" href="index.html" target="_blank" rel="noopener">Trang chủ</a>'
      + '</div>'
      + '</div>'
      + '</div>';
  }

  function settingsTabHTML() {
    var tokenState = state.token
      ? (state.tokenValid ? 'Đang dùng token hợp lệ.' : 'Đã lưu token trên trình duyệt này.')
      : 'Chưa có token. Bạn vẫn có thể soạn nội dung, nhưng cần token để đăng.';
    return '<div class="admin-grid two">'
      + '<div class="admin-card"><h2>Token GitHub</h2>'
      + '<p>Token chỉ dùng để ghi file <code>content/*.json</code>. Hãy tạo <b>fine-grained personal access token</b> cho repo <code>' + esc(REPO) + '</code> với quyền <b>Contents: Read and write</b>.</p>'
      + '<div class="admin-form-grid compact">'
      + '<label class="admin-field wide"><span>Dán token mới (để trống nếu giữ token hiện tại)</span>'
      + '<input type="password" id="gh-token" autocomplete="off" spellcheck="false" placeholder="github_pat_…"></label>'
      + '</div>'
      + '<label class="admin-check"><input type="checkbox" id="gh-remember"' + (state.tokenRemember ? ' checked' : '') + '> Ghi nhớ token trên trình duyệt này</label>'
      + '<p class="admin-msg ' + (state.tokenValid ? 'ok' : '') + '">' + esc(tokenState) + (state.tokenMessage ? '<br>' + esc(state.tokenMessage) : '') + '</p>'
      + '<div class="btn-row">'
      + '<button type="button" class="btn small" data-act="save-token">Lưu token</button>'
      + '<button type="button" class="btn ghost small" data-act="test-token">Kiểm tra token</button>'
      + '<button type="button" class="btn ghost small" data-act="clear-token">Xóa token khỏi máy</button>'
      + '</div>'
      + '<div class="admin-note" style="margin-top:1rem">Token được lưu cục bộ trong trình duyệt của bạn (localStorage/sessionStorage). Không chia sẻ token và không đưa token vào mã nguồn.</div>'
      + '</div>'
      + '<div class="admin-card"><h2>Đồng bộ nội dung</h2>'
      + '<div class="admin-details-list">'
      + '<div><b>Repo:</b> <code>' + esc(REPO) + '</code></div>'
      + '<div><b>Nhánh:</b> <code>' + esc(BRANCH) + '</code></div>'
      + '<div><b>Nguồn đang mở:</b> ' + esc(state.contentSource || '—') + '</div>'
      + '<div><b>Commit gần nhất:</b> ' + (state.headSha ? '<a href="' + commitUrl(state.headSha) + '" target="_blank" rel="noopener"><code>' + esc(state.headSha.slice(0, 7)) + '</code></a>' : '—') + '</div>'
      + '<div><b>Bản nháp trên máy:</b> ' + (state.draftRestored ? 'Có' : 'Không') + '</div>'
      + '</div>'
      + '<div class="btn-row">'
      + '<button type="button" class="btn small ghost" data-act="reload-content">Tải lại từ GitHub</button>'
      + (state.draftRestored ? '<button type="button" class="btn small ghost" data-act="discard-draft">Bỏ bản nháp trên máy</button>' : '')
      + '</div>'
      + '<div class="admin-note" style="margin-top:1rem">Sau khi đăng, GitHub Pages có thể cần 1–2 phút để phục vụ bản mới. Trang người dùng đọc file JSON trực tiếp và có bộ nhớ đệm dự phòng khi mất mạng.</div>'
      + '</div>'
      + '<div class="admin-card"><h2>Tài khoản</h2>'
      + '<p>Chỉ tài khoản Google <b>' + esc(ADMIN_EMAIL) + '</b> mới mở được trang này.</p>'
      + '<div class="btn-row"><button type="button" class="btn small ghost" data-act="admin-signout">Đăng xuất quản trị</button></div>'
      + '</div>'
      + '<div class="admin-card"><h2>Bảo mật</h2>'
      + '<ul style="margin:.3rem 0 0;padding-left:1.2rem;font-size:.92rem">'
      + '<li>Trang quản trị không được lập chỉ mục bởi công cụ tìm kiếm.</li>'
      + '<li>Người dùng thường không thấy link quản trị và không ghi được nội dung.</li>'
      + '<li>Token GitHub chỉ cần quyền <b>Contents: Read and write</b> trên đúng repo này; không cấp quyền admin.</li>'
      + '<li>Nếu nghi ngờ token bị lộ, hãy thu hồi trên GitHub rồi tạo token mới.</li>'
      + '</ul>'
      + '</div>'
      + '</div>';
  }

  function jsonBoxHTML(kind, value, label) {
    var json = JSON.stringify(value, null, 2);
    return '<details class="admin-json">'
      + '<summary>' + esc(label || 'Nhập / xuất JSON') + '</summary>'
      + '<textarea id="json-' + kind + '" spellcheck="false" aria-label="Nội dung JSON">' + esc(json) + '</textarea>'
      + '<div class="btn-row">'
      + '<button type="button" class="btn small" data-act="import-json" data-kind="' + kind + '">Nhập JSON</button>'
      + '<button type="button" class="btn ghost small" data-act="export-json" data-kind="' + kind + '">Làm mới ô JSON</button>'
      + '<button type="button" class="btn ghost small" data-act="download-json" data-kind="' + kind + '">Tải file .json</button>'
      + '<button type="button" class="btn ghost small" data-act="copy-json" data-kind="' + kind + '">Sao chép</button>'
      + '<label class="btn ghost small">Tải tệp lên<input type="file" accept=".json,application/json" data-file-kind="' + kind + '" hidden></label>'
      + '</div>'
      + '<div class="admin-note" style="margin-top:.6rem">Dán JSON đúng cấu trúc rồi bấm <b>Nhập JSON</b>. Nội dung nhập vào chỉ thay đổi bản đang soạn, chưa đăng cho đến khi bấm <b>Đăng lên website</b>.</div>'
      + '</details>';
  }

  /* ------------------------------------------------------------------ */
  /* Đề Tiếng Anh                                                        */
  /* ------------------------------------------------------------------ */
  function optionHTML(value, current, label) {
    return '<option value="' + esc(value) + '"' + (String(value) === String(current) ? ' selected' : '') + '>'
      + esc(label === undefined ? value : label) + '</option>';
  }

  function englishTabHTML() {
    var list = state.content.english;
    var items = list.map(function (test, index) {
      var questions = arr(test.blocks).reduce(function (n, block) {
        return n + arr(block.questions).length;
      }, 0);
      return '<div class="admin-item">'
        + '<div class="admin-item-main"><span class="admin-badge">Động</span>'
        + '<h3>' + esc(test.title || test.id) + '</h3>'
        + '<p><code>' + esc(test.id) + '</code> · ' + arr(test.blocks).length + ' phần · ' + questions + ' câu</p></div>'
        + '<div class="admin-item-actions">'
        + '<button type="button" class="btn small" data-act="edit-english" data-i="' + index + '">Sửa</button>'
        + '<button type="button" class="btn ghost small" data-act="dup-english" data-i="' + index + '">Nhân bản</button>'
        + '<button type="button" class="btn ghost small" data-act="del-english" data-i="' + index + '">Xóa</button>'
        + '</div></div>';
    }).join('');

    return '<div class="admin-toolbar"><h2>Đề Tiếng Anh</h2>'
      + '<div class="admin-actions"><button type="button" class="btn small" data-act="new-english">+ Tạo đề Anh</button>'
      + '<button type="button" class="btn ghost small" data-act="reload-content">Tải lại từ GitHub</button></div></div>'
      + '<div class="admin-note" style="margin-bottom:1rem">Đề tĩnh trong <code>js/data-anh.js</code> (' + staticEnglishCount() + ' đề) được giữ nguyên và chỉ để tham khảo. Đề tạo ở đây sẽ xuất hiện thêm trong tab chọn đề của trang Tiếng Anh.</div>'
      + (list.length ? '<div class="admin-list">' + items + '</div>'
        : '<div class="admin-empty">Chưa có đề Tiếng Anh động. Bấm <b>+ Tạo đề Anh</b> hoặc nhập JSON bên dưới.</div>')
      + jsonBoxHTML('english', list, 'Nhập / xuất JSON đề Tiếng Anh');
  }

  function newEnglishEditor() {
    var id = 'anh-' + slug('de-moi') + '-' + uid();
    return {
      kind: 'english',
      mode: 'new',
      index: null,
      draft: {
        id: id,
        subject: 'anh',
        title: 'Đề Tiếng Anh mới',
        blocks: [englishBlockNew(1)]
      }
    };
  }

  function editEnglishEditor(index) {
    var test = state.content.english[index];
    if (!test) return;
    var draft = clone(test);
    draft.blocks = arr(draft.blocks);
    return { kind: 'english', mode: 'edit', index: index, draft: draft };
  }

  function englishBlockNew(firstNumber) {
    return {
      id: 'block-' + uid(),
      short: 'Phần mới',
      part: 'Part mới',
      title: 'Phần mới',
      instruction: '',
      passageTitle: '',
      paras: [],
      numbered: false,
      source: '',
      questions: [{
        n: firstNumber || 1,
        stem: '',
        opts: ['', '', '', ''],
        ans: 'A',
        exp: ''
      }]
    };
  }

  function englishEditorHTML() {
    var d = state.editor.draft;
    var total = arr(d.blocks).reduce(function (n, b) { return n + arr(b.questions).length; }, 0);
    return '<div class="admin-editor-head"><div><span class="admin-badge">Đề Tiếng Anh</span>'
      + '<h2>' + (state.editor.mode === 'new' ? 'Tạo đề Tiếng Anh mới' : 'Sửa đề Tiếng Anh') + '</h2>'
      + '<p>' + esc(d.id || '') + ' · ' + arr(d.blocks).length + ' phần · ' + total + ' câu</p></div>'
      + '<div class="admin-editor-actions">'
      + '<button type="button" class="btn ghost small" data-act="editor-back">← Quay lại</button>'
      + '<button type="button" class="btn small" data-act="save-english">Lưu đề</button>'
      + '</div></div>'
      + '<div id="editor-alert"></div>'
      + '<div class="admin-card"><div class="admin-form-grid">'
      + '<label class="admin-field wide"><span>Mã đề (id, không dấu, duy nhất)</span>'
      + '<input type="text" data-path="id" value="' + esc(d.id) + '" spellcheck="false" placeholder="anh-de-moi-2026"></label>'
      + '<label class="admin-field wide"><span>Tên đề hiển thị</span>'
      + '<input type="text" data-path="title" value="' + esc(d.title) + '" placeholder="Đề GK1 Lê Quý Đôn 26-27"></label>'
      + '</div>'
      + '<div class="admin-note" style="margin-top:.9rem">Mã đề chỉ dùng chữ thường, số và dấu gạch ngang để tránh lỗi liên kết. Mỗi câu cần 2–4 lựa chọn và đáp án đúng.</div>'
      + '</div>'
      + arr(d.blocks).map(englishBlockHTML).join('')
      + '<div class="btn-row" style="margin:1rem 0 2rem"><button type="button" class="btn small" data-act="en-add-block">+ Thêm phần</button>'
      + '<button type="button" class="btn ghost small" data-act="en-renumber">Đánh số lại toàn bộ câu</button></div>';
  }

  function englishBlockHTML(block, bi) {
    var qs = arr(block.questions);
    return '<section class="admin-block">'
      + '<div class="admin-block-head"><h3>Phần ' + (bi + 1) + ' · ' + esc(block.short || 'Chưa đặt tên') + '</h3>'
      + '<div class="admin-block-tools">'
      + '<button type="button" class="btn ghost" data-act="en-move-block" data-i="' + bi + '" data-dir="-1">↑</button>'
      + '<button type="button" class="btn ghost" data-act="en-move-block" data-i="' + bi + '" data-dir="1">↓</button>'
      + '<button type="button" class="btn ghost" data-act="en-del-block" data-i="' + bi + '">Xóa phần</button>'
      + '</div></div>'
      + '<div class="admin-form-grid">'
      + '<label class="admin-field"><span>Mã phần</span><input type="text" data-path="blocks.' + bi + '.id" value="' + esc(block.id) + '" spellcheck="false"></label>'
      + '<label class="admin-field"><span>Tên ngắn (tab/lọc)</span><input type="text" data-path="blocks.' + bi + '.short" value="' + esc(block.short) + '"></label>'
      + '<label class="admin-field"><span>Part / dạng bài</span><input type="text" data-path="blocks.' + bi + '.part" value="' + esc(block.part) + '"></label>'
      + '<label class="admin-field"><span>Tiêu đề phần</span><input type="text" data-path="blocks.' + bi + '.title" value="' + esc(block.title) + '"></label>'
      + '<label class="admin-field wide"><span>Hướng dẫn</span><textarea data-path="blocks.' + bi + '.instruction" rows="2">' + esc(block.instruction) + '</textarea></label>'
      + '<label class="admin-field"><span>Tiêu đề đoạn văn</span><input type="text" data-path="blocks.' + bi + '.passageTitle" value="' + esc(block.passageTitle) + '"></label>'
      + '<label class="admin-field"><span>Nguồn</span><input type="text" data-path="blocks.' + bi + '.source" value="' + esc(block.source) + '"></label>'
      + '<label class="admin-field wide"><span>Đoạn văn (mỗi đoạn một dòng)</span><textarea data-paras="' + bi + '" rows="5">' + esc(arr(block.paras).join('\n')) + '</textarea></label>'
      + '<label class="admin-check"><input type="checkbox" data-path="blocks.' + bi + '.numbered"' + (block.numbered ? ' checked' : '') + '> Phần có đánh số chỗ trống (numbered)</label>'
      + '</div>'
      + '<div class="admin-questions-head"><h4>' + qs.length + ' câu hỏi</h4>'
      + '<button type="button" class="btn small" data-act="en-add-q" data-bi="' + bi + '">+ Thêm câu</button></div>'
      + qs.map(function (q, qi) { return englishQuestionHTML(q, bi, qi); }).join('')
      + '</section>';
  }

  function englishQuestionHTML(q, bi, qi) {
    var opts = arr(q.opts).slice(0, 4);
    while (opts.length < 4) opts.push('');
    var letters = ['A', 'B', 'C', 'D'];
    return '<div class="admin-question">'
      + '<div class="admin-q-head"><h4>Câu ' + (qi + 1) + '</h4>'
      + '<div class="admin-q-tools">'
      + '<button type="button" class="btn ghost" data-act="en-move-q" data-bi="' + bi + '" data-qi="' + qi + '" data-dir="-1">↑</button>'
      + '<button type="button" class="btn ghost" data-act="en-move-q" data-bi="' + bi + '" data-qi="' + qi + '" data-dir="1">↓</button>'
      + '<button type="button" class="btn ghost" data-act="en-del-q" data-bi="' + bi + '" data-qi="' + qi + '">Xóa</button>'
      + '</div></div>'
      + '<div class="admin-form-grid compact">'
      + '<label class="admin-field"><span>Số câu</span><input type="number" min="1" data-path="blocks.' + bi + '.questions.' + qi + '.n" value="' + esc(q.n) + '"></label>'
      + '<label class="admin-field"><span>Đáp án</span><select data-path="blocks.' + bi + '.questions.' + qi + '.ans">'
      + letters.map(function (l) { return optionHTML(l, q.ans, l); }).join('')
      + '</select></label>'
      + '</div>'
      + '<label class="admin-field wide" style="margin-top:.6rem"><span>Đề bài / câu hỏi</span><textarea data-path="blocks.' + bi + '.questions.' + qi + '.stem" rows="2">' + esc(q.stem) + '</textarea></label>'
      + '<div class="admin-opts">'
      + opts.map(function (opt, oi) {
        return '<label class="admin-field"><span>' + letters[oi] + '.</span>'
          + '<input type="text" data-path="blocks.' + bi + '.questions.' + qi + '.opts.' + oi + '" value="' + esc(opt) + '"></label>';
      }).join('')
      + '</div>'
      + '<label class="admin-field wide" style="margin-top:.6rem"><span>Giải thích</span><textarea data-path="blocks.' + bi + '.questions.' + qi + '.exp" rows="2">' + esc(q.exp) + '</textarea></label>'
      + '</div>';
  }

  function openEnglishEditor(index) {
    state.editor = index === null || index === undefined ? newEnglishEditor() : editEnglishEditor(index);
    state.editorDirty = false;
    renderView();
    renderSavebar();
    scrollTop();
  }

  function scrollTop() {
    var host = $('#admin-view');
    if (host) host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ------------------------------------------------------------------ */
  /* Đề Hóa                                                              */
  /* ------------------------------------------------------------------ */
  function hoaStaticSections() {
    var h = g.HoaExams;
    var dynamicIds = {};
    arr(state.content.hoa.sections).forEach(function (s) { dynamicIds[s.id] = true; });
    return arr(h && h.sections).filter(function (s) {
      return s && !s.__dynamic && !dynamicIds[s.id];
    }).map(function (s) {
      return { id: s.id, title: s.title, desc: s.desc || '', dynamic: false };
    });
  }

  function hoaAllSections() {
    var list = hoaStaticSections();
    var seen = {};
    list.forEach(function (s) { seen[s.id] = true; });
    arr(state.content.hoa.sections).forEach(function (s) {
      if (!s || !s.id || seen[s.id]) return;
      seen[s.id] = true;
      list.push({ id: s.id, title: s.title, desc: s.desc || '', dynamic: true });
    });
    return list;
  }

  function hoaSectionTitle(id) {
    var found = hoaAllSections().filter(function (s) { return s.id === id; })[0];
    return found ? found.title : id;
  }

  function hoaTabHTML() {
    var c = state.content.hoa;
    var sections = hoaAllSections();
    var staticSections = hoaStaticSections();
    var items = c.exams.map(function (exam, index) {
      var meta = exam.meta || {};
      var parts = exam.parts || {};
      var count = arr(parts.mcq).length + arr(parts.tf).length + arr(parts.short).length;
      return '<div class="admin-item">'
        + '<div class="admin-item-main"><span class="admin-badge' + (meta.bonus ? '' : ' static') + '">' + (meta.bonus ? 'Đề chuyên' : 'Động') + '</span>'
        + '<h3>' + esc((meta.code ? meta.code + ' · ' : '') + (meta.title || meta.id)) + '</h3>'
        + '<p><code>' + esc(meta.id) + '</code> · ' + esc(hoaSectionTitle(meta.section)) + ' · ' + count + ' câu · ' + (meta.duration || 50) + ' phút</p></div>'
        + '<div class="admin-item-actions">'
        + '<button type="button" class="btn small" data-act="edit-hoa" data-i="' + index + '">Sửa</button>'
        + '<button type="button" class="btn ghost small" data-act="dup-hoa" data-i="' + index + '">Nhân bản</button>'
        + '<button type="button" class="btn ghost small" data-act="del-hoa" data-i="' + index + '">Xóa</button>'
        + '</div></div>';
    }).join('');

    var sectionItems = sections.map(function (section) {
      return '<div class="admin-item"><div class="admin-item-main">'
        + '<span class="admin-badge' + (section.dynamic ? '' : ' static') + '">' + (section.dynamic ? 'Động' : 'Tĩnh') + '</span>'
        + '<h3>' + esc(section.title) + '</h3><p><code>' + esc(section.id) + '</code>' + (section.desc ? ' · ' + esc(section.desc) : '') + '</p></div>'
        + (section.dynamic ? '<div class="admin-item-actions">'
          + '<button type="button" class="btn small" data-act="edit-hoa-section" data-id="' + esc(section.id) + '">Sửa</button>'
          + '<button type="button" class="btn ghost small" data-act="del-hoa-section" data-id="' + esc(section.id) + '">Xóa</button>'
          + '</div>' : '')
        + '</div>';
    }).join('');

    return '<div class="admin-toolbar"><h2>Đề Hóa</h2>'
      + '<div class="admin-actions"><button type="button" class="btn small" data-act="new-hoa">+ Tạo đề Hóa</button>'
      + '<button type="button" class="btn ghost small" data-act="reload-content">Tải lại từ GitHub</button></div></div>'
      + '<div class="admin-note" style="margin-bottom:1rem">Đề tĩnh trong <code>js/exams-hoa/</code> (' + staticHoaCount() + ' đề) được giữ nguyên. Đề tạo ở đây xuất hiện thêm trong trang Đề thi Hóa.</div>'
      + '<div class="admin-card" style="margin-bottom:1.25rem"><div class="admin-toolbar" style="margin-bottom:.75rem"><h2 style="font-size:1.1rem">Chuyên mục đề Hóa</h2>'
      + '<button type="button" class="btn ghost small" data-act="new-hoa-section">+ Thêm chuyên mục</button></div>'
      + '<div class="admin-list">' + sectionItems + '</div>'
      + '<div class="admin-note" style="margin-top:.8rem">' + staticSections.length + ' chuyên mục tĩnh không sửa được. Chuyên mục động có thể thêm, sửa hoặc xóa nếu không còn đề nào dùng.</div></div>'
      + (c.exams.length ? '<div class="admin-list">' + items + '</div>'
        : '<div class="admin-empty">Chưa có đề Hóa động. Bấm <b>+ Tạo đề Hóa</b> hoặc nhập JSON bên dưới.</div>')
      + jsonBoxHTML('hoa', c, 'Nhập / xuất JSON đề Hóa');
  }

  function newHoaEditor() {
    var sections = hoaAllSections();
    var section = sections.length ? sections[0].id : 'bonus';
    var id = 'hoa-' + slug('de-moi') + '-' + uid();
    return {
      kind: 'hoa',
      mode: 'new',
      index: null,
      draft: {
        meta: {
          id: id,
          code: 'Đề mới',
          section: section,
          tag: 'BỔ SUNG',
          title: 'Đề Hóa mới',
          desc: '',
          duration: 50,
          source: '',
          bonus: false
        },
        parts: {
          mcq: [hoaMcqNew()],
          tf: [],
          short: []
        }
      }
    };
  }

  function editHoaEditor(index) {
    var exam = state.content.hoa.exams[index];
    if (!exam) return;
    return {
      kind: 'hoa',
      mode: 'edit',
      index: index,
      draft: {
        meta: clone(exam.meta || {}),
        parts: {
          mcq: clone(arr(exam.parts && exam.parts.mcq)),
          tf: clone(arr(exam.parts && exam.parts.tf)),
          short: clone(arr(exam.parts && exam.parts.short))
        }
      }
    };
  }

  function hoaMcqNew() {
    return { text: '', options: ['', '', '', ''], answer: 0, explain: '' };
  }

  function hoaTfNew() {
    return {
      text: '',
      items: [
        { t: '', a: true, explain: '' },
        { t: '', a: true, explain: '' },
        { t: '', a: true, explain: '' },
        { t: '', a: true, explain: '' }
      ]
    };
  }

  function hoaShortNew() {
    return { text: '', answer: 0, explain: '', tol: 0.01, unit: '' };
  }

  function hoaEditorHTML() {
    var d = state.editor.draft;
    var meta = d.meta || {};
    var parts = d.parts || {};
    var mcq = arr(parts.mcq);
    var tf = arr(parts.tf);
    var short = arr(parts.short);
    var total = mcq.length + tf.length + short.length;
    var sections = hoaAllSections();

    return '<div class="admin-editor-head"><div><span class="admin-badge">Đề Hóa</span>'
      + '<h2>' + (state.editor.mode === 'new' ? 'Tạo đề Hóa mới' : 'Sửa đề Hóa') + '</h2>'
      + '<p>' + esc(meta.id || '') + ' · ' + total + ' câu · ' + (meta.duration || 50) + ' phút</p></div>'
      + '<div class="admin-editor-actions">'
      + '<button type="button" class="btn ghost small" data-act="editor-back">← Quay lại</button>'
      + '<button type="button" class="btn small" data-act="save-hoa">Lưu đề</button>'
      + '</div></div>'
      + '<div id="editor-alert"></div>'
      + '<div class="admin-card"><div class="admin-form-grid">'
      + '<label class="admin-field"><span>Mã đề (id, duy nhất)</span><input type="text" data-path="meta.id" value="' + esc(meta.id) + '" spellcheck="false"></label>'
      + '<label class="admin-field"><span>Mã hiển thị</span><input type="text" data-path="meta.code" value="' + esc(meta.code) + '" placeholder="Đề 12"></label>'
      + '<label class="admin-field"><span>Chuyên mục</span><select data-path="meta.section">'
      + sections.map(function (s) { return optionHTML(s.id, meta.section, s.title); }).join('')
      + '</select></label>'
      + '<label class="admin-field"><span>Tag</span><input type="text" data-path="meta.tag" value="' + esc(meta.tag) + '" placeholder="BỔ SUNG"></label>'
      + '<label class="admin-field wide"><span>Tên đề</span><input type="text" data-path="meta.title" value="' + esc(meta.title) + '"></label>'
      + '<label class="admin-field wide"><span>Mô tả</span><textarea data-path="meta.desc" rows="2">' + esc(meta.desc) + '</textarea></label>'
      + '<label class="admin-field"><span>Thời gian (phút)</span><input type="number" min="1" data-path="meta.duration" value="' + esc(meta.duration) + '"></label>'
      + '<label class="admin-field"><span>Nguồn</span><input type="text" data-path="meta.source" value="' + esc(meta.source) + '"></label>'
      + '<label class="admin-check wide"><input type="checkbox" data-path="meta.bonus"' + (meta.bonus ? ' checked' : '') + '> Đây là đề chuyên/bổ sung (không tính vào 10 đề chính)</label>'
      + '</div></div>'
      + '<div class="admin-block"><div class="admin-questions-head" style="margin-top:0;border-top:0;padding-top:0"><h4>Trắc nghiệm · ' + mcq.length + ' câu</h4>'
      + '<button type="button" class="btn small" data-act="hoa-add-mcq">+ Thêm câu</button></div>'
      + mcq.map(hoaMcqHTML).join('') + '</div>'
      + '<div class="admin-block"><div class="admin-questions-head" style="margin-top:0;border-top:0;padding-top:0"><h4>Đúng / Sai · ' + tf.length + ' câu</h4>'
      + '<button type="button" class="btn small" data-act="hoa-add-tf">+ Thêm câu</button></div>'
      + tf.map(hoaTfHTML).join('') + '</div>'
      + '<div class="admin-block"><div class="admin-questions-head" style="margin-top:0;border-top:0;padding-top:0"><h4>Trả lời ngắn · ' + short.length + ' câu</h4>'
      + '<button type="button" class="btn small" data-act="hoa-add-short">+ Thêm câu</button></div>'
      + short.map(hoaShortHTML).join('') + '</div>'
      + '<div class="btn-row" style="margin:1rem 0 2rem"><button type="button" class="btn small" data-act="save-hoa">Lưu đề</button>'
      + '<button type="button" class="btn ghost small" data-act="editor-back">Quay lại</button></div>';
  }

  function hoaMcqHTML(q, qi) {
    var opts = arr(q.options).slice(0, 4);
    while (opts.length < 4) opts.push('');
    var letters = ['A', 'B', 'C', 'D'];
    return '<div class="admin-question">'
      + '<div class="admin-q-head"><h4>Câu ' + (qi + 1) + '</h4>'
      + '<div class="admin-q-tools">'
      + '<button type="button" class="btn ghost" data-act="hoa-move-mcq" data-qi="' + qi + '" data-dir="-1">↑</button>'
      + '<button type="button" class="btn ghost" data-act="hoa-move-mcq" data-qi="' + qi + '" data-dir="1">↓</button>'
      + '<button type="button" class="btn ghost" data-act="hoa-del-mcq" data-qi="' + qi + '">Xóa</button>'
      + '</div></div>'
      + '<label class="admin-field wide"><span>Nội dung câu hỏi</span><textarea data-path="parts.mcq.' + qi + '.text" rows="2">' + esc(q.text) + '</textarea></label>'
      + '<div class="admin-opts">'
      + opts.map(function (opt, oi) {
        return '<label class="admin-field"><span>' + letters[oi] + '.</span>'
          + '<input type="text" data-path="parts.mcq.' + qi + '.options.' + oi + '" value="' + esc(opt) + '"></label>';
      }).join('')
      + '</div>'
      + '<div class="admin-form-grid compact" style="margin-top:.6rem">'
      + '<label class="admin-field"><span>Đáp án đúng</span><select data-path="parts.mcq.' + qi + '.answer">'
      + letters.map(function (l, li) { return optionHTML(li, q.answer, l); }).join('')
      + '</select></label>'
      + '<label class="admin-field"><span>Ảnh (URL, không bắt buộc)</span><input type="text" data-path="parts.mcq.' + qi + '.img" value="' + esc(q.img) + '"></label>'
      + '</div>'
      + '<label class="admin-field wide" style="margin-top:.6rem"><span>Lời giải</span><textarea data-path="parts.mcq.' + qi + '.explain" rows="2">' + esc(q.explain) + '</textarea></label>'
      + '</div>';
  }

  function hoaTfHTML(q, qi) {
    var items = arr(q.items);
    return '<div class="admin-question">'
      + '<div class="admin-q-head"><h4>Câu ' + (qi + 1) + '</h4>'
      + '<div class="admin-q-tools">'
      + '<button type="button" class="btn ghost" data-act="hoa-move-tf" data-qi="' + qi + '" data-dir="-1">↑</button>'
      + '<button type="button" class="btn ghost" data-act="hoa-move-tf" data-qi="' + qi + '" data-dir="1">↓</button>'
      + '<button type="button" class="btn ghost" data-act="hoa-del-tf" data-qi="' + qi + '">Xóa</button>'
      + '</div></div>'
      + '<label class="admin-field wide"><span>Nội dung / dẫn dắt</span><textarea data-path="parts.tf.' + qi + '.text" rows="2">' + esc(q.text) + '</textarea></label>'
      + '<label class="admin-field wide" style="margin-top:.5rem"><span>Ảnh (URL, không bắt buộc)</span><input type="text" data-path="parts.tf.' + qi + '.img" value="' + esc(q.img) + '"></label>'
      + '<div class="admin-subq-head" style="margin-top:.7rem"><h5>' + items.length + ' ý đúng/sai</h5>'
      + '<button type="button" class="btn ghost" data-act="hoa-add-tf-item" data-qi="' + qi + '">+ Thêm ý</button></div>'
      + items.map(function (item, ii) {
        return '<div class="admin-subq"><div class="admin-subq-head"><h5>Ý ' + (ii + 1) + '</h5>'
          + '<div class="admin-subq-tools"><button type="button" class="btn ghost" data-act="hoa-del-tf-item" data-qi="' + qi + '" data-ii="' + ii + '">Xóa ý</button></div></div>'
          + '<label class="admin-field wide"><span>Phát biểu</span><input type="text" data-path="parts.tf.' + qi + '.items.' + ii + '.t" value="' + esc(item.t) + '"></label>'
          + '<div class="admin-form-grid compact" style="margin-top:.5rem">'
          + '<label class="admin-field"><span>Đáp án</span><select data-path="parts.tf.' + qi + '.items.' + ii + '.a">'
          + optionHTML('true', item.a ? 'true' : 'false', 'Đúng')
          + optionHTML('false', item.a ? 'true' : 'false', 'Sai')
          + '</select></label>'
          + '</div>'
          + '<label class="admin-field wide" style="margin-top:.5rem"><span>Giải thích</span><textarea data-path="parts.tf.' + qi + '.items.' + ii + '.explain" rows="2">' + esc(item.explain) + '</textarea></label>'
          + '</div>';
      }).join('')
      + '</div>';
  }

  function hoaShortHTML(q, qi) {
    return '<div class="admin-question">'
      + '<div class="admin-q-head"><h4>Câu ' + (qi + 1) + '</h4>'
      + '<div class="admin-q-tools">'
      + '<button type="button" class="btn ghost" data-act="hoa-move-short" data-qi="' + qi + '" data-dir="-1">↑</button>'
      + '<button type="button" class="btn ghost" data-act="hoa-move-short" data-qi="' + qi + '" data-dir="1">↓</button>'
      + '<button type="button" class="btn ghost" data-act="hoa-del-short" data-qi="' + qi + '">Xóa</button>'
      + '</div></div>'
      + '<label class="admin-field wide"><span>Nội dung câu hỏi</span><textarea data-path="parts.short.' + qi + '.text" rows="2">' + esc(q.text) + '</textarea></label>'
      + '<div class="admin-form-grid compact" style="margin-top:.6rem">'
      + '<label class="admin-field"><span>Đáp án (số)</span><input type="number" step="any" data-path="parts.short.' + qi + '.answer" value="' + esc(q.answer) + '"></label>'
      + '<label class="admin-field"><span>Sai số cho phép</span><input type="number" step="any" min="0" data-path="parts.short.' + qi + '.tol" value="' + esc(q.tol) + '"></label>'
      + '<label class="admin-field"><span>Đơn vị</span><input type="text" data-path="parts.short.' + qi + '.unit" value="' + esc(q.unit) + '"></label>'
      + '</div>'
      + '<label class="admin-field wide" style="margin-top:.6rem"><span>Lời giải</span><textarea data-path="parts.short.' + qi + '.explain" rows="2">' + esc(q.explain) + '</textarea></label>'
      + '</div>';
  }

  function openHoaEditor(index) {
    state.editor = index === null || index === undefined ? newHoaEditor() : editHoaEditor(index);
    state.editorDirty = false;
    renderView();
    renderSavebar();
    scrollTop();
  }

  function hoaSectionEditorHTML() {
    var d = state.editor.draft;
    return '<div class="admin-editor-head"><div><span class="admin-badge">Chuyên mục Hóa</span>'
      + '<h2>' + (state.editor.mode === 'new' ? 'Thêm chuyên mục' : 'Sửa chuyên mục') + '</h2>'
      + '<p>Chuyên mục giúp nhóm các đề Hóa động trên trang người dùng.</p></div>'
      + '<div class="admin-editor-actions"><button type="button" class="btn ghost small" data-act="editor-back">← Quay lại</button>'
      + '<button type="button" class="btn small" data-act="save-hoa-section">Lưu chuyên mục</button></div></div>'
      + '<div id="editor-alert"></div>'
      + '<div class="admin-card"><div class="admin-form-grid">'
      + '<label class="admin-field"><span>Mã chuyên mục</span><input type="text" data-path="id" value="' + esc(d.id) + '" spellcheck="false" placeholder="on-tap-moi"></label>'
      + '<label class="admin-field"><span>Tên chuyên mục</span><input type="text" data-path="title" value="' + esc(d.title) + '" placeholder="Đề ôn tập mới"></label>'
      + '<label class="admin-field wide"><span>Mô tả</span><textarea data-path="desc" rows="2">' + esc(d.desc) + '</textarea></label>'
      + '</div></div>';
  }

  function openHoaSectionEditor(id) {
    var draft = { id: '', title: '', desc: '' };
    var mode = 'new';
    var index = null;
    if (id) {
      index = state.content.hoa.sections.map(function (s) { return s.id; }).indexOf(id);
      if (index < 0) return;
      draft = clone(state.content.hoa.sections[index]);
      mode = 'edit';
    }
    state.editor = { kind: 'hoa-section', mode: mode, index: index, draft: draft };
    state.editorDirty = false;
    renderView();
    renderSavebar();
    scrollTop();
  }

  /* ------------------------------------------------------------------ */
  /* Từ vựng & Idiom                                                     */
  /* ------------------------------------------------------------------ */
  function vocabTopicLabel(item) {
    if (item && item.topicLabel) return item.topicLabel;
    var map = { admin: 'Từ vựng/Idiom mới', test: 'Từ vựng Đề thi', p1: 'Idioms 1–54', p2: 'Idioms 55–109', p3: 'Idioms 110–165', p4: 'Idioms 166–216', p5: 'Idioms 217–259', p6: 'Idioms 260–302' };
    return map[item && item.topic] || 'Từ vựng/Idiom mới';
  }

  function nextVocabId() {
    var max = 999;
    state.content.vocab.forEach(function (item) {
      var n = parseInt(item.id, 10);
      if (isFinite(n) && n > max) max = n;
    });
    return Math.max(1000, max + 1);
  }

  function vocabTabHTML() {
    var q = text(state.vocabSearch).toLowerCase().trim();
    var list = state.content.vocab.filter(function (item) {
      if (!q) return true;
      return (text(item.word) + ' ' + text(item.meaning) + ' ' + text(item.topic) + ' ' + text(item.topicLabel)).toLowerCase().indexOf(q) !== -1;
    });

    var items = list.map(function (item) {
      var index = state.content.vocab.indexOf(item);
      return '<div class="admin-item"><div class="admin-item-main">'
        + '<span class="admin-badge">#' + esc(item.id) + '</span>'
        + '<h3>' + esc(item.word) + (item.ipa ? ' <small style="font-weight:500;color:var(--muted)">' + esc(item.ipa) + '</small>' : '') + '</h3>'
        + '<p>' + esc(item.pos || 'Từ vựng') + ' · ' + esc(vocabTopicLabel(item)) + '</p>'
        + '<p>' + esc(item.meaning) + '</p></div>'
        + '<div class="admin-item-actions">'
        + '<button type="button" class="btn small" data-act="edit-vocab" data-i="' + index + '">Sửa</button>'
        + '<button type="button" class="btn ghost small" data-act="dup-vocab" data-i="' + index + '">Nhân bản</button>'
        + '<button type="button" class="btn ghost small" data-act="del-vocab" data-i="' + index + '">Xóa</button>'
        + '</div></div>';
    }).join('');

    return '<div class="admin-toolbar"><h2>Từ vựng &amp; Idiom</h2>'
      + '<div class="admin-actions"><button type="button" class="btn small" data-act="new-vocab">+ Thêm từ mới</button>'
      + '<button type="button" class="btn ghost small" data-act="reload-content">Tải lại từ GitHub</button></div></div>'
      + '<div class="admin-note" style="margin-bottom:1rem">Từ vựng động dùng mã từ <b>1000</b> trở lên để không trùng 322 mục có sẵn. Người dùng sẽ thấy các mục mới trong trang Từ vựng.</div>'
      + '<div class="admin-toolbar"><label class="admin-field" style="width:min(420px,100%)"><span>Tìm từ vựng</span>'
      + '<input type="search" id="vocab-search" value="' + esc(state.vocabSearch) + '" placeholder="Nhập từ, nghĩa hoặc chủ đề…"></label>'
      + '<span class="admin-note">' + list.length + ' / ' + state.content.vocab.length + ' mục</span></div>'
      + (list.length ? '<div class="admin-list">' + items + '</div>'
        : '<div class="admin-empty">' + (state.content.vocab.length ? 'Không tìm thấy mục phù hợp.' : 'Chưa có từ vựng động. Bấm <b>+ Thêm từ mới</b> hoặc nhập JSON bên dưới.') + '</div>')
      + jsonBoxHTML('vocab', state.content.vocab, 'Nhập / xuất JSON từ vựng');
  }

  function newVocabEditor(index) {
    var draft;
    if (index === null || index === undefined) {
      draft = {
        id: nextVocabId(),
        word: '',
        ipa: '',
        pos: 'Từ vựng',
        topic: 'admin',
        topicLabel: 'Từ vựng/Idiom mới',
        meaning: '',
        ex: ''
      };
    } else {
      draft = clone(state.content.vocab[index]);
    }
    return { kind: 'vocab', mode: index === null || index === undefined ? 'new' : 'edit', index: index, draft: draft };
  }

  function vocabEditorHTML() {
    var d = state.editor.draft;
    var topics = {};
    state.content.vocab.forEach(function (item) {
      if (item.topic) topics[item.topic] = item.topicLabel || vocabTopicLabel(item);
    });
    var known = { admin: 'Từ vựng/Idiom mới', test: 'Từ vựng Đề thi', p1: 'Idioms 1–54', p2: 'Idioms 55–109', p3: 'Idioms 110–165', p4: 'Idioms 166–216', p5: 'Idioms 217–259', p6: 'Idioms 260–302' };
    Object.keys(known).forEach(function (k) { if (!topics[k]) topics[k] = known[k]; });

    return '<div class="admin-editor-head"><div><span class="admin-badge">Từ vựng #' + esc(d.id) + '</span>'
      + '<h2>' + (state.editor.mode === 'new' ? 'Thêm từ vựng / Idiom' : 'Sửa từ vựng / Idiom') + '</h2>'
      + '<p>Nội dung sẽ xuất hiện trong flashcard, danh sách và quiz của trang Từ vựng.</p></div>'
      + '<div class="admin-editor-actions"><button type="button" class="btn ghost small" data-act="editor-back">← Quay lại</button>'
      + '<button type="button" class="btn small" data-act="save-vocab">Lưu mục</button></div></div>'
      + '<div id="editor-alert"></div>'
      + '<div class="admin-card"><div class="admin-form-grid">'
      + '<label class="admin-field"><span>Mã số (từ 1000)</span><input type="number" min="1000" data-path="id" value="' + esc(d.id) + '"></label>'
      + '<label class="admin-field"><span>Từ / cụm từ / idiom</span><input type="text" data-path="word" value="' + esc(d.word) + '" placeholder="take the bull by the horns"></label>'
      + '<label class="admin-field"><span>Phiên âm</span><input type="text" data-path="ipa" value="' + esc(d.ipa) + '" placeholder="/teɪk ðə bʊl baɪ ðə hɔːnz/"></label>'
      + '<label class="admin-field"><span>Từ loại</span><input type="text" data-path="pos" value="' + esc(d.pos) + '" placeholder="Idiom / Phrasal Verb / Noun…"></label>'
      + '<label class="admin-field"><span>Chủ đề (slug)</span><input type="text" data-path="topic" value="' + esc(d.topic) + '" list="vocab-topics" placeholder="admin"></label>'
      + '<label class="admin-field"><span>Tên chủ đề hiển thị</span><input type="text" data-path="topicLabel" value="' + esc(d.topicLabel) + '" placeholder="Từ vựng/Idiom mới"></label>'
      + '<datalist id="vocab-topics">' + Object.keys(topics).map(function (k) {
        return '<option value="' + esc(k) + '">' + esc(topics[k]) + '</option>';
      }).join('') + '</datalist>'
      + '<label class="admin-field wide"><span>Nghĩa tiếng Việt</span><textarea data-path="meaning" rows="2" placeholder="Nghĩa của từ/cụm từ">' + esc(d.meaning) + '</textarea></label>'
      + '<label class="admin-field wide"><span>Ví dụ</span><textarea data-path="ex" rows="2">' + esc(d.ex) + '</textarea></label>'
      + '</div>'
      + '<div class="admin-note" style="margin-top:.9rem">Mẹo: dùng chủ đề <code>admin</code> cho mục mới, hoặc <code>p1</code>…<code>p6</code> để gộp vào nhóm Idioms có sẵn. Tên chủ đề mới sẽ tự tạo nút lọc riêng.</div>'
      + '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* Chuẩn hóa & kiểm tra dữ liệu                                        */
  /* ------------------------------------------------------------------ */
  function trimOptions(options) {
    var opts = arr(options).map(function (o) { return text(o).trim(); });
    while (opts.length && opts[opts.length - 1] === '') opts.pop();
    return opts;
  }

  function normalizeEnglishTest(test) {
    var copy = clone(test) || {};
    copy.id = text(copy.id).trim().toLowerCase();
    copy.subject = 'anh';
    copy.title = text(copy.title).trim();
    copy.blocks = arr(copy.blocks).map(function (block, bi) {
      var b = clone(block) || {};
      b.id = text(b.id).trim() || ('block-' + (bi + 1) + '-' + uid());
      b.short = text(b.short).trim();
      b.part = text(b.part).trim();
      b.title = text(b.title).trim();
      b.instruction = text(b.instruction).trim();
      b.passageTitle = text(b.passageTitle).trim();
      b.source = text(b.source).trim();
      b.numbered = !!b.numbered;
      b.paras = arr(b.paras).map(function (p) { return text(p).trim(); }).filter(Boolean);
      b.questions = arr(b.questions).map(function (q) {
        var item = clone(q) || {};
        item.n = Number(item.n);
        item.stem = text(item.stem).trim();
        item.opts = trimOptions(item.opts);
        item.ans = text(item.ans).trim().toUpperCase();
        item.exp = text(item.exp).trim();
        return item;
      });
      return b;
    });
    return copy;
  }

  function validateEnglishTest(test, idTaken) {
    var errors = [];
    if (!test.id) errors.push('Đề Anh: thiếu mã đề.');
    else if (!/^[a-z0-9][a-z0-9_-]*$/.test(test.id)) errors.push('Đề Anh: mã đề chỉ dùng chữ thường, số, dấu gạch ngang/gạch dưới.');
    else if (idTaken) errors.push('Đề Anh: mã "' + test.id + '" đã được dùng.');
    if (!test.title) errors.push('Đề Anh: thiếu tên đề.');
    if (!arr(test.blocks).length) errors.push('Đề Anh: cần ít nhất một phần.');

    var used = {};
    arr(test.blocks).forEach(function (block, bi) {
      var label = 'Đề Anh · phần ' + (bi + 1);
      if (!block.short) errors.push(label + ': thiếu tên ngắn.');
      if (!arr(block.questions).length) errors.push(label + ': cần ít nhất một câu hỏi.');
      arr(block.questions).forEach(function (q, qi) {
        var qlabel = label + ' · câu ' + (qi + 1);
        if (!isFinite(q.n) || q.n <= 0 || Math.floor(q.n) !== q.n) errors.push(qlabel + ': số câu phải là số nguyên dương.');
        else if (used[q.n]) errors.push(qlabel + ': số câu ' + q.n + ' bị trùng.');
        else used[q.n] = true;
        if (q.opts.length < 2 || q.opts.length > 4) errors.push(qlabel + ': cần 2–4 lựa chọn.');
        if (q.opts.some(function (o) { return !o; })) errors.push(qlabel + ': lựa chọn không được để trống ở giữa.');
        if (!/^[A-D]$/.test(q.ans)) errors.push(qlabel + ': đáp án phải là A, B, C hoặc D.');
        else if (q.ans.charCodeAt(0) - 65 >= q.opts.length) errors.push(qlabel + ': đáp án vượt quá số lựa chọn.');
      });
    });
    return errors;
  }

  function normalizeHoaExam(exam) {
    var copy = clone(exam) || {};
    var meta = copy.meta || {};
    meta.id = text(meta.id).trim().toLowerCase();
    meta.code = text(meta.code).trim();
    meta.section = text(meta.section).trim();
    meta.tag = text(meta.tag).trim();
    meta.title = text(meta.title).trim();
    meta.desc = text(meta.desc).trim();
    meta.duration = Number(meta.duration) || 50;
    meta.source = text(meta.source).trim();
    meta.bonus = !!meta.bonus;
    copy.meta = meta;

    var parts = copy.parts || {};
    copy.parts = {
      mcq: arr(parts.mcq).map(function (q) {
        var item = clone(q) || {};
        item.text = text(item.text).trim();
        item.options = trimOptions(item.options);
        item.answer = Number(item.answer);
        item.explain = text(item.explain).trim();
        item.img = text(item.img).trim();
        if (!item.img) delete item.img;
        return item;
      }),
      tf: arr(parts.tf).map(function (q) {
        var item = clone(q) || {};
        item.text = text(item.text).trim();
        item.img = text(item.img).trim();
        if (!item.img) delete item.img;
        item.items = arr(item.items).map(function (sub) {
          return {
            t: text(sub && sub.t).trim(),
            a: sub && (sub.a === true || sub.a === 'true'),
            explain: text(sub && sub.explain).trim()
          };
        });
        return item;
      }),
      short: arr(parts.short).map(function (q) {
        var item = clone(q) || {};
        item.text = text(item.text).trim();
        var raw = item.answer;
        item.answer = raw === '' || raw === null || raw === undefined ? '' : Number(raw);
        item.explain = text(item.explain).trim();
        item.tol = item.tol === '' || item.tol === null || item.tol === undefined ? 0.01 : Number(item.tol);
        if (!isFinite(item.tol) || item.tol < 0) item.tol = 0.01;
        item.unit = text(item.unit).trim();
        if (!item.unit) delete item.unit;
        return item;
      })
    };
    return copy;
  }

  function validateHoaExam(exam, idTaken, sectionIds) {
    var errors = [];
    var meta = exam.meta || {};
    if (!meta.id) errors.push('Đề Hóa: thiếu mã đề.');
    else if (!/^[a-z0-9][a-z0-9_-]*$/.test(meta.id)) errors.push('Đề Hóa: mã đề chỉ dùng chữ thường, số, dấu gạch ngang/gạch dưới.');
    else if (idTaken) errors.push('Đề Hóa: mã "' + meta.id + '" đã được dùng.');
    if (!meta.code) errors.push('Đề Hóa: thiếu mã hiển thị.');
    if (!meta.title) errors.push('Đề Hóa: thiếu tên đề.');
    if (!meta.section || !sectionIds[meta.section]) errors.push('Đề Hóa: chuyên mục không hợp lệ.');
    if (!isFinite(meta.duration) || meta.duration <= 0) errors.push('Đề Hóa: thời gian phải lớn hơn 0.');

    var parts = exam.parts || {};
    var total = arr(parts.mcq).length + arr(parts.tf).length + arr(parts.short).length;
    if (!total) errors.push('Đề Hóa: cần ít nhất một câu hỏi.');

    arr(parts.mcq).forEach(function (q, i) {
      var label = 'Hóa · trắc nghiệm câu ' + (i + 1);
      if (!q.text) errors.push(label + ': thiếu nội dung.');
      if (q.options.length < 2 || q.options.length > 4) errors.push(label + ': cần 2–4 lựa chọn.');
      if (q.options.some(function (o) { return !o; })) errors.push(label + ': lựa chọn không được để trống ở giữa.');
      if (!isFinite(q.answer) || q.answer < 0 || q.answer >= q.options.length) errors.push(label + ': đáp án không hợp lệ.');
    });

    arr(parts.tf).forEach(function (q, i) {
      var label = 'Hóa · đúng/sai câu ' + (i + 1);
      if (!q.text) errors.push(label + ': thiếu nội dung.');
      if (!q.items.length) errors.push(label + ': cần ít nhất một ý.');
      q.items.forEach(function (item, j) {
        if (!item.t) errors.push(label + ' · ý ' + (j + 1) + ': thiếu phát biểu.');
      });
    });

    arr(parts.short).forEach(function (q, i) {
      var label = 'Hóa · trả lời ngắn câu ' + (i + 1);
      if (!q.text) errors.push(label + ': thiếu nội dung.');
      if (q.answer === '' || !isFinite(q.answer)) errors.push(label + ': đáp án phải là một số.');
    });

    return errors;
  }

  function normalizeVocabItem(item) {
    var copy = clone(item) || {};
    copy.id = parseInt(copy.id, 10);
    copy.word = text(copy.word).trim();
    copy.ipa = text(copy.ipa).trim();
    copy.pos = text(copy.pos).trim() || 'Từ vựng';
    copy.topic = text(copy.topic).trim() || 'admin';
    copy.topicLabel = text(copy.topicLabel).trim() || 'Từ vựng/Idiom mới';
    copy.meaning = text(copy.meaning).trim();
    copy.ex = text(copy.ex).trim();
    return copy;
  }

  function validateVocabItem(item, idTaken) {
    var errors = [];
    if (!isFinite(item.id) || item.id < 1000) errors.push('Từ vựng: mã phải là số từ 1000 trở lên.');
    else if (idTaken) errors.push('Từ vựng: mã #' + item.id + ' đã được dùng.');
    if (!item.word) errors.push('Từ vựng: thiếu từ/cụm từ.');
    if (!item.meaning) errors.push('Từ vựng: thiếu nghĩa tiếng Việt.');
    if (!item.topic || !/^[a-z0-9][a-z0-9_-]*$/.test(item.topic)) errors.push('Từ vựng: chủ đề chỉ dùng chữ thường, số, gạch ngang/gạch dưới.');
    return errors;
  }

  function validateAll() {
    var errors = [];
    var englishIds = {};
    arr(g.TESTS).forEach(function (t) { if (!t.__dynamic) englishIds[t.id] = true; });
    state.content.english.forEach(function (test, i) {
      var normalized = normalizeEnglishTest(test);
      var taken = !!englishIds[normalized.id];
      englishIds[normalized.id] = true;
      errors = errors.concat(validateEnglishTest(normalized, taken).map(function (e) { return 'Đề Anh #' + (i + 1) + ': ' + e; }));
    });

    var sectionIds = {};
    hoaAllSections().forEach(function (s) { sectionIds[s.id] = true; });
    var hoaIds = {};
    if (g.HoaExams && Array.isArray(g.HoaExams.meta)) {
      g.HoaExams.meta.forEach(function (m) { if (!m.__dynamic) hoaIds[m.id] = true; });
    }
    state.content.hoa.exams.forEach(function (exam, i) {
      var normalized = normalizeHoaExam(exam);
      var taken = !!hoaIds[normalized.meta.id];
      hoaIds[normalized.meta.id] = true;
      errors = errors.concat(validateHoaExam(normalized, taken, sectionIds).map(function (e) { return 'Đề Hóa #' + (i + 1) + ': ' + e; }));
    });

    var vocabIds = {};
    state.content.vocab.forEach(function (item, i) {
      var normalized = normalizeVocabItem(item);
      var taken = !!vocabIds[normalized.id];
      vocabIds[normalized.id] = true;
      errors = errors.concat(validateVocabItem(normalized, taken).map(function (e) { return 'Từ vựng #' + (i + 1) + ': ' + e; }));
    });

    return errors;
  }

  /* ------------------------------------------------------------------ */
  /* Lưu trình soạn thảo                                                 */
  /* ------------------------------------------------------------------ */
  function editorAlert(errors) {
    var box = $('#editor-alert');
    if (!box) return;
    if (!errors || !errors.length) {
      box.innerHTML = '';
      return;
    }
    box.innerHTML = '<div class="admin-alert">' + errors.map(function (e) { return '• ' + esc(e); }).join('<br>') + '</div>';
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function saveEnglishEditor() {
    var normalized = normalizeEnglishTest(state.editor.draft);
    var taken = false;
    arr(g.TESTS).forEach(function (t) {
      if (!t.__dynamic && t.id === normalized.id) taken = true;
    });
    state.content.english.forEach(function (t, i) {
      if (i !== state.editor.index && t.id === normalized.id) taken = true;
    });
    var errors = validateEnglishTest(normalized, taken);
    if (errors.length) {
      editorAlert(errors);
      return;
    }
    if (state.editor.mode === 'edit') state.content.english[state.editor.index] = normalized;
    else state.content.english.push(normalized);
    state.editor = null;
    state.editorDirty = false;
    setStatus('ok', 'Đã lưu đề Tiếng Anh vào bản đang soạn. Bấm <b>Đăng lên website</b> để người dùng nhận được.');
    renderView();
    renderSavebar();
  }

  function saveHoaEditor() {
    var normalized = normalizeHoaExam(state.editor.draft);
    var taken = false;
    if (g.HoaExams && Array.isArray(g.HoaExams.meta)) {
      g.HoaExams.meta.forEach(function (m) {
        if (!m.__dynamic && m.id === normalized.meta.id) taken = true;
      });
    }
    state.content.hoa.exams.forEach(function (exam, i) {
      if (i !== state.editor.index && exam.meta && exam.meta.id === normalized.meta.id) taken = true;
    });
    var sectionIds = {};
    hoaAllSections().forEach(function (s) { sectionIds[s.id] = true; });
    var errors = validateHoaExam(normalized, taken, sectionIds);
    if (errors.length) {
      editorAlert(errors);
      return;
    }
    if (state.editor.mode === 'edit') state.content.hoa.exams[state.editor.index] = normalized;
    else state.content.hoa.exams.push(normalized);
    state.editor = null;
    state.editorDirty = false;
    setStatus('ok', 'Đã lưu đề Hóa vào bản đang soạn. Bấm <b>Đăng lên website</b> để người dùng nhận được.');
    renderView();
    renderSavebar();
  }

  function saveHoaSectionEditor() {
    var draft = clone(state.editor.draft) || {};
    draft.id = slug(draft.id || draft.title, 'chuyen-muc');
    draft.title = text(draft.title).trim();
    draft.desc = text(draft.desc).trim();
    var errors = [];
    if (!draft.title) errors.push('Chuyên mục: thiếu tên.');
    var staticIds = {};
    hoaStaticSections().forEach(function (s) { staticIds[s.id] = true; });
    if (staticIds[draft.id]) errors.push('Chuyên mục: mã "' + draft.id + '" trùng chuyên mục tĩnh.');
    state.content.hoa.sections.forEach(function (s, i) {
      if (i !== state.editor.index && s.id === draft.id) errors.push('Chuyên mục: mã "' + draft.id + '" đã được dùng.');
    });
    if (errors.length) {
      editorAlert(errors);
      return;
    }

    if (state.editor.mode === 'edit') {
      var oldId = state.content.hoa.sections[state.editor.index].id;
      state.content.hoa.sections[state.editor.index] = draft;
      if (oldId !== draft.id) {
        state.content.hoa.exams.forEach(function (exam) {
          if (exam.meta && exam.meta.section === oldId) exam.meta.section = draft.id;
        });
      }
    } else {
      state.content.hoa.sections.push(draft);
    }
    state.editor = null;
    state.editorDirty = false;
    setStatus('ok', 'Đã lưu chuyên mục Hóa vào bản đang soạn.');
    renderView();
    renderSavebar();
  }

  function saveVocabEditor() {
    var normalized = normalizeVocabItem(state.editor.draft);
    var taken = false;
    state.content.vocab.forEach(function (item, i) {
      if (i !== state.editor.index && parseInt(item.id, 10) === normalized.id) taken = true;
    });
    var errors = validateVocabItem(normalized, taken);
    if (errors.length) {
      editorAlert(errors);
      return;
    }
    if (state.editor.mode === 'edit') state.content.vocab[state.editor.index] = normalized;
    else state.content.vocab.push(normalized);
    state.editor = null;
    state.editorDirty = false;
    setStatus('ok', 'Đã lưu từ vựng vào bản đang soạn. Bấm <b>Đăng lên website</b> để người dùng nhận được.');
    renderView();
    renderSavebar();
  }

  /* ------------------------------------------------------------------ */
  /* JSON, nhập / xuất                                                   */
  /* ------------------------------------------------------------------ */
  function currentJsonValue(kind) {
    if (kind === 'english') return state.content.english;
    if (kind === 'hoa') return state.content.hoa;
    return state.content.vocab;
  }

  function jsonTextBox(kind) {
    return $('#json-' + kind);
  }

  function importJson(kind) {
    var box = jsonTextBox(kind);
    if (!box) return;
    var raw;
    try {
      raw = JSON.parse(box.value);
    } catch (err) {
      setStatus('bad', 'JSON không hợp lệ: ' + esc(err.message || err));
      return;
    }

    var errors = [];
    try {
      if (kind === 'english') {
        var list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.tests) ? raw.tests : null);
        if (!list) throw new Error('Đề Anh phải là một mảng JSON.');
        var normalized = list.map(normalizeEnglishTest);
        var staticIds = {};
        arr(g.TESTS).forEach(function (t) { if (!t.__dynamic) staticIds[t.id] = true; });
        normalized.forEach(function (test, i) {
          var taken = !!staticIds[test.id];
          staticIds[test.id] = true;
          errors = errors.concat(validateEnglishTest(test, taken).map(function (e) { return 'Đề #' + (i + 1) + ': ' + e; }));
        });
        if (!errors.length) state.content.english = normalized;
      } else if (kind === 'hoa') {
        var sections = raw && Array.isArray(raw.sections) ? raw.sections.map(function (s) {
          return { id: slug(s && s.id, 'chuyen-muc'), title: text(s && s.title).trim(), desc: text(s && s.desc).trim() };
        }) : clone(state.content.hoa.sections);
        var examsRaw = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.exams) ? raw.exams : null);
        if (!examsRaw) throw new Error('Đề Hóa phải có mảng "exams" (hoặc là một mảng đề).');
        var exams = examsRaw.map(normalizeHoaExam);
        var sectionIds = {};
        hoaStaticSections().forEach(function (s) { sectionIds[s.id] = true; });
        sections.forEach(function (s, i) {
          if (!s.title) errors.push('Chuyên mục #' + (i + 1) + ': thiếu tên.');
          if (sectionIds[s.id]) errors.push('Chuyên mục #' + (i + 1) + ': mã "' + s.id + '" bị trùng.');
          sectionIds[s.id] = true;
        });
        var staticHoaIds = {};
        if (g.HoaExams && Array.isArray(g.HoaExams.meta)) {
          g.HoaExams.meta.forEach(function (m) { if (!m.__dynamic) staticHoaIds[m.id] = true; });
        }
        exams.forEach(function (exam, i) {
          var taken = !!staticHoaIds[exam.meta.id];
          staticHoaIds[exam.meta.id] = true;
          errors = errors.concat(validateHoaExam(exam, taken, sectionIds).map(function (e) { return 'Đề #' + (i + 1) + ': ' + e; }));
        });
        if (!errors.length) state.content.hoa = { sections: sections, exams: exams };
      } else {
        if (!Array.isArray(raw)) throw new Error('Từ vựng phải là một mảng JSON.');
        var vocab = raw.map(normalizeVocabItem);
        var ids = {};
        vocab.forEach(function (item, i) {
          var taken = !!ids[item.id];
          ids[item.id] = true;
          errors = errors.concat(validateVocabItem(item, taken).map(function (e) { return 'Mục #' + (i + 1) + ': ' + e; }));
        });
        if (!errors.length) state.content.vocab = vocab;
      }
    } catch (err) {
      setStatus('bad', 'Không nhập được JSON: ' + esc(err.message || err));
      return;
    }

    if (errors.length) {
      showErrors('JSON có lỗi, chưa nhập:', errors.slice(0, 16));
      return;
    }
    state.editor = null;
    state.editorDirty = false;
    setStatus('ok', 'Đã nhập JSON vào bản đang soạn. Kiểm tra lại nội dung rồi bấm <b>Đăng lên website</b>.');
    renderView();
    renderSavebar();
  }

  function exportJson(kind) {
    var box = jsonTextBox(kind);
    if (!box) return;
    box.value = JSON.stringify(currentJsonValue(kind), null, 2);
    setStatus('info', 'Đã làm mới ô JSON từ nội dung đang soạn.');
  }

  function downloadJson(kind) {
    var data = JSON.stringify(currentJsonValue(kind), null, 2) + '\n';
    var blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = kind + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  async function copyJson(kind) {
    var box = jsonTextBox(kind);
    if (box) box.value = JSON.stringify(currentJsonValue(kind), null, 2);
    try {
      await navigator.clipboard.writeText(box ? box.value : JSON.stringify(currentJsonValue(kind), null, 2));
      setStatus('ok', 'Đã sao chép JSON vào bộ nhớ tạm.');
    } catch (e) {
      if (box) { box.focus(); box.select(); }
      setStatus('info', 'Trình duyệt không cho sao chép tự động. Nội dung đã được chọn trong ô JSON.');
    }
  }

  /* ------------------------------------------------------------------ */
  /* Cập nhật đường dẫn trong form                                       */
  /* ------------------------------------------------------------------ */
  function setByPath(target, path, value) {
    var parts = text(path).split('.');
    var current = target;
    for (var i = 0; i < parts.length - 1; i += 1) {
      var key = parts[i];
      if (current[key] === undefined || current[key] === null) current[key] = {};
      current = current[key];
    }
    current[parts[parts.length - 1]] = value;
  }

  function handleFieldInput(target) {
    if (!state.editor) return;
    var path = target.getAttribute('data-path');
    if (path) {
      var value = target.type === 'checkbox' ? !!target.checked : target.value;
      setByPath(state.editor.draft, path, value);
      state.editorDirty = true;
      return;
    }
    var paras = target.getAttribute('data-paras');
    if (paras !== null && paras !== undefined) {
      var bi = Number(paras);
      if (state.editor.draft.blocks && state.editor.draft.blocks[bi]) {
        state.editor.draft.blocks[bi].paras = target.value.split('\n');
        state.editorDirty = true;
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* Sự kiện                                                             */
  /* ------------------------------------------------------------------ */
  function readTokenForm() {
    var input = $('#gh-token');
    var remember = $('#gh-remember');
    var typed = input ? text(input.value).trim() : '';
    return {
      token: typed || state.token,
      remember: remember ? !!remember.checked : state.tokenRemember,
      typed: typed
    };
  }

  async function saveTokenAction(testOnly) {
    var form = readTokenForm();
    if (!form.token) {
      state.tokenMessage = 'Chưa có token để kiểm tra.';
      setStatus('bad', 'Bạn chưa nhập token GitHub.');
      renderView();
      return;
    }
    state.tokenMessage = 'Đang kiểm tra token…';
    renderView();
    try {
      await validateToken(form.token);
      saveToken(form.token, form.remember);
      state.tokenValid = true;
      state.tokenMessage = 'Token hợp lệ và có quyền ghi nội dung.';
      setStatus('ok', testOnly ? 'Token hợp lệ, sẵn sàng đăng nội dung.' : 'Đã lưu token GitHub trên trình duyệt này.');
    } catch (err) {
      state.tokenValid = false;
      state.tokenMessage = err && err.message ? err.message : String(err);
      if (form.typed) saveToken(form.token, form.remember);
      setStatus('bad', 'Token chưa dùng được: ' + esc(state.tokenMessage));
    }
    renderView();
    renderSavebar();
  }

  function clearTokenAction() {
    if (!g.confirm('Xóa token GitHub khỏi trình duyệt này?')) return;
    saveToken('', false);
    state.tokenValid = false;
    state.tokenMessage = '';
    setStatus('info', 'Đã xóa token khỏi trình duyệt. Bạn có thể dán token mới khi cần đăng bài.');
    renderView();
  }

  function discardDraftAction() {
    if (contentDirty() && !g.confirm('Bỏ các thay đổi chưa đăng và quay về nội dung trên GitHub?')) return;
    writeStorage(g.localStorage, DRAFT_KEY, null);
    state.draftRestored = false;
    state.content = clone(state.saved);
    setStatus('info', 'Đã bỏ bản nháp và tải lại nội dung đang có trên GitHub.');
    renderView();
    renderSavebar();
  }

  function reloadContentAction() {
    if ((contentDirty() || state.draftRestored) && !g.confirm('Tải lại từ GitHub sẽ bỏ các thay đổi chưa đăng. Tiếp tục?')) return;
    writeStorage(g.localStorage, DRAFT_KEY, null);
    state.draftRestored = false;
    state.contentReady = false;
    state.editor = null;
    state.editorDirty = false;
    loadRepoContent();
  }

  function markEditorDirty() {
    if (state.editor) state.editorDirty = true;
  }

  function handleClick(e) {
    var target = e.target.closest('[data-act]');
    if (!target) return;
    var act = target.getAttribute('data-act');
    var i = Number(target.getAttribute('data-i'));
    var bi = Number(target.getAttribute('data-bi'));
    var qi = Number(target.getAttribute('data-qi'));
    var ii = Number(target.getAttribute('data-ii'));
    var dir = Number(target.getAttribute('data-dir'));

    if (act === 'admin-google') { signInGoogle(); return; }
    if (act === 'admin-signout') { signOutAdmin(); return; }

    if (act === 'tab') {
      switchTab(target.getAttribute('data-tab'));
      return;
    }
    if (act === 'publish') { publish(); return; }
    if (act === 'save-draft') { writeDraft(); return; }
    if (act === 'discard-draft') { discardDraftAction(); return; }
    if (act === 'reload-content') { reloadContentAction(); return; }

    if (act === 'save-token') { saveTokenAction(false); return; }
    if (act === 'test-token') { saveTokenAction(true); return; }
    if (act === 'clear-token') { clearTokenAction(); return; }

    if (act === 'import-json') { importJson(target.getAttribute('data-kind')); return; }
    if (act === 'export-json') { exportJson(target.getAttribute('data-kind')); return; }
    if (act === 'download-json') { downloadJson(target.getAttribute('data-kind')); return; }
    if (act === 'copy-json') { copyJson(target.getAttribute('data-kind')); return; }

    /* ---- Đề Tiếng Anh ---- */
    if (act === 'new-english') { openEnglishEditor(null); return; }
    if (act === 'edit-english') { openEnglishEditor(i); return; }
    if (act === 'dup-english') {
      var source = state.content.english[i];
      if (!source) return;
      var copy = clone(source);
      copy.id = (source.id || 'de-anh') + '-copy-' + uid();
      copy.title = (source.title || 'Đề Anh') + ' (bản sao)';
      state.content.english.push(copy);
      setStatus('ok', 'Đã nhân bản đề Anh. Mã đề mới: <code>' + esc(copy.id) + '</code>.');
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'del-english') {
      var english = state.content.english[i];
      if (!english) return;
      if (!g.confirm('Xóa đề Anh "' + (english.title || english.id) + '" khỏi bản đang soạn?')) return;
      state.content.english.splice(i, 1);
      setStatus('info', 'Đã xóa đề Anh khỏi bản đang soạn.');
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'editor-back') {
      if (state.editorDirty && !g.confirm('Bỏ các thay đổi chưa lưu trong trình soạn thảo?')) return;
      state.editor = null;
      state.editorDirty = false;
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'save-english') { saveEnglishEditor(); return; }

    if (act === 'en-add-block') {
      var maxN = 0;
      arr(state.editor.draft.blocks).forEach(function (b) {
        arr(b.questions).forEach(function (q) { maxN = Math.max(maxN, Number(q.n) || 0); });
      });
      state.editor.draft.blocks.push(englishBlockNew(maxN + 1));
      markEditorDirty();
      renderView();
      return;
    }
    if (act === 'en-del-block') {
      if (!g.confirm('Xóa phần này cùng toàn bộ câu hỏi bên trong?')) return;
      state.editor.draft.blocks.splice(i, 1);
      markEditorDirty();
      renderView();
      return;
    }
    if (act === 'en-move-block') {
      var blocks = state.editor.draft.blocks;
      var ni = i + dir;
      if (ni < 0 || ni >= blocks.length) return;
      var tmp = blocks[i]; blocks[i] = blocks[ni]; blocks[ni] = tmp;
      markEditorDirty();
      renderView();
      return;
    }
    if (act === 'en-add-q') {
      var block = state.editor.draft.blocks[bi];
      if (!block) return;
      var nextN = 0;
      arr(state.editor.draft.blocks).forEach(function (b) {
        arr(b.questions).forEach(function (q) { nextN = Math.max(nextN, Number(q.n) || 0); });
      });
      block.questions.push({ n: nextN + 1, stem: '', opts: ['', '', '', ''], ans: 'A', exp: '' });
      markEditorDirty();
      renderView();
      return;
    }
    if (act === 'en-del-q') {
      if (!g.confirm('Xóa câu hỏi này?')) return;
      state.editor.draft.blocks[bi].questions.splice(qi, 1);
      markEditorDirty();
      renderView();
      return;
    }
    if (act === 'en-move-q') {
      var qs = state.editor.draft.blocks[bi].questions;
      var nq = qi + dir;
      if (nq < 0 || nq >= qs.length) return;
      var tq = qs[qi]; qs[qi] = qs[nq]; qs[nq] = tq;
      markEditorDirty();
      renderView();
      return;
    }
    if (act === 'en-renumber') {
      var n = 0;
      arr(state.editor.draft.blocks).forEach(function (b) {
        arr(b.questions).forEach(function (q) { n += 1; q.n = n; });
      });
      markEditorDirty();
      setStatus('ok', 'Đã đánh số lại toàn bộ câu từ 1 đến ' + n + '.');
      renderView();
      return;
    }

    /* ---- Đề Hóa ---- */
    if (act === 'new-hoa') { openHoaEditor(null); return; }
    if (act === 'edit-hoa') { openHoaEditor(i); return; }
    if (act === 'dup-hoa') {
      var hoaSource = state.content.hoa.exams[i];
      if (!hoaSource) return;
      var hoaCopy = clone(hoaSource);
      hoaCopy.meta.id = (hoaSource.meta.id || 'de-hoa') + '-copy-' + uid();
      hoaCopy.meta.code = (hoaSource.meta.code || 'Đề') + ' (bản sao)';
      hoaCopy.meta.title = (hoaSource.meta.title || 'Đề Hóa') + ' (bản sao)';
      state.content.hoa.exams.push(hoaCopy);
      setStatus('ok', 'Đã nhân bản đề Hóa. Mã đề mới: <code>' + esc(hoaCopy.meta.id) + '</code>.');
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'del-hoa') {
      var exam = state.content.hoa.exams[i];
      if (!exam) return;
      if (!g.confirm('Xóa đề Hóa "' + (exam.meta.title || exam.meta.id) + '" khỏi bản đang soạn?')) return;
      state.content.hoa.exams.splice(i, 1);
      setStatus('info', 'Đã xóa đề Hóa khỏi bản đang soạn.');
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'save-hoa') { saveHoaEditor(); return; }

    if (act === 'new-hoa-section') { openHoaSectionEditor(null); return; }
    if (act === 'edit-hoa-section') { openHoaSectionEditor(target.getAttribute('data-id')); return; }
    if (act === 'del-hoa-section') {
      var sectionId = target.getAttribute('data-id');
      var used = state.content.hoa.exams.some(function (ex) { return ex.meta && ex.meta.section === sectionId; });
      if (used) {
        setStatus('bad', 'Không thể xóa chuyên mục "' + esc(hoaSectionTitle(sectionId)) + '" vì vẫn còn đề Hóa động đang dùng. Hãy chuyển các đề đó sang chuyên mục khác trước.');
        return;
      }
      if (!g.confirm('Xóa chuyên mục này khỏi bản đang soạn?')) return;
      state.content.hoa.sections = state.content.hoa.sections.filter(function (s) { return s.id !== sectionId; });
      setStatus('info', 'Đã xóa chuyên mục Hóa khỏi bản đang soạn.');
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'save-hoa-section') { saveHoaSectionEditor(); return; }

    if (act === 'hoa-add-mcq') { state.editor.draft.parts.mcq.push(hoaMcqNew()); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-del-mcq') { if (!g.confirm('Xóa câu trắc nghiệm này?')) return; state.editor.draft.parts.mcq.splice(qi, 1); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-move-mcq') { moveItem(state.editor.draft.parts.mcq, qi, dir); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-add-tf') { state.editor.draft.parts.tf.push(hoaTfNew()); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-del-tf') { if (!g.confirm('Xóa câu đúng/sai này?')) return; state.editor.draft.parts.tf.splice(qi, 1); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-move-tf') { moveItem(state.editor.draft.parts.tf, qi, dir); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-add-tf-item') { state.editor.draft.parts.tf[qi].items.push({ t: '', a: true, explain: '' }); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-del-tf-item') {
      if (state.editor.draft.parts.tf[qi].items.length <= 1) { g.alert('Một câu đúng/sai cần ít nhất một ý.'); return; }
      state.editor.draft.parts.tf[qi].items.splice(ii, 1);
      markEditorDirty();
      renderView();
      return;
    }
    if (act === 'hoa-add-short') { state.editor.draft.parts.short.push(hoaShortNew()); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-del-short') { if (!g.confirm('Xóa câu trả lời ngắn này?')) return; state.editor.draft.parts.short.splice(qi, 1); markEditorDirty(); renderView(); return; }
    if (act === 'hoa-move-short') { moveItem(state.editor.draft.parts.short, qi, dir); markEditorDirty(); renderView(); return; }

    /* ---- Từ vựng ---- */
    if (act === 'new-vocab') { state.editor = newVocabEditor(null); state.editorDirty = false; renderView(); renderSavebar(); scrollTop(); return; }
    if (act === 'edit-vocab') { state.editor = newVocabEditor(i); state.editorDirty = false; renderView(); renderSavebar(); scrollTop(); return; }
    if (act === 'dup-vocab') {
      var v = state.content.vocab[i];
      if (!v) return;
      var vc = clone(v);
      vc.id = nextVocabId();
      vc.word = (v.word || 'Từ mới') + ' (bản sao)';
      state.content.vocab.push(vc);
      setStatus('ok', 'Đã nhân bản từ vựng với mã #' + vc.id + '.');
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'del-vocab') {
      var dv = state.content.vocab[i];
      if (!dv) return;
      if (!g.confirm('Xóa "' + (dv.word || 'mục này') + '" khỏi bản đang soạn?')) return;
      state.content.vocab.splice(i, 1);
      setStatus('info', 'Đã xóa từ vựng khỏi bản đang soạn.');
      renderView();
      renderSavebar();
      return;
    }
    if (act === 'save-vocab') { saveVocabEditor(); return; }
  }

  function moveItem(list, index, dir) {
    var target = index + dir;
    if (!Array.isArray(list) || target < 0 || target >= list.length) return;
    var tmp = list[index]; list[index] = list[target]; list[target] = tmp;
  }

  function handleInput(e) {
    var target = e.target;
    if (!target) return;
    if (target.id === 'vocab-search') {
      state.vocabSearch = target.value;
      clearTimeout(state._searchTimer);
      state._searchTimer = setTimeout(function () {
        renderView();
        var input = $('#vocab-search');
        if (input) {
          input.focus();
          try { input.setSelectionRange(input.value.length, input.value.length); } catch (err) { /* bỏ qua */ }
        }
      }, 250);
      return;
    }
    if (target.getAttribute('data-path') !== null || target.getAttribute('data-paras') !== null) {
      handleFieldInput(target);
    }
  }

  function handleChange(e) {
    var target = e.target;
    if (!target) return;
    if (target.getAttribute('data-path') !== null) handleFieldInput(target);
    var fileKind = target.getAttribute('data-file-kind');
    if (fileKind && target.files && target.files[0]) {
      var file = target.files[0];
      var reader = new FileReader();
      reader.onload = function () {
        var box = jsonTextBox(fileKind);
        if (box) {
          box.value = text(reader.result);
          importJson(fileKind);
        }
      };
      reader.readAsText(file, 'utf-8');
      target.value = '';
    }
  }

  function init() {
    gate = $('#admin-gate');
    app = $('#admin-app');
    if (!gate || !app) return;

    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);
    document.addEventListener('change', handleChange);
    g.addEventListener('beforeunload', function (e) {
      if (contentDirty() || state.editorDirty) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
      return undefined;
    });

    initAuth();

    g.OntapAdmin = {
      state: state,
      validate: validateAll,
      reload: reloadContentAction,
      publish: publish
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(window);
