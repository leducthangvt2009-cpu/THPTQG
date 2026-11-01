/* Đề 17 · Ôn tập giữa kì 1 – Đề tổng hợp, mã đề 101 (Ester – Lipid, Carbohydrate, Amine) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function mc(t, o, a, e, x) { var q = { text: t, options: o, answer: a, explain: e }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function tf(t, arr, x) { var q = { text: t, items: arr.map(function (r) { return { t: r[0], a: r[1], explain: r[2] }; }) }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function sh(t, a, e, tol, x) { var q = { text: t, answer: a, explain: e, tol: tol !== undefined ? tol : 0.01 }; if (x) for (var k in x) q[k] = x[k]; return q; }

  E.part('de17', 'mcq', [
    mc('Một loại chất béo có chứa 65% triolein về khối lượng. Để sản xuất 2,3 triệu hộp kem dưỡng da (có chứa chất dưỡng ẩm glycerol) cần dùng tối thiểu x tấn loại chất béo trên cho phản ứng với dung dịch NaOH, đun nóng. Biết rằng trong mỗi hộp kem dưỡng da có chứa 5 gam glycerol. Giá trị của x là', ['180.', '170.', '190.', '160.'], 1,
      'm(glycerol) = 2,3.10^{6} × 5 g = 11,5.10^{6} g = 11,5 tấn → n = 11,5 : 92 = 0,125 (triệu mol).\n(C17H33COO)3C3H5 + 3NaOH → 3C17H33COONa + C3H5(OH)3 nên n(triolein) = n(glycerol) = 0,125 triệu mol.\nm(triolein) = 0,125 × 884 = 110,5 tấn → m(chất béo) = 110,5 : 65% = 170 tấn. Đáp án: 170.'),
    mc('Chất nào sau đây phản ứng với dung dịch NaOH sinh ra glycerol?', ['Methyl acetate.', 'Saccharose.', 'Tristearin.', 'Glucose.'], 2,
      'Tristearin (C17H35COO)3C3H5 là triester của glycerol, bị xà phòng hóa tạo glycerol và sodium stearate. Methyl acetate tạo methanol; saccharose, glucose không bị thủy phân trong NaOH và không sinh glycerol.'),
    mc('Tinh thể chất rắn X vị ngọt, dễ tan trong nước. X có nhiều trong các bộ phận của cây đặc biệt là quả chín. Oxi hóa chất X bằng nước bromine thu được chất hữu cơ Y. Tên gọi của X và Y lần lượt là', ['glucose và gluconic acid.', 'fructose và gluconic acid.', 'glucose và ammonium gluconate.', 'saccharose và glucose.'], 0,
      'X có nhiều trong quả chín, bị nước bromine oxi hóa → X là glucose (fructose không làm mất màu nước bromine). CH2OH[CHOH]4CHO + Br2 + H2O → CH2OH[CHOH]4COOH + 2HBr; Y là gluconic acid. (Ammonium gluconate là sản phẩm của phản ứng với thuốc thử Tollens.)'),
    mc('Công thức của triolein là', ['(CH3[CH2]7CH=CH[CH2]5COO)3C3H5.', '(CH3[CH2]14COO)3C3H5.', '(CH3[CH2]16COO)3C3H5.', '(CH3[CH2]7CH=CH[CH2]7COO)3C3H5.'], 3,
      'Triolein là triester của glycerol với oleic acid CH3[CH2]7CH=CH[CH2]7COOH (C17H33COOH, 18 C, 1 nối đôi ở giữa mạch). A có mạch 16 C (palmitoleic), B là tripalmitin, C là tristearin.'),
    mc('Số nguyên tử hydrogen trong phân tử methyl formate là', ['4.', '6.', '8.', '2.'], 0,
      'Methyl formate là HCOOCH3 (C2H4O2): 1 H ở nhóm HCOO– và 3 H ở nhóm –CH3 → 4 nguyên tử hydrogen.'),
    mc('Đun nóng tinh bột trong dung dịch acid vô cơ loãng sẽ thu được', ['ethyl acetate.', 'cellulose.', 'glycerol.', 'glucose.'], 3,
      '(C6H10O5)n + nH2O → nC6H12O6 (xúc tác H+, đun nóng). Sản phẩm là glucose.'),
    mc('Thủy phân ester CH3CH2COOCH3, thu được alcohol có công thức là', ['C3H7OH.', 'C3H5OH.', 'C2H5OH.', 'CH3OH.'], 3,
      'CH3CH2COOCH3 (methyl propionate) + H2O ⇌ CH3CH2COOH + CH3OH. Alcohol tạo ra ứng với gốc ở cuối công thức ester (–CH3) là methanol CH3OH.'),
    mc('Để trung hòa 25 gam dung dịch của một amine đơn chức X nồng độ 12,4% cần dùng 100 mL dung dịch HCl 1M. Công thức phân tử của X là', ['C2H7N.', 'C3H5N.', 'C3H7N.', 'CH5N.'], 3,
      'm(X) = 25 × 12,4% = 3,1 g. Amine đơn chức phản ứng với HCl theo tỉ lệ 1 : 1: n(X) = n(HCl) = 0,1 × 1 = 0,1 mol.\nM(X) = 3,1 : 0,1 = 31 → CH3NH2 (CH5N).'),
    mc('Dãy các chất đều có khả năng tham gia phản ứng thủy phân trong dung dịch H2SO4 đun nóng là', ['glucose, saccharose và fructose.', 'glucose, tinh bột và cellulose.', 'fructose, saccharose và tinh bột.', 'saccharose, tinh bột và cellulose.'], 3,
      'Glucose và fructose là monosaccharide nên không bị thủy phân. Saccharose (disaccharide), tinh bột và cellulose (polysaccharide) đều bị thủy phân trong acid, đun nóng. Dãy D thỏa mãn.'),
    mc('Chất nào sau đây thuộc loại amine bậc một?', ['CH3NH2.', '(CH3)3N.', 'CH3NHCH3.', 'CH3CH2NHCH3.'], 0,
      'Bậc của amine là số gốc hydrocarbon liên kết với nitrogen. CH3NH2 (1 gốc) là bậc một; CH3NHCH3 và CH3CH2NHCH3 (2 gốc) là bậc hai; (CH3)3N (3 gốc) là bậc ba.'),
    mc('Trong điều kiện thích hợp glucose lên men tạo thành khí CO2 và', ['HCOOH.', 'C2H5OH.', 'CH3CHO.', 'CH3COOH.'], 1,
      'Lên men rượu: C6H12O6 –(enzyme, 30 – 35 °C)→ 2C2H5OH + 2CO2.'),
    mc('Phát biểu nào sau đây đúng?', ['Các chất béo thường không tan trong nước và nhẹ hơn nước.', 'Tripalmitin có khả năng tham gia phản ứng cộng hydrogen khi đun nóng có xúc tác, áp suất.', 'Chất béo bị thủy phân trong môi trường acid, không bị thủy phân trong môi trường kiềm.', 'Chất béo là triester của ethylene glycol với các acid béo.'], 0,
      'A đúng: chất béo không tan trong nước, nhẹ hơn nước (d ≈ 0,9 g/mL) nên nổi lên trên. B sai: tripalmitin là chất béo no, không có C=C nên không cộng H2. C sai: chất béo bị thủy phân trong cả acid lẫn kiềm (xà phòng hóa). D sai: chất béo là triester của glycerol (không phải ethylene glycol).'),
    mc('Chất X tác dụng với dung dịch NaOH vừa đủ, thu được hai chất Y và Z. Cho Z tác dụng với dung dịch AgNO3 trong NH3 thu được chất hữu cơ T. Cho T tác dụng với dung dịch NaOH lại thu được chất Y. Chất X là', ['CH3COOCH=CH–CH3.', 'CH3COOCH=CH2.', 'HCOOCH=CH2.', 'HCOOCH3.'], 1,
      'Z tham gia phản ứng tráng bạc nên Z là aldehyde; T là muối ammonium của acid tương ứng; T + NaOH → muối sodium chính là Y nên Y và T cùng gốc acid. X là ester của alcohol dạng enol (vinyl).\nXét B: CH3COOCH=CH2 + NaOH → CH3COONa (Y) + CH3CHO (Z); CH3CHO + 2AgNO3 + 3NH3 + H2O → CH3COONH4 (T) + 2Ag + 2NH4NO3; CH3COONH4 + NaOH → CH3COONa (Y) + NH3 + H2O. Thỏa mãn.\nA: Z là C2H5CHO → T là C2H5COONH4 → muối C2H5COONa ≠ Y (CH3COONa). C: Y = HCOONa nhưng T → CH3COONa. D: HCOOCH3 cho CH3OH (không tráng bạc).'),
    mc('Xà phòng hóa 0,3 mol methyl acrylate bằng dung dịch có 0,2 mol KOH. Sau phản ứng hoàn toàn, cô cạn dung dịch được bao nhiêu gam chất rắn khan?', ['30 gam', '33 gam', '25 gam', '22 gam'], 3,
      'CH2=CH–COOCH3 + KOH → CH2=CH–COOK + CH3OH. Vì 0,2 mol KOH < 0,3 mol ester nên KOH hết, ester dư 0,1 mol.\nKhi cô cạn, methanol và ester dư (dễ bay hơi) bay hơi; chất rắn khan chỉ còn muối potassium acrylate: n = 0,2 mol; M(CH2=CHCOOK) = 110 → m = 0,2 × 110 = 22 gam.'),
    mc('Saccharose là một loại disaccharide có nhiều trong cây mía, hoa thốt nốt, củ cải đường. Công thức phân tử của saccharose là', ['C6H12O6.', 'C2H4O2.', 'C12H22O11.', '(C6H10O5)n'], 2,
      'Saccharose gồm 1 gốc α-glucose và 1 gốc β-fructose liên kết với nhau: C12H22O11.'),
    mc('Phát biểu nào sau đây không đúng?', ['Maltose có nhiều trong mạch nha.', 'Saccharose và maltose đều là disaccharide.', 'Saccharose và fructose là đồng phân của nhau.', 'Saccharose chỉ có cấu tạo dạng mạch vòng.'], 2,
      'Saccharose có CTPT C12H22O11 còn fructose là C6H12O6 nên không phải đồng phân (đồng phân của saccharose là maltose). Các phát biểu A, B, D đều đúng: saccharose không có nhóm –OH hemiacetal nên không mở vòng, chỉ tồn tại ở dạng vòng.'),
    mc('Cho 0,01 mol một ester X của acid hữu cơ phản ứng vừa đủ với 100 mL dung dịch NaOH 0,2M, sản phẩm tạo thành chỉ gồm một alcohol Y và một muối Z với số mol bằng nhau. Mặt khác, khi xà phòng hoá hoàn toàn 1,29 gam ester đó bằng một lượng vừa đủ là 60 mL dung dịch KOH 0,25M, sau khi phản ứng kết thúc đem cô cạn dung dịch được 1,665 gam muối khan. Công thức của ester X là', ['C2H4(COOC4H9)2', 'C4H8(COO)2C2H4', 'C2H4(COO)2C4H8', 'C4H8(COOC2H5)2'], 1,
      'Lần 1: n(NaOH) = 0,1 × 0,2 = 0,02 mol = 2 × n(X) → X là ester hai chức. Alcohol và muối có số mol bằng nhau nên X là ester vòng của acid hai chức R(COOH)2 với diol R′(OH)2: R(COO)2R′.\nLần 2: n(KOH) = 0,06 × 0,25 = 0,015 mol → n(X) = 0,0075 mol → M(X) = 1,29 : 0,0075 = 172.\nM(muối R(COOK)2) = 1,665 : 0,0075 = 222 → R = 222 – 2 × 83 = 56 → R là C4H8.\nM(X) = 56 + 88 + R′ = 172 → R′ = 28 → C2H4. Vậy X là C4H8(COO)2C2H4.'),
    mc('Cho các chất sau: saccharose, glucose, acetic aldehyde, glycerol, ethyl alcohol, acetylene, fructose. Số lượng chất có thể tham gia phản ứng tráng gương là', ['5.', '2.', '4.', '3.'], 3,
      'Phản ứng tráng gương (tạo Ag) xảy ra với chất có nhóm –CHO: glucose, acetic aldehyde và fructose (chuyển thành glucose trong môi trường base) → 3 chất. Saccharose, glycerol, ethyl alcohol không có nhóm –CHO. Acetylene HC≡CH chỉ tạo kết tủa vàng AgC≡CAg với AgNO3/NH3, không tạo Ag nên không phải phản ứng tráng gương.')
  ]);

  E.part('de17', 'tf', [
    tf('Cho ester X có công thức: CH3COOC2H5.', [
      ['Tên gọi của X là methyl propionate.', false, 'CH3COOC2H5 gồm gốc acetate (CH3COO–) và gốc ethyl (–C2H5) nên là ethyl acetate. Methyl propionate là C2H5COOCH3 (đồng phân).'],
      ['Nhiệt độ sôi của X cao hơn so với butane.', true, 'Ethyl acetate (M = 88) có liên kết C=O phân cực, tương tác lưỡng cực mạnh hơn butane (M = 58, không phân cực): t° sôi ≈ 77 °C so với –0,5 °C của butane.'],
      ['Cho X tác dụng với dung dịch NaOH đun nóng thu được sản phẩm là CH3COONa và C2H5OH.', true, 'CH3COOC2H5 + NaOH → CH3COONa + C2H5OH (xà phòng hóa).'],
      ['Thủy phân X trong môi trường acid thu được hai chất Y và Z (M_{Y} < M_{Z}), từ Y có thể điều chế trực tiếp được Z.', true, 'Y là C2H5OH (46), Z là CH3COOH (60). Lên men giấm: C2H5OH + O2 –(men giấm)→ CH3COOH + H2O.']]),
    tf('Cho 1 mol triglyceride X tác dụng với dung dịch NaOH dư, thu được 1 mol glycerol, 1 mol sodium palmitate và 2 mol sodium oleate.', [
      ['Phân tử X có 5 liên kết π.', true, 'X có 3 nhóm C=O (3 liên kết π) và 2 gốc oleate mỗi gốc 1 liên kết đôi C=C (2 liên kết π) → 5 liên kết π.'],
      ['Có 2 đồng phân cấu tạo thỏa mãn tính chất của X.', true, 'X chứa 1 gốc palmitoyl và 2 gốc oleoyl: gốc palmitoyl ở vị trí giữa hoặc ở vị trí đầu mạch → 2 đồng phân cấu tạo.'],
      ['Công thức phân tử chất X là C52H96O6.', false, 'C3H8O3 + C16H32O2 (palmitic) + 2C18H34O2 (oleic) – 3H2O = C55H102O6. Vậy CTPT của X là C55H102O6.'],
      ['1 mol X phản ứng tối đa 2 mol H2 ở điều kiện thích hợp.', true, 'X có 2 liên kết đôi C=C (ở hai gốc oleoyl), mỗi liên kết cộng 1 H2.']]),
    tf('Tiến hành thí nghiệm theo các bước sau: Bước 1: Cho 5 giọt dung dịch CuSO4 0,5% vào ống nghiệm sạch. Bước 2: Thêm 1 mL dung dịch NaOH 10% vào ống nghiệm, lắc đều; gạn phần dung dịch, giữ lại kết tủa. Bước 3: Thêm tiếp 2 mL dung dịch glucose 1% vào ống nghiệm, lắc đều.', [
      ['Sau bước 3, kết tủa đã bị hòa tan, thu được dung dịch màu xanh lam.', true, 'Glucose có nhiều nhóm –OH kề nhau nên hòa tan Cu(OH)2 tạo phức xanh lam.'],
      ['Ở bước 2, trong ống nghiệm xuất hiện kết tủa màu xanh.', true, 'CuSO4 + 2NaOH → Cu(OH)2↓ (xanh lam) + Na2SO4.'],
      ['Ở bước 3, glucose bị oxi hóa thành gluconic acid.', false, 'Ở nhiệt độ thường và không đun nóng chỉ xảy ra phản ứng tạo phức, không có phản ứng oxi hóa – khử. Muốn oxi hóa glucose phải đun nóng (tạo kết tủa Cu2O đỏ gạch).'],
      ['Thí nghiệm trên chứng minh glucose có nhiều nhóm OH liền kề nhau.', true, 'Khả năng hòa tan Cu(OH)2 tạo dung dịch xanh lam là đặc trưng của hợp chất có các nhóm –OH liền kề (tính chất polyalcohol).']]),
    tf('Xà phòng và chất giặt rửa có nhiều ưu nhược điểm.', [
      ['Xà phòng và chất giặt rửa tự nhiên khó bị phân hủy sinh học nên gây ô nhiễm môi trường.', false, 'Xà phòng và chất giặt rửa tự nhiên (từ dầu mỡ) dễ bị vi sinh vật phân hủy nên ít gây ô nhiễm môi trường.'],
      ['Không nên dùng xà phòng với nước cứng do tạo kết tủa bám trên bề mặt vải, làm hỏng vải.', true, '2C17H35COONa + Ca2+ → (C17H35COO)2Ca↓ + 2Na+. Muối calcium, magnesium của acid béo không tan bám lên vải, làm giảm khả năng giặt rửa và hỏng vải.'],
      ['Chất giặt rửa tổng hợp dùng được với nước cứng.', true, 'Muối calcium, magnesium của các acid sulfonic/sulfate tan được trong nước nên chất giặt rửa tổng hợp vẫn tẩy rửa tốt trong nước cứng.'],
      ['Chất giặt rửa tổng hợp khó bị phân hủy sinh học, gây ô nhiễm môi trường.', true, 'Một số chất giặt rửa tổng hợp (nhất là loại gốc hydrocarbon phân nhánh) khó bị vi sinh vật phân hủy, tích tụ gây ô nhiễm nguồn nước.']])
  ]);

  E.part('de17', 'short', [
    sh('Có bao nhiêu hợp chất đơn chức, đồng phân cấu tạo của nhau có cùng công thức phân tử C4H8O2, đều tác dụng được với dung dịch NaOH?', 6,
      'Hợp chất đơn chức C4H8O2 tác dụng với NaOH gồm carboxylic acid và ester.\nAcid (2): CH3CH2CH2COOH; (CH3)2CHCOOH.\nEster (4): HCOOCH2CH2CH3; HCOOCH(CH3)2; CH3COOC2H5; C2H5COOCH3.\nTổng: 2 + 4 = 6. Đáp số: 6.'),
    sh('Cho các ester: ethyl formate, vinyl acetate, triolein, methyl acrylate, phenyl acetate. Có bao nhiêu chất trong dãy khi thủy phân trong dung dịch NaOH (dư), đun nóng sinh ra alcohol?', 3,
      'Ethyl formate → HCOONa + C2H5OH (alcohol). Vinyl acetate → CH3COONa + CH3CHO (aldehyde, không có alcohol). Triolein → sodium oleate + glycerol (alcohol). Methyl acrylate → CH2=CHCOONa + CH3OH (alcohol). Phenyl acetate → CH3COONa + C6H5ONa (phenolate, không có alcohol). Có 3 chất sinh ra alcohol. Đáp số: 3.'),
    sh('Cho các chất: CH3OH, C2H5Cl, C2H5NH2, CH3COOH, CH3–NH–CH3, H2N–CH2–COOH. Có bao nhiêu chất là amine trong các chất trên?', 2,
      'Amine là hợp chất khi thay H của NH3 bằng gốc hydrocarbon: C2H5NH2 (bậc một) và CH3–NH–CH3 (bậc hai) → 2 chất. H2N–CH2–COOH là amino acid (còn có nhóm –COOH), các chất còn lại không chứa nitrogen. Đáp số: 2.'),
    sh('Aspirin được điều chế theo phản ứng: (CH3CO)2O + HOC6H4COOH → CH3COOC6H4COOH + CH3COOH. Để sản xuất 4 triệu viên thuốc aspirin cần tối thiểu m kg salicylic acid. Biết rằng mỗi viên thuốc có chứa 81 mg aspirin và hiệu suất phản ứng đạt 75%. Giá trị của m bằng bao nhiêu?', 331.2,
      'm(aspirin) = 4.10^{6} × 81 mg = 324.10^{6} mg = 324 kg → n = 324 : 180 = 1,8 kmol.\nTỉ lệ 1 : 1 → n(salicylic acid) lí thuyết = 1,8 kmol; M(HOC6H4COOH) = 138 → 248,4 kg.\nHiệu suất 75% → m = 248,4 : 0,75 = 331,2 kg. Đáp số: 331,2.', 0.051),
    sh('Thủy phân saccharose, thu được hai monosaccharide X và Y. Chất X có trong máu người với nồng độ khoảng 4,4 – 7,2 mmol/L. Tổng số nguyên tử của X bằng bao nhiêu?', 24,
      'Saccharose + H2O → glucose + fructose. Chất có trong máu người với nồng độ 4,4 – 7,2 mmol/L là glucose (X) có CTPT C6H12O6. Tổng số nguyên tử = 6 + 12 + 6 = 24. Đáp số: 24.'),
    sh('Cho sơ đồ các phản ứng theo đúng tỉ lệ mol: (1) X + 4AgNO3 + 6NH3 + 2H2O → X1 + 4Ag + 4NH4NO3; (2) X1 + 2NaOH → X2 + 2NH3 + 2H2O; (3) X2 + 2HCl → X3 + 2NaCl; (4) X3 + C2H5OH –(H2SO4 đặc, t°)→ X4 + H2O. Biết X là hợp chất hữu cơ no, mạch hở, chỉ chứa một loại nhóm chức. Khi đốt cháy hoàn toàn X2, sản phẩm thu được chỉ gồm CO2 và Na2CO3. Phân tử khối của X4 là bao nhiêu?', 118,
      '(1) X sinh 4Ag nên X có 2 nhóm –CHO; X là hợp chất no, mạch hở, chỉ chứa một loại nhóm chức. (2) X1 là muối ammonium của acid hai chức (có 2 nhóm –COONH4) → X2 là muối sodium hai chức. Đốt cháy X2 chỉ cho CO2 và Na2CO3 (không có H2O) nên X2 không chứa hydrogen → X2 là (COONa)2.\nVậy X là OHC–CHO, X1 là (COONH4)2, X2 là (COONa)2, X3 là (COOH)2 (oxalic acid).\n(4) X3 + C2H5OH → X4 + H2O (tỉ lệ 1 : 1, đúng tỉ lệ mol) → X4 là HOOC–COOC2H5 (monoester), M = 90 + 46 – 18 = 118. Đáp số: 118.')
  ]);
})(window);
