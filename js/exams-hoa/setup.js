/* ==========================================================================
   Hóa 12 · Đăng ký đề thi tương tác
   Nạp trước các file dữ liệu de8.js – de19.js.
   Dữ liệu dùng chung cấu trúc với bộ đề tham khảo:
     E.part(id, 'mcq' | 'tf' | 'short', danhSáchCâu)
   ========================================================================== */
(function (g) {
  'use strict';

  var H = g.HoaExams = g.HoaExams || {};
  H.parts = H.parts || {};

  H.sections = [
    {
      id: 'bai',
      title: 'Bài tập theo bài học',
      desc: 'Bài 4 – 6 · Carbohydrate: glucose, fructose, saccharose, maltose, tinh bột và cellulose.'
    },
    {
      id: 'on',
      title: 'Đề ôn tập chương 2',
      desc: 'Hai đề tổng hợp toàn bộ kiến thức Carbohydrate, bám sát cấu trúc đề mới.'
    },
    {
      id: 'gk',
      title: 'Đề kiểm tra giữa học kì 1',
      desc: 'Năm đề của các trường: Ester – Lipid, Carbohydrate, Amine – Amino acid – Peptide.'
    },
    {
      id: 'bonus',
      title: 'Đề bổ sung',
      desc: 'Đề chuyên dùng để luyện thêm, không nằm trong 10 bộ đề chính.'
    }
  ];

  H.meta = [
    {
      id: 'de8', code: 'Đề 1', section: 'bai', tag: 'BÀI 4',
      title: 'Glucose và Fructose',
      desc: 'Khái niệm, phân loại carbohydrate; cấu tạo mạch hở – mạch vòng, tính chất hóa học của glucose và fructose.',
      duration: 50, source: 'Bài 4 · Carbohydrate'
    },
    {
      id: 'de9', code: 'Đề 2', section: 'bai', tag: 'BÀI 5',
      title: 'Saccharose và Maltose',
      desc: 'Cấu tạo disaccharide, liên kết glycoside, –OH hemiacetal, phản ứng thủy phân và phương pháp nhận biết.',
      duration: 50, source: 'Bài 5 · Carbohydrate'
    },
    {
      id: 'de10', code: 'Đề 3', section: 'bai', tag: 'BÀI 6',
      title: 'Tinh bột và Cellulose',
      desc: 'Amylose, amylopectin, cellulose; phản ứng màu với iodine, thủy phân, cellulose nitrate và ứng dụng.',
      duration: 50, source: 'Bài 6 · Carbohydrate'
    },
    {
      id: 'de11', code: 'Đề 4', section: 'on', tag: 'ÔN TẬP 1',
      title: 'Ôn tập chương 2 · Đề số 1',
      desc: 'Tổng hợp carbohydrate: nhận biết, đếm phát biểu, cấu tạo mạch vòng và bài toán tráng bạc.',
      duration: 50, source: 'Đề ôn tập chương 2 · Số 1'
    },
    {
      id: 'de12', code: 'Đề 5', section: 'on', tag: 'ÔN TẬP 2',
      title: 'Ôn tập chương 2 · Đề số 2',
      desc: 'Tổng hợp carbohydrate: fructose, saccharose, tinh bột – cellulose và bài toán lên men, hiệu suất.',
      duration: 50, source: 'Đề ôn tập chương 2 · Số 2'
    },
    {
      id: 'de14', code: 'Đề 6', section: 'gk', tag: 'GK1',
      title: 'Bạch Hữu Hạnh',
      desc: 'Đề giữa kì 1: ester – lipid, carbohydrate; nhận biết, thí nghiệm thủy phân và phản ứng với Cu(OH)₂.',
      duration: 50, source: 'Giữa học kì 1 · Hóa 12'
    },
    {
      id: 'de15', code: 'Đề 7', section: 'gk', tag: 'GK1',
      title: 'Bùi Bích Ngọc · Phú Yên',
      desc: 'Đề giữa kì 1: cấu tạo vòng glucose, đồ thị ester hóa, xà phòng hóa, tráng bạc, cellulose nitrate, EPA/DHA.',
      duration: 50, source: 'Giữa học kì 1 · Hóa 12'
    },
    {
      id: 'de16', code: 'Đề 8', section: 'gk', tag: 'GK1',
      title: 'Hồ Thị Hải · Bắc Giang',
      desc: 'Đề giữa kì 1: ester, xà phòng, carbohydrate, amine – amino acid – peptide; có câu hỏi thực tiễn.',
      duration: 45, source: 'Giữa học kì 1 · Hóa 12', note: 'Thời gian 45 phút theo đề gốc.'
    },
    {
      id: 'de17', code: 'Đề 9', section: 'gk', tag: 'GK1',
      title: 'Đỗ Hoa',
      desc: 'Đề giữa kì 1: bài toán chất béo, hỗn hợp ester, sơ đồ chuyển hóa, amine và phản ứng tráng gương.',
      duration: 50, source: 'Giữa học kì 1 · Hóa 12'
    },
    {
      id: 'de18', code: 'Đề 10', section: 'gk', tag: 'GK1',
      title: 'Đinh Quang Thanh · Hòa Bình',
      desc: 'Đề giữa kì 1 theo cấu trúc mới: điểm đẳng điện, polyamide, ghép peptide, xăng E5, sơ đồ ester – alcohol – acid.',
      duration: 50, source: 'Giữa học kì 1 · Hóa 12'
    },
    {
      id: 'de19', code: 'Đề 11', section: 'bonus', tag: 'BỔ SUNG', bonus: true,
      title: 'Chuyên Lê Quý Đôn · Bà Rịa – Vũng Tàu',
      desc: 'Đề chuyên: amino acid, peptide, chỉ số xà phòng hóa, đồng phân amino acid và lên men giấm.',
      duration: 50, source: 'Đề bổ sung · Giữa học kì 1'
    }
  ];

  H.byId = function (id) {
    for (var i = 0; i < H.meta.length; i++) if (H.meta[i].id === id) return H.meta[i];
    return null;
  };
  H.progressList = function () {
    return H.meta.filter(function (e) { return !e.bonus; });
  };

  /* Cầu nối tương thích với các file dữ liệu de*.js */
  var C = g.Chem = g.Chem || {};
  C.Exams = {
    part: function (id, kind, list) {
      var p = H.parts[id] || (H.parts[id] = { mcq: [], tf: [], short: [] });
      p[kind] = (p[kind] || []).concat(list || []);
    }
  };
})(window);
