/* Đề 14 · Giữa kì 1 – Đề số 52 (Ester – Lipid, Carbohydrate) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function mc(t, o, a, e, x) { var q = { text: t, options: o, answer: a, explain: e }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function tf(t, arr, x) { var q = { text: t, items: arr.map(function (r) { return { t: r[0], a: r[1], explain: r[2] }; }) }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function sh(t, a, e, tol, x) { var q = { text: t, answer: a, explain: e, tol: tol !== undefined ? tol : 0.01 }; if (x) for (var k in x) q[k] = x[k]; return q; }

  E.part('de14', 'mcq', [
    mc('Chất nào sau đây là ester?', ['HCOOH.', 'CH3CHO.', 'CH3OH.', 'CH3COOC2H5.'], 3,
      'Ester có dạng RCOOR′ (nhóm –COO– nối hai gốc hydrocarbon). CH3COOC2H5 là ethyl acetate. HCOOH là acid, CH3CHO là aldehyde, CH3OH là alcohol.'),
    mc('Chất thuộc loại disaccharide là', ['glucose.', 'saccharose.', 'cellulose.', 'fructose.'], 1,
      'Saccharose (C12H22O11) gồm 1 gốc glucose + 1 gốc fructose nên là disaccharide. Glucose, fructose là monosaccharide; cellulose là polysaccharide.'),
    mc('Acid nào sau đây là acid béo?', ['formic acid.', 'oleic acid.', 'acrylic acid.', 'Acetic acid.'], 1,
      'Acid béo là carboxylic acid đơn chức, mạch carbon dài (12 – 24 C), không phân nhánh. Oleic acid C17H33COOH (18 C) là acid béo không no; các acid còn lại mạch quá ngắn.'),
    mc('Carbohydrate nào sau đây thuộc loại polysaccharide?', ['Glucose.', 'Tinh bột.', 'Fructose.', 'Saccharose.'], 1,
      'Tinh bột (C6H10O5)n là polysaccharide. Glucose, fructose là monosaccharide; saccharose là disaccharide.'),
    mc('Một số ester được dùng trong hương liệu, mĩ phẩm, bột giặt là nhờ các ester', ['là chất lỏng dễ bay hơi.', 'có mùi thơm, an toàn với người.', 'có thể bay hơi nhanh sau khi sử dụng.', 'đều có nguồn gốc từ thiên nhiên.'], 1,
      'Nhiều ester có mùi thơm dễ chịu (mùi hoa, quả) và an toàn nên được dùng làm hương liệu, mĩ phẩm, chất tạo mùi cho bột giặt. Không phải ester nào cũng lỏng, dễ bay hơi hay có nguồn gốc tự nhiên (nhiều ester được tổng hợp).'),
    mc('Đồng phân của glucose là', ['fructose.', 'tinh bột.', 'saccharose.', 'cellulose.'], 0,
      'Glucose và fructose cùng có công thức phân tử C6H12O6 nhưng cấu tạo khác nhau (glucose có nhóm –CHO, fructose có nhóm C=O ketone) nên là đồng phân của nhau.'),
    mc('Công thức của tristearin là', ['(C2H5COO)3C3H5.', '(C17H35COO)3C3H5.', '(CH3COO)3C3H5.', '(HCOO)3C3H5.'], 1,
      'Tristearin là triester của glycerol với stearic acid C17H35COOH nên có công thức (C17H35COO)3C3H5. (C2H5COO)3C3H5 là tripropionin, (CH3COO)3C3H5 là triacetin.'),
    mc('Ester ethyl formate có mùi thơm của đào và có thành phần trong hương vị của quả mâm xôi, đôi khi nó còn được tìm thấy trong táo. Công thức của ester này là', ['CH3COOCH3.', 'HCOOC2H5.', 'HCOOCH=CH2.', 'HCOOCH3.'], 1,
      'Tên ester = tên gốc alkyl của alcohol + tên gốc acid. Ethyl formate gồm gốc formate (HCOO–, từ formic acid) và gốc ethyl (–C2H5), nên là HCOOC2H5.'),
    mc('Ester X được tạo bởi methyl alcohol và acetic acid. Công thức của X là', ['HCOOC2H5.', 'CH3COOC2H5.', 'CH3COOCH3.', 'HCOOCH3.'], 2,
      'CH3COOH + CH3OH ⇌ CH3COOCH3 + H2O (xúc tác H2SO4 đặc, đun nóng). X là methyl acetate: gốc acid CH3COO– (acetic) và gốc alcohol –CH3 (methyl).'),
    mc('Trong phân tử của carbohydrate luôn có', ['nhóm chức aldehyde.', 'nhóm chức ketone.', 'nhóm chức alcohol.', 'nhóm chức acid.'], 2,
      'Carbohydrate là hợp chất tạp chức, luôn có nhiều nhóm –OH (alcohol). Nhóm –CHO chỉ có ở glucose, maltose (dạng mạch hở); fructose có nhóm C=O ketone; saccharose, tinh bột, cellulose không có nhóm –CHO tự do. Carbohydrate không có nhóm acid –COOH.'),
    mc('Dầu chuối là ester có tên isoamyl acetate, được điều chế từ', ['CH3OH, CH3COOH.', '(CH3)2CH–CH2OH, CH3COOH.', 'C2H5COOH, C2H5OH.', 'CH3COOH, (CH3)2CH–CH2–CH2OH.'], 3,
      'Isoamyl acetate = acetate (CH3COO–) + isoamyl (–CH2CH2CH(CH3)2). Alcohol isoamyl là (CH3)2CH–CH2–CH2OH (3-methylbutan-1-ol), acid là CH3COOH. Vậy chọn D. Phương án B là isobutyl alcohol (chỉ 4 C), không phải isoamyl.'),
    mc('Cho 6 carbohydrate sau: glucose, fructose, maltose, saccharose, tinh bột và cellulose. Có bao nhiêu carbohydrate đã cho thuộc nhóm polysaccharide?', ['1.', '2.', '3.', '4.'], 1,
      'Polysaccharide gồm tinh bột và cellulose → 2 chất. Glucose, fructose là monosaccharide; maltose, saccharose là disaccharide.'),
    mc('Chất nào sau đây phản ứng với dung dịch NaOH tạo thành HCOONa và C2H5OH?', ['HCOOC2H5.', 'CH3COOC2H5.', 'CH3COOCH3.', 'HCOOCH3.'], 0,
      'Muối HCOONa có gốc acid HCOO– và alcohol C2H5OH có gốc –C2H5, nên ester là HCOOC2H5: HCOOC2H5 + NaOH → HCOONa + C2H5OH.'),
    mc('Ở nhiệt độ thường, nhỏ vài giọt dung dịch iodine vào hồ tinh bột thấy xuất hiện màu', ['vàng.', 'nâu đỏ.', 'xanh tím.', 'hồng.'], 2,
      'Tinh bột (mạch amylose xoắn) hấp phụ iodine tạo hợp chất màu xanh tím. Đun nóng thì màu mất, để nguội màu xuất hiện lại.'),
    mc('Chất phản ứng được với AgNO3 trong dung dịch NH3, đun nóng tạo ra kim loại Ag là', ['glucose.', 'saccharose.', 'cellulose.', 'tinh bột.'], 0,
      'Glucose có nhóm –CHO (dạng mạch hở) nên bị oxi hóa bởi thuốc thử Tollens, giải phóng Ag. Saccharose, cellulose, tinh bột không có nhóm –CHO tự do nên không tráng bạc.'),
    mc('Loại glucide không có tính khử là', ['Glucose.', 'Fructose.', 'Saccharose.', 'Maltose.'], 2,
      'Glucose, maltose có nhóm –CHO ở dạng mạch hở; fructose chuyển thành glucose trong môi trường kiềm nên cũng có tính khử. Saccharose không còn nhóm –OH hemiacetal (cả hai carbon anomer đều đã tạo liên kết glycoside) nên không mở vòng được, không có tính khử.'),
    mc('Phản ứng điều chế xà phòng từ chất béo được gọi là phản ứng', ['ester hóa.', 'xà phòng hóa.', 'trung hòa.', 'hydrate hóa.'], 1,
      'Chất béo + dung dịch kiềm (NaOH, KOH), đun nóng → muối của acid béo (xà phòng) + glycerol. Đây là phản ứng xà phòng hóa.'),
    mc('Cho dãy các dung dịch: glucose, saccharose, ethanol, glycerol. Số dung dịch trong dãy phản ứng được với Cu(OH)2 ở nhiệt độ thường tạo thành dung dịch có màu xanh lam là', ['4.', '1.', '2.', '3.'], 3,
      'Các hợp chất có từ 2 nhóm –OH kề nhau (polyalcohol) hòa tan Cu(OH)2 tạo phức xanh lam: glucose, saccharose, glycerol → 3 chất. Ethanol chỉ có 1 nhóm –OH nên không phản ứng.')
  ]);

  E.part('de14', 'tf', [
    tf('Chất béo là triester của glycerol với các acid béo nên chúng cũng bị thủy phân tương tự như ester.', [
      ['Phản ứng thủy phân trong môi trường acid H+ là phản ứng một chiều.', false, 'Thủy phân trong môi trường acid là phản ứng thuận nghịch (tạo glycerol và acid béo, đạt cân bằng).'],
      ['Phản ứng thủy phân trong môi trường base (phản ứng xà phòng hóa) là phản ứng một chiều.', true, 'Muối của acid béo tạo thành không phản ứng ngược lại với glycerol nên phản ứng xảy ra một chiều, hoàn toàn.'],
      ['Thủy phân chất béo trong môi trường acid hay base thì luôn thu được glycerol.', true, 'Chất béo là triester của glycerol nên dù môi trường nào cũng thu được glycerol (cùng acid béo hoặc muối của acid béo).'],
      ['Muối của các acid béo như sodium palmitate, sodium stearate,… được dùng để sản xuất xà phòng.', true, 'Xà phòng là muối sodium (hoặc potassium) của acid béo, ví dụ C15H31COONa, C17H35COONa.']]),
    tf('Glucose và fructose là 2 monosaccharide phổ biến trong đời sống.', [
      ['Glucose và fructose đều có công thức phân tử là C6H12O6.', true, 'Hai chất là đồng phân của nhau, cùng công thức phân tử C6H12O6.'],
      ['Phân tử glucose và fructose đều có chứa nhóm chức hydroxy và nhóm chức carbonyl.', true, 'Glucose: 5 nhóm –OH và 1 nhóm –CHO (carbonyl). Fructose: 5 nhóm –OH và 1 nhóm C=O (ketone) – đều là nhóm carbonyl.'],
      ['Ở dạng mạch hở, trong phân tử glucose và phân tử fructose đều chứa nhóm aldehyde.', false, 'Chỉ glucose có nhóm aldehyde –CHO; fructose có nhóm ketone C=O ở C số 2.'],
      ['Cả hai hợp chất glucose và fructose đều tồn tại chủ yếu ở dạng mạch vòng 6 cạnh.', false, 'Glucose tồn tại chủ yếu ở dạng vòng 6 cạnh (pyranose); fructose tồn tại chủ yếu ở dạng vòng 5 cạnh (furanose).']]),
    tf('Tiến hành thí nghiệm theo các bước: Bước 1: Cho vào hai ống nghiệm mỗi ống 2 mL ethyl acetate. Bước 2: Thêm 2 mL dung dịch H2SO4 20% vào ống thứ nhất; 4 mL dung dịch NaOH 30% vào ống thứ hai. Bước 3: Lắc đều cả hai ống nghiệm, lắp ống sinh hàn, đun sôi nhẹ trong khoảng 5 phút, để nguội.', [
      ['Sau bước 2, chất lỏng trong cả hai ống nghiệm đều phân thành hai lớp.', true, 'Ethyl acetate ít tan trong nước, nhẹ hơn nước nên nổi thành lớp riêng trên dung dịch acid/base.'],
      ['Sau bước 2, chất lỏng trong cả hai ống nghiệm đều đồng nhất.', false, 'Ngược với ý a): ester ít tan nên phân lớp; chỉ sau khi thủy phân (bước 3) ở ống chứa NaOH mới thành dung dịch đồng nhất.'],
      ['Sau bước 3, ở hai ống nghiệm đều thu được sản phẩm giống nhau.', false, 'Ống 1 (acid): CH3COOH + C2H5OH (thuận nghịch). Ống 2 (NaOH): CH3COONa + C2H5OH. Sản phẩm khác nhau.'],
      ['Ở bước 3, có thể thay việc đun sôi nhẹ bằng đun cách thủy (ngâm trong nước nóng).', true, 'Ethyl acetate sôi ở 77 °C, dễ bay hơi và cháy nên đun cách thủy trong nước nóng vẫn đủ nhiệt và an toàn hơn đun trực tiếp.']]),
    tf('Tiến hành thí nghiệm: Bước 1: Cho vào ống nghiệm lần lượt 1 mL dung dịch CuSO4 2% và 2 mL dung dịch NaOH 3%, lắc đều. Bước 2: Thêm tiếp vào ống nghiệm 4 mL dung dịch saccharose 2%. Lắc đều cho đến khi kết tủa tan hết.', [
      ['Kết thúc bước 1, ống nghiệm xuất hiện kết tủa màu xanh.', true, 'CuSO4 + 2NaOH → Cu(OH)2↓ (xanh) + Na2SO4.'],
      ['Kết thúc bước 2, ống nghiệm xuất hiện dung dịch màu xanh lam.', true, 'Saccharose có nhiều nhóm –OH kề nhau nên hòa tan Cu(OH)2 tạo phức đồng(II) saccharate màu xanh lam.'],
      ['Phản ứng xảy ra ở bước 1 là phản ứng trao đổi, ở bước 2 là phản ứng oxi hóa – khử.', false, 'Bước 1 là phản ứng trao đổi; bước 2 là phản ứng tạo phức, số oxi hóa không thay đổi nên không phải oxi hóa – khử.'],
      ['Thí nghiệm trên chứng tỏ saccharose có tính chất của polyalcohol.', true, 'Hòa tan Cu(OH)2 tạo dung dịch xanh lam là tính chất đặc trưng của các polyalcohol có các nhóm –OH kề nhau.']])
  ]);

  E.part('de14', 'short', [
    sh('Khi xà phòng hóa triglyceride X bằng dung dịch NaOH dư, đun nóng, thu được sản phẩm gồm glycerol, sodium oleate, sodium stearate và sodium palmitate. Có bao nhiêu đồng phân cấu tạo thỏa mãn tính chất trên của X?', 3,
      'X là triester của glycerol với 3 acid béo khác nhau: oleic, stearic, palmitic. Ba gốc acid gắn vào 3 vị trí của glycerol (2 vị trí đầu mạch tương đương nhau về cấu tạo, 1 vị trí giữa). Số đồng phân cấu tạo = số cách chọn gốc acid đứng ở vị trí giữa = 3 (oleoyl, stearoyl hoặc palmitoyl ở giữa). Đáp số: 3.'),
    sh('Cho các ester: vinyl acetate, vinyl benzoate, ethyl acetate, isoamyl acetate, phenyl acetate, allyl acetate. Có bao nhiêu ester có thể điều chế trực tiếp bằng phản ứng của carboxylic acid và alcohol tương ứng (có H2SO4 đặc làm xúc tác)?', 3,
      'Vinyl acetate và vinyl benzoate: alcohol tương ứng là vinyl alcohol CH2=CH–OH không bền, không có thật → không điều chế trực tiếp được. Phenyl acetate: phenol không ester hóa trực tiếp với carboxylic acid (phải dùng anhydride hoặc acid chloride). Các ester còn lại: ethyl acetate (CH3COOH + C2H5OH), isoamyl acetate (CH3COOH + (CH3)2CHCH2CH2OH), allyl acetate (CH3COOH + CH2=CH–CH2OH) điều chế được. Đáp số: 3.'),
    sh('Cho các thuốc thử sau: thuốc thử Tollens, Cu(OH)2, dung dịch bromine, dung dịch methanol/HCl khan. Có bao nhiêu chất mà glucose và fructose đều phản ứng được?', 3,
      'Thuốc thử Tollens: cả hai đều phản ứng (fructose chuyển thành glucose trong môi trường base). Cu(OH)2: cả hai đều có nhiều nhóm –OH kề nhau, tạo phức xanh lam. Methanol/HCl khan: cả hai có nhóm –OH hemiacetal/hemiketal nên tạo methyl glycoside. Dung dịch bromine: chỉ glucose (nhóm –CHO) làm mất màu, fructose không. Vậy có 3 thuốc thử. Đáp số: 3.'),
    sh('Cho các carbohydrate: saccharose, fructose, maltose, tinh bột, cellulose. Số carbohydrate khi thuỷ phân trong môi trường acid chỉ tạo ra glucose là bao nhiêu?', 3,
      'Maltose → 2 glucose; tinh bột → n glucose; cellulose → n glucose. Saccharose → glucose + fructose (không chỉ glucose); fructose là monosaccharide, không bị thủy phân. Vậy có 3 chất: maltose, tinh bột, cellulose. Đáp số: 3.'),
    sh('Cho các phát biểu sau về carbohydrate: (a) Glucose và saccharose đều là chất rắn có vị ngọt, dễ tan trong nước. (b) Tinh bột và cellulose đều là polysaccharide. (c) Trong dung dịch, glucose và saccharose đều hoà tan Cu(OH)2, tạo phức màu xanh lam. (d) Khi thuỷ phân hoàn toàn hỗn hợp gồm tinh bột và saccharose trong môi trường acid, chỉ thu được một loại monosaccharide duy nhất. (e) Khi đun nóng glucose (hoặc fructose) với dung dịch AgNO3 trong NH3 thu được Ag. (g) Glucose và saccharose đều tác dụng với H2 (xúc tác Ni, đun nóng) tạo sorbitol. Có bao nhiêu phát biểu đúng?', 4,
      '(a) Đúng. (b) Đúng. (c) Đúng: cả hai có nhiều nhóm –OH kề nhau. (d) Sai: tinh bột → glucose còn saccharose → glucose + fructose, tức thu được 2 loại monosaccharide. (e) Đúng: fructose chuyển hóa thành glucose trong môi trường base nên cũng tráng bạc. (g) Sai: saccharose không có nhóm –CHO/C=O tự do nên không cộng H2. Có 4 phát biểu đúng: (a), (b), (c), (e). Đáp số: 4.'),
    sh('Cho salicylic acid (2-hydroxybenzoic acid) phản ứng với methyl alcohol có mặt sulfuric acid làm xúc tác, thu được methyl salicylate (C8H8O3) dùng làm chất giảm đau. Để sản xuất 15,4 triệu miếng cao dán giảm đau khi vận động thể thao cần tối thiểu m tấn salicylic acid từ phản ứng trên. Biết mỗi miếng cao dán có chứa 105 mg methyl salicylate và hiệu suất phản ứng đạt 70%. Tính giá trị của m (làm tròn đến hai chữ số có nghĩa).', 2.1,
      'Khối lượng methyl salicylate cần dùng: 105.10^{-3} × 15,4.10^{6} = 1,617.10^{6} g = 1,617 tấn.\nPhản ứng: HOC6H4COOH (138) + CH3OH ⇌ HOC6H4COOCH3 (152) + H2O.\nKhối lượng salicylic acid theo lí thuyết: 1,617 × 138 : 152 ≈ 1,468 tấn.\nVì H = 70% nên cần: 1,468 : 0,7 ≈ 2,097 ≈ 2,1 tấn. Đáp số: 2,1.', 0.051)
  ]);
})(window);
