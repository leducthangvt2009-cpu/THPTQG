(function () {
  'use strict';

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* Vẽ Họa tiết Bàn cờ & Khách sạn Cờ Tỷ Phú ở Trang chủ */
  window.initMonopolyHero = function () {
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
      // Khách sạn đỏ
      box(4, 8, 8, 8, '#111613'); box(5, 9, 6, 7, '#d9232a');
      box(3, 7, 10, 2, '#111613'); box(4, 6, 8, 2, '#ff4d54');
      px(6, 10, '#f5b800'); px(9, 10, '#f5b800'); px(6, 12, '#f5b800'); px(9, 12, '#f5b800');
      box(7, 14, 2, 2, '#ffffff');
      // Nhà xanh
      box(13, 11, 6, 5, '#111613'); box(14, 12, 4, 4, '#248f46');
      box(12, 10, 8, 2, '#111613'); box(13, 9, 6, 2, '#41c46b');
      px(15, 13, '#ffffff'); px(16, 13, '#ffffff');
      // Xúc xắc
      box(19, 9, 7, 7, '#111613'); box(20, 10, 5, 5, '#ffffff');
      px(21, 11, '#111613'); px(23, 11, '#111613'); px(22, 12, '#d9232a'); px(21, 13, '#111613'); px(23, 13, '#111613');
      f.innerHTML = out;
    }
  };

  /* Hiển thị lịch sử làm bài ở trang chủ */
  window.renderHistoryBox = function () {
    var box = $('#history-box');
    if (!box) return;
    var h = [];
    try { h = JSON.parse(localStorage.getItem('ontap:history') || '[]'); } catch (e) {}
    if (!h.length) {
      box.innerHTML = '<div class="empty"><p>Chưa có lịch sử làm bài trên thiết bị này.</p></div>';
      return;
    }
    box.innerHTML = '<ul class="hist">' + h.map(function (x) {
      return '<li><div><div class="t"><b>' + esc(x.title) + '</b> · ' + (x.mode === 'exam' ? 'Thi thử' : 'Luyện tập') + '</div>' +
        '<div class="d">' + new Date(x.ts).toLocaleString('vi-VN') + '</div></div>' +
        '<div class="s">' + x.correct + '/' + x.total + '</div></li>';
    }).join('') + '</ul>';
  };
})();
