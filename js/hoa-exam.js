/* ==========================================================================
   Hóa 12 · Đề thi tương tác
   Nạp sau js/exams-hoa/setup.js và các file dữ liệu de8.js – de19.js.
   Chế độ: thi thử (đếm ngược, chấm sau khi nộp) và luyện tập (chấm ngay).
   ========================================================================== */
(function (g) {
  'use strict';

  var H = g.HoaExams;
  if (!H || !H.meta) return;

  var W = { mcq: 4.5, tf: 4, short: 1.5 };
  var MODE = { thi: 'Thi thử', luyen: 'Luyện tập' };
  var SECTION = {
    mcq: { roman: 'I', title: 'Trắc nghiệm nhiều lựa chọn', noun: 'câu' },
    tf: { roman: 'II', title: 'Đúng / Sai', noun: 'ý' },
    short: { roman: 'III', title: 'Trả lời ngắn', noun: 'câu' }
  };
  var COLORS = { bai: '#1f8a3b', on: '#d9232a', gk: '#1b4aa5', bonus: '#d9232a' };
  var ALTS = {
    'maltose.png': 'Công thức cấu tạo maltose',
    'glucose-dang.png': 'Công thức dạng mạch hở và mạch vòng của glucose',
    'fructose-dang.png': 'Công thức dạng mạch hở và mạch vòng của fructose',
    'saccharose.png': 'Công thức cấu tạo saccharose',
    'amphetamine.png': 'Công thức cấu tạo amphetamine',
    'chat-beo-x.png': 'Công thức cấu tạo chất béo X',
    'dien-di.png': 'Sơ đồ thí nghiệm điện di amino acid',
    'do-thi-este-hoa.png': 'Bốn đồ thị biểu diễn số mol alcohol theo thời gian',
    'epa-dha.png': 'Công thức cấu tạo EPA và DHA',
    'glucose-alpha-beta.png': 'Cân bằng α-glucose, glucose mạch hở và β-glucose',
    'haworth-abcd.png': 'Bốn công thức mạch vòng A, B, C, D',
    'nicotine.png': 'Công thức cấu tạo nicotine',
    'peptide-papain.png': 'Công thức cấu tạo peptide trong hình của đề',
    'triglyceride-x.png': 'Công thức cấu tạo triglyceride X',
    'xa-phong-hoa.png': 'Sơ đồ thí nghiệm xà phòng hóa'
  };
  var HISTORY_KEY = 'hoaExam:v1:history';

  var state = null;
  var timer = null;
  var scrollTick = false;
  var lbDe = H.meta.length ? H.meta[0].id : 'de8';
  var lbMode = 'thi';

  /* ---------- Tiện ích ---------- */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Chuyển ^{...}, _{...}, xuống dòng thành HTML an toàn */
  function rich(s) {
    var out = esc(s);
    out = out.replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>');
    out = out.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>');
    return out.replace(/\n/g, '<br>');
  }

  function round2(x) { return Math.round((x + 1e-9) * 100) / 100; }

  function num(x, digits) {
    if (digits === undefined) digits = 2;
    var p = Math.pow(10, digits);
    var s = (Math.round((x + 1e-9) * p) / p).toFixed(digits);
    s = s.replace(/0+$/, '').replace(/\.$/, '');
    if (s === '' || s === '-0') s = '0';
    return s.replace('.', ',');
  }

  function score2(x) {
    return (Math.round((x + 1e-9) * 100) / 100).toFixed(2).replace('.', ',');
  }

  function clock(sec) {
    sec = Math.max(0, Math.floor(sec));
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return h ? h + ':' + p(m) + ':' + p(s) : p(m) + ':' + p(s);
  }

  function fmtDate(ts) {
    if (!ts) return '—';
    var d = new Date(ts);
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function lsGet(key) {
    try { var raw = g.localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function lsSet(key, val) {
    try { g.localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* bộ nhớ bị chặn */ }
  }
  function lsDel(key) {
    try { g.localStorage.removeItem(key); } catch (e) { /* bỏ qua */ }
  }

  function pKey(id, mode) { return 'hoaExam:v1:progress:' + id + ':' + mode; }
  function cloudCategory(id, mode) { return 'hoa:' + id + ':' + mode; }

  function cloudApi() { return g.OntapCloud || null; }

  function submitCloudScore() {
    var c = cloudApi();
    if (!state || !state.result || !c || typeof c.submitScore !== 'function') return;
    var identityKey;
    if (c.status && c.status().mode === 'firebase') {
      var u = c.currentUser && c.currentUser();
      identityKey = u ? u.uid : 'signed-out';
    } else {
      var localId = c.localIdentity && c.localIdentity();
      identityKey = localId ? localId.uid : 'local';
    }
    if (state.scoreKey === identityKey) return;
    state.scoreKey = identityKey;

    var r = state.result;
    var percent = r.max ? Math.round(r.total / r.max * 10000) / 100 : 0;
    var correct = 0, total = 0;
    ['mcq', 'tf', 'short'].forEach(function (k) {
      correct += r[k].correct;
      total += r[k].total;
    });
    Promise.resolve(c.submitScore(cloudCategory(state.id, state.mode), {
      score: r.total,
      max: r.max,
      percent: percent,
      correct: correct,
      total: total,
      timeSec: r.usedSec,
      mode: state.mode,
      modeLabel: MODE[state.mode],
      examId: state.id,
      title: state.data.meta.code + ' · ' + state.data.meta.title
    })).catch(function () { /* không chặn kết quả */ });
  }

  function syncCloudProgress() {
    var c = cloudApi();
    if (!c || typeof c.pullAllProgress !== 'function') return;
    Promise.resolve(c.pullAllProgress()).then(function (map) {
      if (!map) return;
      var changed = false;
      H.meta.forEach(function (meta) {
        ['thi', 'luyen'].forEach(function (mode) {
          var cat = cloudCategory(meta.id, mode);
          var rec = map[cat];
          var local = loadProgress(meta.id, mode);
          var remoteAt = rec ? Number(rec.updatedAt || (rec.payload && rec.payload.updatedAt) || 0) : 0;
          var localAt = local ? Number(local.updatedAt || 0) : 0;
          if (rec && rec.payload && remoteAt > localAt) {
            lsSet(pKey(meta.id, mode), rec.payload);
            changed = true;
          } else if (local && localAt > remoteAt && typeof c.saveProgress === 'function') {
            c.saveProgress(cat, local);
          }
        });
      });
      if (changed && (!state || (state.phase !== 'room' && state.phase !== 'result'))) renderLanding();
    }).catch(function () { /* bỏ qua lỗi đồng bộ */ });
  }

  function restoreCloudProgress() {
    var c = cloudApi();
    if (!state || state.phase !== 'room' || !c || typeof c.pullProgress !== 'function' || state.freshStart) return;
    if (answerStats(state).done > 0 || Object.keys(state.flags || {}).length) return;
    var id = state.id, mode = state.mode;
    Promise.resolve(c.pullProgress(cloudCategory(id, mode))).then(function (rec) {
      if (!rec || !rec.payload || !state || state.phase !== 'room' || state.id !== id || state.mode !== mode || state.freshStart) return;
      if (answerStats(state).done > 0) return;
      var remoteAt = Number(rec.updatedAt || 0);
      var localAt = Number(state.cloudBaseAt || 0);
      if (remoteAt <= localAt) return;
      var restored = mergeSaved(makeState(H.byId(id), mode), rec.payload);
      restored.phase = 'room';
      restored.freshStart = false;
      restored.scoreKey = '';
      state = restored;
      saveProgress();
      renderRoom(true);
    }).catch(function () { /* bỏ qua */ });
  }

  /* ---------- Dữ liệu và trạng thái ---------- */
  function dataOf(meta) {
    var p = H.parts[meta.id] || {};
    var mcq = (p.mcq || []).slice();
    var tf = (p.tf || []).slice();
    var short = (p.short || []).slice();
    return {
      meta: meta, mcq: mcq, tf: tf, short: short,
      per: {
        mcq: mcq.length ? W.mcq / mcq.length : 0,
        tfQ: tf.length ? W.tf / tf.length : 0,
        short: short.length ? W.short / short.length : 0
      },
      max: (mcq.length ? W.mcq : 0) + (tf.length ? W.tf : 0) + (short.length ? W.short : 0)
    };
  }

  function emptyAnswers(data) {
    return {
      mcq: data.mcq.map(function () { return null; }),
      tf: data.tf.map(function (q) { return q.items.map(function () { return null; }); }),
      short: data.short.map(function () { return ''; })
    };
  }

  function makeState(meta, mode) {
    var data = dataOf(meta);
    return {
      id: meta.id, mode: mode, data: data, phase: 'room',
      answers: emptyAnswers(data),
      flags: {},
      checked: { mcq: {}, tf: {}, short: {} },
      startedAt: Date.now(),
      deadline: mode === 'thi' ? Date.now() + (meta.duration || 50) * 60000 : null,
      updatedAt: Date.now(),
      current: { type: data.mcq.length ? 'mcq' : (data.tf.length ? 'tf' : 'short'), idx: 0 },
      result: null
    };
  }

  function mergeSaved(s, saved) {
    if (!saved) return s;
    var a = saved.answers || {};
    s.answers.mcq = s.data.mcq.map(function (_, i) {
      var v = a.mcq && a.mcq[i];
      return (typeof v === 'number' && v >= 0 && v < 4) ? v : null;
    });
    s.answers.tf = s.data.tf.map(function (q, i) {
      var arr = (a.tf && a.tf[i]) || [];
      return q.items.map(function (_, j) {
        var v = arr[j];
        return v === true ? true : (v === false ? false : null);
      });
    });
    s.answers.short = s.data.short.map(function (_, i) {
      var v = a.short && a.short[i];
      return typeof v === 'string' ? v : (v === null || v === undefined ? '' : String(v));
    });
    s.flags = {};
    if (saved.flags && typeof saved.flags === 'object') {
      Object.keys(saved.flags).forEach(function (k) { if (saved.flags[k]) s.flags[k] = true; });
    }
    s.checked = { mcq: {}, tf: {}, short: {} };
    ['mcq', 'tf', 'short'].forEach(function (t) {
      if (saved.checked && saved.checked[t]) {
        Object.keys(saved.checked[t]).forEach(function (k) { if (saved.checked[t][k]) s.checked[t][k] = true; });
      }
    });
    if (typeof saved.startedAt === 'number') s.startedAt = saved.startedAt;
    if (s.mode === 'thi' && typeof saved.deadline === 'number') s.deadline = saved.deadline;
    return s;
  }

  function loadProgress(id, mode) {
    var p = lsGet(pKey(id, mode));
    return (p && typeof p === 'object') ? p : null;
  }

  function saveProgress() {
    if (!state) return;
    state.updatedAt = Date.now();
    var payload = {
      v: 1, id: state.id, mode: state.mode,
      answers: state.answers, flags: state.flags, checked: state.checked,
      startedAt: state.startedAt, deadline: state.deadline, updatedAt: state.updatedAt
    };
    lsSet(pKey(state.id, state.mode), payload);
    var c = cloudApi();
    if (c && typeof c.saveProgress === 'function') c.saveProgress(cloudCategory(state.id, state.mode), payload);
  }

  function removeProgress(id, mode) {
    lsDel(pKey(id, mode));
    var c = cloudApi();
    if (c && typeof c.deleteProgress === 'function') c.deleteProgress(cloudCategory(id, mode));
  }

  function answerStats(s) {
    var done = 0, total = 0;
    s.data.mcq.forEach(function (_, i) { total++; if (s.answers.mcq[i] !== null) done++; });
    s.data.tf.forEach(function (_, i) {
      total++;
      if (s.answers.tf[i].some(function (v) { return v !== null; })) done++;
    });
    s.data.short.forEach(function (_, i) { total++; if (String(s.answers.short[i]).trim() !== '') done++; });
    return { done: done, total: total };
  }

  function isShortCorrect(q, val) {
    var raw = String(val === undefined || val === null ? '' : val).trim();
    if (!raw) return false;
    if (typeof q.answer === 'number') {
      var cleaned = raw.replace(/\s+/g, '').replace(/,/g, '.');
      var m = cleaned.match(/-?\d+(?:\.\d+)?/);
      if (!m) return false;
      var n = parseFloat(m[0]);
      var tol = (typeof q.tol === 'number') ? q.tol : 0.01;
      return Math.abs(n - q.answer) <= tol + 1e-9;
    }
    return raw.toLowerCase().replace(/\s+/g, '') === String(q.answer).toLowerCase().replace(/\s+/g, '');
  }

  function mcqRight(idx) { return state.answers.mcq[idx] === state.data.mcq[idx].answer; }
  function tfRight(idx) {
    var arr = state.answers.tf[idx];
    var n = 0;
    state.data.tf[idx].items.forEach(function (it, i) { if (arr[i] === it.a) n++; });
    return n;
  }
  function tfAnswered(idx) {
    return state.answers.tf[idx].filter(function (v) { return v !== null; }).length;
  }
  function shortRight(idx) { return isShortCorrect(state.data.short[idx], state.answers.short[idx]); }

  function resultStatus(type, idx) {
    if (type === 'mcq') {
      var a = state.answers.mcq[idx];
      if (a === null) return 'empty';
      return a === state.data.mcq[idx].answer ? 'ok' : 'bad';
    }
    if (type === 'tf') {
      if (!tfAnswered(idx)) return 'empty';
      var c = tfRight(idx);
      var total = state.data.tf[idx].items.length;
      return c === total ? 'ok' : (c > 0 ? 'partial' : 'bad');
    }
    if (!String(state.answers.short[idx]).trim()) return 'empty';
    return shortRight(idx) ? 'ok' : 'bad';
  }

  function statusOf(type, idx) {
    if (state.phase === 'result') return resultStatus(type, idx);
    if (type === 'mcq') {
      if (state.mode === 'thi') return state.answers.mcq[idx] !== null ? 'done' : 'empty';
      return state.answers.mcq[idx] === null ? 'empty' : (mcqRight(idx) ? 'ok' : 'bad');
    }
    if (type === 'tf') {
      var total = state.data.tf[idx].items.length;
      var answered = tfAnswered(idx);
      if (state.mode === 'thi') return answered === 0 ? 'empty' : (answered === total ? 'done' : 'partial');
      if (!state.checked.tf[idx]) return answered === 0 ? 'empty' : (answered === total ? 'done' : 'partial');
      var c = tfRight(idx);
      return c === total ? 'ok' : (c > 0 ? 'partial' : 'bad');
    }
    if (state.mode === 'thi') return String(state.answers.short[idx]).trim() ? 'done' : 'empty';
    if (!state.checked.short[idx]) return String(state.answers.short[idx]).trim() ? 'done' : 'empty';
    return shortRight(idx) ? 'ok' : 'bad';
  }

  /* ---------- Sinh HTML câu hỏi ---------- */
  function altFor(src) {
    var base = String(src || '').split('/').pop();
    return ALTS[base] || 'Hình minh họa của đề';
  }

  function figureHTML(img) {
    if (!img || !img.src) return '';
    return '<figure class="q-figure"><a href="' + esc(img.src) + '" target="_blank" rel="noopener">'
      + '<img src="' + esc(img.src) + '" alt="' + esc(altFor(img.src)) + '" loading="lazy"></a></figure>';
  }

  function statusBadge(type, idx, review) {
    if (!review && state.mode === 'thi') return '';
    var st;
    if (review) st = resultStatus(type, idx);
    else if (type === 'mcq') st = state.answers.mcq[idx] === null ? 'empty' : (mcqRight(idx) ? 'ok' : 'bad');
    else if (type === 'tf') st = state.checked.tf[idx] ? statusOf('tf', idx) : 'empty';
    else st = state.checked.short[idx] ? statusOf('short', idx) : 'empty';
    if (st === 'empty') return review ? '<span class="q-status empty">Bỏ trống</span>' : '';
    var total = type === 'tf' ? state.data.tf[idx].items.length : 0;
    var label;
    if (type === 'tf') label = tfRight(idx) + '/' + total + ' ý đúng';
    else label = st === 'ok' ? 'Đúng' : 'Sai';
    return '<span class="q-status ' + st + '">' + label + '</span>';
  }

  function articleHTML(type, idx, q, body, review) {
    var pts = type === 'mcq' ? state.data.per.mcq : (type === 'tf' ? state.data.per.tfQ : state.data.per.short);
    var badge = statusBadge(type, idx, review);
    var flag = '';
    if (!review) {
      var key = type + '-' + idx;
      var on = !!state.flags[key];
      flag = '<button type="button" class="q-flag" data-act="flag" data-type="' + type + '" data-idx="' + idx
        + '" aria-pressed="' + (on ? 'true' : 'false') + '" aria-label="Đánh dấu câu ' + (idx + 1)
        + '" title="Đánh dấu câu cần xem lại">⚑</button>';
    }
    return '<article class="q" id="q-' + type + '-' + idx + '" data-type="' + type + '" data-idx="' + idx
      + '" data-result="' + statusOf(type, idx) + '">'
      + '<div class="q-head"><span class="q-no">Câu ' + (idx + 1) + '</span>'
      + '<span class="q-points">' + num(pts, 3) + ' điểm</span>' + badge + flag + '</div>'
      + '<div class="q-text">' + rich(q.text) + '</div>' + figureHTML(q.img) + body + '</article>';
  }

  function explainMcq(q, idx) {
    var ans = state.answers.mcq[idx];
    var ok = ans === q.answer;
    var line = ans === null ? 'Chưa trả lời.' : (ok ? 'Chính xác!' : 'Chưa đúng.');
    return '<div class="q-explain"><span class="' + (ok ? 'correct-line' : 'wrong-line') + '">' + line + '</span> '
      + '<b>Đáp án: ' + ('ABCD'[q.answer] || q.answer + 1) + '.</b> ' + rich(q.explain || '') + '</div>';
  }

  function renderMcq(q, idx, review) {
    var ans = state.answers.mcq[idx];
    var show = review || (state.mode === 'luyen' && ans !== null);
    var opts = q.options.map(function (text, i) {
      var cls = 'opt';
      var mark = '';
      if (!show) {
        if (ans === i) cls += ' selected';
      } else {
        if (i === q.answer) { cls += ' correct'; mark = '✓'; }
        else if (i === ans) { cls += ' wrong'; mark = '✗'; }
      }
      return '<button type="button" class="' + cls + '" data-act="opt" data-idx="' + idx + '" data-i="' + i + '"'
        + (show ? ' disabled' : '') + '><span class="opt-key">' + ('ABCD'[i] || (i + 1)) + '</span>'
        + '<span class="opt-body">' + rich(text) + '</span><span class="opt-mark">' + mark + '</span></button>';
    }).join('');
    return articleHTML('mcq', idx, q, '<div class="opts">' + opts + '</div>' + (show ? explainMcq(q, idx) : ''), review);
  }

  function renderTf(q, idx, review) {
    var arr = state.answers.tf[idx];
    var checked = review || (state.mode === 'luyen' && !!state.checked.tf[idx]);
    var rows = q.items.map(function (item, i) {
      var v = arr[i];
      var cls = 'tf-row';
      var btns = [true, false].map(function (val) {
        var c = 'tf-btn';
        if (checked) {
          if (val === item.a) c += ' correct';
          else if (val === v) c += ' wrong';
        } else if (v === val) c += ' selected';
        return '<button type="button" class="' + c + '" data-act="tf" data-idx="' + idx + '" data-i="' + i
          + '" data-v="' + (val ? '1' : '0') + '"' + (checked ? ' disabled' : '') + '>'
          + (val ? 'Đúng' : 'Sai') + '</button>';
      }).join('');
      var note = '';
      if (checked) {
        if (v === null) cls += ' is-wrong';
        else cls += (v === item.a) ? ' is-correct' : ' is-wrong';
        note = '<p class="tf-note"><b>Đáp án: ' + (item.a ? 'Đúng' : 'Sai') + '.</b> ' + rich(item.explain || '') + '</p>';
      }
      return '<div class="' + cls + '"><div class="tf-text"><b>' + 'abcd'[i] + ')</b> ' + rich(item.t)
        + '</div><div class="tf-btns">' + btns + '</div>' + note + '</div>';
    }).join('');
    var check = '';
    if (state.mode === 'luyen' && !checked) {
      check = '<button type="button" class="btn small ghost check-btn" data-act="check-tf" data-idx="' + idx + '">Kiểm tra đáp án</button>';
    }
    return articleHTML('tf', idx, q, '<div class="tf-list">' + rows + '</div>' + check, review);
  }

  function renderShort(q, idx, review) {
    var val = state.answers.short[idx];
    var checked = review || (state.mode === 'luyen' && !!state.checked.short[idx]);
    var cls = 'short-input';
    if (checked && String(val).trim()) cls += shortRight(idx) ? ' correct' : ' wrong';
    var input = '<input class="' + cls + '" type="text" inputmode="decimal" autocomplete="off" spellcheck="false"'
      + ' data-act="short" data-idx="' + idx + '" value="' + esc(val) + '" placeholder="Nhập đáp án"'
      + (checked ? ' disabled' : '') + ' aria-label="Đáp án câu ' + (idx + 1) + '">';
    var unit = q.unit ? '<span class="short-unit">' + esc(q.unit) + '</span>' : '';
    var check = '';
    if (state.mode === 'luyen' && !checked) {
      check = '<button type="button" class="btn small ghost check-btn" data-act="check-short" data-idx="' + idx + '">Kiểm tra</button>';
    }
    var note = '';
    if (checked) {
      var ansTxt = (typeof q.answer === 'number' ? num(q.answer, 4) : String(q.answer)) + (q.unit ? ' ' + q.unit : '');
      note = '<p class="short-note"><b>Đáp án: ' + esc(ansTxt) + '.</b></p><div class="q-explain">'
        + (shortRight(idx) ? '<span class="correct-line">Chính xác!</span>' : '<span class="wrong-line">Chưa đúng.</span>')
        + ' ' + rich(q.explain || '') + '</div>';
    }
    return articleHTML('short', idx, q, '<div class="short-row">' + input + unit + check + '</div>' + note, review);
  }

  function renderQuestion(type, idx, review) {
    if (type === 'mcq') return renderMcq(state.data.mcq[idx], idx, review);
    if (type === 'tf') return renderTf(state.data.tf[idx], idx, review);
    return renderShort(state.data.short[idx], idx, review);
  }

  function replaceQuestion(type, idx, review) {
    var el = document.getElementById('q-' + type + '-' + idx);
    if (!el) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = renderQuestion(type, idx, review);
    var neu = tmp.firstElementChild;
    if (neu) el.parentNode.replaceChild(neu, el);
  }

  /* ---------- Phòng thi ---------- */
  function roomToolbar() {
    var meta = state.data.meta;
    var initial = state.mode === 'thi'
      ? clock(Math.max(0, (state.deadline - Date.now()) / 1000))
      : clock((Date.now() - state.startedAt) / 1000);
    return '<div class="exam-toolbar"><div class="exam-toolbar-in">'
      + '<div class="et-left"><button type="button" class="et-back" data-act="back">← Danh sách</button>'
      + '<div class="et-info"><span class="et-code">' + esc(meta.code) + ' · ' + MODE[state.mode].toUpperCase() + '</span>'
      + '<span class="et-title">' + esc(meta.title) + '</span></div></div>'
      + '<div class="et-right"><span class="clock" id="clock"><span class="clock-label">'
      + (state.mode === 'thi' ? 'Còn lại' : 'Đã làm') + '</span><span id="clockVal">' + initial + '</span></span>'
      + '<button type="button" class="btn small" data-act="submit">Nộp bài</button></div>'
      + '</div></div>';
  }

  function bannerHTML(resumed) {
    var d = state.data;
    var badges = [
      state.mode === 'thi' ? 'Đếm ngược ' + d.meta.duration + ' phút' : 'Không giới hạn thời gian',
      d.mcq.length + ' TN', d.tf.length + ' Đ/S', d.short.length + ' TLN', num(d.max, 2) + ' điểm'
    ];
    return '<div class="exam-banner"><div class="banner-main"><strong>' + esc(d.meta.code) + ' · ' + esc(d.meta.title)
      + '</strong><div class="banner-badges">'
      + badges.map(function (b, i) {
        return '<span class="banner-badge' + (i === 0 && state.mode === 'thi' ? ' hot' : '') + '">' + esc(b) + '</span>';
      }).join('')
      + (resumed ? '<span class="banner-badge hot">Đã khôi phục bài làm</span>' : '')
      + '</div></div><div class="btn-row" style="gap:.4rem">'
      + '<button type="button" class="btn small ghost" data-act="restart">Bắt đầu lại</button></div></div>';
  }

  function sectionHTML(type) {
    var list = state.data[type];
    if (!list.length) return '';
    var sec = SECTION[type];
    var note;
    if (type === 'mcq') note = list.length + ' câu · ' + num(state.data.per.mcq, 3) + ' điểm/câu · chọn một đáp án đúng.';
    else if (type === 'tf') note = list.length + ' câu · ' + num(state.data.per.tfQ, 2) + ' điểm/câu · mỗi ý đúng được ' + num(state.data.per.tfQ / 4, 3) + ' điểm.';
    else note = list.length + ' câu · ' + num(state.data.per.short, 3) + ' điểm/câu · nhập số hoặc dãy số, dùng dấu phẩy cho phần thập phân.';
    return '<section class="exam-section" id="sec-' + type + '"><div class="exam-section-head">'
      + '<h2>Phần ' + sec.roman + ' · ' + sec.title + '</h2><p>' + note + '</p></div>'
      + list.map(function (_, i) { return renderQuestion(type, i, false); }).join('') + '</section>';
  }

  function paletteClass(st) {
    if (st === 'ok' || st === 'done') return 'done';
    if (st === 'partial') return 'partial';
    if (st === 'bad') return 'bad';
    return '';
  }

  function paletteGroupsHTML() {
    var groups = [
      { type: 'mcq', label: 'I. Trắc nghiệm', list: state.data.mcq },
      { type: 'tf', label: 'II. Đúng/Sai', list: state.data.tf },
      { type: 'short', label: 'III. Trả lời ngắn', list: state.data.short }
    ];
    return groups.filter(function (g) { return g.list.length; }).map(function (g) {
      var btns = g.list.map(function (_, i) {
        var st = paletteClass(statusOf(g.type, i));
        var key = g.type + '-' + i;
        var flagged = !!state.flags[key];
        var current = state.current && state.current.type === g.type && state.current.idx === i;
        return '<button type="button" class="pal-btn ' + st + (flagged ? ' flagged' : '') + (current ? ' current' : '')
          + '" data-act="jump" data-type="' + g.type + '" data-idx="' + i + '" title="Câu ' + (i + 1) + '">'
          + (i + 1) + '</button>';
      }).join('');
      return '<div class="palette-group"><div class="palette-group-title"><span>' + g.label + '</span><span>'
        + g.list.length + ' câu</span></div><div class="palette-grid">' + btns + '</div></div>';
    }).join('');
  }

  function paletteCard() {
    return '<div class="palette-card"><div class="palette-head"><h3>Sơ đồ câu</h3>'
      + '<span class="palette-count" id="paletteCount">0/0</span></div>'
      + '<div class="palette-legend"><span><i class="legend-dot ld-done"></i>Đã làm / đúng</span>'
      + '<span><i class="legend-dot ld-partial"></i>Một phần</span><span><i class="legend-dot ld-bad"></i>Sai</span>'
      + '<span><i class="legend-dot ld-empty"></i>Chưa làm</span><span><i class="legend-dot ld-flag"></i>Đánh dấu</span></div>'
      + '<div id="paletteBody"></div></div>';
  }

  function tipHTML() {
    return '<div class="exam-tip"><b>Mẹo:</b> bấm số trong sơ đồ để nhảy tới câu; bấm <span aria-hidden="true">⚑</span> '
      + 'để đánh dấu câu cần xem lại. Bài làm được lưu tự động trên thiết bị này.</div>';
  }

  function bottomBar() {
    return '<div class="exam-bottom"><div class="exam-bottom-in">'
      + '<span class="bottom-count" id="bottomCount">Đã làm 0/0 câu</span>'
      + '<div class="btn-row" style="gap:.4rem">'
      + '<button type="button" class="btn small ghost" data-act="prev">← Câu trước</button>'
      + '<button type="button" class="btn small ghost" data-act="next">Câu sau →</button>'
      + '<button type="button" class="btn small ghost btn-palette" data-act="open-palette">Sơ đồ</button>'
      + '<button type="button" class="btn small" data-act="submit">Nộp bài</button>'
      + '</div></div></div>';
  }

  function dialogHTML() {
    return '<dialog class="palette-dialog" id="paletteDialog"><div class="pd-inner">'
      + '<div class="pd-head"><h3>Sơ đồ câu hỏi</h3>'
      + '<button type="button" class="pd-close" data-act="close-palette" aria-label="Đóng">✕</button></div>'
      + '<div id="paletteDialogBody"></div></div></dialog>';
  }

  function updatePalette() {
    if (!state || state.phase !== 'room') return;
    var html = paletteGroupsHTML();
    var side = qs('#paletteBody');
    if (side) side.innerHTML = html;
    var dlg = qs('#paletteDialogBody');
    if (dlg) dlg.innerHTML = html;
    var stats = answerStats(state);
    var count = qs('#paletteCount');
    if (count) count.textContent = stats.done + '/' + stats.total;
    updateBottom();
  }

  function updateBottom() {
    var el = qs('#bottomCount');
    if (!el || !state) return;
    var s = answerStats(state);
    el.textContent = 'Đã làm ' + s.done + '/' + s.total + ' câu';
  }

  function updatePaletteCurrent() {
    qsa('.pal-btn').forEach(function (b) {
      var on = state.current && b.dataset.type === state.current.type && Number(b.dataset.idx) === state.current.idx;
      b.classList.toggle('current', !!on);
    });
  }

  function flatList() {
    var arr = [];
    state.data.mcq.forEach(function (_, i) { arr.push({ type: 'mcq', idx: i }); });
    state.data.tf.forEach(function (_, i) { arr.push({ type: 'tf', idx: i }); });
    state.data.short.forEach(function (_, i) { arr.push({ type: 'short', idx: i }); });
    return arr;
  }

  function scrollToQuestion(type, idx) {
    var el = document.getElementById('q-' + type + '-' + idx);
    if (!el) return;
    state.current = { type: type, idx: idx };
    updatePaletteCurrent();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function moveCurrent(delta) {
    var flat = flatList();
    if (!flat.length) return;
    var pos = 0;
    flat.forEach(function (x, i) {
      if (state.current && x.type === state.current.type && x.idx === state.current.idx) pos = i;
    });
    var next = flat[Math.max(0, Math.min(flat.length - 1, pos + delta))];
    if (next) scrollToQuestion(next.type, next.idx);
  }

  function scrollToFirstEmpty() {
    var flat = flatList();
    for (var i = 0; i < flat.length; i++) {
      if (statusOf(flat[i].type, flat[i].idx) === 'empty') {
        var t = flat[i].type, n = flat[i].idx;
        setTimeout(function () { scrollToQuestion(t, n); }, 120);
        return;
      }
    }
  }

  function tick() {
    if (!state || state.phase !== 'room') { stopTimer(); return; }
    var val = qs('#clockVal');
    if (!val) return;
    if (state.mode === 'thi') {
      var remain = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
      val.textContent = clock(remain);
      var box = qs('#clock');
      if (box) box.classList.toggle('warn', remain <= 300);
      if (remain <= 0) { stopTimer(); submitExam(true); }
    } else {
      val.textContent = clock((Date.now() - state.startedAt) / 1000);
    }
  }

  function startTimer() {
    stopTimer();
    tick();
    if (state && state.phase === 'room') timer = setInterval(tick, 1000);
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function clearSelection() {
    try { var sel = g.getSelection(); if (sel) sel.removeAllRanges(); } catch (e) { /* bỏ qua */ }
  }

  function jumpTop() {
    try { g.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }
    catch (e) { g.scrollTo(0, 0); }
  }

  function renderRoom(resumed) {
    document.body.classList.add('exam-active');
    qs('#examPageHead').hidden = true;
    qs('#examLanding').hidden = true;
    qs('#examResult').hidden = true;
    qs('#examResult').innerHTML = '';
    var room = qs('#examRoom');
    room.hidden = false;
    room.innerHTML = roomToolbar()
      + '<div class="exam-shell">' + bannerHTML(resumed)
      + '<div class="exam-layout"><div class="exam-main">'
      + sectionHTML('mcq') + sectionHTML('tf') + sectionHTML('short')
      + '</div><aside class="exam-side">' + paletteCard() + tipHTML() + '</aside></div></div>'
      + bottomBar() + dialogHTML();
    state.current = flatList()[0] || { type: 'mcq', idx: 0 };
    updatePalette();
    updateBottom();
    clearSelection();
    if (!resumed) jumpTop();
    startTimer();
    if (state && state.phase === 'room') {
      if (resumed) scrollToFirstEmpty();
      else updatePaletteCurrent();
    }
  }

  function startExam(id, mode, opts) {
    opts = opts || {};
    var meta = H.byId(id);
    if (!meta) { renderLanding(); return; }
    mode = (mode === 'luyen') ? 'luyen' : 'thi';
    var saved = opts.fresh ? null : loadProgress(id, mode);
    var s = mergeSaved(makeState(meta, mode), saved);
    s.freshStart = !!opts.fresh;
    s.scoreKey = '';
    s.cloudBaseAt = saved ? Number(saved.updatedAt || 0) : 0;
    state = s;
    state.phase = 'room';
    if (opts.fresh) removeProgress(id, mode);
    saveProgress();
    try {
      history.replaceState({ de: id, mode: mode }, '',
        location.pathname + '?de=' + encodeURIComponent(id) + '&mode=' + mode);
    } catch (e) { /* bỏ qua */ }
    renderRoom(!!saved);
    restoreCloudProgress();
  }

  /* ---------- Chấm điểm và kết quả ---------- */
  function usedSeconds() {
    if (!state) return 0;
    if (state.mode === 'thi') {
      var total = (state.data.meta.duration || 50) * 60;
      var left = Math.max(0, Math.ceil((state.deadline - Date.now()) / 1000));
      return Math.min(total, total - left);
    }
    return Math.max(0, Math.floor((Date.now() - state.startedAt) / 1000));
  }

  function computeResult() {
    var d = state.data, a = state.answers;
    var mcqCorrect = 0;
    d.mcq.forEach(function (q, i) { if (a.mcq[i] === q.answer) mcqCorrect++; });
    var tfCorrect = 0, tfTotal = 0, tfScore = 0;
    d.tf.forEach(function (q, qi) {
      var itemPoint = q.items.length ? d.per.tfQ / q.items.length : 0;
      q.items.forEach(function (it, ii) {
        tfTotal++;
        if (a.tf[qi][ii] === it.a) { tfCorrect++; tfScore += itemPoint; }
      });
    });
    var shortCorrect = 0;
    d.short.forEach(function (q, i) { if (isShortCorrect(q, a.short[i])) shortCorrect++; });
    var mcqScore = mcqCorrect * d.per.mcq;
    var shortScore = shortCorrect * d.per.short;
    return {
      mcq: { correct: mcqCorrect, total: d.mcq.length, score: round2(mcqScore), max: W.mcq },
      tf: { correct: tfCorrect, total: tfTotal, score: round2(tfScore), max: W.tf },
      short: { correct: shortCorrect, total: d.short.length, score: round2(shortScore), max: W.short },
      total: round2(mcqScore + tfScore + shortScore),
      max: d.max
    };
  }

  function pushHistory() {
    var h = lsGet(HISTORY_KEY);
    if (!Array.isArray(h)) h = [];
    var r = state.result;
    h.push({
      id: state.id, mode: state.mode, at: Date.now(), total: r.total, max: r.max,
      used: r.usedSec, auto: !!r.auto, mcq: r.mcq, tf: r.tf, short: r.short
    });
    if (h.length > 100) h = h.slice(h.length - 100);
    lsSet(HISTORY_KEY, h);
  }

  function bestFor(id) {
    var h = lsGet(HISTORY_KEY);
    if (!Array.isArray(h)) return null;
    var best = null;
    h.forEach(function (x) { if (x.id === id && (!best || x.total > best.total)) best = x; });
    return best;
  }

  function gradeOf(score, max) {
    var p = max ? score / max : 0;
    if (p >= 0.85) return 'Xuất sắc';
    if (p >= 0.7) return 'Tốt';
    if (p >= 0.55) return 'Khá';
    if (p >= 0.4) return 'Trung bình';
    return 'Cần cố gắng';
  }

  function submitExam(auto) {
    if (!state || state.phase !== 'room') return;
    if (!auto) {
      var st = answerStats(state);
      var left = st.total - st.done;
      var msg = left > 0 ? 'Còn ' + left + ' câu chưa trả lời. Nộp bài ngay?' : 'Nộp bài và chấm điểm?';
      if (!confirm(msg)) return;
    }
    state.result = computeResult();
    state.result.usedSec = usedSeconds();
    state.result.auto = !!auto;
    stopTimer();
    pushHistory();
    removeProgress(state.id, state.mode);
    state.phase = 'result';
    submitCloudScore();
    renderResult();
  }

  function partCard(label, obj, noun) {
    var suffix = ' /' + num(obj.max, 2);
    return '<div class="part-card"><h3>' + label + '</h3><b>' + score2(obj.score)
      + '<span style="font-size:.55em;color:var(--muted)">' + suffix + '</span></b>'
      + '<span>' + obj.correct + '/' + obj.total + ' ' + noun + ' đúng</span></div>';
  }

  function reviewSection(type) {
    var list = state.data[type];
    if (!list.length) return '';
    var sec = SECTION[type];
    return '<section class="exam-section"><div class="exam-section-head"><h2>Phần ' + sec.roman + ' · '
      + sec.title + '</h2><p>' + list.length + ' ' + sec.noun + ' · xem đáp án và lời giải</p></div>'
      + list.map(function (_, i) { return renderQuestion(type, i, true); }).join('') + '</section>';
  }

  function resultToolbar() {
    var meta = state.data.meta;
    return '<div class="exam-toolbar"><div class="exam-toolbar-in">'
      + '<div class="et-left"><button type="button" class="et-back" data-act="back">← Danh sách</button>'
      + '<div class="et-info"><span class="et-code">KẾT QUẢ · ' + MODE[state.mode].toUpperCase() + '</span>'
      + '<span class="et-title">' + esc(meta.code) + ' · ' + esc(meta.title) + '</span></div></div>'
      + '<div class="et-right"><span class="banner-badge hot">' + score2(state.result.total) + ' / '
      + num(state.result.max, 2) + ' điểm</span>'
      + '<button type="button" class="btn small" data-act="retry">Làm lại</button></div></div></div>';
  }

  function renderResult() {
    var r = state.result, meta = state.data.meta;
    document.body.classList.add('exam-active');
    qs('#examPageHead').hidden = true;
    qs('#examLanding').hidden = true;
    var room = qs('#examRoom');
    room.hidden = true;
    room.innerHTML = '';
    var root = qs('#examResult');
    root.hidden = false;
    root.innerHTML = resultToolbar()
      + '<div class="result-shell"><section class="result-hero">'
      + '<div class="result-score"><b>' + score2(r.total) + '</b><small>/' + num(r.max, 2) + '</small></div>'
      + '<div><span class="result-grade">' + gradeOf(r.total, r.max) + '</span>'
      + '<h2>' + esc(meta.code) + ' · ' + esc(meta.title) + '</h2>'
      + '<p>' + MODE[state.mode] + ' · ' + answerStats(state).total + ' câu'
      + (r.auto ? ' · Hết giờ, bài được nộp tự động' : '') + '</p>'
      + '<div class="result-meta"><span>Thời gian: <b>' + clock(r.usedSec) + '</b></span>'
      + '<span>Nộp lúc: <b>' + fmtDate(Date.now()) + '</b></span>'
      + '<span>Tổng điểm: <b>' + score2(r.total) + '/' + num(r.max, 2) + '</b></span></div></div></section>'
      + '<div class="result-parts">'
      + partCard('Phần I · Trắc nghiệm', r.mcq, 'câu')
      + partCard('Phần II · Đúng/Sai', r.tf, 'ý')
      + partCard('Phần III · Trả lời ngắn', r.short, 'câu')
      + '</div>'
      + '<div class="result-actions">'
      + '<button type="button" class="btn" data-act="retry">Làm lại đề này</button>'
      + '<a class="btn ghost" href="hoa-de-thi.html">Về danh sách đề</a>'
      + '<button type="button" class="btn ghost" data-act="print">In kết quả</button></div>'
      + '<div id="hoaResultLeaderboard" class="result-lb-wrap"></div>'
      + '<div class="review-head"><h2>Xem lại bài làm</h2><div class="filter-row">'
      + '<button type="button" class="filter-btn on" data-act="filter" data-filter="all">Tất cả</button>'
      + '<button type="button" class="filter-btn" data-act="filter" data-filter="right">Đúng</button>'
      + '<button type="button" class="filter-btn" data-act="filter" data-filter="wrong">Chưa đúng</button>'
      + '<button type="button" class="filter-btn" data-act="filter" data-filter="empty">Bỏ trống</button>'
      + '</div></div><div id="reviewList">' + reviewSection('mcq') + reviewSection('tf') + reviewSection('short')
      + '</div><div class="review-empty" id="reviewEmpty">Không có câu nào trong nhóm này.</div></div>';
    var lbHost = qs('#hoaResultLeaderboard');
    var c = cloudApi();
    if (lbHost && c && typeof c.mountLeaderboard === 'function') {
      c.mountLeaderboard(lbHost, cloudCategory(state.id, state.mode), {
        title: 'Bảng xếp hạng · ' + meta.code + ' · ' + meta.title,
        subtitle: MODE[state.mode] + ' · ' + score2(r.total) + '/' + num(r.max, 2) + ' điểm',
        limit: 10
      });
    }
    applyFilter('all');
    clearSelection();
    jumpTop();
  }

  function applyFilter(f) {
    var list = qs('#reviewList');
    if (!list) return;
    var shown = 0;
    qsa('.q', list).forEach(function (q) {
      var r = q.dataset.result;
      var show = f === 'all' || (f === 'wrong' && r !== 'ok') || (f === 'right' && r === 'ok') || (f === 'empty' && r === 'empty');
      q.hidden = !show;
      if (show) shown++;
    });
    qsa('.exam-section', list).forEach(function (sec) {
      var any = qsa('.q', sec).some(function (q) { return !q.hidden; });
      sec.hidden = !any;
    });
    var empty = qs('#reviewEmpty');
    if (empty) empty.classList.toggle('show', shown === 0);
    qsa('[data-act="filter"]').forEach(function (b) {
      b.classList.toggle('on', b.dataset.filter === f);
    });
  }

  /* ---------- Trang danh sách đề ---------- */
  function savedList() {
    var out = [];
    H.meta.forEach(function (meta) {
      ['thi', 'luyen'].forEach(function (mode) {
        var p = loadProgress(meta.id, mode);
        if (p && p.updatedAt) out.push({ meta: meta, mode: mode, progress: p });
      });
    });
    out.sort(function (a, b) { return (b.progress.updatedAt || 0) - (a.progress.updatedAt || 0); });
    return out;
  }

  function historyList() {
    var h = lsGet(HISTORY_KEY);
    return Array.isArray(h) ? h : [];
  }

  function totalQuestions() {
    return H.meta.reduce(function (n, meta) {
      var d = dataOf(meta);
      return n + d.mcq.length + d.tf.length + d.short.length;
    }, 0);
  }

  function heroHTML() {
    var main = H.progressList();
    var bonus = H.meta.filter(function (m) { return !!m.bonus; }).length;
    var durations = H.meta.map(function (m) { return Number(m.duration) || 0; }).filter(Boolean);
    var minDuration = durations.length ? Math.min.apply(null, durations) : 45;
    var maxDuration = durations.length ? Math.max.apply(null, durations) : 50;
    var durationText = minDuration === maxDuration ? String(minDuration) : (minDuration + '–' + maxDuration);
    return '<div class="exam-hero"><div><span class="tag">HÓA 12 · ĐỀ TƯƠNG TÁC</span>'
      + '<h2>Luyện đề Hóa 12 như thi thật</h2>'
      + '<p>' + main.length + ' bộ đề chính và ' + bonus + ' đề chuyên, bám sát cấu trúc giữa học kì 1: trắc nghiệm, đúng/sai và trả lời ngắn. '
      + 'Thi thử có đếm ngược; luyện tập chấm ngay từng câu kèm lời giải. Tiến trình được lưu tự động và đồng bộ khi đăng nhập.</p>'
      + '<div class="kpis"><span><b>' + main.length + '</b> đề chính</span><span><b>+' + bonus + '</b> đề chuyên</span>'
      + '<span>Đáp án đã đối chiếu</span><span>Tự động lưu bài</span></div></div>'
      + '<div class="exam-hero-stats">'
      + '<div class="exam-hero-stat"><b>' + H.meta.length + '</b><span>Bộ đề</span></div>'
      + '<div class="exam-hero-stat"><b>' + totalQuestions() + '</b><span>Câu hỏi</span></div>'
      + '<div class="exam-hero-stat"><b>10</b><span>Thang điểm</span></div>'
      + '<div class="exam-hero-stat"><b>' + durationText + '</b><span>Phút/đề</span></div>'
      + '</div></div>';
  }

  function modeInfoHTML() {
    return '<div class="mode-picker">'
      + '<div class="mode-btn static"><span class="mode-btn-icon" aria-hidden="true">⏱</span><div>'
      + '<strong>Thi thử</strong><small>Đếm ngược theo thời gian đề gốc, không lộ đáp án. Nộp bài mới chấm điểm và mở lời giải chi tiết.</small></div></div>'
      + '<div class="mode-btn static"><span class="mode-btn-icon" aria-hidden="true">🎯</span><div>'
      + '<strong>Luyện tập</strong><small>Trắc nghiệm chấm ngay khi chọn; đúng/sai và trả lời ngắn có nút kiểm tra. Không giới hạn thời gian.</small></div></div>'
      + '</div>';
  }

  function savedHTML(list) {
    var rows = list.map(function (item) {
      var s = mergeSaved(makeState(item.meta, item.mode), item.progress);
      var st = answerStats(s);
      return '<div class="progress-item"><div><strong>' + esc(item.meta.code) + ' · ' + esc(item.meta.title)
        + '</strong><small>' + MODE[item.mode] + ' · Đã làm ' + st.done + '/' + st.total + ' câu · Lưu lúc '
        + fmtDate(item.progress.updatedAt) + '</small></div><div class="progress-actions">'
        + '<button type="button" class="btn small" data-act="resume" data-de="' + item.meta.id + '" data-mode="' + item.mode + '">Tiếp tục</button>'
        + '<button type="button" class="btn small ghost" data-act="discard" data-de="' + item.meta.id + '" data-mode="' + item.mode + '">Bỏ</button>'
        + '</div></div>';
    }).join('');
    return '<section class="progress-panel"><h2 class="h2-rule">Bài đang làm dở</h2>'
      + '<div class="progress-list">' + rows + '</div></section>';
  }

  function cardHTML(meta) {
    var d = dataOf(meta);
    var color = COLORS[meta.section] || '#1b4aa5';
    var best = bestFor(meta.id);
    var inProgress = false;
    ['thi', 'luyen'].forEach(function (mode) { if (loadProgress(meta.id, mode)) inProgress = true; });
    var bestHTML = best ? 'Cao nhất: <b>' + score2(best.total) + '</b>' : 'Chưa làm lần nào';
    return '<article class="exam-card' + (meta.bonus ? ' bonus' : '') + '" style="--card:' + color + '">'
      + '<div class="exam-card-top"><span class="exam-code">' + esc(meta.code) + ' · ' + esc(meta.tag) + '</span>'
      + '<span class="exam-tag">' + meta.duration + ' phút</span></div>'
      + '<h3>' + esc(meta.title) + '</h3><p>' + esc(meta.desc) + '</p>'
      + '<div class="exam-meta"><span>' + d.mcq.length + ' TN</span><span>' + d.tf.length + ' Đ/S</span>'
      + '<span>' + d.short.length + ' TLN</span><span>' + num(d.max, 2) + ' điểm</span></div>'
      + '<div class="exam-card-foot"><div class="exam-card-stats"><span class="best-score">' + bestHTML + '</span>'
      + (inProgress ? '<span class="saved-badge">Đang làm dở</span>' : '') + '</div>'
      + '<div class="btn-row" style="gap:.45rem">'
      + '<button type="button" class="btn small" data-act="start" data-de="' + meta.id + '" data-mode="thi">Thi thử</button>'
      + '<button type="button" class="btn small ghost" data-act="start" data-de="' + meta.id + '" data-mode="luyen">Luyện tập</button>'
      + '</div></div></article>';
  }

  function sectionsHTML() {
    var out = '', n = 0;
    H.sections.forEach(function (sec) {
      var list = H.meta.filter(function (m) { return m.section === sec.id; });
      if (!list.length) return;
      out += '<h2 class="h2-rule"' + (n ? ' style="margin-top:3rem;"' : '') + '>' + esc(sec.title) + '</h2>'
        + '<p class="section-lead">' + esc(sec.desc) + '</p><div class="exam-grid">'
        + list.map(cardHTML).join('') + '</div>';
      n++;
    });
    return out;
  }

  function historyHTML() {
    var list = historyList().slice().reverse().slice(0, 12);
    var head = '<section class="history-panel"><div class="history-head"><h3>Lịch sử làm bài</h3>';
    if (!list.length) {
      return '<h2 class="h2-rule" style="margin-top:3rem;">Lịch sử làm bài</h2>'
        + '<p class="section-lead">Chưa có lượt làm bài nào. Chọn một đề bên trên để bắt đầu.</p>';
    }
    var rows = list.map(function (x) {
      var meta = H.byId(x.id);
      if (!meta) return '';
      return '<tr><td>' + fmtDate(x.at) + '</td><td>' + esc(meta.code) + ' · ' + esc(meta.title) + '</td>'
        + '<td>' + MODE[x.mode] + (x.auto ? ' · hết giờ' : '') + '</td>'
        + '<td><b>' + score2(x.total) + '</b>/' + num(x.max, 2) + '</td><td>' + clock(x.used) + '</td></tr>';
    }).join('');
    return head + '<button type="button" class="btn small ghost" data-act="clear-history">Xoá lịch sử</button></div>'
      + '<div class="table-wrap"><table class="history-table"><thead><tr><th>Thời gian</th><th>Đề</th>'
      + '<th>Chế độ</th><th>Điểm</th><th>Thời gian làm</th></tr></thead><tbody>' + rows
      + '</tbody></table></div></section>';
  }

  function scoringHTML() {
    return '<h2 class="h2-rule" style="margin-top:3rem;">Cách tính điểm</h2>'
      + '<div class="score-rules">'
      + '<div class="score-rule"><b>4,5</b><strong>18 câu trắc nghiệm</strong><span>0,25 điểm/câu</span></div>'
      + '<div class="score-rule"><b>4</b><strong>4 câu đúng/sai</strong><span>1 điểm/câu · 0,25 điểm/ý</span></div>'
      + '<div class="score-rule"><b>1,5</b><strong>6 câu trả lời ngắn</strong><span>0,25 điểm/câu</span></div>'
      + '</div><p class="section-lead" style="margin-top:1rem;">Tổng 10 điểm. Điểm đúng/sai tính thẳng 0,25 điểm cho mỗi ý đúng. '
      + 'Đề Hồ Thị Hải có thời gian 45 phút; các đề còn lại 50 phút.</p>';
  }

  function leaderboardSectionHTML() {
    var options = H.meta.map(function (meta) {
      return '<option value="' + meta.id + '"' + (meta.id === lbDe ? ' selected' : '') + '>'
        + esc(meta.code + ' · ' + meta.title) + '</option>';
    }).join('');
    return '<section class="exam-lb-section"><h2 class="h2-rule">Bảng xếp hạng theo đề</h2>'
      + '<p class="exam-lb-lead">Mỗi đề và mỗi chế độ có bảng riêng. Điểm cao nhất của mỗi tài khoản được giữ lại; '
      + 'đăng nhập Firebase để thi đấu trên mọi thiết bị.</p>'
      + '<div class="lb-picker"><label>Chọn đề<select id="lbExamSelect">' + options + '</select></label>'
      + '<label>Chế độ<select id="lbModeSelect">'
      + '<option value="thi"' + (lbMode === 'thi' ? ' selected' : '') + '>Thi thử</option>'
      + '<option value="luyen"' + (lbMode === 'luyen' ? ' selected' : '') + '>Luyện tập</option>'
      + '</select></label></div><div id="hoaLeaderboard"></div></section>';
  }

  function mountHoaLeaderboard() {
    var host = qs('#hoaLeaderboard');
    var c = cloudApi();
    var meta = H.byId(lbDe);
    if (!host || !c || typeof c.mountLeaderboard !== 'function' || !meta) return;
    c.mountLeaderboard(host, cloudCategory(lbDe, lbMode), {
      title: 'Bảng xếp hạng · ' + meta.code + ' · ' + meta.title,
      subtitle: MODE[lbMode] + ' · điểm cao nhất của mỗi tài khoản',
      limit: 10
    });
  }

  function renderLanding() {
    stopTimer();
    document.body.classList.remove('exam-active');
    qs('#examPageHead').hidden = false;
    qs('#examLanding').hidden = false;
    var room = qs('#examRoom');
    room.hidden = true;
    room.innerHTML = '';
    var result = qs('#examResult');
    result.hidden = true;
    result.innerHTML = '';
    var saved = savedList();
    qs('#examLanding').innerHTML = heroHTML() + modeInfoHTML()
      + (saved.length ? savedHTML(saved) : '') + sectionsHTML()
      + leaderboardSectionHTML() + historyHTML() + scoringHTML();
    mountHoaLeaderboard();
    clearSelection();
    jumpTop();
  }

  function goLanding() {
    stopTimer();
    state = null;
    try { history.replaceState({}, '', location.pathname); } catch (e) { /* bỏ qua */ }
    renderLanding();
  }

  /* ---------- Sự kiện ---------- */
  function onClick(e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.getAttribute('data-act');

    if (act === 'start' || act === 'resume') {
      startExam(t.getAttribute('data-de'), t.getAttribute('data-mode'));
      return;
    }
    if (act === 'discard') {
      if (!confirm('Xoá bài làm đang lưu của đề này?')) return;
      removeProgress(t.getAttribute('data-de'), t.getAttribute('data-mode'));
      renderLanding();
      return;
    }
    if (act === 'clear-history') {
      if (!confirm('Xoá toàn bộ lịch sử làm bài trên thiết bị này?')) return;
      lsDel(HISTORY_KEY);
      renderLanding();
      return;
    }
    if (act === 'back') {
      if (state && state.phase === 'room') {
        var st = answerStats(state);
        if (st.done > 0 && !confirm('Thoát ra danh sách? Bài làm đã được lưu tự động, bạn có thể tiếp tục sau.')) return;
      }
      goLanding();
      return;
    }
    if (act === 'submit') { submitExam(false); return; }
    if (act === 'restart') {
      if (!state) return;
      if (!confirm('Bắt đầu lại từ đầu? Bài làm hiện tại sẽ bị xoá.')) return;
      var id = state.id, mode = state.mode;
      removeProgress(id, mode);
      startExam(id, mode, { fresh: true });
      return;
    }
    if (act === 'retry') {
      if (!state) return;
      startExam(state.id, state.mode, { fresh: true });
      return;
    }
    if (act === 'print') { g.print(); return; }
    if (act === 'filter') { applyFilter(t.getAttribute('data-filter')); return; }

    if (act === 'open-palette') {
      var dlg = qs('#paletteDialog');
      if (dlg && !dlg.open) dlg.showModal();
      return;
    }
    if (act === 'close-palette') {
      var d2 = qs('#paletteDialog');
      if (d2 && d2.open) d2.close();
      return;
    }
    if (act === 'jump') {
      var jt = t.getAttribute('data-type'), ji = Number(t.getAttribute('data-idx'));
      var d3 = qs('#paletteDialog');
      if (d3 && d3.open) d3.close();
      scrollToQuestion(jt, ji);
      return;
    }
    if (act === 'prev') { moveCurrent(-1); return; }
    if (act === 'next') { moveCurrent(1); return; }

    if (!state || state.phase !== 'room') return;

    if (act === 'opt') {
      var oi = Number(t.getAttribute('data-idx')), oo = Number(t.getAttribute('data-i'));
      if (state.mode === 'luyen' && state.answers.mcq[oi] !== null) return;
      state.answers.mcq[oi] = oo;
      saveProgress();
      replaceQuestion('mcq', oi, false);
      updatePalette();
      return;
    }
    if (act === 'tf') {
      var ti = Number(t.getAttribute('data-idx'));
      var ii = Number(t.getAttribute('data-i'));
      if (state.mode === 'luyen' && state.checked.tf[ti]) return;
      state.answers.tf[ti][ii] = t.getAttribute('data-v') === '1';
      saveProgress();
      replaceQuestion('tf', ti, false);
      updatePalette();
      return;
    }
    if (act === 'check-tf') {
      var ci = Number(t.getAttribute('data-idx'));
      state.checked.tf[ci] = true;
      saveProgress();
      replaceQuestion('tf', ci, false);
      updatePalette();
      return;
    }
    if (act === 'check-short') {
      var si = Number(t.getAttribute('data-idx'));
      if (!String(state.answers.short[si]).trim()) {
        var inp = qs('.short-input[data-idx="' + si + '"]');
        if (inp) inp.focus();
        return;
      }
      state.checked.short[si] = true;
      saveProgress();
      replaceQuestion('short', si, false);
      updatePalette();
      return;
    }
    if (act === 'flag') {
      var ft = t.getAttribute('data-type'), fi = Number(t.getAttribute('data-idx'));
      var key = ft + '-' + fi;
      state.flags[key] = !state.flags[key];
      t.setAttribute('aria-pressed', state.flags[key] ? 'true' : 'false');
      saveProgress();
      updatePalette();
    }
  }

  function onInput(e) {
    var el = e.target.closest('[data-act="short"]');
    if (!el || !state || state.phase !== 'room') return;
    var idx = Number(el.getAttribute('data-idx'));
    if (state.mode === 'luyen' && state.checked.short[idx]) return;
    state.answers.short[idx] = el.value;
    saveProgress();
    updatePalette();
    updateBottom();
  }

  function onChange(e) {
    if (!e.target) return;
    if (e.target.id === 'lbExamSelect') {
      lbDe = H.byId(e.target.value) ? e.target.value : lbDe;
      mountHoaLeaderboard();
    } else if (e.target.id === 'lbModeSelect') {
      lbMode = e.target.value === 'luyen' ? 'luyen' : 'thi';
      mountHoaLeaderboard();
    }
  }

  function onScroll() {
    if (scrollTick || !state || state.phase !== 'room') return;
    scrollTick = true;
    g.requestAnimationFrame(function () {
      scrollTick = false;
      if (!state || state.phase !== 'room') return;
      var list = qsa('#examRoom .q');
      var cur = null;
      for (var i = 0; i < list.length; i++) {
        if (list[i].getBoundingClientRect().top <= 150) cur = list[i];
        else break;
      }
      if (!cur) cur = list[0] || null;
      if (cur) {
        var type = cur.getAttribute('data-type'), idx = Number(cur.getAttribute('data-idx'));
        if (!state.current || state.current.type !== type || state.current.idx !== idx) {
          state.current = { type: type, idx: idx };
          updatePaletteCurrent();
        }
      }
    });
  }

  function flushCloudProgress() {
    var c = cloudApi();
    if (!state || !c || typeof c.flushProgress !== 'function') return;
    Promise.resolve(c.flushProgress(cloudCategory(state.id, state.mode))).catch(function () { /* bỏ qua */ });
  }

  function init() {
    var headNote = qs('#examPageHead p');
    if (headNote) {
      var mainCount = H.progressList().length;
      var bonusCount = H.meta.filter(function (m) { return !!m.bonus; }).length;
      headNote.textContent = H.meta.length + ' bộ đề tương tác gồm ' + mainCount + ' đề chính và ' + bonusCount
        + ' đề chuyên. Thi thử có đếm giờ, luyện tập chấm ngay, xem lời giải chi tiết, lưu tiến trình và có bảng xếp hạng riêng từng đề.';
    }

    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('change', onChange);
    g.addEventListener('pagehide', function () {
      if (state && state.phase === 'room') { saveProgress(); flushCloudProgress(); }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden' && state && state.phase === 'room') flushCloudProgress();
    });
    document.addEventListener('click', function (e) {
      var d = qs('#paletteDialog');
      if (d && d.open && e.target === d) d.close();
    });
    g.addEventListener('scroll', onScroll, { passive: true });

    var c = cloudApi();
    if (c && typeof c.onAuthChange === 'function') {
      c.onAuthChange(function () {
        if (state && state.phase === 'result') submitCloudScore();
        syncCloudProgress();
        if (state && state.phase === 'room') restoreCloudProgress();
      });
    }
    g.addEventListener('ontap:authchange', function () {
      if (state && state.phase === 'result') submitCloudScore();
      syncCloudProgress();
      if (state && state.phase === 'room') restoreCloudProgress();
    });
    if (c && c.ready && typeof c.ready.then === 'function') c.ready.then(syncCloudProgress);

    var params = new URLSearchParams(location.search);
    var de = params.get('de');
    var mode = params.get('mode') === 'luyen' ? 'luyen' : 'thi';
    if (de && H.byId(de)) startExam(de, mode);
    else renderLanding();
  }

  function boot() {
    if (boot.started) return;
    boot.started = true;
    if (g.OntapContentReady && g.OntapContent && g.OntapContent.state && !g.OntapContent.state.ready) {
      g.OntapContentReady.then(init, init);
      return;
    }
    init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
