/* Đề 12 · Ôn tập chương 2 – Carbohydrate (số 2) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function x(s) { return String(s).replace(/#/g, '⁠'); }
  function mc(t, o, a, e) { return { text: x(t), options: o.map(x), answer: a, explain: x(e) }; }
  function tf(t, arr, img) { var q = { text: x(t), items: arr.map(function (r) { return { t: x(r[0]), a: r[1], explain: x(r[2]) }; }) }; if (img) q.img = img; return q; }
  function sh(t, a, e, tol, unit) { var q = { text: x(t), answer: a, explain: x(e), tol: tol !== undefined ? tol : 0.01 }; if (unit) q.unit = unit; return q; }

  E.part('de12', 'mcq', [
    mc('(Đề THPT QG – 2019) Chất nào sau đây thuộc loại polysaccharide?', ['Fructose.', 'Glucose.', 'Tinh bột.', 'Saccharose.'], 2,
      'Polysaccharide: tinh bột, cellulose. Glucose, fructose là monosaccharide; saccharose là disaccharide.'),
    mc('(Đề MH – 2022) Glucose là chất dinh dưỡng và được dùng làm thuốc tăng lực cho người già, trẻ em và người ốm. Số nguyên tử carbon trong phân tử glucose là', ['6.', '11.', '5.', '12.'], 0,
      'Glucose có công thức phân tử C6H12O6 → 6 nguyên tử carbon.'),
    mc('(Đề THPT QG – 2018) Saccharose là một loại disaccharide có nhiều trong cây mía, hoa thốt nốt, củ cải đường. Công thức phân tử của saccharose là', ['C6H12O6.', '(C6H10O5)n.', 'C12H22O11.', 'C2H4O2.'], 2,
      'Saccharose = glucose + fructose − H2O = C6H12O6 + C6H12O6 − H2O = C12H22O11.'),
    mc('(Đề TSCĐ – 2008) Cho dãy các chất: glucose, cellulose, saccharose, tinh bột, maltose. Số chất trong dãy tham gia phản ứng tráng gương là', ['3.', '2.', '4.', '5.'], 1,
      'Tráng gương: glucose (có –CHO) và maltose (mở vòng tạo –CHO) → 2 chất.\nCellulose, saccharose, tinh bột không tráng gương.'),
    mc('(Đề TSĐH A – 2007) Để chứng minh trong phân tử của glucose có nhiều nhóm hydroxyl, người ta cho dung dịch glucose phản ứng với', ['Cu(OH)2 ở nhiệt độ thường.', 'Cu(OH)2 trong NaOH, đun nóng.', 'kim loại Na.', 'AgNO3 trong dung dịch NH3, đun nóng.'], 0,
      'Ở nhiệt độ thường glucose hòa tan Cu(OH)2 tạo dung dịch xanh lam — phản ứng của chất có nhiều –OH liền kề:\n2C6H12O6 + Cu(OH)2 → (C6H11O6)2Cu + 2H2O.\nCu(OH)2/NaOH đun nóng và AgNO3/NH3 chứng minh nhóm –CHO; Na phản ứng cả với alcohol chỉ có 1 nhóm –OH.'),
    mc('Phân tử maltose được tạo bởi', ['một gốc glucose và một gốc maltose.', 'hai gốc fructose.', 'một gốc glucose và một gốc fructose.', 'hai gốc glucose.'], 3,
      'Maltose gồm hai gốc α-glucose liên kết với nhau bằng liên kết α-1,4-glycoside (thủy phân maltose chỉ thu được glucose).'),
    mc('Saccharose tham gia phản ứng hóa học nào sau đây?', ['Phản ứng tráng gương.', 'Phản ứng thủy phân.', 'Phản ứng xà phòng hóa.', 'Phản ứng ester hóa.'], 1,
      'Saccharose là disaccharide nên bị thủy phân: C12H22O11 + H2O → glucose + fructose (H^{+} hoặc enzyme).\nSaccharose không tráng gương; xà phòng hóa là phản ứng của ester/chất béo.'),
    mc('(SBT Hóa học 12 NC) Để nhận biết 3 dung dịch: glucose, ethyl alcohol, saccharose đựng riêng biệt trong 3 lọ mất nhãn, ta dùng thuốc thử là', ['Cu(OH)2/OH^{–}.', 'Na.', 'dung dịch AgNO3/NH3.', 'CH3OH/HCl.'], 0,
      '• Nhiệt độ thường: glucose và saccharose hòa tan Cu(OH)2 → xanh lam; ethyl alcohol không hiện tượng.\n• Đun nóng 2 dung dịch xanh lam: glucose cho kết tủa đỏ gạch Cu2O; saccharose không.\n→ Nhận biết được cả 3 chất.'),
    mc('Carbohydrate chứa đồng thời liên kết α-1,4-glycoside và liên kết α-1,6-glycoside trong phân tử là', ['tinh bột.', 'cellulose.', 'saccharose.', 'fructose.'], 0,
      'Amylopectin (thành phần tinh bột) có liên kết α-1,4-glycoside trong mạch và α-1,6-glycoside ở điểm phân nhánh.'),
    mc('(Đề TSCĐ – 2010) Cặp chất nào sau đây không phải là đồng phân của nhau?', ['Ethyl alcohol và dimethyl ether.', 'Saccharose và cellulose.', 'Glucose và fructose.', '2-methylpropan-1-ol và butan-2-ol.'], 1,
      '• C2H5OH và CH3OCH3 cùng C2H6O → đồng phân.\n• Glucose và fructose cùng C6H12O6 → đồng phân.\n• 2-methylpropan-1-ol và butan-2-ol cùng C4H10O → đồng phân.\n• Saccharose C12H22O11 và cellulose (C6H10O5)n có công thức phân tử khác nhau → KHÔNG phải đồng phân.'),
    mc('Ở nhiệt độ thường, nhỏ vài giọt dung dịch iodine vào hồ tinh bột thấy xuất hiện màu', ['vàng.', 'xanh tím.', 'hồng.', 'nâu đỏ.'], 1,
      'Iodine bị hấp phụ vào mạch xoắn của amylose tạo hợp chất màu xanh tím — dùng để nhận biết tinh bột.'),
    mc('(Đề MH – 2023) Chất X được tạo thành trong cây xanh nhờ quá trình quang hợp. Thủy phân hoàn toàn X (xúc tác acid) thu được chất Y. Chất Y có nhiều trong quả nho chín nên còn được gọi là đường nho. Hai chất X và Y lần lượt là', ['tinh bột và glucose.', 'cellulose và saccharose.', 'cellulose và fructose.', 'tinh bột và saccharose.'], 0,
      'Y là đường nho → glucose. X tạo ra nhờ quang hợp, thủy phân hoàn toàn cho glucose → tinh bột.'),
    mc('(Đề MH – 2022) Phát biểu nào sau đây đúng?', ['Glucose bị thủy phân trong môi trường acid.', 'Tinh bột là chất lỏng ở nhiệt độ thường.', 'Cellulose thuộc loại disaccharide.', 'Dung dịch saccharose hòa tan được Cu(OH)2.'], 3,
      '• Glucose là monosaccharide, không bị thủy phân (sai).\n• Tinh bột là chất rắn vô định hình, màu trắng (sai).\n• Cellulose là polysaccharide (sai).\n• Saccharose có nhiều –OH liền kề → hòa tan Cu(OH)2 tạo dung dịch xanh lam (đúng).'),
    mc('(Đề TNTHPT – 2023) Phát biểu nào sau đây sai?', ['Thủy phân saccharose chỉ thu được glucose.', 'Glucose có khả năng tham gia phản ứng tráng bạc.', 'Cellulose và tinh bột đều thuộc loại polysaccharide.', 'Cellulose có cấu tạo mạch không phân nhánh.'], 0,
      'Thủy phân saccharose thu được cả glucose và fructose (chỉ maltose mới cho riêng glucose) → phát biểu này sai.'),
    mc('(Đề MH – 2024) Phát biểu nào sau đây đúng?', ['Dung dịch saccharose có phản ứng tráng bạc.', 'Tinh bột và cellulose là đồng phân của nhau.', 'Saccharose thuộc loại polysaccharide.', 'Glucose là hợp chất hữu cơ tạp chức.'], 3,
      '• Saccharose không tráng bạc (sai).\n• Tinh bột và cellulose có hệ số n khác nhau → không là đồng phân (sai).\n• Saccharose là disaccharide (sai).\n• Glucose có nhóm –OH (alcohol) và nhóm –CHO (aldehyde) → hợp chất tạp chức (đúng).'),
    mc('(Đề TSĐH A – 2012) Cho các phát biểu sau về carbohydrate:\n(a) Tất cả các carbohydrate đều có phản ứng thủy phân.\n(b) Thủy phân hoàn toàn tinh bột thu được glucose.\n(c) Glucose, fructose và maltose đều có phản ứng tráng bạc.\n(d) Glucose làm mất màu nước bromine.\nSố phát biểu đúng là', ['1.', '2.', '3.', '4.'], 2,
      '(a) Sai — monosaccharide (glucose, fructose) không bị thủy phân.\n(b) Đúng.\n(c) Đúng.\n(d) Đúng — glucose bị nước bromine oxi hóa thành gluconic acid.\n→ 3 phát biểu đúng.'),
    mc('(Đề TSĐH A – 2013) Cho các phát biểu sau:\n(a) Glucose có khả năng tham gia phản ứng tráng bạc.\n(b) Sự chuyển hóa tinh bột trong cơ thể người có sinh ra maltose.\n(c) Maltose có khả năng tham gia phản ứng tráng bạc.\n(d) Saccharose được cấu tạo từ hai gốc β-glucose và α-fructose.\nTrong các phát biểu trên, số phát biểu đúng là', ['4.', '2.', '3.', '1.'], 2,
      '(a) Đúng.\n(b) Đúng — tinh bột → dextrin → maltose → glucose (nhờ enzyme amylase, maltase).\n(c) Đúng — maltose mở vòng tạo –CHO.\n(d) Sai — saccharose gồm một gốc α-glucose và một gốc β-fructose.\n→ 3 phát biểu đúng.'),
    mc('(Đề TSĐH B – 2011) Cho các phát biểu sau:\n(a) Có thể dùng nước bromine để phân biệt glucose và fructose.\n(b) Trong môi trường acid, glucose và fructose có thể chuyển hoá lẫn nhau.\n(c) Có thể phân biệt glucose và fructose bằng phản ứng với dung dịch AgNO3 trong NH3.\n(d) Trong dung dịch, glucose và fructose đều hoà tan Cu(OH)2 ở nhiệt độ thường cho dung dịch màu xanh lam.\n(e) Trong dung dịch, fructose tồn tại chủ yếu ở dạng mạch hở.\n(g) Trong dung dịch, glucose tồn tại chủ yếu ở dạng vòng 6 cạnh (dạng α và β).\nSố phát biểu đúng là', ['4.', '5.', '3.', '2.'], 2,
      '(a) Đúng — glucose làm mất màu nước bromine, fructose thì không.\n(b) Sai — glucose và fructose chuyển hóa lẫn nhau trong môi trường KIỀM, không phải acid.\n(c) Sai — cả hai đều tráng bạc.\n(d) Đúng.\n(e) Sai — fructose tồn tại chủ yếu ở dạng mạch vòng (vòng 5 cạnh).\n(g) Đúng.\n→ 3 phát biểu đúng: (a), (d), (g).')
  ]);

  E.part('de12', 'tf', [
    tf('(SGK Hóa học 12 – KNTT) Fructose có công thức phân tử C6H12O6. Tương tự glucose, fructose tồn tại đồng thời ở dạng mạch hở và dạng mạch vòng (α-fructose và β-fructose) chuyển hóa qua lại lẫn nhau như hình dưới:', [
      ['Ở dạng mạch hở, phân tử fructose có năm nhóm hydroxy và một nhóm aldehyde.', false, 'Dạng mạch hở: CH2OH[CHOH]3COCH2OH — có 5 nhóm –OH và một nhóm KETONE (C=O ở C#2), không phải aldehyde.'],
      ['Nhóm –OH ở vị trí số 2 trong fructose dạng mạch vòng gọi là –OH hemiketal.', true, 'C#2 liên kết đồng thời với O trong vòng và nhóm –OH (sinh ra từ nhóm ketone khi đóng vòng) → –OH hemiketal.'],
      ['Từ công thức cấu tạo ta thấy, fructose có tính chất của polyalcohol và ketone.', true, 'Có nhiều –OH liền kề (polyalcohol) và nhóm C=O (ketone).'],
      ['Fructose không có nhóm –CH=O, vì vậy fructose không bị oxi hóa bởi thuốc thử Tollens và bởi Cu(OH)2 trong môi trường kiềm.', false, 'Trong môi trường kiềm (thuốc thử Tollens chứa NH3, Cu(OH)2/OH^{–}), fructose chuyển hóa thành glucose → vẫn bị oxi hóa: tráng bạc và tạo Cu2O đỏ gạch.']],
      { src: 'img/fructose-dang.png', alt: 'Dạng α-fructose, dạng mạch hở và dạng β-fructose chuyển hóa qua lại' }),
    tf('(SGK Hóa học 12 – KNTT) Tiến hành thí nghiệm theo các bước sau:\nBước 1: Cho khoảng 2 mL dung dịch NaOH 10% vào ống nghiệm. Sau đó, thêm khoảng 0,5 mL dung dịch CuSO4 5% vào, lắc nhẹ.\nBước 2: Cho thêm tiếp khoảng 3 mL dung dịch glucose 2% vào ống nghiệm và lắc đều.\nBước 3: Đun nóng ống nghiệm bằng ngọn lửa đèn cồn trong vài phút.', [
      ['Ở bước 2, kết tủa đã bị hòa tan, thu được dung dịch màu xanh lam.', true, 'Glucose có nhiều –OH liền kề: 2C6H12O6 + Cu(OH)2 → (C6H11O6)2Cu + 2H2O (dung dịch xanh lam).'],
      ['Thí nghiệm trên chứng minh glucose có tính chất của aldehyde.', true, 'Ở bước 3, glucose khử Cu(OH)2 tạo Cu2O đỏ gạch — phản ứng đặc trưng của nhóm –CHO.'],
      ['Sau bước 3, xuất hiện kết tủa đỏ gạch. Sản phẩm hữu cơ thu được là gluconic acid.', false, 'Đúng là có kết tủa đỏ gạch, nhưng môi trường có NaOH dư nên sản phẩm hữu cơ là muối sodium gluconate: HOCH2[CHOH]4CHO + 2Cu(OH)2 + NaOH → HOCH2[CHOH]4COONa + Cu2O↓ + 3H2O.'],
      ['Ở bước 2, nếu thay glucose bằng fructose thì hiện tượng bước 3 xảy ra tương tự.', true, 'Trong môi trường kiềm, fructose chuyển thành glucose nên khi đun nóng cũng tạo kết tủa đỏ gạch Cu2O.']]),
    tf('Saccharose được cấu tạo từ một đơn vị α-glucose và một đơn vị β-fructose. Công thức cấu tạo của saccharose như hình dưới:', [
      ['Saccharose là một polysaccharide có công thức phân tử là C12H22O11.', false, 'Saccharose có công thức C12H22O11 nhưng thủy phân chỉ cho 2 monosaccharide → là DISACCHARIDE.'],
      ['Các đơn vị α-glucose và β-fructose liên kết với nhau qua liên kết α-1,2-glycoside.', true, 'Liên kết nối C#1 của α-glucose với C#2 của β-fructose qua nguyên tử O → liên kết α-1,2-glycoside (SGK).'],
      ['Do được cấu tạo từ một đơn vị α-glucose và một đơn vị β-fructose, vì vậy saccharose có khả năng tham gia phản ứng với thuốc thử Tollens.', false, 'C#1 của glucose và C#2 của fructose đều đã tham gia liên kết glycoside → không còn –OH hemiacetal/hemiketal, saccharose không mở vòng được, không phản ứng với thuốc thử Tollens.'],
      ['Nhóm –OH ở vị trí C#4 (đơn vị α-glucose) là nhóm –OH hemiacetal.', false, '–OH hemiacetal của glucose phải ở C#1; trong saccharose C#1 đã tham gia liên kết glycoside. –OH ở C#4 chỉ là –OH alcohol bình thường.']],
      { src: 'img/saccharose.png', alt: 'Công thức cấu tạo của saccharose' }),
    tf('(SGK Hóa học 12 – KNTT) Tinh bột và cellulose đều là polysaccharide, có công thức phân tử là (C6H10O5)n.', [
      ['Cellulose và tinh bột là đồng phân cấu tạo của nhau.', false, 'Hệ số n của tinh bột và cellulose khác nhau (phân tử khối khác nhau) → không phải đồng phân.'],
      ['Khi thủy phân hoàn toàn tinh bột và cellulose trong môi trường acid hoặc enzyme đều thu được glucose.', true, '(C6H10O5)n + nH2O → nC6H12O6 (glucose) — đúng cho cả hai chất.'],
      ['Tinh bột gồm amylose và amylopectin. Amylopectin trong tinh bột chỉ có các liên kết α-1,4-glycoside.', false, 'Amylopectin có cả liên kết α-1,4-glycoside và α-1,6-glycoside (tạo nhánh). Chỉ amylose mới chỉ có liên kết α-1,4.'],
      ['Phân tử cellulose cấu tạo từ nhiều đơn vị α-glucose liên kết với nhau qua liên kết α-1,4-glycoside và hình thành chuỗi không nhánh.', false, 'Cellulose gồm các đơn vị β-glucose liên kết với nhau qua liên kết β-1,4-glycoside (mạch không nhánh, kéo dài). Nói α-glucose, α-1,4 là sai.']])
  ]);

  E.part('de12', 'short', [
    sh('(SGK Hóa học 12 – CTST) Cho 6 carbohydrate sau: glucose, fructose, maltose, saccharose, tinh bột và cellulose. Có bao nhiêu carbohydrate đã cho thuộc nhóm monosaccharide?', 2,
      'Monosaccharide (không bị thủy phân): glucose, fructose → 2 chất.'),
    sh('(SGK Hóa học 12 – KNTT) Fructose có công thức phân tử C6H12O6. Tương tự glucose, fructose tồn tại đồng thời dạng mạch hở và mạch vòng (α và β). Ở dạng mạch vòng α-fructose, tổng số nhóm –OH hemiacetal và –OH hemiketal trong phân tử fructose là bao nhiêu?', 1,
      'α-fructose (vòng 5 cạnh) chỉ có một nhóm –OH gắn vào nguyên tử C liên kết với O của vòng, đó là –OH ở C#2 → –OH hemiketal.\nFructose không có –OH hemiacetal (vì không có nhóm aldehyde).\n→ Tổng = 1.'),
    sh('Cho các chất: vinylacetylene, glucose, propionic acid, aldehyde acetic, dimethylacetylene. Số chất trong dãy tạo kết tủa khi cho tác dụng với dung dịch AgNO3 trong NH3 dư, đun nóng là bao nhiêu?', 3,
      '• Vinylacetylene CH2=CH–C≡CH: có liên kết ba đầu mạch → tạo kết tủa vàng CH2=CH–C≡CAg ✔\n• Glucose: tráng bạc tạo Ag ✔\n• Aldehyde acetic CH3CHO: tráng bạc tạo Ag ✔\n• Propionic acid C2H5COOH: không có –CHO → không.\n• Dimethylacetylene CH3–C≡C–CH3: liên kết ba không ở đầu mạch → không.\n→ 3 chất. (Đề gốc ghi lặp "aldehyde acetic" hai lần, ở đây chỉ tính một lần.)'),
    sh('(Đề THPT QG – 2019) Đun nóng 100 mL dung dịch glucose a mol/L với lượng dư dung dịch AgNO3 trong NH3. Sau khi phản ứng hoàn toàn thu được 21,6 gam kết tủa. Tính giá trị của a?', 1,
      'n(Ag) = 21,6 : 108 = 0,2 mol.\nGlucose → 2Ag → n(glucose) = 0,1 mol.\na = 0,1 : 0,1 = 1 (mol/L).', 0.01, ' M'),
    sh('(Đề TNTHPT – 2023) Từ m kg mùn cưa chứa 50% cellulose (còn lại là tạp chất trơ) sản xuất được 80 kg glucose với hiệu suất toàn bộ quá trình là 80%. Tính giá trị của m?', 180,
      'Cứ 162 kg cellulose → 180 kg glucose.\nCellulose lí thuyết = 80 × 162 : 180 = 72 kg → thực tế (H = 80%) = 72 : 0,8 = 90 kg.\nMùn cưa chứa 50% cellulose → m = 90 : 0,5 = 180 kg.', 0.5, ' kg'),
    sh('(Đề TSĐH B – 2008) Khối lượng tinh bột (kg) cần dùng trong quá trình lên men để tạo thành 5 lít ethyl alcohol 46° là bao nhiêu? Biết hiệu suất của cả quá trình là 72% và khối lượng riêng của ethyl alcohol nguyên chất là 0,8 g/mL.', 4.5,
      'V(C2H5OH) = 5 × 46% = 2,3 L = 2300 mL → m = 2300 × 0,8 = 1840 g → n = 1840 : 46 = 40 mol.\nSơ đồ: (C6H10O5)n → nC6H12O6 → 2nC2H5OH: mỗi mắt xích C6H10O5 cho 2 C2H5OH.\nn(C6H10O5) lí thuyết = 40 : 2 = 20 mol → m = 20 × 162 = 3240 g.\nH = 72% → m(tinh bột) = 3240 : 0,72 = 4500 g = 4,5 kg.', 0.01, ' kg')
  ]);
})(window);
