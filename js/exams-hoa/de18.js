/* Đề 18 · Ôn tập giữa kì 1 – Hòa Bình (Ester – Lipid, Carbohydrate, Amine – Amino acid – Peptide, Polyamide) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function mc(t, o, a, e, x) { var q = { text: t, options: o, answer: a, explain: e }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function tf(t, arr, x) { var q = { text: t, items: arr.map(function (r) { return { t: r[0], a: r[1], explain: r[2] }; }) }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function sh(t, a, e, tol, x) { var q = { text: t, answer: a, explain: e, tol: tol !== undefined ? tol : 0.01 }; if (x) for (var k in x) q[k] = x[k]; return q; }
  var IMG = 'img/gk1/';

  E.part('de18', 'mcq', [
    mc('Công thức của ethyl acetate là', ['C2H5COOCH.', 'C2H5COOC2H5.', 'CH3COOCH3.', 'CH3COOC2H5.'], 3,
      'Ethyl acetate gồm gốc acetate CH3COO– (từ acetic acid) và gốc ethyl –C2H5 → CH3COOC2H5.'),
    mc('Chất nào sau đây thuộc loại polysaccharide?', ['maltose.', 'cellulose.', 'glucose.', 'fructose.'], 1,
      'Cellulose (C6H10O5)n là polysaccharide. Maltose là disaccharide; glucose, fructose là monosaccharide.'),
    mc('Chất nào sau đây là amine bậc hai?', ['CH3CH(NH2)CH3.', '(C2H5)2NH.', '(C2H5)3N.', 'C2H5NH2.'], 1,
      'Amine bậc hai có nitrogen liên kết với 2 gốc hydrocarbon: (C2H5)2NH (diethylamine). CH3CH(NH2)CH3 và C2H5NH2 là bậc một; (C2H5)3N là bậc ba.'),
    mc('Tổng số nhóm amino (–NH2) và nhóm carboxyl (–COOH) trong phân tử lysine là', ['3.', '4.', '1.', '2.'], 0,
      'Lysine H2N[CH2]4CH(NH2)COOH có 2 nhóm –NH2 và 1 nhóm –COOH → tổng 3.'),
    mc('Amino acid đầu N của phân tử tetrapeptide Val–Ala–Lys–Gly là?', ['Valine.', 'Alanine.', 'Glycine.', 'Lysine.'], 0,
      'Peptide được viết từ đầu N (amino acid còn nhóm –NH2 tự do) đến đầu C (còn nhóm –COOH tự do). Val đứng đầu nên là amino acid đầu N; Gly là amino acid đầu C.'),
    mc('Trong công nghiệp sản xuất đường saccharose, người ta đã sử dụng phương pháp nào để tách saccharose ra khỏi dung dịch nước mía?', ['Chưng cất.', 'Sắc kí.', 'Kết tinh.', 'Chiết.'], 2,
      'Nước mía được làm sạch, cô đặc rồi làm lạnh để saccharose kết tinh tách ra khỏi dung dịch (phương pháp kết tinh).'),
    mc('Xà phòng là muối sodium hoặc potassium của', ['acetic acid.', 'phenol.', 'acid vô cơ.', 'acid béo.'], 3,
      'Thành phần chính của xà phòng là muối sodium (hoặc potassium) của acid béo, ví dụ C17H35COONa.'),
    mc('Trong thành phần của quả bông có 90% cellulose về khối lượng. Trong phân tử cellulose các đơn vị β-glucose liên kết với nhau qua liên kết nào sau đây?', ['liên kết β-1,6-glycoside.', 'liên kết β-1,4-glycoside.', 'liên kết β-1,3-glycoside.', 'liên kết β-1,2-glycoside.'], 1,
      'Cellulose gồm các mắt xích β-glucose nối với nhau bằng liên kết β-1,4-glycoside tạo mạch không phân nhánh. (Tinh bột có liên kết α-1,4 và α-1,6 glycoside.)'),
    mc('Chất cơ sở để hình thành nên các phân tử protein đơn giản là', ['amino acid.', 'acid béo.', 'các loại đường.', 'tinh bột.'], 0,
      'Protein là polypeptide do nhiều gốc α-amino acid liên kết với nhau bằng liên kết peptide; protein đơn giản chỉ được cấu tạo từ α-amino acid.'),
    mc('Cho dãy các chất: ethanol, acetic acid, methyl formate, propionic acid. Chất nào có nhiệt độ sôi thấp nhất?', ['methyl formate.', 'ethanol.', 'acetic acid.', 'propionic acid.'], 0,
      'Methyl formate là ester, không tạo được liên kết hydrogen liên phân tử nên nhiệt độ sôi thấp nhất (≈ 32 °C). Ethanol (≈ 78 °C), acetic acid (≈ 118 °C), propionic acid (≈ 141 °C) đều tạo liên kết hydrogen liên phân tử nên sôi cao hơn.'),
    mc('Chất giặt rửa tổng hợp sodium laurylsulfate có công thức cấu tạo CH3[CH2]11–O–SO3Na (mạch hydrocarbon dài liên kết với nhóm sulfate). Nhóm –O–SO3–Na+ được khoanh tròn trong công thức là', ['đầu kị nước.', 'đuôi kị nước.', 'đầu ưa nước.', 'đuôi ưa nước.'], 2,
      'Phân tử chất giặt rửa gồm "đuôi" kị nước (gốc hydrocarbon dài, tan trong dầu mỡ) và "đầu" ưa nước (nhóm phân cực/ion, tan trong nước). Nhóm –OSO3–Na+ là nhóm ion nên là đầu ưa nước.'),
    mc('Để tráng một lớp bạc lên ruột phích, người ta cho chất X phản ứng với lượng dư dung dịch AgNO3 trong NH3, đun nóng. Chất X là', ['ethanol.', 'glucose.', 'acetic acid.', 'saccharose.'], 1,
      'Glucose có nhóm –CHO nên tham gia phản ứng tráng bạc, tạo lớp Ag bám trên thành phích. Ethanol, acetic acid, saccharose không có nhóm –CHO.'),
    mc('Trong công nghiệp thực phẩm, saccharose được sử dụng phổ biến làm nguyên liệu để sản xuất bánh kẹo, nước giải khát,… Phát biểu nào sau đây là sai?', ['Saccharose thuộc loại disaccharide.', 'Dung dịch saccharose hoà tan được Cu(OH)2 cho dung dịch màu xanh lam.', 'Thuỷ phân saccharose chỉ thu được glucose.', 'Saccharose thường được tách từ nguyên liệu là cây mía, củ cải đường,…'], 2,
      'Thủy phân saccharose thu được glucose và fructose (2 monosaccharide), không phải chỉ có glucose. Các phát biểu A, B, D đều đúng.'),
    mc('Giá trị pH mà khi đó amino acid có nồng độ ion lưỡng cực cực đại được gọi là điểm đẳng điện (pI). Khi pH < pI thì amino acid tồn tại chủ yếu ở dạng cation, khi pH > pI thì chủ yếu ở dạng anion; trong điện trường anion di chuyển về cực (+) còn cation về cực (–). Tính chất này (điện di) được dùng để tách amino acid. Giá trị pI: glycine 6,0; glutamic acid 3,2; lysine 9,7. Trong các giá trị pH cho dưới đây, giá trị nào là tối ưu nhất để tách ba chất trên ra khỏi dung dịch hỗn hợp của chúng?', ['pH = 14,0.', 'pH = 9,7.', 'pH = 3,2.', 'pH = 6,0.'], 3,
      'Để tách ba chất, cần chọn pH sao cho ba chất tồn tại ở ba trạng thái khác nhau. Tại pH = 6,0: glycine (pI = 6,0) ở dạng ion lưỡng cực – không di chuyển; glutamic acid (pI = 3,2 < 6) là anion – về cực (+); lysine (pI = 9,7 > 6) là cation – về cực (–). Ba chất di chuyển khác nhau nên tách được. Các giá trị pH khác làm hai chất cùng mang một loại điện tích (hoặc một chất ở pI trùng chất khác), không tách tốt.',
      { fixed: true }),
    mc('Nhỏ dung dịch methylamine vào dung dịch nào sau đây thấy xuất hiện kết tủa?', ['HCl.', 'MgCl2.', 'BaCl2.', 'NaCl.'], 1,
      'Methylamine là base yếu: CH3NH2 + H2O ⇌ CH3NH3+ + OH–. Ion OH– tạo kết tủa với Mg2+: Mg2+ + 2OH– → Mg(OH)2↓. Với HCl tạo muối tan; Ba(OH)2 tan nên BaCl2 không kết tủa; NaCl không phản ứng.'),
    mc('Insulin là hoóc-môn có tác dụng điều tiết lượng đường trong máu. Thủy phân một phần insulin thu được heptapeptide X mạch hở. Khi thủy phân không hoàn toàn X, thu được hỗn hợp chứa các peptide: Phe–Phe–Tyr, Pro–Lys–Thr, Tyr–Thr–Pro, Phe–Tyr–Thr. Nếu đánh số thứ tự đầu N là số 1, thì amino acid ở vị trí số 5 trong X có kí hiệu là', ['Thr.', 'Pro.', 'Tyr.', 'Lys.'], 1,
      'Ghép các mảnh có phần chồng lên nhau: Phe–Phe–Tyr và Phe–Tyr–Thr (chồng "Phe–Tyr") → Phe–Phe–Tyr–Thr; ghép tiếp Tyr–Thr–Pro (chồng "Tyr–Thr") → Phe–Phe–Tyr–Thr–Pro; ghép Pro–Lys–Thr (chồng "Pro") → Phe–Phe–Tyr–Thr–Pro–Lys–Thr (7 gốc, đúng heptapeptide). Vị trí số 5 là Pro.'),
    mc('Tiến hành thí nghiệm điều chế ethyl acetate theo các bước: Bước 1: Cho 1 mL C2H5OH, 1 mL CH3COOH và vài giọt dung dịch H2SO4 đặc vào ống nghiệm. Bước 2: Lắc đều ống nghiệm, đun cách thủy (trong nồi nước nóng) khoảng 5 – 6 phút ở 65 – 70 °C. Bước 3: Làm lạnh, sau đó rót 2 mL dung dịch NaCl bão hòa vào ống nghiệm. Phát biểu nào sau đây là sai?', ['H2SO4 đặc có vai trò vừa làm chất xúc tác vừa làm tăng hiệu suất tạo sản phẩm.', 'Mục đích chính của việc thêm dung dịch NaCl bão hòa là để tránh phân hủy sản phẩm.', 'Sau bước 2, trong ống nghiệm vẫn còn C2H5OH và CH3COOH.', 'Sau bước 3, chất lỏng trong ống nghiệm tách thành hai lớp.'], 1,
      'A đúng: H2SO4 đặc xúc tác và hút nước làm cân bằng chuyển dịch theo chiều tạo ester. C đúng: phản ứng thuận nghịch nên còn chất đầu. D đúng: ester ít tan, nhẹ hơn nước nên nổi thành lớp trên. B sai: NaCl bão hòa làm tăng khối lượng riêng và độ phân cực của lớp nước, giảm độ tan của ester → ester tách lớp rõ hơn, dễ thu sản phẩm (không phải để tránh phân hủy).'),
    mc('Thuỷ phân hoàn toàn một polyamide X thu được một amino acid Y mạch không phân nhánh, có nhóm amine ở một đầu mạch của phân tử. Kết quả phân tích nguyên tố cho biết phân tử Y có phần trăm khối lượng các nguyên tố C, H, N lần lượt bằng 54,96%, 9,85% và 10,61%, còn lại là oxygen. Từ phổ khối lượng (MS) xác định được phân tử khối của Y bằng 131. Từ Y, bằng phản ứng trùng ngưng lại thu được polymer X ban đầu. Công thức của polyamide X là', ['–[NH–[CH2]3–CO]n–', '–[NH–CH(CH3)–CO]n–', '–[NH–[CH2]5–CO]n–', '–[NH–[CH2]6–CO]n–'], 2,
      'Số nguyên tử C = 131 × 54,96% : 12 = 6; H = 131 × 9,85% : 1 ≈ 13; N = 131 × 10,61% : 14 = 1; O = (131 – 72 – 13 – 14) : 16 = 2. Y là C6H13NO2.\nY mạch không phân nhánh, có nhóm amine ở đầu mạch → H2N–[CH2]5–COOH (6-aminohexanoic acid).\nTrùng ngưng: nH2N–[CH2]5–COOH → –[NH–[CH2]5–CO]n– + nH2O (polycaproamide, tơ capron). Chọn C.')
  ]);

  E.part('de18', 'tf', [
    tf('Tiến hành thí nghiệm theo các bước sau: Bước 1: Cho khoảng 2 mL dung dịch NaOH 10% vào ống nghiệm. Sau đó, thêm khoảng 0,5 mL dung dịch CuSO4 5% vào, lắc nhẹ. Bước 2: Cho khoảng 3 mL dung dịch glucose 2% vào ống nghiệm, lắc đều.', [
      ['Sau bước 2, kết tủa đã bị hòa tan, thu được dung dịch màu xanh lam.', true, 'Bước 1 tạo Cu(OH)2↓ xanh. Bước 2: glucose có nhiều nhóm –OH kề nhau hòa tan Cu(OH)2, tạo phức màu xanh lam.'],
      ['Thí nghiệm trên chứng minh glucose có tính khử.', false, 'Thí nghiệm ở nhiệt độ thường chỉ chứng minh glucose có nhiều nhóm –OH kề nhau (tính chất polyalcohol). Muốn chứng minh tính khử phải đun nóng (tạo Cu2O đỏ gạch).'],
      ['Nếu thay dung dịch NaOH ở bước 2 bằng dung dịch KOH thì hiện tượng ở bước 3 vẫn tương tự.', false, 'Theo đáp án chính thức là Sai vì phát biểu viện dẫn "bước 2" (không có NaOH) và "bước 3" (thí nghiệm không có bước này). Lưu ý: nếu hiểu là thay NaOH ở bước 1 bằng KOH thì hiện tượng vẫn tương tự (cũng tạo Cu(OH)2 rồi tạo phức xanh lam).'],
      ['Sau bước 2, nếu đun nóng sẽ xuất hiện kết tủa màu đen.', false, 'Khi đun nóng, glucose bị Cu(OH)2 oxi hóa tạo kết tủa Cu2O màu đỏ gạch, không phải kết tủa đen.']]),
    tf('Cho dãy các chất sau: aniline (X); glutamic acid (Y); Gly–Ala (Z).', [
      ['Các chất trên đều có chứa các nguyên tố C, H, O và N trong phân tử.', false, 'Aniline C6H5NH2 chỉ chứa C, H, N (không có oxygen).'],
      ['Chất Z có phản ứng với thuốc thử biuret tạo thành màu tím đặc trưng.', false, 'Phản ứng biuret chỉ xảy ra với peptide có từ 2 liên kết peptide trở lên (tripeptide trở lên) và protein. Gly–Ala là dipeptide (1 liên kết peptide) nên không có phản ứng này.'],
      ['Ở điều kiện thường, X là chất lỏng; Y là chất rắn.', true, 'Aniline là chất lỏng (sôi 184 °C), độc, ít tan trong nước. Glutamic acid là amino acid ở dạng ion lưỡng cực nên là chất rắn kết tinh.'],
      ['Có thể nhận biết dung dịch ba chất trên bằng quỳ tím.', false, 'Aniline không làm đổi màu quỳ tím; Gly–Ala (1 NH2, 1 COOH) trung tính, không đổi màu quỳ; chỉ glutamic acid làm quỳ hóa đỏ. X và Z đều không đổi màu nên không phân biệt được bằng quỳ tím.']]),
    tf('Ester no, đơn chức, mạch hở (X) là dung môi hữu cơ được sử dụng nhiều trong công nghiệp hóa chất. Trên phổ MS của X thấy xuất hiện peak ion phân tử có giá trị m/z = 88. Trong đời sống, X2 (alcohol) được điều chế từ quá trình lên men tinh bột và là một thành phần của xăng E5. Cho các phương trình hóa học: (1) X + NaOH –(t°)→ X1 + X2; (2) X2 + CuO → X3 + Cu + H2O; (3) X3 + Br2 + H2O → X4 + HBr.', [
      ['X tan tốt trong nước.', false, 'X là CH3COOC2H5 (ethyl acetate, M = 88): ester ít tan trong nước (khoảng 8 g/100 mL ở 20 °C) và nhẹ hơn nước. (Đáp án kèm file đề gốc ghi Đúng, nhưng theo tính chất của ester thì phát biểu này sai.)'],
      ['X và X4 là hai chất đồng phân.', false, 'X4 là CH3COOH (C2H4O2) còn X là CH3COOC2H5 (C4H8O2): khác công thức phân tử nên không phải đồng phân.'],
      ['Có thể thực hiện phản ứng theo sơ đồ chuyển hoá X2 → X4 → X.', true, 'C2H5OH + O2 –(men giấm)→ CH3COOH + H2O; CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O (H2SO4 đặc, t°). Sơ đồ thực hiện được.'],
      ['Thứ tự nhiệt độ sôi được sắp xếp theo chiều X3 < X2 < X4.', true, 'X3 = CH3CHO (20 °C, không có liên kết hydrogen) < X2 = C2H5OH (78 °C) < X4 = CH3COOH (118 °C, liên kết hydrogen bền hơn). Thứ tự đúng.']],
      { explain: 'Xác định chất: ester no, đơn chức, mạch hở có M = 88 → C4H8O2; X2 là ethanol (lên men tinh bột, thành phần xăng E5) nên X là CH3COOC2H5. X1 = CH3COONa, X2 = C2H5OH, X3 = CH3CHO, X4 = CH3COOH.' }),
    tf('Triglyceride đóng vai trò là nguồn cung cấp năng lượng và chuyên chở các chất béo trong quá trình trao đổi chất. Cho triglyceride X có công thức cấu tạo như hình sau (ba gốc acid béo đánh số (1), (2), (3)).', [
      ['Triglyceride X làm mất màu dung dịch bromine.', true, 'Gốc (2) có 1 liên kết đôi C=C, gốc (3) có 3 liên kết đôi C=C; liên kết C=C cộng Br2 nên X làm mất màu dung dịch bromine.'],
      ['Acid béo có gốc kí hiệu (2) thuộc loại acid béo omega-9.', true, 'Gốc (2) là gốc oleic (C18:1) có liên kết đôi ở vị trí số 9 tính từ đầu –CH3 (omega-9).'],
      ['Các gốc của acid béo không no trong phân tử X đều có cấu hình cis.', true, 'Các liên kết đôi trong acid béo không no tự nhiên (như trong hình) đều có cấu hình cis.'],
      ['Hydrogen hóa hoàn toàn 427 kg triglyceride X thu được 432 kg chất béo rắn.', false, 'X là triester của glycerol với stearic (C18:0), oleic (C18:1) và linolenic (C18:3): C57H102O6, M = 882. Hydrogen hóa hoàn toàn (cộng 4H2 vào 4 nối đôi) thu được tristearin M = 890. m = 427 × 890 : 882 ≈ 431 kg, không phải 432 kg.']],
      { img: { src: IMG + 'triglyceride-x.png', alt: 'Triglyceride X với ba gốc acid béo (1), (2), (3)' } })
  ]);

  E.part('de18', 'short', [
    sh('Glucose có công thức phân tử C6H12O6. Cấu tạo glucose có một dạng mạch hở và 2 dạng mạch vòng (α-glucose và β-glucose) chuyển hóa qua lại lẫn nhau. Ở dạng mạch hở phân tử glucose có bao nhiêu nhóm hydroxy (–OH)?', 5,
      'Công thức glucose dạng mạch hở: HOCH2[CHOH]4CH=O gồm 1 nhóm –OH ở C6 và 4 nhóm –OH ở C2 – C5 (tổng 5 nhóm –OH) cùng 1 nhóm –CHO ở C1. Đáp số: 5.'),
    sh('Cho các chất: methyl formate, propan-1-ol, methyl acetate, propionic acid và các giá trị nhiệt độ sôi (không theo thứ tự) là 141 °C; 97,2 °C; 31,8 °C; 57,1 °C. Nhiệt độ sôi của methyl acetate có giá trị là bao nhiêu (°C)?', 57.1,
      'Các ester (methyl formate, methyl acetate) không tạo liên kết hydrogen liên phân tử nên sôi thấp hơn alcohol và acid; ester có M lớn hơn thì sôi cao hơn: methyl formate (M = 60) < methyl acetate (M = 74). Alcohol (propan-1-ol) sôi thấp hơn acid (propionic acid).\nThứ tự tăng dần: methyl formate < methyl acetate < propan-1-ol < propionic acid ứng với 31,8 < 57,1 < 97,2 < 141 (°C). Nhiệt độ sôi của methyl acetate là 57,1 °C.', 0.051),
    sh('Củ sắn khô chứa 38% khối lượng là tinh bột, còn lại là các chất không có khả năng lên men thành ethyl alcohol. Lên men 1 tấn sắn khô với hiệu suất cả quá trình là 81%. Toàn bộ lượng ethyl alcohol sinh ra để điều chế xăng E5 (có chứa 5% thể tích ethyl alcohol). Biết khối lượng riêng của ethyl alcohol là 0,8 g/mL, thể tích xăng E5 thu được là bao nhiêu lít?', 4370,
      'm(tinh bột) = 1000 × 38% = 380 kg.\n(C6H10O5)n → nC6H12O6 → 2nC2H5OH: 162 g tinh bột → 92 g ethanol.\nm(ethanol) = 380 × 92 : 162 × 81% ≈ 174,8 kg.\nV(ethanol) = 174,8 : 0,8 = 218,5 lít (kg/(kg/L)).\nXăng E5 chứa 5% thể tích ethanol → V(xăng) = 218,5 : 5% = 4370 lít. Đáp số: 4370.', 0.5),
    sh('Cho dãy các chất sau: glucose, fructose, saccharose và cellulose. Có bao nhiêu chất có phản ứng với thuốc thử Tollens?', 2,
      'Chất có nhóm –CHO (hoặc chuyển hóa được thành –CHO) phản ứng với thuốc thử Tollens: glucose và fructose (fructose chuyển hóa thành glucose trong môi trường base). Saccharose, cellulose không có nhóm –OH hemiacetal tự do nên không phản ứng. Đáp số: 2.'),
    sh('Có bao nhiêu công thức cấu tạo amine bậc một có công thức phân tử C3H9N?', 2,
      'Amine bậc một C3H9N có dạng C3H7–NH2 với gốc C3H7– có 2 đồng phân: CH3–CH2–CH2–NH2 (propan-1-amine) và CH3–CH(NH2)–CH3 (propan-2-amine). Đáp số: 2.'),
    sh('Một loại chất béo có chứa 80% triolein về khối lượng. Xà phòng hóa hoàn toàn 22,1 kg chất béo này trong dung dịch NaOH, đun nóng thu được x bánh xà phòng. Biết rằng trong mỗi bánh xà phòng có chứa 60 gam sodium oleate. Xác định giá trị của x.', 304,
      'm(triolein) = 22,1 × 80% = 17,68 kg → n = 17,68 : 884 = 0,02 kmol = 20 mol.\n(C17H33COO)3C3H5 + 3NaOH → 3C17H33COONa + C3H5(OH)3 → n(sodium oleate) = 3 × 20 = 60 mol.\nM(C17H33COONa) = 304 → m = 60 × 304 = 18 240 g (đúng bằng 17,68 kg × 912 : 884 = 18,24 kg).\nSố bánh xà phòng x = 18 240 : 60 = 304.\n(Lưu ý: đáp án 320 trong file đề gốc tính theo muối potassium oleate M = 320 khi dùng KOH; đề này dùng NaOH và sodium oleate nên x = 304.)', 0.5)
  ]);
})(window);
