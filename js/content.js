/* ==========================================================================
   Ôn tập THPT · Nội dung động
   --------------------------------------------------------------------------
   - Nội dung do quản trị viên tạo được lưu trong thư mục content/ của repo.
   - Trang người dùng đọc bản mới nhất từ GitHub Raw (có dự phòng bản cùng
     miền và bản lưu trong localStorage nếu mạng lỗi).
   - File này chỉ hợp nhất nội dung động vào dữ liệu tĩnh sẵn có:
       + window.TESTS        (đề Tiếng Anh)
       + window.HoaExams     (đề Hóa học)
       + OntapContent.state.vocab (trang Từ vựng tự đọc)
   ========================================================================== */
(function (g) {
  'use strict';

  var REPO = 'leducthangvt2009-cpu/THPTQG';
  var BRANCH = 'main';
  var RAW_BASE = 'https://raw.githubusercontent.com/' + REPO + '/' + BRANCH + '/content/';
  var LOCAL_BASE = 'content/';
  var CACHE_KEY = 'ontap:content:v1';
  var TIMEOUT = 5000;

  var state = {
    ready: false,
    english: [],
    hoa: { sections: [], exams: [] },
    vocab: [],
    source: 'empty',
    errors: [],
    fetchedAt: 0
  };

  function clone(value) {
    try { return JSON.parse(JSON.stringify(value)); } catch (e) { return value; }
  }

  function arr(value) { return Array.isArray(value) ? value : []; }
  function text(value) { return String(value === undefined || value === null ? '' : value); }

  function normalizeEnglish(list) {
    var out = [];
    var seen = {};
    arr(list).forEach(function (test) {
      if (!test || typeof test !== 'object') return;
      var id = text(test.id).trim();
      if (!id || !Array.isArray(test.blocks) || !test.blocks.length || seen[id]) return;
      seen[id] = true;

      var copy = clone(test);
      copy.id = id;
      copy.subject = 'anh';
      copy.title = text(copy.title).trim() || id;
      copy.blocks = copy.blocks.filter(function (block) {
        return block && Array.isArray(block.questions) && block.questions.length;
      }).map(function (block, bi) {
        block.id = text(block.id).trim() || ('block-' + (bi + 1));
        block.short = text(block.short).trim() || ('Phần ' + (bi + 1));
        block.part = text(block.part).trim() || ('Part ' + (bi + 1));
        block.title = text(block.title).trim() || block.short;
        block.instruction = text(block.instruction);
        block.passageTitle = text(block.passageTitle);
        block.source = text(block.source);
        if (Array.isArray(block.paras)) {
          block.paras = block.paras.map(text).filter(function (p) { return p !== ''; });
          if (!block.paras.length) delete block.paras;
        } else {
          delete block.paras;
        }
        block.questions = block.questions.map(function (q) {
          if (!q || typeof q !== 'object') return null;
          q.n = Number(q.n);
          q.opts = arr(q.opts).map(text);
          q.ans = text(q.ans).toUpperCase();
          q.exp = text(q.exp);
          if (q.stem !== null && q.stem !== undefined) q.stem = text(q.stem);
          return q;
        }).filter(function (q) {
          return q && q.n > 0 && q.opts.length >= 2 && q.opts.length <= 4;
        });
        return block;
      }).filter(function (block) { return block.questions.length > 0; });

      if (copy.blocks.length) out.push(copy);
    });
    return out;
  }

  function normalizeHoa(raw) {
    var out = { sections: [], exams: [] };
    if (!raw || typeof raw !== 'object') return out;

    out.sections = arr(raw.sections).filter(function (section) {
      return section && text(section.id).trim() && text(section.title).trim();
    }).map(function (section) {
      return {
        id: text(section.id).trim(),
        title: text(section.title).trim(),
        desc: text(section.desc).trim()
      };
    });

    var seen = {};
    out.exams = arr(raw.exams).filter(function (exam) {
      if (!exam || !exam.meta || !text(exam.meta.id).trim()) return false;
      if (seen[exam.meta.id]) return false;
      seen[exam.meta.id] = true;
      return true;
    }).map(function (exam) {
      var meta = clone(exam.meta);
      meta.id = text(meta.id).trim();
      meta.code = text(meta.code).trim() || 'Đề mới';
      meta.title = text(meta.title).trim() || meta.id;
      meta.section = text(meta.section).trim() || 'bonus';
      meta.tag = text(meta.tag).trim() || 'BỔ SUNG';
      meta.desc = text(meta.desc).trim();
      meta.source = text(meta.source).trim();
      meta.duration = Number(meta.duration) || 50;
      meta.bonus = !!meta.bonus;

      var parts = exam.parts || {};
      return {
        meta: meta,
        parts: {
          mcq: arr(parts.mcq),
          tf: arr(parts.tf),
          short: arr(parts.short)
        }
      };
    }).filter(function (exam) {
      return exam.parts.mcq.length + exam.parts.tf.length + exam.parts.short.length > 0;
    });

    return out;
  }

  function normalizeVocab(list) {
    var out = [];
    var seen = {};
    arr(list).forEach(function (item) {
      if (!item || typeof item !== 'object') return;
      var word = text(item.word).trim();
      var meaning = text(item.meaning).trim();
      var id = parseInt(item.id, 10);
      if (!word || !meaning || !isFinite(id) || id <= 0 || seen[id]) return;
      seen[id] = true;
      out.push({
        id: id,
        word: word,
        ipa: text(item.ipa).trim(),
        pos: text(item.pos).trim() || 'Từ vựng',
        pattern: text(item.pattern).trim(),
        topic: text(item.topic).trim() || 'admin',
        topicLabel: text(item.topicLabel).trim() || 'Từ vựng mới',
        type: item.type === 'idiom' || item.type === 'vocab' ? item.type : '',
        meaning: meaning,
        ex: text(item.ex).trim()
      });
    });
    return out;
  }

  function assign(key, value) {
    if (key === 'english') state.english = normalizeEnglish(value);
    else if (key === 'hoa') state.hoa = normalizeHoa(value);
    else if (key === 'vocab') state.vocab = normalizeVocab(value);
  }

  function readCache() {
    try {
      var raw = g.localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function writeCache() {
    try {
      g.localStorage.setItem(CACHE_KEY, JSON.stringify({
        fetchedAt: state.fetchedAt,
        english: state.english,
        hoa: state.hoa,
        vocab: state.vocab
      }));
    } catch (e) { /* bộ nhớ đầy hoặc bị chặn */ }
  }

  function fetchJson(url) {
    var controller = null;
    var timer = null;
    var options = { cache: 'no-store' };
    try {
      if (typeof g.AbortController !== 'undefined') {
        controller = new g.AbortController();
        options.signal = controller.signal;
        timer = setTimeout(function () { controller.abort(); }, TIMEOUT);
      }
    } catch (e) { controller = null; }

    return fetch(url, options).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(function (data) {
      if (timer) clearTimeout(timer);
      return data;
    }, function (err) {
      if (timer) clearTimeout(timer);
      throw err;
    });
  }

  function loadOne(name) {
    var stamp = '?t=' + Date.now();
    return fetchJson(RAW_BASE + name + stamp).catch(function (rawError) {
      return fetchJson(LOCAL_BASE + name + stamp).catch(function (localError) {
        throw new Error(name + ': ' + (rawError.message || rawError) + ' / ' + (localError.message || localError));
      });
    });
  }

  function applyEnglish() {
    if (!Array.isArray(g.TESTS)) return;
    g.TESTS = g.TESTS.filter(function (test) { return !test.__dynamic; });
    state.english.forEach(function (test) {
      var copy = clone(test);
      copy.__dynamic = true;
      g.TESTS.push(copy);
    });
  }

  function applyHoa() {
    var H = g.HoaExams;
    if (!H) return;

    H.sections = H.sections || [];
    H.meta = H.meta || [];
    H.parts = H.parts || {};

    H.sections = H.sections.filter(function (section) { return !section.__dynamic; });
    H.meta = H.meta.filter(function (meta) {
      if (meta.__dynamic) {
        delete H.parts[meta.id];
        return false;
      }
      return true;
    });

    state.hoa.sections.forEach(function (section) {
      var copy = clone(section);
      copy.__dynamic = true;
      H.sections.push(copy);
    });

    state.hoa.exams.forEach(function (exam) {
      var meta = clone(exam.meta);
      meta.__dynamic = true;
      H.meta.push(meta);
      H.parts[meta.id] = clone(exam.parts);
    });
  }

  function apply() {
    applyEnglish();
    applyHoa();
  }

  function setLocal(content) {
    content = content || {};
    if (content.english !== undefined) state.english = normalizeEnglish(content.english);
    if (content.hoa !== undefined) state.hoa = normalizeHoa(content.hoa);
    if (content.vocab !== undefined) state.vocab = normalizeVocab(content.vocab);
    state.source = 'admin';
    state.fetchedAt = Date.now();
    state.errors = [];
    writeCache();
    apply();
    return state;
  }

  function load() {
    state.ready = false;
    state.errors = [];
    var cached = readCache();
    var jobs = [
      { key: 'english', file: 'english.json' },
      { key: 'hoa', file: 'hoa.json' },
      { key: 'vocab', file: 'vocab.json' }
    ];

    return Promise.all(jobs.map(function (job) {
      return loadOne(job.file).then(function (data) {
        return { key: job.key, ok: true, data: data };
      }, function (err) {
        return { key: job.key, ok: false, error: err };
      });
    })).then(function (results) {
      var remote = 0;
      var cacheHits = 0;

      results.forEach(function (result) {
        if (result.ok) {
          assign(result.key, result.data);
          remote += 1;
        } else {
          state.errors.push(String(result.error && result.error.message ? result.error.message : result.error));
          if (cached && cached[result.key] !== undefined) {
            assign(result.key, cached[result.key]);
            cacheHits += 1;
          } else {
            assign(result.key, result.key === 'hoa' ? { sections: [], exams: [] } : []);
          }
        }
      });

      state.source = remote ? (cacheHits ? 'mixed' : 'remote') : (cacheHits ? 'cache' : 'empty');
      state.fetchedAt = Date.now();
      if (remote) writeCache();

      apply();
      state.ready = true;
      try {
        g.dispatchEvent(new CustomEvent('ontap:contentready', { detail: state }));
      } catch (e) {
        try {
          var ev = document.createEvent('CustomEvent');
          ev.initCustomEvent('ontap:contentready', false, false, state);
          g.dispatchEvent(ev);
        } catch (e2) { /* bỏ qua */ }
      }
      return state;
    });
  }

  g.OntapContent = {
    repo: REPO,
    state: state,
    apply: apply,
    refresh: load,
    setLocal: setLocal,
    writeCache: writeCache
  };
  g.OntapContentReady = load();
  g.OntapContent.ready = g.OntapContentReady;
})(window);
