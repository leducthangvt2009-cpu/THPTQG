/* Đề 19 · Giữa kì 1 – Chuyên Lê Quý Đôn, Bà Rịa – Vũng Tàu (Ester – Lipid, Carbohydrate, Amine – Amino acid – Peptide) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function mc(t, o, a, e, x) { var q = { text: t, options: o, answer: a, explain: e }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function tf(t, arr, x) { var q = { text: t, items: arr.map(function (r) { return { t: r[0], a: r[1], explain: r[2] }; }) }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function sh(t, a, e, tol, x) { var q = { text: t, answer: a, explain: e, tol: tol !== undefined ? tol : 0.01 }; if (x) for (var k in x) q[k] = x[k]; return q; }
  var IMG = 'img/gk1/';

  E.part('de19', 'mcq', [
    mc('Cho dung dịch glucose vào ống nghiệm chứa dung dịch AgNO3 trong NH3 dư được ngâm trong cốc nước nóng, thu được sản phẩm hữu cơ X và bạc kim loại. Tên gọi của X là', ['glycerol.', 'fructose.', 'ammonium gluconate.', 'gluconic acid.'], 2,
      'CH2OH[CHOH]4CHO + 2AgNO3 + 3NH3 + H2O → CH2OH[CHOH]4COONH4 (ammonium gluconate) + 2Ag↓ + 2NH4NO3. Do có NH3 dư nên sản phẩm hữu cơ là muối ammonium gluconate chứ không phải gluconic acid.'),
    mc('Polycaproamide (tơ capron) được tổng hợp theo phản ứng: nH2N[CH2]5COOH –(t°)→ –[NH–[CH2]5–CO]n– + nH2O (từ 6-aminohexanoic acid). Polycaproamide được điều chế bằng phản ứng', ['trùng ngưng.', 'phân hủy.', 'trùng hợp.', 'thế.'], 0,
      'Nhiều phân tử amino acid kết hợp với nhau đồng thời loại ra các phân tử nhỏ (H2O) là phản ứng trùng ngưng (nhóm –COOH của phân tử này phản ứng với nhóm –NH2 của phân tử khác tạo liên kết amide).'),
    mc('Cho các chất sau: triolein, cellulose, saccharose, tinh bột. Số chất bị thuỷ phân trong môi trường acid là', ['4.', '2.', '1.', '3.'], 0,
      'Triolein (ester) thủy phân trong acid tạo glycerol và oleic acid; cellulose, tinh bột → glucose; saccharose → glucose + fructose. Cả 4 chất đều bị thủy phân.'),
    mc('Ester được tạo thành từ formic acid và ethyl alcohol có công thức cấu tạo là', ['CH3COOCH3.', 'C2H5COOCH3.', 'HCOOC2H5.', 'HCOOCH3.'], 2,
      'HCOOH + C2H5OH ⇌ HCOOC2H5 + H2O. Ester là ethyl formate HCOOC2H5.'),
    mc('Trong công nghiệp, để chuyển hóa chất béo lỏng thành chất béo rắn, người ta dùng phương pháp nào sau đây?', ['Phản ứng oxi hóa.', 'Phản ứng xà phòng hóa.', 'Phản ứng ester hóa.', 'Phản ứng hydrogen hóa.'], 3,
      'Chất béo lỏng (dầu thực vật) chứa gốc acid béo không no. Cộng H2 (xúc tác Ni, t°, p) vào các liên kết đôi C=C tạo chất béo no ở trạng thái rắn (ví dụ triolein → tristearin) – phản ứng hydrogen hóa.'),
    mc('X là một loại disaccharide có nhiều trong mạch nha. Chất X là', ['glucose.', 'maltose.', 'saccharose.', 'fructose.'], 1,
      'Mạch nha (lúa mạch nảy mầm) chứa nhiều maltose (disaccharide gồm 2 gốc glucose). Saccharose có nhiều trong mía, củ cải đường.'),
    mc('Chất nào sau đây là amino acid?', ['HOCH2COOH.', 'H2NCH2COOH.', 'CH3NH2.', 'CH3COOH.'], 1,
      'Amino acid có đồng thời nhóm –NH2 và –COOH: H2NCH2COOH (glycine).'),
    mc('Mỗi chuỗi polypeptide gồm các đơn vị ...(1)... liên kết với nhau qua ...(2)... theo một trật tự nhất định. Các cụm từ phù hợp cho mỗi khoảng trống trong câu trên lần lượt là', ['α-amino acid và liên kết glycoside.', 'monosaccharide và liên kết peptide.', 'monosaccharide và liên kết glycoside.', 'α-amino acid và liên kết peptide.'], 3,
      'Chuỗi polypeptide gồm các gốc α-amino acid nối với nhau bằng liên kết peptide (–CO–NH–). Liên kết glycoside và monosaccharide thuộc về carbohydrate.'),
    mc('Cho từ từ đến dư ethylamine vào dung dịch FeCl3, hiện tượng quan sát được là', ['không có kết tủa xuất hiện.', 'tạo kết tủa nâu đỏ không tan.', 'tạo kết tủa nâu đỏ sau đó kết tủa tan ra.', 'tạo dung dịch phức chất có màu xanh lam.'], 1,
      '3C2H5NH2 + 3H2O + FeCl3 → Fe(OH)3↓ (nâu đỏ) + 3C2H5NH3Cl. Fe(OH)3 không tan trong amine dư.'),
    mc('Trong môi trường base, protein có phản ứng màu biuret với chất nào sau đây?', ['HNO3.', 'NaCl.', 'Mg(OH)2.', 'Cu(OH)2.'], 3,
      'Phản ứng biuret: protein + Cu(OH)2/OH– → phức màu tím đặc trưng.'),
    mc('Thành phần nguyên tố có trong phân tử carbohydrate là', ['C, H, O, S.', 'C, H, O, N.', 'C, H, S, N.', 'C, H, O.'], 3,
      'Carbohydrate có công thức chung Cn(H2O)m nên chỉ gồm 3 nguyên tố C, H, O.'),
    mc('Kết quả phân tích nguyên tố trong phân tử chất X như sau: %C = 46,60%; %H = 8,74%; %N = 13,59% (về khối lượng); còn lại là oxygen. Từ phổ khối lượng (MS), xác định được phân tử khối của X bằng 103. Thuỷ phân X thấy thu được một α-amino acid Y và chất Z có công thức phân tử CH4O. Phát biểu nào sau đây là không đúng?', ['Công thức phân tử của X là C4H9O2N.', 'Công thức cấu tạo phân tử của X là H2NCH(CH3)COOCH3.', 'Có thể điều chế chất X bằng phản ứng của α-amino acid với alcohol tương ứng.', 'Tên gọi thay thế của Y là 2-aminopropionic acid.'], 3,
      'Số C = 103 × 46,6% : 12 = 4; H = 103 × 8,74% = 9; N = 103 × 13,59% : 14 = 1; O = (103 – 48 – 9 – 14) : 16 = 2. X là C4H9O2N (A đúng).\nZ (CH4O) là methanol → X là ester của α-amino acid Y với CH3OH; Y có 3 carbon: alanine CH3CH(NH2)COOH → X là H2NCH(CH3)COOCH3 (B đúng). X điều chế bằng phản ứng ester hóa Y với CH3OH (C đúng).\nD sai: "propionic" là tên thông thường (tên gốc) của acid 3 carbon; tên thay thế của alanine là 2-aminopropanoic acid.'),
    mc('Amphetamine là chất kích thích (mạnh hơn caffeine) làm tăng sự tỉnh táo và giảm cảm giác thèm ăn. Nó được sử dụng rộng rãi trong thế chiến thứ hai để ngăn chặn sự mệt mỏi khi chiến đấu. Amphetamine có công thức cấu tạo như hình bên. Công thức phân tử của amphetamine là', ['C9H12N.', 'C8H11N.', 'C9H13N.', 'C10H13N.'], 2,
      'Phân tử gồm vòng benzene C6H5– (6 C, 5 H), mạch bên –CH2–CH(NH2)–CH3 (3 C, 2 + 1 + 2 + 3 = 8 H, 1 N). Tổng: C9H13N. (Hợp chất chứa 1 nguyên tử N phải có số H lẻ nên C9H12N không thể có.)',
      { img: { src: IMG + 'amphetamine.png', alt: 'Công thức cấu tạo amphetamine' } }),
    mc('Tính chất vật lí nào sau đây là không phải của amino acid?', ['Là chất rắn ở nhiệt độ phòng.', 'Có độc tính rất cao.', 'Tan tốt trong nước.', 'Nhiệt độ nóng chảy cao.'], 1,
      'Amino acid là chất rắn kết tinh, tan tốt trong nước, nhiệt độ nóng chảy cao (do tồn tại ở dạng ion lưỡng cực). Amino acid là thành phần cấu tạo protein, không có "độc tính rất cao".'),
    mc('Các amine ở thể khí tan nhiều trong nước. Nguyên nhân là do các amine này', ['hình thành lực tương tác Van der Waals lớn giữa các phân tử.', 'tạo được liên kết hydrogen liên phân tử với nhau.', 'đều ở thể khí nên dễ phân tán vào nước.', 'tạo được liên kết hydrogen với nước.'], 3,
      'Nguyên tử N trong amine còn cặp electron tự do tạo được liên kết hydrogen với H của nước (N···H–O) nên các amine mạch ngắn tan nhiều trong nước. Liên kết hydrogen liên phân tử giữa các amine với nhau chỉ làm tăng nhiệt độ sôi, không giải thích độ tan.'),
    mc('Hợp chất nào sau đây thuộc loại dipeptide?', ['H2NCH2CH2CONHCH2COOH.', 'H2NCH2CONHCH(CH3)COOH.', 'H2NCH2CH2CONHCH2CH2COOH.', 'H2NCH2CONHCH2CONHCH2COOH.'], 1,
      'Dipeptide được tạo từ 2 gốc α-amino acid. B: Gly–Ala (cả hai gốc đều là α-amino acid) – đúng. A, C có gốc H2NCH2CH2CO– (β-alanine) là β-amino acid nên không phải peptide; D là tripeptide Gly–Gly–Gly.'),
    mc('Thủy phân hoàn toàn 1 mol pentapeptide X thì thu được 2 mol alanine, 2 mol glycine và 1 mol valine. Khi thủy phân không hoàn toàn X thì trong hỗn hợp sản phẩm thấy có dipeptide Ala–Gly, Gly–Gly và tripeptide Gly–Ala–Val. Công thức của X là', ['Gly–Ala–Val–Ala–Gly.', 'Gly–Ala–Gly–Ala–Val.', 'Ala–Gly–Gly–Ala–Val.', 'Gly–Gly–Ala–Ala–Val.'], 2,
      'X phải chứa các đoạn Ala–Gly, Gly–Gly và Gly–Ala–Val. Ghép đoạn Ala–Gly với Gly–Gly (chồng Gly): Ala–Gly–Gly; ghép tiếp Gly–Ala–Val (chồng Gly cuối): Ala–Gly–Gly–Ala–Val (5 gốc: 2 Ala, 2 Gly, 1 Val – đúng).\nKiểm tra các đáp án khác: A không có Gly–Gly; B không có Gly–Gly; D không có đoạn Gly–Ala–Val (Gly–Gly–Ala–Ala–Val chỉ có Ala–Ala–Val).'),
    mc('Polysaccharide X là chất rắn, màu trắng, dạng sợi. Trong bông nõn có gần 98% chất X. Thủy phân X, thu được monosaccharide Y. Phát biểu nào sau đây đúng?', ['X dễ tan trong nước Schweizer.', 'Phân tử khối của X bằng 162.', 'X có cấu tạo xoắn và phản ứng màu với iodine.', 'X, Y đều tham gia phản ứng tráng bạc.'], 0,
      'Bông nõn chứa gần 98% cellulose nên X là cellulose, Y là glucose. A đúng: cellulose tan trong nước Schweizer [Cu(NH3)4](OH)2. B sai: 162 là khối lượng một mắt xích, cellulose có M rất lớn. C sai: cấu tạo xoắn và phản ứng màu với iodine là của tinh bột (amylose); cellulose mạch thẳng, không có phản ứng này. D sai: cellulose không có nhóm –CHO nên không tráng bạc (chỉ có glucose Y tráng bạc).')
  ]);

  E.part('de19', 'tf', [
    tf('Khi phân tích thành phần nguyên tố của ester X thấy trong phân tử X có tỉ lệ số nguyên tử C và H tương ứng là 1 : 2. Thuỷ phân X trong môi trường acid được alcohol Y (M_{Y} = 46) và carboxylic acid Z (phân tử Z có số nguyên tử carbon bằng số nguyên tử carbon trong phân tử Y).', [
      ['Ứng với công thức phân tử của X có 5 ester là đồng phân cấu tạo của nhau.', false, 'Y có M = 46 → C2H5OH (2 C) nên Z có 2 C: CH3COOH. X là CH3COOC2H5 (C4H8O2, tỉ lệ C : H = 1 : 2). Các ester đồng phân C4H8O2 gồm: HCOOCH2CH2CH3, HCOOCH(CH3)2, CH3COOC2H5, C2H5COOCH3 → 4 ester (không phải 5).'],
      ['Từ Y có thể điều chế trực tiếp được Z bằng xúc tác enzyme.', true, 'Lên men giấm: C2H5OH + O2 –(enzyme)→ CH3COOH + H2O.'],
      ['Khả năng tan trong nước của X là kém hơn Y và Z.', true, 'Ethanol và acetic acid tan vô hạn trong nước nhờ liên kết hydrogen với nước; ethyl acetate không tạo được liên kết hydrogen với nhau nên ít tan hơn.'],
      ['Phân tử X có 60% carbon về khối lượng.', false, 'X là C4H8O2 (M = 88) → %C = 48 : 88 × 100% ≈ 54,55%, không phải 60%.']]),
    tf('Cho 5 gam hợp chất hữu cơ X có cấu trúc phân tử (như hình) vào một bát sứ và thêm 15 mL dung dịch KOH 30% (dùng dư), sau đó đun nóng một thời gian để phản ứng xảy ra hoàn toàn.', [
      ['Thí nghiệm trên là phản ứng xà phòng hoá triolein bằng KOH.', false, 'Từ hình, X là triglyceride có ba gốc acid béo no (không có liên kết đôi C=C) – là tristearin, không phải triolein (gốc oleic có 1 liên kết đôi).'],
      ['Khi chưa đun nóng, trong bát sứ có sự tách lớp giữa các chất.', true, 'Chất béo không tan, nhẹ hơn nước nên nổi lên trên dung dịch KOH → hai lớp.'],
      ['Sau thí nghiệm, trong chén sứ chỉ chứa một dung dịch đồng nhất.', true, 'Sau khi xà phòng hóa hoàn toàn, tristearin không còn; xà phòng, glycerol và KOH dư tan trong nước nên thu được một dung dịch đồng nhất.'],
      ['Chất rắn màu trắng thu được sau thí nghiệm có thành phần là muối sodium stearate.', false, 'Đề dùng KOH nên muối tạo thành là potassium stearate C17H35COOK (không phải sodium stearate C17H35COONa, chỉ tạo ra khi dùng NaOH).']],
      { img: { src: IMG + 'chat-beo-x.png', alt: 'Công thức cấu tạo của X (triglyceride)' } }),
    tf('Mỗi phát biểu sau đây là đúng hay sai?', [
      ['Khi nấu canh cua hoặc riêu cua thì thấy các tảng "gạch cua" nổi lên.', true, 'Protein trong cua bị đông tụ (biến tính) khi đun nóng nên tạo thành các tảng "gạch cua" nổi lên.'],
      ['Khi trộn thịt, cá tươi với muối thì thịt cá đang mềm bị đông cứng lại.', true, 'Muối ăn làm protein trong thịt, cá đông tụ (kết tủa), nên thịt cá săn lại, đông cứng.'],
      ['Khi nấu canh thịt, nếu thêm giấm ăn hoặc quả chua vào thì thịt sẽ nhanh nhừ hơn.', true, 'Môi trường acid xúc tác thủy phân protein (và làm protein trương, dễ bị cắt mạch) nên thịt nhanh mềm, nhừ hơn.'],
      ['Vai trò xúc tác của enzyme trong các quá trình sinh hoá sẽ có hiệu quả tốt ở nhiệt độ cao.', false, 'Enzyme là protein nên hoạt động tốt nhất ở nhiệt độ thích hợp (khoảng 30 – 40 °C); ở nhiệt độ cao enzyme bị biến tính và mất hoạt tính.']]),
    tf('Glutamic acid là một amino acid có vai trò quan trọng trong việc trao đổi chất của cơ thể động vật. Glutamic acid thuộc loại hợp chất hữu cơ tạp chức có công thức cấu tạo HOOC–CH2–CH2–CH(NH2)–COOH.', [
      ['Đặt glutamic acid ở pH = 6,0 vào trong một điện trường, glutamic acid dịch chuyển về phía cực âm.', false, 'Glutamic acid có pI ≈ 3,2. Ở pH = 6,0 > pI, nó tồn tại chủ yếu ở dạng anion (mang điện âm) nên dịch chuyển về cực dương, không phải cực âm.'],
      ['Cho a mol glutamic acid tác dụng với a mol methanol khi có mặt xúc tác acid mạnh, đun nóng thu được hợp chất hữu cơ có chứa 2 nhóm chức ester và 1 nhóm amino.', false, 'Tỉ lệ 1 : 1 chỉ có 1 nhóm –COOH được ester hóa, tạo monoester (chứa 1 nhóm chức ester). Muốn có 2 nhóm ester cần 2 mol methanol.'],
      ['Glutamic acid có tên thay thế là α-aminoglutaric acid.', false, 'α-aminoglutaric acid là tên bán hệ thống (tên thông thường có nhóm thế). Tên thay thế là 2-aminopentane-1,5-dioic acid.'],
      ['Glutamic acid là một α-amino acid chứa đồng thời 1 nhóm amino, 2 nhóm carboxyl và có công thức phân tử là C5H9NO4.', true, 'Nhóm –NH2 ở C số 2 (vị trí α); có 2 nhóm –COOH; CTPT C5H9NO4 (M = 147).']])
  ]);

  E.part('de19', 'short', [
    sh('Nhỏ dung dịch của mỗi chất methylamine, glycine, aniline, lysine vào các mẩu giấy quỳ tím riêng rẽ. Có bao nhiêu dung dịch làm giấy quỳ tím chuyển thành màu xanh?', 2,
      'Methylamine CH3NH2 là base → quỳ tím hóa xanh. Lysine có 2 nhóm –NH2 và 1 nhóm –COOH → dung dịch có tính base → quỳ tím hóa xanh. Glycine (1 –NH2, 1 –COOH) trung tính, không đổi màu quỳ. Aniline có tính base rất yếu (nhóm phenyl hút electron) không làm đổi màu quỳ tím. Có 2 dung dịch. Đáp số: 2.'),
    sh('Cho các carbohydrate sau: saccharose, maltose, glucose, fructose và cellulose. Có bao nhiêu chất có thể làm mất màu dung dịch bromine?', 2,
      'Nước bromine oxi hóa nhóm –CHO thành –COOH nên làm mất màu bởi các chất có nhóm –CHO: glucose và maltose (còn nhóm –OH hemiacetal, mở vòng tạo –CHO). Fructose (nhóm C=O ketone) không làm mất màu nước bromine; saccharose và cellulose không có nhóm –CHO. Có 2 chất. Đáp số: 2.'),
    sh('Chỉ số xà phòng hoá là số miligam KOH cần để xà phòng hoá 1 g chất béo. Theo TCVN 6044:2013, chỉ số xà phòng hoá trung bình của chất béo trong mỡ lợn là 198. Khi xà phòng hoá hoàn toàn m kg mỡ lợn (chứa 92% chất béo) thu được trong quá trình chế biến thực phẩm để nấu xà phòng, lượng NaOH cần lấy ít nhất 80 kg. Tìm m? Biết các tạp chất trong mỡ lợn không tác dụng với NaOH. (Kết quả làm tròn đến hàng đơn vị)', 615,
      'n(NaOH) = 80 : 40 = 2 kmol = 2000 mol. Phản ứng xà phòng hóa dùng NaOH hay KOH đều theo cùng tỉ lệ mol (3 mol base cho 1 mol chất béo) nên n(KOH) tương đương = 2000 mol → m(KOH) = 2000 × 56 = 112 000 g = 112.10^{6} mg.\nChỉ số xà phòng hóa 198 → m(chất béo) = 112.10^{6} : 198 ≈ 565 657 g ≈ 565,66 kg.\nMỡ lợn chứa 92% chất béo → m = 565,66 : 0,92 ≈ 614,8 ≈ 615 kg. Đáp số: 615.', 0.5),
    sh('Thủy phân 4,275 g saccharose trong dung dịch H2SO4 loãng. Trung hòa dung dịch thu được sau phản ứng bằng dung dịch NaOH thu được dung dịch Y. Cho Y tác dụng với lượng dư thuốc thử Tollens thu được bao nhiêu gam Ag? Biết hiệu suất phản ứng thủy phân saccharose là 80%, hiệu suất phản ứng tráng gương 100%.', 4.32,
      'n(saccharose) = 4,275 : 342 = 0,0125 mol. Thủy phân với H = 80%: n(saccharose phản ứng) = 0,0125 × 0,8 = 0,01 mol → thu được 0,01 mol glucose + 0,01 mol fructose (và còn 0,0025 mol saccharose dư, không tráng bạc).\nGlucose và fructose (trong môi trường base của thuốc thử Tollens) đều cho 2Ag: n(Ag) = 2 × (0,01 + 0,01) = 0,04 mol.\nm(Ag) = 0,04 × 108 = 4,32 g. Đáp số: 4,32.'),
    sh('Hiện nay công nghệ sản xuất giấm bằng phương pháp lên men từ các loại tinh bột đang được sử dụng rộng rãi theo sơ đồ: tinh bột → glucose → ethanol → acetic acid (thành phần chính của giấm). Từ 16,875 tấn bột sắn chứa 90% tinh bột sản xuất được 200 tấn dung dịch acetic acid có nồng độ a%. Biết hiệu suất chung của cả quá trình sản xuất là 80%. Giá trị a bằng bao nhiêu? (Làm tròn đến hàng phần mười)', 4.5,
      'm(tinh bột) = 16,875 × 90% = 15,1875 tấn.\nSơ đồ: (C6H10O5)n → nC6H12O6 → 2nC2H5OH → 2nCH3COOH, tức 162 tấn tinh bột → 2 × 60 = 120 tấn acetic acid.\nm(CH3COOH) = 15,1875 × 120 : 162 × 80% = 11,25 × 0,8 = 9 tấn.\nC% = 9 : 200 × 100% = 4,5%. Vậy a = 4,5.', 0.051),
    sh('Có bao nhiêu amino acid đồng phân cấu tạo của nhau có cùng công thức phân tử C4H9O2N?', 5,
      'Amino acid C4H9NO2 có dạng C3H6(NH2)COOH. Xét mạch carbon của gốc C3H6 và vị trí nhóm –NH2:\n• Mạch thẳng (butanoic acid): CH3CH2CH(NH2)COOH (α), CH3CH(NH2)CH2COOH (β), H2NCH2CH2CH2COOH (γ) → 3 chất.\n• Mạch phân nhánh (2-methylpropanoic acid): (CH3)2C(NH2)COOH (α), H2NCH2CH(CH3)COOH (β) → 2 chất.\nTổng cộng 5 amino acid. Đáp số: 5.')
  ]);
})(window);
