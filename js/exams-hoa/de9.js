/* Đề 9 · Saccharose và Maltose (Bài 5) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function x(s) { return String(s).replace(/#/g, '\u2060'); }
  function mc(t, o, a, e) { return { text: x(t), options: o.map(x), answer: a, explain: x(e) }; }
  function tf(t, arr, img) { var q = { text: x(t), items: arr.map(function (r) { return { t: x(r[0]), a: r[1], explain: x(r[2]) }; }) }; if (img) q.img = img; return q; }
  function sh(t, a, e, tol, unit) { var q = { text: x(t), answer: a, explain: x(e), tol: tol !== undefined ? tol : 0.01 }; if (unit) q.unit = unit; return q; }

  E.part('de9', 'mcq', [
    mc('(Đề TNTHPT – 2023) Số nguyên tử carbon trong phân tử saccharose là', ['6.', '5.', '12.', '10.'], 2,
      'Saccharose có công thức phân tử C12H22O11 → có 12 nguyên tử carbon (gồm 1 gốc glucose C6 và 1 gốc fructose C6).'),
    mc('Đường mía là loại đường nào sau đây?', ['Maltose.', 'Glucose.', 'Fructose.', 'Saccharose.'], 3,
      'Saccharose có nhiều trong cây mía, củ cải đường, hoa thốt nốt → gọi là đường mía (đường kính, đường cát, đường phèn).\nGlucose là đường nho, fructose có nhiều trong mật ong, maltose là đường mạch nha.'),
    mc('Phân tử saccharose được tạo bởi', ['một gốc glucose và một gốc maltose.', 'hai gốc fructose.', 'một gốc glucose và một gốc fructose.', 'hai gốc glucose.'], 2,
      'Saccharose gồm một gốc α-glucose và một gốc β-fructose liên kết với nhau qua nguyên tử oxygen (liên kết α-1,2-glycoside giữa C#1 của glucose và C#2 của fructose).\nHai gốc glucose là cấu tạo của maltose.'),
    mc('(SGK Hóa học 12 – CTST) Carbohydrate nào dưới đây không có nhóm –OH hemiacetal hoặc nhóm –OH hemiketal?', ['Maltose.', 'Fructose.', 'Saccharose.', 'Glucose.'], 2,
      '• Glucose: có –OH hemiacetal ở C#1. Fructose: có –OH hemiketal ở C#2.\n• Maltose: liên kết α-1,4 dùng C#1 của gốc thứ nhất, gốc glucose thứ hai vẫn còn –OH hemiacetal ở C#1.\n• Saccharose: liên kết α-1,2 dùng đồng thời C#1 của glucose (–OH hemiacetal) và C#2 của fructose (–OH hemiketal) → không còn nhóm nào.\n→ Đáp án: saccharose (vì vậy saccharose không mở vòng được, không tráng bạc).'),
    mc('Saccharose tham gia phản ứng hóa học nào sau đây?', ['Phản ứng tráng gương.', 'Phản ứng thủy phân.', 'Phản ứng xà phòng hóa.', 'Phản ứng ester hóa.'], 1,
      'Saccharose là disaccharide nên bị thủy phân (xúc tác acid hoặc enzyme):\nC12H22O11 + H2O → C6H12O6 (glucose) + C6H12O6 (fructose).\nSaccharose không có nhóm –CHO, không mở vòng → không tráng gương; xà phòng hóa là phản ứng của ester/chất béo.'),
    mc('Khi thuỷ phân saccharose, sản phẩm thu được là', ['glucose và fructose.', 'glucose.', 'fructose.', 'tinh bột.'], 0,
      'C12H22O11 + H2O → C6H12O6 (glucose) + C6H12O6 (fructose) (H^{+}, t° hoặc enzyme).'),
    mc('Để phân biệt saccharose và glucose người ta dùng', ['dung dịch H2SO4 loãng.', 'dung dịch NaOH.', 'dung dịch AgNO3/NH3.', 'Na kim loại.'], 2,
      'Glucose có nhóm –CHO nên tạo kết tủa Ag (tráng bạc) với AgNO3/NH3, đun nóng; saccharose không có phản ứng này.\nH2SO4 loãng, NaOH, Na đều không cho hiện tượng khác biệt rõ.'),
    mc('Khi nghiên cứu carbohydrate X ta nhận thấy:\n- X không tráng gương, có một đồng phân;\n- X thuỷ phân trong nước được hai sản phẩm.\nVậy X là', ['fructose.', 'saccharose.', 'cellulose.', 'tinh bột.'], 1,
      '• Thủy phân được → loại fructose (monosaccharide).\n• Thủy phân ra 2 sản phẩm (glucose và fructose) → saccharose (tinh bột, cellulose chỉ ra glucose).\n• Không tráng gương và có một đồng phân là maltose (cùng C12H22O11) → phù hợp với saccharose.'),
    mc('(Đề TSĐH B – 2010) Chất X có các đặc điểm sau: phân tử có nhiều nhóm –OH, có vị ngọt, hoà tan Cu(OH)2 ở nhiệt độ thường, phân tử có liên kết glycoside, làm mất màu nước bromine. Chất X là', ['cellulose.', 'maltose.', 'glucose.', 'saccharose.'], 1,
      '• Có liên kết glycoside → là disaccharide hoặc polysaccharide (loại glucose).\n• Có vị ngọt, hòa tan Cu(OH)2 → loại cellulose.\n• Làm mất màu nước bromine → phải còn nhóm –CHO khi mở vòng: maltose có –OH hemiacetal nên mở vòng tạo –CHO; saccharose thì không.\n→ X là maltose.'),
    mc('(Đề TSĐH B – 2013) Chất nào dưới đây khi cho vào dung dịch AgNO3 trong NH3 dư, đun nóng, không xảy ra phản ứng tráng bạc?', ['Maltose.', 'Fructose.', 'Saccharose.', 'Glucose.'], 2,
      'Glucose, maltose có nhóm –CHO (maltose khi mở vòng); fructose chuyển thành glucose trong môi trường NH3 → đều tráng bạc.\nSaccharose không có –OH hemiacetal/hemiketal, không mở vòng → không tráng bạc.'),
    mc('(Đề THPT QG – 2017) Saccharose và glucose đều có phản ứng', ['cộng H2 (Ni, t°).', 'tráng bạc.', 'với Cu(OH)2.', 'thủy phân.'], 2,
      'Cả hai đều có nhiều nhóm –OH liền kề → hòa tan Cu(OH)2 ở nhiệt độ thường tạo dung dịch xanh lam.\n• Cộng H2 và tráng bạc: chỉ glucose (có –CHO).\n• Thủy phân: chỉ saccharose.'),
    mc('(Đề TN THPT QG – 2021) Dung dịch chất nào sau đây hòa tan Cu(OH)2, thu được dung dịch có màu xanh lam?', ['Saccharose.', 'Ethyl alcohol.', 'Propan-1,3-diol.', 'Albumin.'], 0,
      'Saccharose có nhiều nhóm –OH liền kề → hòa tan Cu(OH)2 tạo dung dịch xanh lam:\n2C12H22O11 + Cu(OH)2 → (C12H21O11)2Cu + 2H2O.\nEthyl alcohol có 1 nhóm –OH; propan-1,3-diol có 2 –OH không kề nhau; albumin cho màu tím (biuret).'),
    mc('(Đề TN THPT QG – 2021) Chất nào sau đây bị thủy phân khi đun nóng trong môi trường acid?', ['Saccharose.', 'Glycerol.', 'Glucose.', 'Fructose.'], 0,
      'Saccharose là disaccharide nên bị thủy phân trong môi trường acid tạo glucose và fructose.\nGlucose, fructose là monosaccharide; glycerol là alcohol → không bị thủy phân.'),
    mc('(SBT Hóa học 12 NC) Để nhận biết 3 dung dịch: glucose, ethyl alcohol, saccharose đựng riêng biệt trong 3 lọ mất nhãn, ta dùng thuốc thử là', ['Cu(OH)2/OH^{–}.', 'Na.', 'dung dịch AgNO3/NH3.', 'CH3OH/HCl.'], 0,
      'Dùng Cu(OH)2/OH^{–}:\n• Ở nhiệt độ thường: glucose và saccharose hòa tan Cu(OH)2 → dung dịch xanh lam; ethyl alcohol không hiện tượng → nhận ra ethyl alcohol.\n• Đun nóng 2 dung dịch xanh lam: glucose tạo kết tủa đỏ gạch Cu2O; saccharose không.\n→ Nhận biết được cả 3 chất. (AgNO3/NH3 chỉ nhận ra glucose, không phân biệt được ethyl alcohol và saccharose.)'),
    mc('(SBT Hóa học 12 NC) Một carbohydrate (Z) có các phản ứng diễn ra theo sơ đồ chuyển hóa sau:\nZ → (Cu(OH)2/NaOH) dung dịch xanh lam → (t°) kết tủa đỏ gạch.\nVậy, Z không thể là', ['glucose.', 'saccharose.', 'fructose.', 'maltose.'], 1,
      '• Bước 1 (xanh lam): Z có nhiều –OH liền kề — cả 4 chất đều thỏa mãn.\n• Bước 2 (đun nóng → Cu2O đỏ gạch): Z phải có tính khử (có –CHO hoặc chuyển thành chất có –CHO trong kiềm): glucose, fructose, maltose thỏa mãn.\n• Saccharose không có –OH hemiacetal/hemiketal, không mở vòng nên không khử Cu(OH)2 → Z không thể là saccharose.'),
    mc('(Đề THPT QG – 2017) Phát biểu nào sau đây sai?', ['Glucose và saccharose đều là carbohydrate.', 'Trong dung dịch, glucose và fructose đều hòa tan được Cu(OH)2.', 'Glucose và saccharose đều có phản ứng tráng bạc.', 'Glucose và fructose là đồng phân của nhau.'], 2,
      'Saccharose không có nhóm –CHO, không mở vòng được nên không tráng bạc → phát biểu "glucose và saccharose đều có phản ứng tráng bạc" là sai.\nCác phát biểu còn lại đều đúng.'),
    mc('(Đề MH – 2020) Thủy phân 68,4 gam saccharose với hiệu suất 75%, thu được m gam glucose. Giá trị m là', ['54.', '27.', '72.', '36.'], 1,
      'n(saccharose) = 68,4 : 342 = 0,2 mol.\nC12H22O11 + H2O → C6H12O6 (glucose) + C6H12O6 (fructose).\nn(glucose) = 0,2 × 75% = 0,15 mol → m = 0,15 × 180 = 27 gam.'),
    mc('(SGK Hóa học 12 – CTST) Thủy phân 100 gam saccharose thu được 104,5 gam hỗn hợp gồm fructose, glucose và saccharose còn dư. Hiệu suất phản ứng thủy phân saccharose là', ['54%.', '27%.', '85,5%.', '15,5%.'], 2,
      'Bảo toàn khối lượng: khối lượng tăng chính là khối lượng H2O đã phản ứng.\nm(H2O) = 104,5 − 100 = 4,5 gam → n(H2O) = 4,5 : 18 = 0,25 mol.\nC12H22O11 + H2O → C6H12O6 + C6H12O6 → n(saccharose phản ứng) = n(H2O) = 0,25 mol.\nm(saccharose phản ứng) = 0,25 × 342 = 85,5 gam.\nH = 85,5 : 100 × 100% = 85,5%.')
  ]);

  E.part('de9', 'tf', [
    tf('Phân tử maltose được tạo bởi hai đơn vị glucose, liên kết với nhau qua nguyên tử oxygen giữa C#1 của đơn vị glucose này và C#4 của đơn vị glucose kia. Công thức cấu tạo của maltose như hình dưới:', [
      ['Maltose là một disaccharide có công thức phân tử là C12H22O11.', true, 'Maltose = 2 gốc glucose − 1 phân tử H2O: 2C6H12O6 − H2O = C12H22O11; thủy phân ra 2 monosaccharide → disaccharide.'],
      ['Hai đơn vị glucose liên kết với nhau qua liên kết α-1,4-glycoside.', true, 'Liên kết nối C#1 (cấu hình α) của gốc thứ nhất với C#4 của gốc thứ hai → liên kết α-1,4-glycoside.'],
      ['Dạng mở vòng, maltose chứa nhóm –CH=O, vì vậy maltose có khả năng tham gia phản ứng với thuốc thử Tollens.', true, 'Gốc glucose thứ hai còn –OH hemiacetal nên mở vòng được tạo nhóm –CH=O → tráng bạc.'],
      ['Dạng mạch vòng, nhóm –OH ở vị trí C#1 và C#4 là nhóm –OH hemiacetal.', false, 'Chỉ nhóm –OH ở C#1 (của gốc glucose thứ hai) là –OH hemiacetal (C#1 liên kết đồng thời với O trong vòng). Nhóm –OH ở C#4 của gốc thứ nhất là –OH alcohol bình thường.']],
      { src: 'img/maltose.png', alt: 'Công thức cấu tạo dạng mạch vòng và dạng mở vòng của maltose' }),
    tf('(SGK Hóa học 12 – KNTT) Tiến hành thí nghiệm theo các bước sau:\nBước 1: Cho khoảng 2 mL dung dịch NaOH 10% vào ống nghiệm. Sau đó, thêm khoảng 0,5 mL dung dịch CuSO4 5% vào, lắc nhẹ.\nBước 2: Cho khoảng 3 mL dung dịch saccharose 5% vào ống nghiệm, lắc đều.', [
      ['Ở bước 1, nếu thay dung dịch NaOH bằng dung dịch KOH thì hiện tượng ở bước 2 xảy ra tương tự.', true, 'Bước 1 chỉ nhằm tạo Cu(OH)2: CuSO4 + 2KOH → Cu(OH)2↓ + K2SO4, tương tự với NaOH → hiện tượng bước 2 không đổi.'],
      ['Sau bước 2, kết tủa tan tạo thành dung dịch màu xanh lam.', true, '2C12H22O11 + Cu(OH)2 → (C12H21O11)2Cu + 2H2O: kết tủa xanh tan, dung dịch xanh lam.'],
      ['Thí nghiệm trên chứng minh saccharose có tính chất của polyalcohol.', true, 'Hòa tan Cu(OH)2 ở nhiệt độ thường là tính chất của chất có nhiều –OH liền kề (polyalcohol).'],
      ['Nếu thay dung dịch saccharose bằng dung dịch glucose, sau bước 2 đun nóng thu được kết tủa Cu2O đỏ gạch.', true, 'Glucose có nhóm –CHO, khi đun nóng khử Cu(OH)2/OH^{–} thành Cu2O đỏ gạch.']]),
    tf('(SGK Hóa học 12 – KNTT) Saccharose bị thủy phân trong môi trường acid hoặc dưới tác dụng của enzyme.', [
      ['Sản phẩm của phản ứng thủy phân saccharose là glucose và fructose.', true, 'C12H22O11 + H2O → C6H12O6 (glucose) + C6H12O6 (fructose).'],
      ['Phản ứng trên chứng tỏ saccharose là một disaccharide.', true, 'Mỗi phân tử saccharose thủy phân tạo 2 phân tử monosaccharide → disaccharide.'],
      ['Sản phẩm của phản ứng thủy phân saccharose khi đun nóng với Cu(OH)2/OH^{–} thu được kết tủa Cu2O đỏ gạch.', true, 'Glucose có –CHO; fructose chuyển thành glucose trong môi trường kiềm → cả hai đều khử Cu(OH)2 tạo Cu2O đỏ gạch.'],
      ['Thủy phân hoàn toàn 1 mol saccharose trong môi trường acid thu được dung dịch Y. Cho toàn bộ Y tác dụng hoàn toàn với dung dịch AgNO3/NH3 thu được 2 mol Ag.', false, '1 mol saccharose → 1 mol glucose + 1 mol fructose = 2 mol monosaccharide; mỗi mol cho 2 mol Ag → thu được 4 mol Ag.']]),
    tf('(Đề THPT QG – 2019) Tinh thể chất X không màu, vị ngọt, dễ tan trong nước. X có nhiều trong mật ong nên làm cho mật ong có vị ngọt sắc. Trong công nghiệp, X được điều chế bằng phản ứng thủy phân chất Y.', [
      ['Phần trăm khối lượng oxygen trong Y là 51,462%.', true, 'X là fructose, Y là saccharose C12H22O11 (M = 342). %O = 11 × 16 : 342 × 100% = 176 : 342 × 100% ≈ 51,462%.'],
      ['X có khả năng làm mất màu nước bromine.', false, 'Fructose không có nhóm –CHO và không chuyển thành glucose trong nước bromine → không làm mất màu nước bromine.'],
      ['X là fructose, trong mật ong chứa trung bình 40% fructose theo khối lượng.', true, 'Fructose có nhiều trong mật ong (khoảng 40%), làm mật ong có vị ngọt sắc.'],
      ['X và Y đều có khả năng tác dụng được với thuốc thử Tollens.', false, 'Fructose (X) tráng bạc được nhưng saccharose (Y) thì không.']])
  ]);

  E.part('de9', 'short', [
    sh('(SGK Hóa học 12 – CTST) Cho các carbohydrate sau: glucose, fructose, saccharose và maltose. Số carbohydrate có khả năng mở vòng trong dung dịch nước là bao nhiêu?', 3,
      'Chất mở vòng được phải còn nhóm –OH hemiacetal hoặc –OH hemiketal:\n• glucose (–OH hemiacetal ở C#1) ✔\n• fructose (–OH hemiketal ở C#2) ✔\n• maltose (gốc glucose thứ hai còn –OH hemiacetal) ✔\n• saccharose: không còn → không mở vòng.\n→ 3 chất.'),
    sh('Phân tử saccharose có nhiều nhóm hydroxy liền kề nên dung dịch saccharose có thể hòa tan Cu(OH)2 trong môi trường kiềm, tạo thành dung dịch màu xanh lam. Dung dịch chứa 0,8 mol saccharose hòa tan tối đa b mol Cu(OH)2. Tính giá trị của b?', 0.4,
      '2C12H22O11 + Cu(OH)2 → (C12H21O11)2Cu + 2H2O.\nTỉ lệ n(saccharose) : n(Cu(OH)2) = 2 : 1 → b = 0,8 : 2 = 0,4 mol.'),
    sh('Dung dịch saccharose không phản ứng với thuốc thử Tollens, nhưng khi đun nóng với dung dịch acid loãng thì tạo thành dung dịch phản ứng với thuốc thử Tollens. Thủy phân hoàn toàn 0,5 mol saccharose thu được dung dịch X. X tác dụng hoàn toàn với dung dịch AgNO3/NH3 dư thu được a mol Ag. Tính giá trị của a?', 2,
      '0,5 mol saccharose → 0,5 mol glucose + 0,5 mol fructose = 1 mol monosaccharide.\nMỗi mol glucose hay fructose tráng bạc cho 2 mol Ag → a = 1 × 2 = 2 mol.'),
    sh('Cho các chất: saccharose, glucose, fructose, ethyl formate, formic acid và aldehyde acetic. Số chất có khả năng tham gia phản ứng với Cu(OH)2 ở điều kiện thường là bao nhiêu?', 4,
      'Ở điều kiện thường, Cu(OH)2 phản ứng với:\n• chất có nhiều –OH liền kề: saccharose, glucose, fructose (tạo dung dịch xanh lam);\n• carboxylic acid: formic acid (phản ứng acid – base: 2HCOOH + Cu(OH)2 → (HCOO)2Cu + 2H2O).\nEthyl formate và aldehyde acetic chỉ phản ứng với Cu(OH)2/OH^{–} khi đun nóng.\n→ 4 chất.'),
    sh('(Đề TSCĐ – 2011) Cho các chất: saccharose, glucose, fructose, aldehyde acetic và formic acid. Trong các chất trên, số chất vừa có khả năng tham gia phản ứng tráng bạc vừa có khả năng phản ứng với Cu(OH)2/OH^{–} đun nóng thu được kết tủa đỏ gạch Cu2O là bao nhiêu?', 4,
      'Cả hai phản ứng đều cần nhóm –CHO (hoặc chuyển thành chất có –CHO trong môi trường kiềm):\n• glucose ✔ • fructose ✔ (chuyển thành glucose trong kiềm) • aldehyde acetic CH3CHO ✔ • formic acid HCOOH ✔ (có nhóm –CHO trong phân tử).\n• Saccharose: không có –CHO, không mở vòng → không.\n→ 4 chất.'),
    sh('Thủy phân 34,2 gam saccharose với hiệu suất 80% thu được dung dịch X. Dung dịch X làm mất màu vừa đủ V mL dung dịch Br2 0,5 M. Tính giá trị của V?', 160,
      'n(saccharose) = 34,2 : 342 = 0,1 mol; phản ứng 80% → 0,08 mol.\nX gồm: glucose 0,08 mol, fructose 0,08 mol, saccharose dư 0,02 mol.\nChỉ glucose phản ứng với nước bromine (fructose và saccharose không):\nC6H12O6 + Br2 + H2O → C6H12O7 + 2HBr → n(Br2) = n(glucose) = 0,08 mol.\nV = 0,08 : 0,5 = 0,16 L = 160 mL.', 0.5, ' mL')
  ]);
})(window);
