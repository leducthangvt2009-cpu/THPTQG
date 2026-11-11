/* ==========================================================================
   Ôn tập THPT · Từ vựng & Idioms
   --------------------------------------------------------------------------
   - tu-vung.html      : trang chọn 2 bộ (Từ vựng / Idioms)
   - tu-vung-hoc.html  : trang học, đọc ?type=vocab|idiom
   - Dữ liệu tĩnh nằm trong js/vocab-data.js; mục admin tạo (id >= 1000)
     được hợp nhất từ window.OntapContent.state.vocab.
   ========================================================================== */
(function (g) {
  'use strict';

  var BASE_TOPICS = {
    p1: { label: 'Idioms 1–54', type: 'idiom' },
    p2: { label: 'Idioms 55–109', type: 'idiom' },
    p3: { label: 'Idioms 110–165', type: 'idiom' },
    p4: { label: 'Idioms 166–216', type: 'idiom' },
    p5: { label: 'Idioms 217–259', type: 'idiom' },
    p6: { label: 'Idioms 260–302', type: 'idiom' },
    test: { label: 'Từ vựng Đề thi', type: 'vocab' }
  };
  var BASE_ORDER = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'test'];
  var STORE_KEY = 'ontap:vocab:mastered';
  var REPEAT_KEY = 'ontap:vocab:repeat';

  var VOCAB = [];
  var pageType = 'idiom';
  var currentTopic = 'all';
  var filtered = [];
  var idx = 0;
  var flipped = false;
  var mastered = {};
  var repeatMap = {};
  var booted = false;

  function text(value) {
    return String(value === undefined || value === null ? '' : value);
  }

  function esc(value) {
    return text(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function typeOf(item) {
    if (item && (item.type === 'idiom' || item.type === 'vocab')) return item.type;
    if (item && BASE_TOPICS[item.topic]) return BASE_TOPICS[item.topic].type;
    return 'vocab';
  }

  function topicLabelOf(item) {
    if (item && item.topicLabel) return item.topicLabel;
    if (item && BASE_TOPICS[item.topic]) return BASE_TOPICS[item.topic].label;
    return 'Chủ đề mới';
  }

  function buildStatic() {
    var idioms = Array.isArray(g.VOCAB_IDIOMS) ? g.VOCAB_IDIOMS : [];
    idioms.forEach(function (pair, i) {
      var num = i + 1;
      var topic = num <= 54 ? 'p1' : num <= 109 ? 'p2' : num <= 165 ? 'p3' : num <= 216 ? 'p4' : num <= 259 ? 'p5' : 'p6';
      VOCAB.push({
        id: num,
        word: text(pair[0]),
        ipa: 'Idiom #' + num,
        pos: 'Idiom #' + num,
        topic: topic,
        topicLabel: BASE_TOPICS[topic].label,
        type: 'idiom',
        meaning: text(pair[1]),
        ex: 'Thành ngữ số ' + num + ' trong bảng Recap On Idioms/Phrases.'
      });
    });

    var extras = Array.isArray(g.VOCAB_EXTRAS) ? g.VOCAB_EXTRAS : [];
    extras.forEach(function (item) {
      var id = parseInt(item && item.id, 10);
      if (!isFinite(id) || id <= 0) return;
      VOCAB.push({
        id: id,
        word: text(item.word),
        ipa: text(item.ipa),
        pos: text(item.pos) || 'Từ vựng',
        topic: 'test',
        topicLabel: BASE_TOPICS.test.label,
        type: 'vocab',
        meaning: text(item.meaning),
        ex: text(item.ex)
      });
    });
  }

  function mergeDynamic() {
    var content = g.OntapContent && g.OntapContent.state;
    var list = content && Array.isArray(content.vocab) ? content.vocab : [];
    if (!list.length) return;

    var seen = {};
    VOCAB.forEach(function (item) { seen[String(item.id)] = true; });

    list.forEach(function (raw) {
      if (!raw) return;
      var id = parseInt(raw.id, 10);
      if (!isFinite(id) || id <= 0 || seen[String(id)]) return;
      seen[String(id)] = true;

      var item = {
        id: id,
        word: text(raw.word),
        ipa: text(raw.ipa),
        pos: text(raw.pos) || 'Từ vựng',
        topic: text(raw.topic) || 'admin',
        topicLabel: text(raw.topicLabel),
        type: raw.type === 'idiom' || raw.type === 'vocab' ? raw.type : '',
        meaning: text(raw.meaning),
        ex: text(raw.ex)
      };
      item.type = typeOf(item);
      VOCAB.push(item);
    });
  }

  function allOfType(type) {
    return VOCAB.filter(function (item) { return typeOf(item) === type; });
  }

  function topicsFor(type) {
    var map = {};
    var list = [];

    allOfType(type).forEach(function (item) {
      var id = item.topic;
      if (!id) return;
      if (!map[id]) {
        map[id] = {
          id: id,
          label: BASE_TOPICS[id] ? BASE_TOPICS[id].label : topicLabelOf(item),
          base: !!BASE_TOPICS[id],
          count: 0
        };
        list.push(map[id]);
      }
      map[id].count += 1;
    });

    var base = BASE_ORDER.filter(function (id) {
      return BASE_TOPICS[id].type === type;
    }).map(function (id) {
      return map[id];
    }).filter(Boolean);

    var extra = list.filter(function (topic) {
      return BASE_ORDER.indexOf(topic.id) === -1;
    }).sort(function (a, b) {
      return a.label.localeCompare(b.label, 'vi');
    });

    return base.concat(extra);
  }

  function readStore(key) {
    try { return JSON.parse(g.localStorage.getItem(key) || '{}'); } catch (e) { return {}; }
  }

  function writeStore(key, value) {
    try { g.localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bộ nhớ bị chặn */ }
  }

  function applyFilter() {
    var list = allOfType(pageType);
    if (currentTopic === 'all') {
      filtered = list.slice();
    } else if (currentTopic === 'unmastered') {
      filtered = list.filter(function (item) { return !mastered[item.id]; });
    } else {
      filtered = list.filter(function (item) { return item.topic === currentTopic; });
    }
  }

  function renderAppendix() {
    var host = document.getElementById('appendix-col');
    if (!host) return;

    var list = allOfType(pageType);
    var unmastered = list.filter(function (item) { return !mastered[item.id]; }).length;
    var topics = topicsFor(pageType);

    var html = '<h2>Phụ lục</h2><div class="appendix-list">' +
      '<button type="button" class="appendix-btn' + (currentTopic === 'all' ? ' active' : '') + '" data-topic="all">' +
      '<span>Tất cả</span> <span class="appendix-count">' + list.length + '</span></button>';

    topics.forEach(function (topic) {
      html += '<button type="button" class="appendix-btn' + (currentTopic === topic.id ? ' active' : '') + '" data-topic="' + esc(topic.id) + '">' +
        '<span>' + esc(topic.label) + '</span> <span class="appendix-count">' + topic.count + '</span></button>';
    });

    html += '<button type="button" class="appendix-btn appendix-btn--unmastered' + (currentTopic === 'unmastered' ? ' active' : '') + '" data-topic="unmastered">' +
      '<span>Chưa thuộc</span> <span class="appendix-count">' + unmastered + '</span></button>' +
      '</div>';

    host.innerHTML = html;
  }

  function updateKPI() {
    var list = allOfType(pageType);
    var done = list.filter(function (item) { return !!mastered[item.id]; }).length;
    var a = document.getElementById('mastered-count');
    var b = document.getElementById('total-count');
    if (a) a.textContent = done;
    if (b) b.textContent = list.length;
  }

  function renderFlashcard() {
    var card = document.getElementById('fc-card');
    var frontBody = document.getElementById('fc-body-front');
    var backBody = document.getElementById('fc-body-back');
    var btnMaster = document.getElementById('btn-master');
    if (!card || !frontBody || !backBody) return;

    updateKPI();
    card.classList.toggle('is-flipped', flipped);

    if (!filtered.length) {
      document.getElementById('fc-index-front').textContent = '0 / 0';
      document.getElementById('fc-index-back').textContent = '0 / 0';
      frontBody.innerHTML = '<p class="fc-meaning">Bạn đã thuộc hết các mục trong phụ lục này!</p>';
      backBody.innerHTML = '<p class="fc-meaning">Bạn đã thuộc hết các mục trong phụ lục này!</p>';
      if (btnMaster) btnMaster.textContent = '✓ Đánh dấu đã thuộc';
      return;
    }

    if (idx >= filtered.length) idx = 0;
    if (idx < 0) idx = filtered.length - 1;

    var item = filtered[idx];
    var isDone = !!mastered[item.id];
    var repCount = repeatMap[item.id] || 0;
    var indexText = 'THẺ ' + (idx + 1) + ' / ' + filtered.length;

    document.getElementById('fc-index-front').textContent = indexText;
    document.getElementById('fc-index-back').textContent = indexText;

    var statusBadge = '';
    if (isDone) {
      statusBadge = '<span class="fc-status-badge">✓ Đã thuộc</span>';
    } else if (repCount > 0) {
      statusBadge = '<span class="fc-repeat-badge">↻ Đang lặp lại để nhớ (Lần ' + repCount + ')</span>';
    }

    frontBody.innerHTML =
      statusBadge +
      '<span class="fc-pos">' + esc(item.pos) + '</span>' +
      '<h2 class="fc-word">' + esc(item.word) + '</h2>' +
      (item.ipa !== item.pos ? '<div class="fc-ipa">' + esc(item.ipa) + '</div>' : '') +
      '<div class="fc-hint">Bấm vào thẻ hoặc nhấn phím Space để lật xem nghĩa</div>';

    backBody.innerHTML =
      statusBadge +
      '<span class="fc-pos">' + esc(item.word) + '</span>' +
      '<p class="fc-meaning">' + esc(item.meaning) + '</p>' +
      '<p class="fc-example">' + esc(item.ex) + '</p>' +
      '<div class="fc-hint">Bấm lại vào thẻ để quay về mặt trước</div>';

    if (btnMaster) {
      btnMaster.textContent = isDone ? '✓ Đã thuộc (Bấm để bỏ)' : '✓ Đánh dấu đã thuộc';
      btnMaster.className = isDone ? 'btn small ghost' : 'btn small';
    }
  }

  function renderGrid() {
    var grid = document.getElementById('vocab-grid');
    var countEl = document.getElementById('grid-count');
    var input = document.getElementById('vocab-search');
    if (!grid) return;

    var q = text(input && input.value).trim().toLowerCase();
    var base = allOfType(pageType).filter(function (item) {
      if (currentTopic === 'unmastered') return !mastered[item.id];
      if (currentTopic !== 'all') return item.topic === currentTopic;
      return true;
    });

    var list = base.filter(function (item) {
      if (!q) return true;
      return text(item.word).toLowerCase().indexOf(q) !== -1 ||
        text(item.meaning).toLowerCase().indexOf(q) !== -1 ||
        text(item.pos).toLowerCase().indexOf(q) !== -1 ||
        String(item.id) === q;
    });

    if (countEl) countEl.textContent = list.length;

    if (!list.length) {
      grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><p>Không tìm thấy mục phù hợp.</p></div>';
      return;
    }

    grid.innerHTML = list.map(function (item) {
      var done = !!mastered[item.id];
      var rep = repeatMap[item.id] || 0;
      return '<article class="vcard' + (done ? ' mastered' : '') + '">' +
        '<div class="vcard-top"><b>' + esc(item.word) + '</b><span class="fc-pos">' + esc(item.pos) + '</span></div>' +
        (done ? '<div class="vcard-status is-done">✓ Đã thuộc</div>' : (rep ? '<div class="vcard-status is-repeat">↻ Cần ôn lại (' + rep + ')</div>' : '')) +
        '<div class="vcard-meaning">' + esc(item.meaning) + '</div>' +
        '</article>';
    }).join('');
  }

  function renderAll() {
    renderAppendix();
    renderFlashcard();
    renderGrid();
  }

  function speakCurrent() {
    if (!filtered.length || !('speechSynthesis' in g)) return;
    if (idx < 0) idx = 0;
    if (idx >= filtered.length) idx = filtered.length - 1;
    g.speechSynthesis.cancel();
    var cleanText = filtered[idx].word.replace(/\(.*?\)/g, '').replace(/\//g, ' or ');
    var u = new g.SpeechSynthesisUtterance(cleanText);
    u.lang = 'en-US';
    u.rate = 0.9;
    g.speechSynthesis.speak(u);
  }

  function selectTopic(topic) {
    currentTopic = topic;
    applyFilter();
    idx = 0;
    flipped = false;
    renderAll();
  }

  function initStudy() {
    var match = /[?&]type=(vocab|idiom)/.exec(g.location.search);
    pageType = match ? match[1] : 'idiom';

    mastered = readStore(STORE_KEY);
    repeatMap = readStore(REPEAT_KEY);

    var list = allOfType(pageType);
    var noun = pageType === 'idiom' ? 'Idioms' : 'Từ vựng';

    document.title = noun + ' · Ôn tập THPT';
    var title = document.getElementById('vocab-title');
    if (title) title.textContent = 'Ô đất: ' + noun;
    var lead = document.getElementById('vocab-lead');
    if (lead) {
      lead.textContent = pageType === 'idiom'
        ? 'Trọn bộ ' + list.length + ' thành ngữ/idiom trọng tâm, chia theo 6 phụ lục. Lật thẻ, nghe phát âm, đánh dấu đã thuộc và ôn lại các mục chưa nhớ.'
        : list.length + ' mục từ vựng, cụm động từ và thành ngữ từ đề thi, kèm các chủ đề bổ sung. Lật thẻ, nghe phát âm và đánh dấu tiến trình.';
    }
    var kind = document.getElementById('fc-kind-front');
    if (kind) kind.textContent = 'MẶT TRƯỚC · ' + (pageType === 'idiom' ? 'THÀNH NGỮ' : 'TỪ VỰNG');
    var search = document.getElementById('vocab-search');
    if (search) search.placeholder = pageType === 'idiom' ? 'Tìm idiom hoặc nghĩa tiếng Việt...' : 'Tìm từ tiếng Anh hoặc nghĩa tiếng Việt...';

    applyFilter();
    renderAll();

    var card = document.getElementById('fc-card');
    if (card) {
      card.addEventListener('click', function () {
        flipped = !flipped;
        renderFlashcard();
      });
    }

    var prev = document.getElementById('btn-prev');
    if (prev) prev.addEventListener('click', function () { idx--; flipped = false; renderFlashcard(); });

    var next = document.getElementById('btn-next');
    if (next) next.addEventListener('click', function () { idx++; flipped = false; renderFlashcard(); });

    var speak = document.getElementById('btn-speak');
    if (speak) speak.addEventListener('click', speakCurrent);

    var unmaster = document.getElementById('btn-unmaster');
    if (unmaster) {
      unmaster.addEventListener('click', function () {
        if (!filtered.length) return;
        var item = filtered[idx];
        delete mastered[item.id];
        repeatMap[item.id] = (repeatMap[item.id] || 0) + 1;
        writeStore(STORE_KEY, mastered);
        writeStore(REPEAT_KEY, repeatMap);

        var pos1 = Math.min(idx + 3, filtered.length);
        filtered.splice(pos1, 0, item);
        var pos2 = Math.min(idx + 7, filtered.length);
        filtered.splice(pos2, 0, item);

        idx++;
        flipped = false;
        renderAll();
      });
    }

    var master = document.getElementById('btn-master');
    if (master) {
      master.addEventListener('click', function () {
        if (!filtered.length) return;
        var item = filtered[idx];
        mastered[item.id] = 1;
        delete repeatMap[item.id];
        writeStore(STORE_KEY, mastered);
        writeStore(REPEAT_KEY, repeatMap);

        for (var i = filtered.length - 1; i > idx; i--) {
          if (filtered[i].id === item.id) filtered.splice(i, 1);
        }

        if (currentTopic === 'unmastered') {
          applyFilter();
        } else {
          idx++;
        }
        flipped = false;
        renderAll();
      });
    }

    var shuffle = document.getElementById('btn-shuffle');
    if (shuffle) {
      shuffle.addEventListener('click', function () {
        filtered.sort(function () { return Math.random() - 0.5; });
        idx = 0;
        flipped = false;
        renderFlashcard();
        renderGrid();
      });
    }

    var appendix = document.getElementById('appendix-col');
    if (appendix) {
      appendix.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-topic]');
        if (!btn) return;
        selectTopic(btn.getAttribute('data-topic'));
      });
    }

    if (search) search.addEventListener('input', renderGrid);

    g.addEventListener('keydown', function (e) {
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON' || tag === 'A') return;
      if (e.code === 'Space') {
        e.preventDefault();
        flipped = !flipped;
        renderFlashcard();
      } else if (e.code === 'ArrowRight') {
        idx++;
        flipped = false;
        renderFlashcard();
      } else if (e.code === 'ArrowLeft') {
        idx--;
        flipped = false;
        renderFlashcard();
      }
    });
  }

  function initLanding() {
    var counts = { vocab: 0, idiom: 0 };
    VOCAB.forEach(function (item) { counts[typeOf(item)] += 1; });

    var nodes = document.querySelectorAll('[data-vocab-count]');
    Array.prototype.forEach.call(nodes, function (node) {
      var type = node.getAttribute('data-vocab-count');
      if (counts[type] !== undefined) node.textContent = counts[type] + ' mục';
    });

    var total = document.querySelectorAll('[data-vocab-total]');
    Array.prototype.forEach.call(total, function (node) {
      node.textContent = VOCAB.length + ' mục';
    });
  }

  function boot() {
    if (booted) return;
    booted = true;
    buildStatic();
    mergeDynamic();
    if (document.body.getAttribute('data-vocab-page') === 'study') initStudy();
    else initLanding();
  }

  if (g.OntapContentReady && g.OntapContent && g.OntapContent.state && !g.OntapContent.state.ready) {
    g.OntapContentReady.then(boot, boot);
  } else {
    boot();
  }
})(window);
