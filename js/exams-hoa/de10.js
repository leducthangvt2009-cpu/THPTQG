/* Đề 10 · Tinh bột và Cellulose (Bài 6) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function x(s) { return String(s).replace(/#/g, '\u2060'); }
  function mc(t, o, a, e) { return { text: x(t), options: o.map(x), answer: a, explain: x(e) }; }
  function tf(t, arr, img) { var q = { text: x(t), items: arr.map(function (r) { return { t: x(r[0]), a: r[1], explain: x(r[2]) }; }) }; if (img) q.img = img; return q; }
  function sh(t, a, e, tol, unit) { var q = { text: x(t), answer: a, explain: x(e), tol: tol !== undefined ? tol : 0.01 }; if (unit) q.unit = unit; return q; }

  E.part('de10', 'mcq', [
    mc('Y là một polysaccharide có trong thành phần của tinh bột và có cấu trúc mạch không phân nhánh. Tên gọi của Y là', ['amylopectin.', 'glucose.', 'saccharose.', 'amylose.'], 3,
      'Tinh bột gồm 2 thành phần:\n• Amylose: các gốc α-glucose nối bằng liên kết α-1,4-glycoside → mạch không phân nhánh (xoắn lò xo).\n• Amylopectin: có thêm liên kết α-1,6-glycoside → mạch phân nhánh.\n→ Y là amylose.'),
    mc('Carbohydrate chứa đồng thời liên kết α-1,4-glycoside và liên kết α-1,6-glycoside trong phân tử là', ['tinh bột.', 'cellulose.', 'saccharose.', 'fructose.'], 0,
      'Thành phần amylopectin của tinh bột có liên kết α-1,4-glycoside trong mạch và liên kết α-1,6-glycoside ở chỗ phân nhánh.\nCellulose chỉ có liên kết β-1,4-glycoside; saccharose có liên kết α-1,2-glycoside; fructose là monosaccharide.'),
    mc('(Đề MH – 2024) Chất nào sau đây là nguyên liệu để sản xuất tơ visco?', ['Saccharose.', 'Tinh bột.', 'Glucose.', 'Cellulose.'], 3,
      'Tơ visco và tơ cellulose acetate là tơ bán tổng hợp (nhân tạo), được chế biến từ cellulose (lấy từ gỗ, bông).'),
    mc('(Đề THPT QG – 2018) Cellulose thuộc loại polysaccharide, là thành phần chính tạo nên màng tế bào thực vật, có nhiều trong gỗ, bông nõn. Công thức của cellulose là', ['(C6H10O5)n.', 'C12H22O11.', 'C6H12O6.', 'C2H4O2.'], 0,
      'Cellulose là polymer của các mắt xích β-glucose (C6H10O5) → công thức (C6H10O5)n, có thể viết [C6H7O2(OH)3]n.'),
    mc('(SGK Hóa học 12 – CD) Trong các chất dưới đây, chất nào không được tạo thành chỉ từ các đơn vị glucose?', ['Maltose.', 'Saccharose.', 'Tinh bột.', 'Cellulose.'], 1,
      '• Maltose: 2 đơn vị α-glucose. • Tinh bột: nhiều đơn vị α-glucose. • Cellulose: nhiều đơn vị β-glucose.\n• Saccharose: 1 đơn vị α-glucose + 1 đơn vị β-fructose → không chỉ gồm glucose.'),
    mc('Cho một số tính chất: có dạng sợi (1); tan trong nước (2); tan trong nước Schweizer (3); phản ứng với nitric acid đặc (xúc tác sulfuric acid đặc) (4); tham gia phản ứng tráng bạc (5); bị thủy phân trong dung dịch acid đun nóng (6). Các tính chất của cellulose là', ['(3), (4), (5) và (6).', '(1), (3), (4) và (6).', '(1), (2), (3) và (4).', '(2), (3), (4) và (5).'], 1,
      'Cellulose: chất rắn dạng sợi (1) ✔; không tan trong nước (2) ✘; tan trong nước Schweizer [Cu(NH3)4](OH)2 (3) ✔; phản ứng với HNO3 đặc/H2SO4 đặc tạo cellulose trinitrate (4) ✔; không có nhóm –CHO nên không tráng bạc (5) ✘; bị thủy phân trong acid đun nóng tạo glucose (6) ✔.\n→ (1), (3), (4), (6).'),
    mc('Có các phản ứng sau: phản ứng tráng gương (1); phản ứng với I2 (2); phản ứng với Cu(OH)2 tạo dung dịch xanh lam (3); phản ứng thuỷ phân (4); phản ứng ester hóa (5). Tinh bột có phản ứng nào trong các phản ứng trên?', ['(2), (4).', '(1), (2), (4).', '(2), (4), (5).', '(2), (3), (4).'], 0,
      'Tinh bột:\n• Không có nhóm –CHO tự do → không tráng gương (1).\n• Tạo hợp chất màu xanh tím với iodine (2) ✔.\n• Không hòa tan Cu(OH)2 tạo dung dịch xanh lam (3) (tinh bột không tan trong nước lạnh, các –OH bị "khóa" trong mạch polymer).\n• Bị thủy phân trong acid/enzyme tạo glucose (4) ✔.\n• Phản ứng ester hóa là tính chất được SGK nêu cho cellulose, không phải tinh bột.\n→ (2), (4).'),
    mc('(Đề TN THPT QG – 2021) Chất nào sau đây bị thủy phân khi đun nóng trong môi trường acid?', ['Glycerol.', 'Fructose.', 'Glucose.', 'Cellulose.'], 3,
      'Cellulose là polysaccharide: (C6H10O5)n + nH2O → nC6H12O6 (H^{+}, t°).\nGlucose, fructose (monosaccharide) và glycerol (alcohol) không bị thủy phân.'),
    mc('(Đề MH lần I – 2017) Polymer thiên nhiên X được sinh ra trong quá trình quang hợp của cây xanh. Ở nhiệt độ thường, X tạo với dung dịch iodine hợp chất có màu xanh tím. Polymer X là', ['tinh bột.', 'cellulose.', 'saccharose.', 'glycogen.'], 0,
      'Phản ứng màu với iodine (xanh tím) là phản ứng đặc trưng để nhận biết tinh bột (do iodine bị hấp phụ vào mạch xoắn của amylose).\nTinh bột được tạo ra trong cây xanh nhờ quang hợp: 6nCO2 + 5nH2O → (C6H10O5)n + 6nO2 (ánh sáng, diệp lục).'),
    mc('(Đề TSĐH A – 2008) Tinh bột, cellulose, saccharose đều có khả năng tham gia phản ứng', ['hoà tan Cu(OH)2.', 'trùng ngưng.', 'tráng gương.', 'thủy phân.'], 3,
      'Saccharose (disaccharide), tinh bột và cellulose (polysaccharide) đều bị thủy phân trong môi trường acid.\n• Hòa tan Cu(OH)2: chỉ saccharose. • Tráng gương: cả ba đều không. • Trùng ngưng: không phải phản ứng của các chất này.'),
    mc('Ở nhiệt độ thường, nhỏ vài giọt dung dịch iodine vào hồ tinh bột thấy xuất hiện màu', ['vàng.', 'xanh tím.', 'hồng.', 'nâu đỏ.'], 1,
      'Hồ tinh bột + dung dịch iodine → màu xanh tím (khi đun nóng màu mất đi, để nguội màu xanh tím xuất hiện trở lại).'),
    mc('Quá trình quang hợp của cây xanh sinh ra khí O2 và tạo ra carbohydrate nào dưới đây?', ['Cellulose.', 'Saccharose.', 'Tinh bột.', 'Glucose.'], 2,
      'Phương trình quang hợp tổng quát (SGK): 6nCO2 + 5nH2O → (C6H10O5)n + 6nO2 (ánh sáng, chất diệp lục).\nSản phẩm carbohydrate của quang hợp được dự trữ trong cây dưới dạng tinh bột.'),
    mc('(Đề MH – 2023) Chất X được tạo thành trong cây xanh nhờ quá trình quang hợp. Thủy phân hoàn toàn X (xúc tác acid) thu được chất Y. Chất Y có nhiều trong quả nho chín nên còn được gọi là đường nho. Hai chất X và Y lần lượt là', ['tinh bột và glucose.', 'cellulose và saccharose.', 'cellulose và fructose.', 'tinh bột và saccharose.'], 0,
      'Y là đường nho → glucose. X tạo thành nhờ quang hợp, thủy phân hoàn toàn ra glucose → tinh bột.\n(C6H10O5)n + nH2O → nC6H12O6 (H^{+}, t°).'),
    mc('Ba ống nghiệm không nhãn, chứa riêng ba dung dịch: glucose, hồ tinh bột, glycerol. Để phân biệt 3 dung dịch, người ta dùng thuốc thử', ['dung dịch iodine.', 'dung dịch HCl.', 'dung dịch iodine và thuốc thử Tollens.', 'kim loại Na.'], 2,
      '• Dùng dung dịch iodine: hồ tinh bột hóa xanh tím → nhận ra tinh bột.\n• Hai dung dịch còn lại cho tác dụng với thuốc thử Tollens, đun nóng: glucose tạo kết tủa Ag sáng bóng; glycerol không hiện tượng.\n→ Cần cả dung dịch iodine và thuốc thử Tollens.'),
    mc('(Đề TSCĐ – 2008) Cho sơ đồ chuyển hóa sau (mỗi mũi tên là một phương trình phản ứng): Tinh bột → X → Y → Z → methyl acetate. Các chất Y, Z trong sơ đồ trên lần lượt là', ['C2H5OH, CH3COOH.', 'CH3COOH, CH3OH.', 'CH3COOH, C2H5OH.', 'C2H4, CH3COOH.'], 0,
      '(1) (C6H10O5)n + nH2O → nC6H12O6 (H^{+}) → X là glucose.\n(2) C6H12O6 → 2C2H5OH + 2CO2 (lên men rượu) → Y là C2H5OH.\n(3) C2H5OH + O2 → CH3COOH + H2O (lên men giấm) → Z là CH3COOH.\n(4) CH3COOH + CH3OH ⇌ CH3COOCH3 + H2O (H2SO4 đặc, t°) → methyl acetate.\n→ Y, Z lần lượt là C2H5OH, CH3COOH.'),
    mc('(Đề TSĐH B – 2009) Phát biểu nào sau đây là đúng?', ['Saccharose làm mất màu nước bromine.', 'Glucose bị khử bởi dung dịch AgNO3 trong NH3.', 'Cellulose có cấu trúc mạch phân nhánh.', 'Amylopectin có cấu trúc mạch phân nhánh.'], 3,
      '• Saccharose không có –CHO → không làm mất màu nước bromine (sai).\n• Glucose bị OXI HÓA bởi AgNO3/NH3 (glucose là chất khử) → "bị khử" là sai.\n• Cellulose có mạch không phân nhánh (sai).\n• Amylopectin có mạch phân nhánh nhờ liên kết α-1,6-glycoside → đúng.'),
    mc('(Đề TN THPT QG – 2020) Phát biểu nào sau đây đúng?', ['Amylose và amylopectin đều có cấu trúc mạch phân nhánh.', 'Trong phân tử glucose có 4 nhóm alcohol (OH).', 'Ở điều kiện thường, saccharose là chất rắn kết tinh.', 'Saccharose có phản ứng tráng bạc.'], 2,
      '• Amylose không phân nhánh, chỉ amylopectin phân nhánh (sai).\n• Glucose HOCH2[CHOH]4CHO có 5 nhóm –OH (sai).\n• Saccharose là chất rắn kết tinh, không màu, vị ngọt, dễ tan trong nước → đúng.\n• Saccharose không tráng bạc (sai).'),
    mc('(Đề TSCĐ – 2011) Có một số nhận xét về carbohydrate như sau:\n(1) Saccharose, tinh bột và cellulose đều có thể bị thuỷ phân.\n(2) Glucose, fructose, saccharose đều tác dụng được với Cu(OH)2 và có khả năng tham gia phản ứng tráng bạc.\n(3) Tinh bột và cellulose là đồng phân cấu tạo của nhau.\n(4) Phân tử cellulose được cấu tạo bởi nhiều gốc β-glucose.\n(5) Thuỷ phân tinh bột trong môi trường acid sinh ra fructose.\nTrong các nhận xét trên, số nhận xét đúng là', ['2.', '4.', '3.', '5.'], 0,
      '(1) Đúng.\n(2) Sai — saccharose không tráng bạc.\n(3) Sai — tuy cùng viết (C6H10O5)n nhưng hệ số n khác nhau nên phân tử khối khác nhau, không phải đồng phân.\n(4) Đúng.\n(5) Sai — thủy phân tinh bột sinh ra glucose.\n→ 2 nhận xét đúng: (1), (4).')
  ]);

  E.part('de10', 'tf', [
    tf('(SGK Hóa học 12 – KNTT) Tinh bột là polymer thiên nhiên, gồm amylose và amylopectin. Tinh bột có công thức phân tử là (C6H10O5)n.', [
      ['Tinh bột thuộc loại polysaccharide, khi thủy phân hoàn toàn thu được nhiều phân tử monosaccharide.', true, '(C6H10O5)n + nH2O → nC6H12O6: một phân tử tinh bột cho n phân tử glucose.'],
      ['Phân tử amylose cấu tạo từ nhiều đơn vị α-glucose liên kết với nhau qua liên kết α-1,4-glycoside và hình thành chuỗi xoắn.', true, 'Amylose: mạch không phân nhánh, cuộn xoắn lò xo, mỗi vòng xoắn khoảng 6 gốc glucose.'],
      ['Phân tử amylopectin gồm các chuỗi chứa nhiều đơn vị α-glucose liên kết với nhau qua liên kết α-1,4-glycoside và α-1,6-glycoside tạo thành mạch phân nhánh.', true, 'Trong mỗi chuỗi là liên kết α-1,4; chỗ phân nhánh là liên kết α-1,6.'],
      ['Xôi hoặc cơm nếp dẻo và dính hơn cơm tẻ do hàm lượng amylopectin trong xôi hoặc cơm nếp thấp hơn cơm tẻ.', false, 'Ngược lại: gạo nếp chứa rất nhiều amylopectin (khoảng 98%), cao hơn gạo tẻ (khoảng 80%). Amylopectin mạch phân nhánh làm xôi, cơm nếp dẻo và dính hơn.']]),
    tf('(SGK Hóa học 12 – KNTT) Tiến hành thí nghiệm theo các bước sau:\nBước 1: Cho khoảng 5 mL dung dịch hồ tinh bột 1% vào ống nghiệm. Sau đó thêm khoảng 1 mL dung dịch HCl 1 M vào, lắc đều.\nBước 2: Đặt ống nghiệm vào cốc thủy tinh chứa nước nóng, đun cách thủy trong khoảng 10 phút. Sau đó để nguội.\nBước 3: Thêm từ từ NaHCO3 vào đến khi ngừng sủi bọt khí.\nBước 4: Cho khoảng 2 mL dung dịch thu được vào ống nghiệm chứa Cu(OH)2 (được điều chế bằng cách cho 0,5 mL dung dịch CuSO4 5% vào 2 mL dung dịch NaOH 10%, lắc nhẹ). Sau đó đặt ống nghiệm vào cốc thủy tinh chứa nước nóng khoảng 5 phút.', [
      ['Ở bước 3, thêm NaHCO3 vào ống nghiệm để loại bỏ acid HCl.', true, 'NaHCO3 + HCl → NaCl + CO2↑ + H2O. Phải trung hòa acid vì phản ứng ở bước 4 cần môi trường kiềm (acid sẽ hòa tan Cu(OH)2).'],
      ['Sau bước 4, kết tủa màu xanh (Cu(OH)2) bị hòa tan thu được dung dịch màu xanh lam.', false, 'Ở bước 4 ống nghiệm được ngâm nước nóng: glucose (sản phẩm thủy phân) khử Cu(OH)2/OH^{–} tạo kết tủa đỏ gạch Cu2O. Hiện tượng cuối cùng là kết tủa đỏ gạch, không phải dung dịch xanh lam.'],
      ['Từ hiện tượng ở bước 4, suy ra sản phẩm của phản ứng thủy phân hồ tinh bột ở bước 2 là glucose.', true, 'Hồ tinh bột không khử được Cu(OH)2; sau thủy phân lại tạo Cu2O đỏ gạch → đã sinh ra chất có nhóm –CHO, đó là glucose: (C6H10O5)n + nH2O → nC6H12O6.'],
      ['Ở bước 4, xảy ra phản ứng khử glucose bằng Cu(OH)2/OH^{–}.', false, 'Glucose là chất khử, bị Cu(OH)2 OXI HÓA thành gluconate (Cu^{2+} bị khử thành Cu2O). Nói "khử glucose" là sai.']]),
    tf('(SGK Hóa học 12 – KNTT) Tiến hành thí nghiệm theo các bước sau:\nBước 1: Cho khoảng 5 mL dung dịch HNO3 đặc vào cốc thủy tinh (loại 100 mL) ngâm trong chậu nước đá. Thêm từ từ khoảng 10 mL dung dịch H2SO4 đặc vào cốc và khuấy đều. Sau đó, lấy cốc thủy tinh ra khỏi chậu nước đá, thêm tiếp một nhúm bông vào cốc và dùng đũa thủy tinh ấn bông ngập trong dung dịch.\nBước 2: Ngâm cốc trong chậu nước nóng khoảng 10 phút. Để nguội, lấy sản phẩm thu được ra khỏi cốc, rửa nhiều lần với nước lạnh (đến khi nước rửa không làm đổi màu quỳ tím), sau đó rửa lại bằng dung dịch NaHCO3 loãng.\nBước 3: Ép sản phẩm giữa hai miếng giấy lọc để hút nước và làm khô tự nhiên. Sau đó, để sản phẩm lên đĩa sứ rồi đốt cháy sản phẩm.', [
      ['Sau bước 2, sản phẩm thu được là cellulose trinitrate.', true, '[C6H7O2(OH)3]n + 3nHNO3 → [C6H7O2(ONO2)3]n + 3nH2O (H2SO4 đặc, t°). Sản phẩm là cellulose trinitrate.'],
      ['Thí nghiệm trên chứng minh trong phân tử cellulose có 3 nhóm –OH tự do.', true, 'Mỗi mắt xích C6H10O5 phản ứng với 3 phân tử HNO3 → mỗi mắt xích có 3 nhóm –OH tự do, công thức viết [C6H7O2(OH)3]n.'],
      ['Ở bước 3, khi đốt sản phẩm cháy nhanh, không khói, không tàn.', true, 'Cellulose trinitrate rất dễ cháy và nổ mạnh, cháy nhanh, không tạo khói, không để lại tàn.'],
      ['Phản ứng trên để điều chế cellulose trinitrate dùng để chế tạo thuốc súng không khói.', true, 'Cellulose trinitrate được dùng làm thuốc súng không khói.']]),
    tf('(Đề TN THPT QG – 2020) Polysaccharide X là chất rắn, màu trắng, dạng sợi. Trong bông nõn có gần 98% chất X. Thủy phân X, thu được monosaccharide Y.', [
      ['Y có tính chất của alcohol đa chức.', true, 'X là cellulose, Y là glucose. Glucose có 5 nhóm –OH (có các –OH liền kề) → có tính chất của alcohol đa chức (hòa tan Cu(OH)2).'],
      ['X có phản ứng tráng bạc.', false, 'Cellulose không có nhóm –CHO tự do nên không tráng bạc.'],
      ['Phân tử khối của Y bằng 342.', false, 'Glucose C6H12O6 có M = 180 (342 là của saccharose/maltose).'],
      ['X dễ tan trong nước.', false, 'Cellulose không tan trong nước và các dung môi hữu cơ thông thường; chỉ tan trong nước Schweizer.']])
  ]);

  E.part('de10', 'short', [
    sh('(SGK Hóa học 12 – CTST) Cho 6 carbohydrate sau: glucose, fructose, maltose, saccharose, tinh bột và cellulose. Có bao nhiêu carbohydrate đã cho thuộc nhóm polysaccharide?', 2,
      'Polysaccharide gồm: tinh bột và cellulose → 2 chất.\n(glucose, fructose là monosaccharide; maltose, saccharose là disaccharide.)'),
    sh('(SGK Hóa học 12 – KNTT) Cellulose là polymer thiên nhiên, có công thức phân tử là (C6H10O5)n. Phân tử cellulose tạo bởi nhiều đơn vị β-glucose. Số nhóm –OH (tự do) trong một mắt xích glucose của cellulose là bao nhiêu?', 3,
      'Mỗi gốc β-glucose có 5 nhóm –OH, nhưng 2 nhóm (ở C#1 và C#4) đã dùng để tạo liên kết β-1,4-glycoside với các gốc bên cạnh.\nCòn lại 3 nhóm –OH tự do (ở C#2, C#3, C#6) → công thức viết [C6H7O2(OH)3]n.'),
    sh('Polysaccharide X là chất rắn, ở dạng bột vô định hình, màu trắng và được tạo thành trong cây xanh nhờ quá trình quang hợp. Thủy phân X thu được monosaccharide Y. Xác định phân tử khối của Y?', 180,
      'X là tinh bột; thủy phân tinh bột thu được Y là glucose C6H12O6.\nM(Y) = 6 × 12 + 12 × 1 + 6 × 16 = 180.'),
    sh('(Đề TNTHPT – 2023) Từ m kg mùn cưa chứa 50% cellulose (còn lại là tạp chất trơ) sản xuất được 80 kg glucose với hiệu suất toàn bộ quá trình là 80%. Tính giá trị của m?', 180,
      '(C6H10O5)n + nH2O → nC6H12O6: cứ 162 kg cellulose → 180 kg glucose.\nCellulose cần theo lí thuyết = 80 × 162 : 180 = 72 kg.\nVì H = 80% nên cellulose thực tế cần = 72 : 0,8 = 90 kg.\nMùn cưa chứa 50% cellulose → m = 90 : 0,5 = 180 kg.', 0.5, ' kg'),
    sh('(Đề TSĐH A – 2011) Cellulose trinitrate được điều chế từ phản ứng giữa nitric acid với cellulose (hiệu suất phản ứng 60% tính theo cellulose). Nếu dùng 2 tấn cellulose thì khối lượng cellulose trinitrate điều chế được là bao nhiêu tấn?', 2.2,
      '[C6H7O2(OH)3]n + 3nHNO3 → [C6H7O2(ONO2)3]n + 3nH2O\nMắt xích: 162 → 297 (162 + 3 × 45 = 297).\nm(lí thuyết) = 2 × 297 : 162 ≈ 3,667 tấn.\nm(thực tế) = 3,667 × 60% = 2,2 tấn.', 0.01, ' tấn'),
    sh('(SBT Hóa học 12 – CB) Rượu 40° là loại rượu trong đó ethyl alcohol chiếm 40% về thể tích. Người ta dùng một loại nguyên liệu chứa 50% glucose để lên men thành ethyl alcohol với hiệu suất 80%. Để thu được 2,3 lít rượu 40° cần dùng bao nhiêu kg nguyên liệu nói trên? Biết rằng khối lượng riêng của ethyl alcohol là 0,8 g/mL.', 3.6,
      'V(C2H5OH) = 2,3 L × 40% = 0,92 L = 920 mL → m = 920 × 0,8 = 736 gam → n = 736 : 46 = 16 mol.\nC6H12O6 → 2C2H5OH + 2CO2 → n(glucose lí thuyết) = 16 : 2 = 8 mol.\nH = 80% → n(glucose cần) = 8 : 0,8 = 10 mol → m = 10 × 180 = 1800 gam = 1,8 kg.\nNguyên liệu chứa 50% glucose → m(nguyên liệu) = 1,8 : 0,5 = 3,6 kg.', 0.01, ' kg')
  ]);
})(window);
