/* Đề 11 · Ôn tập chương 2 – Carbohydrate (số 1) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function x(s) { return String(s).replace(/#/g, '\u2060'); }
  function mc(t, o, a, e) { return { text: x(t), options: o.map(x), answer: a, explain: x(e) }; }
  function tf(t, arr, img) { var q = { text: x(t), items: arr.map(function (r) { return { t: x(r[0]), a: r[1], explain: x(r[2]) }; }) }; if (img) q.img = img; return q; }
  function sh(t, a, e, tol, unit) { var q = { text: x(t), answer: a, explain: x(e), tol: tol !== undefined ? tol : 0.01 }; if (unit) q.unit = unit; return q; }

  E.part('de11', 'mcq', [
    mc('(Đề TSĐH B – 2013) Carbohydrate nào sau đây thuộc loại disaccharide?', ['Amylose.', 'Saccharose.', 'Glucose.', 'Cellulose.'], 1,
      'Disaccharide là carbohydrate thủy phân mỗi phân tử cho 2 phân tử monosaccharide: saccharose, maltose.\nAmylose (thành phần tinh bột) và cellulose là polysaccharide; glucose là monosaccharide.'),
    mc('(Đề TN THPT QG – 2020) Số nguyên tử hydrogen trong phân tử fructose là', ['10.', '12.', '22.', '6.'], 1,
      'Fructose có công thức phân tử C6H12O6 → 12 nguyên tử hydrogen.'),
    mc('(Đề MH lần I – 2017) Chất nào sau đây còn có tên gọi là đường nho?', ['Glucose.', 'Saccharose.', 'Fructose.', 'Tinh bột.'], 0,
      'Glucose có nhiều trong quả nho chín nên được gọi là đường nho.'),
    mc('Hai chất đồng phân của nhau là', ['glucose và maltose.', 'fructose và glucose.', 'fructose và maltose.', 'saccharose và glucose.'], 1,
      'Glucose và fructose cùng công thức phân tử C6H12O6 nhưng khác cấu tạo (glucose có –CHO, fructose có C=O ở C#2) → là đồng phân.\nMaltose, saccharose là C12H22O11.'),
    mc('(Đề MH – 2023) Chất nào sau đây có phản ứng tráng bạc?', ['Saccharose.', 'Cellulose.', 'Tinh bột.', 'Glucose.'], 3,
      'Glucose có nhóm –CHO nên tráng bạc:\nHOCH2[CHOH]4CHO + 2[Ag(NH3)2]OH → HOCH2[CHOH]4COONH4 + 2Ag↓ + 3NH3 + H2O.\nSaccharose, tinh bột, cellulose không có nhóm –CHO tự do.'),
    mc('Khi bị ốm, mất sức, nhiều người bệnh thường được truyền dịch đường để bổ sung nhanh năng lượng. Chất trong dịch truyền có tác dụng trên là', ['glucose.', 'saccharose.', 'fructose.', 'cellulose.'], 0,
      'Glucose là chất dinh dưỡng có giá trị, được cơ thể hấp thụ trực tiếp vào máu → dùng làm dịch truyền (huyết thanh ngọt) để bổ sung nhanh năng lượng.'),
    mc('(SGK Hóa học 12 CB) Cho các dung dịch: glucose, glycerol, formaldehyde, ethanol. Có thể dùng thuốc thử nào sau đây để phân biệt được cả 4 dung dịch trên?', ['Cu(OH)2 trong môi trường kiềm.', 'Dung dịch AgNO3/NH3.', 'Na.', 'Nước bromine.'], 0,
      'Dùng Cu(OH)2/OH^{–}:\n• Nhiệt độ thường: glucose, glycerol tạo dung dịch xanh lam (nhóm 1); formaldehyde, ethanol không hiện tượng (nhóm 2).\n• Đun nóng: ở nhóm 1, glucose tạo kết tủa đỏ gạch Cu2O, glycerol thì không; ở nhóm 2, formaldehyde HCHO tạo kết tủa đỏ gạch, ethanol thì không.\n→ Phân biệt được cả 4 dung dịch.'),
    mc('(Đề TNTHPT – 2022) Cho dãy các chất sau: glucose, fructose, saccharose, cellulose. Số chất trong dãy có khả năng tham gia phản ứng tráng bạc là', ['4.', '2.', '1.', '3.'], 1,
      'Tráng bạc: glucose (có –CHO) và fructose (chuyển thành glucose trong môi trường NH3).\nSaccharose và cellulose không tráng bạc → 2 chất.'),
    mc('(SGK Hóa học 12 – CTST) Carbohydrate nào dưới đây không có nhóm –OH hemiacetal hoặc nhóm –OH hemiketal?', ['Maltose.', 'Fructose.', 'Saccharose.', 'Glucose.'], 2,
      'Trong saccharose, C#1 của gốc glucose (vị trí –OH hemiacetal) và C#2 của gốc fructose (vị trí –OH hemiketal) đã dùng để tạo liên kết α-1,2-glycoside → không còn –OH hemiacetal/hemiketal.\nGlucose (C#1), fructose (C#2), maltose (C#1 của gốc thứ hai) vẫn còn.'),
    mc('(Đề TN THPT QG – 2021) Dung dịch chất nào sau đây hòa tan Cu(OH)2, thu được dung dịch có màu xanh lam?', ['Saccharose.', 'Ethyl alcohol.', 'Propan-1,3-diol.', 'Albumin.'], 0,
      'Saccharose có nhiều nhóm –OH liền kề → hòa tan Cu(OH)2 tạo dung dịch xanh lam.\nEthyl alcohol (1 –OH), propan-1,3-diol (2 –OH không liền kề) không phản ứng; albumin cho màu tím (phản ứng biuret).'),
    mc('(Đề TN THPT QG – 2021) Chất nào sau đây bị thủy phân khi đun nóng trong môi trường acid?', ['Saccharose.', 'Glycerol.', 'Glucose.', 'Fructose.'], 0,
      'Saccharose (disaccharide): C12H22O11 + H2O → C6H12O6 (glucose) + C6H12O6 (fructose).\nGlucose, fructose, glycerol không bị thủy phân.'),
    mc('(Đề MH lần I – 2017) Polymer thiên nhiên X được sinh ra trong quá trình quang hợp của cây xanh. Ở nhiệt độ thường, X tạo với dung dịch iodine hợp chất có màu xanh tím. Polymer X là', ['tinh bột.', 'cellulose.', 'saccharose.', 'glycogen.'], 0,
      'Tạo màu xanh tím với iodine là phản ứng đặc trưng của tinh bột; tinh bột được tạo thành trong cây xanh nhờ quang hợp.'),
    mc('(Đề TSĐH A – 2013) Dãy các chất đều có khả năng tham gia phản ứng thủy phân trong dung dịch H2SO4 đun nóng là', ['glucose, tinh bột và cellulose.', 'saccharose, tinh bột và cellulose.', 'glucose, saccharose và fructose.', 'fructose, saccharose và tinh bột.'], 1,
      'Chỉ disaccharide và polysaccharide mới bị thủy phân. Dãy không chứa monosaccharide (glucose, fructose) là: saccharose, tinh bột, cellulose.'),
    mc('(Đề TSĐH A – 2009) Dãy gồm các dung dịch đều tham gia phản ứng tráng bạc là', ['Glucose, maltose, formic acid, aldehyde acetic.', 'Fructose, maltose, glycerol, aldehyde acetic.', 'Glucose, glycerol, maltose, formic acid.', 'Glucose, fructose, maltose, saccharose.'], 0,
      'Glucose, maltose, formic acid HCOOH, aldehyde acetic CH3CHO đều có nhóm –CHO → đều tráng bạc.\nCác dãy còn lại có chất không tráng bạc: glycerol, saccharose.'),
    mc('(Đề TNTHPT – 2023) Phát biểu nào sau đây sai?', ['Thủy phân hoàn toàn cellulose thu được glucose.', 'Fructose và glucose là đồng phân của nhau.', 'Amylopectin có cấu trúc mạch phân nhánh.', 'Fructose là sản phẩm của phản ứng thủy phân tinh bột.'], 3,
      'Tinh bột gồm các gốc α-glucose nên thủy phân tinh bột chỉ thu được glucose, không thu được fructose → phát biểu này sai.\nCác phát biểu còn lại đúng.'),
    mc('(Đề TSĐH B – 2007) Phát biểu nào sau đây không đúng?', ['Dung dịch fructose hoà tan được Cu(OH)2.', 'Thủy phân (xúc tác H^{+}, t°) saccharose cũng như maltose đều cho cùng một monosaccharide.', 'Sản phẩm thủy phân cellulose (xúc tác H^{+}, t°) có thể tham gia phản ứng tráng gương.', 'Dung dịch maltose tác dụng với Cu(OH)2 khi đun nóng cho kết tủa Cu2O.'], 1,
      '• Thủy phân saccharose → glucose + fructose (2 monosaccharide khác nhau); thủy phân maltose → chỉ glucose. Sản phẩm không giống nhau → phát biểu này KHÔNG đúng.\n• Fructose có nhiều –OH liền kề → hòa tan Cu(OH)2: đúng.\n• Thủy phân cellulose → glucose (tráng gương được): đúng.\n• Maltose mở vòng tạo –CHO → khử Cu(OH)2 khi đun nóng tạo Cu2O: đúng.'),
    mc('(Đề TSĐH A – 2012) Cho các phát biểu sau:\n(a) Đốt cháy hoàn toàn ester no, đơn chức, mạch hở luôn thu được số mol CO2 bằng số mol H2O.\n(b) Trong hợp chất hữu cơ nhất thiết phải có carbon và hydrogen.\n(c) Những hợp chất hữu cơ có thành phần nguyên tố giống nhau, thành phần phân tử hơn kém nhau một hay nhiều nhóm CH2 là đồng đẳng của nhau.\n(d) Dung dịch glucose bị khử bởi AgNO3 trong NH3 tạo ra Ag.\n(e) Saccharose chỉ có cấu tạo mạch vòng.\nSố phát biểu đúng là', ['5.', '3.', '4.', '2.'], 3,
      '(a) Đúng — C_{n}H_{2n}O2 + O2 → nCO2 + nH2O.\n(b) Sai — hợp chất hữu cơ nhất thiết có C nhưng không nhất thiết có H (ví dụ CCl4).\n(c) Sai — đồng đẳng còn phải có cấu tạo và tính chất hóa học tương tự nhau.\n(d) Sai — glucose bị OXI HÓA bởi AgNO3/NH3 (glucose là chất khử).\n(e) Đúng — saccharose không có –OH hemiacetal/hemiketal nên không mở vòng.\n→ 2 phát biểu đúng.'),
    mc('(Đề THPT QG – 2016) Cho các phát biểu sau:\n(a) Glucose được gọi là đường nho do có nhiều trong quả nho chín.\n(b) Chất béo là diester của glycerol với acid béo.\n(c) Phân tử amylopectin có cấu trúc mạch phân nhánh.\n(d) Ở nhiệt độ thường, triolein ở trạng thái rắn.\n(e) Trong mật ong chứa nhiều fructose.\n(f) Tinh bột là một trong những lương thực cơ bản của con người.\nSố phát biểu đúng là', ['5.', '6.', '3.', '4.'], 3,
      '(a) Đúng.\n(b) Sai — chất béo là TRIester của glycerol với acid béo.\n(c) Đúng.\n(d) Sai — triolein chứa gốc acid béo không no nên ở trạng thái lỏng.\n(e) Đúng — mật ong chứa khoảng 40% fructose.\n(f) Đúng.\n→ 4 phát biểu đúng.')
  ]);

  E.part('de11', 'tf', [
    tf('(SGK Hóa học 12 – KNTT) Các nghiên cứu sâu hơn về cấu tạo cho biết glucose có một dạng mạch hở và hai dạng mạch vòng (α-glucose và β-glucose) chuyển hóa qua lại lẫn nhau như hình dưới:', [
      ['Ở dạng mạch hở, phân tử glucose có năm nhóm hydroxy và một nhóm aldehyde, với công thức cấu tạo là HOCH2[CHOH]4CH=O.', true, 'Dạng mạch hở: C#1 là nhóm –CH=O, các C#2 → C#6 mỗi nguyên tử mang một nhóm –OH → 5 nhóm –OH.'],
      ['Nhóm –OH ở vị trí carbon số 6 trong glucose dạng mạch vòng gọi là –OH hemiacetal.', false, '–OH hemiacetal là nhóm –OH ở C#1 (nguyên tử C liên kết đồng thời với O trong vòng). –OH ở C#6 là –OH alcohol bậc I bình thường.'],
      ['Ở dạng cấu tạo mạch vòng, nhóm –OH hemiacetal của glucose tác dụng với methanol khi có mặt của HCl khan, tạo thành methyl α-glycoside.', true, 'Chỉ –OH hemiacetal (C#1) có phản ứng này: –OH được thay bằng –OCH3, tạo methyl α-glycoside.'],
      ['Phản ứng của glucose với methanol khi có mặt HCl khan, tạo thành methyl α-glycoside, chứng tỏ glucose có dạng mạch hở.', false, 'Phản ứng này xảy ra ở nhóm –OH hemiacetal, chỉ có ở dạng mạch VÒNG → chứng tỏ glucose có dạng mạch vòng.']],
      { src: 'img/glucose-dang.png', alt: 'Dạng α-glucose, dạng mạch hở và dạng β-glucose chuyển hóa qua lại' }),
    tf('Tinh thể chất rắn X không màu, vị ngọt, dễ tan trong nước. X có nhiều trong quả nho chín nên còn gọi là đường nho. X tác dụng với nước bromine thu được chất hữu cơ Y.', [
      ['X là glucose có công thức phân tử là C6H12O6.', true, 'Đường nho là glucose, C6H12O6.'],
      ['X tác dụng với nước bromine, chứng minh X có tính chất của polyalcohol.', false, 'Nước bromine oxi hóa nhóm –CHO → chứng minh tính chất aldehyde, không phải polyalcohol.'],
      ['Số nguyên tử oxygen trong Y là 6.', false, 'HOCH2[CHOH]4CHO + Br2 + H2O → HOCH2[CHOH]4COOH + 2HBr. Y là gluconic acid C6H12O7 có 7 nguyên tử O.'],
      ['Đồng phân của X là fructose. Tương tự X, fructose cũng tác dụng với nước bromine thu được chất hữu cơ Y.', false, 'Fructose không có nhóm –CHO và không chuyển thành glucose trong môi trường acid của nước bromine → không phản ứng.']]),
    tf('(Đề TN THPT QG – 2020) Thủy phân saccharose, thu được hai monosaccharide X và Y. Chất X có trong máu người trưởng thành, khỏe mạnh vào lúc đói với nồng độ khoảng 4,4 – 7,2 mmol/L (hay 80 – 130 mg/dL).', [
      ['Y bị thủy phân trong môi trường kiềm.', false, 'X là glucose (đường huyết), Y là fructose. Fructose là monosaccharide nên không bị thủy phân.'],
      ['X không có phản ứng tráng bạc.', false, 'Glucose có nhóm –CHO nên có phản ứng tráng bạc.'],
      ['X có phân tử khối bằng 180.', true, 'Glucose C6H12O6: M = 180.'],
      ['Y không tan trong nước.', false, 'Fructose là chất rắn kết tinh, dễ tan trong nước.']]),
    tf('(Đề TN THPT QG – 2020) Polysaccharide X là chất rắn, ở dạng bột vô định hình, màu trắng và được tạo thành trong cây xanh nhờ quá trình quang hợp. Thủy phân X thu được monosaccharide Y.', [
      ['Y tác dụng với nước bromine tạo gluconic acid.', true, 'X là tinh bột, Y là glucose. C6H12O6 + Br2 + H2O → C6H12O7 (gluconic acid) + 2HBr.'],
      ['X có phản ứng tráng bạc.', false, 'Tinh bột không có nhóm –CHO tự do → không tráng bạc.'],
      ['Phân tử khối của Y là 162.', false, 'Glucose có M = 180; 162 là khối lượng của một mắt xích C6H10O5.'],
      ['X dễ tan trong nước lạnh.', false, 'Tinh bột không tan trong nước lạnh; trong nước nóng hạt tinh bột ngậm nước, trương phồng tạo hồ tinh bột.']])
  ]);

  E.part('de11', 'short', [
    sh('(Đề TSCĐ – 2011) Cho các chất: saccharose, glucose, fructose, ethyl formate, formic acid và aldehyde acetic. Trong các chất trên, số chất vừa có khả năng tham gia phản ứng tráng bạc vừa có khả năng phản ứng với Cu(OH)2 ở điều kiện thường là bao nhiêu?', 3,
      'Xét từng chất (tráng bạc / Cu(OH)2 ở điều kiện thường):\n• saccharose: không / có → loại.\n• glucose: có / có (xanh lam) ✔\n• fructose: có / có (xanh lam) ✔\n• ethyl formate: có / không → loại.\n• formic acid: có / có (phản ứng acid – base tạo (HCOO)2Cu) ✔\n• aldehyde acetic: có / không (chỉ phản ứng khi đun nóng) → loại.\n→ 3 chất.'),
    sh('(Đề TSCĐ – 2008) Cho dãy các chất: glucose, cellulose, saccharose, tinh bột và fructose. Số chất trong dãy tham gia phản ứng tráng gương là bao nhiêu?', 2,
      'Tráng gương: glucose (có –CHO) và fructose (chuyển thành glucose trong môi trường NH3).\nCellulose, saccharose, tinh bột không tráng gương → 2 chất.'),
    sh('Tương tự glucose, dung dịch fructose có thể hòa tan Cu(OH)2 trong môi trường kiềm, tạo thành dung dịch màu xanh lam. Dung dịch chứa 0,2 mol fructose có khả năng hòa tan tối đa b mol Cu(OH)2. Tính giá trị của b?', 0.1,
      '2C6H12O6 + Cu(OH)2 → (C6H11O6)2Cu + 2H2O.\nn(Cu(OH)2) = n(fructose) : 2 = 0,2 : 2 = 0,1 mol → b = 0,1.'),
    sh('(SGK Hóa học 12 – KNTT) Maltose có công thức phân tử C12H22O11, cấu tạo từ hai đơn vị glucose qua liên kết α-1,4-glycoside. Ở dạng mở vòng, tổng số nhóm –OH trong phân tử maltose là bao nhiêu?', 8,
      'Ở dạng mở vòng của maltose:\n• Gốc glucose thứ nhất (vẫn ở dạng vòng): còn –OH ở C#2, C#3, C#4, C#6 → 4 nhóm (C#1 đã tham gia liên kết glycoside).\n• Gốc glucose thứ hai (mở vòng): C#1 trở thành –CH=O, C#4 tham gia liên kết glycoside; còn –OH ở C#2, C#3, C#5, C#6 → 4 nhóm.\n→ Tổng 4 + 4 = 8 nhóm –OH.'),
    sh('(Đề MH – 2021) Thủy phân 1,71 gam saccharose với hiệu suất 75%, thu được hỗn hợp X. Cho toàn bộ X vào lượng dư dung dịch AgNO3 trong NH3, đun nóng, sau khi các phản ứng xảy ra hoàn toàn, thu được m gam Ag. Tính giá trị của m?', 1.62,
      'n(saccharose) = 1,71 : 342 = 0,005 mol → phản ứng 75%: 0,005 × 0,75 = 0,00375 mol.\nSinh ra 0,00375 mol glucose + 0,00375 mol fructose = 0,0075 mol monosaccharide (saccharose dư không tráng bạc).\nn(Ag) = 2 × 0,0075 = 0,015 mol → m = 0,015 × 108 = 1,62 gam.', 0.01, ' g'),
    sh('(SBT Hóa học 12 – CB) Rượu 40° là loại rượu trong đó ethyl alcohol chiếm 40% về thể tích. Người ta dùng một loại nguyên liệu chứa 50% glucose để lên men thành ethyl alcohol với hiệu suất 80%. Để thu được 2,3 lít rượu 40° cần dùng bao nhiêu kg nguyên liệu nói trên? Biết rằng khối lượng riêng của ethyl alcohol là 0,8 g/mL.', 3.6,
      'V(C2H5OH) = 2,3 × 40% = 0,92 L = 920 mL → m = 920 × 0,8 = 736 g → n = 736 : 46 = 16 mol.\nC6H12O6 → 2C2H5OH + 2CO2 → n(glucose) = 8 mol (lí thuyết) → thực tế 8 : 0,8 = 10 mol = 1800 g = 1,8 kg.\nNguyên liệu chứa 50% glucose → cần 1,8 : 0,5 = 3,6 kg.', 0.01, ' kg')
  ]);
})(window);
