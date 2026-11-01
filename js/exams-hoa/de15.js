/* Đề 15 · Giữa kì 1 – Phú Yên (Ester – Lipid, Carbohydrate, Amine – Amino acid – Peptide) */
(function (g) {
  'use strict';
  var E = g.Chem.Exams;
  function mc(t, o, a, e, x) { var q = { text: t, options: o, answer: a, explain: e }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function tf(t, arr, x) { var q = { text: t, items: arr.map(function (r) { return { t: r[0], a: r[1], explain: r[2] }; }) }; if (x) for (var k in x) q[k] = x[k]; return q; }
  function sh(t, a, e, tol, x) { var q = { text: t, answer: a, explain: e, tol: tol !== undefined ? tol : 0.01 }; if (x) for (var k in x) q[k] = x[k]; return q; }
  var IMG = 'img/gk1/';

  E.part('de15', 'mcq', [
    mc('Ester ethyl formate có mùi thơm của đào và có thành phần trong hương vị của quả mâm xôi, đôi khi nó còn được tìm thấy trong táo. Ester này có công thức cấu tạo rút gọn là', ['CH3COOCH3.', 'HCOOC2H5.', 'HCOOCH=CH2.', 'HCOOCH3.'], 1,
      'Ethyl formate = gốc formate HCOO– (từ formic acid) + gốc ethyl –C2H5 → HCOOC2H5.'),
    mc('Chất béo là trieste của acid béo với', ['ethylene glycol.', 'glycerol.', 'ethanol.', 'phenol.'], 1,
      'Chất béo là triester của glycerol C3H5(OH)3 với các acid béo (RCOO)3C3H5.'),
    mc('Cho 6 carbohydrate sau: glucose, fructose, maltose, saccharose, tinh bột và cellulose. Có bao nhiêu carbohydrate đã cho thuộc nhóm polysaccharide?', ['1.', '2.', '3.', '4.'], 1,
      'Polysaccharide: tinh bột và cellulose → 2 chất.'),
    mc('Nhận xét nào dưới đây là không đúng khi nói về glucose và fructose?', ['Đều tạo được dung dịch màu xanh lam khi tác dụng với Cu(OH)2 trong môi trường kiềm.', 'Đều tạo được kết tủa đỏ gạch Cu2O khi tác dụng với Cu(OH)2, đun nóng trong môi trường kiềm.', 'Đều làm mất màu nước bromine.', 'Đều xảy ra phản ứng tráng bạc khi tác dụng với thuốc thử Tollens.'], 2,
      'Glucose và fructose đều có nhiều nhóm –OH kề nhau (tạo phức xanh lam với Cu(OH)2), đều bị Cu(OH)2/NaOH đun nóng và thuốc thử Tollens oxi hóa (fructose chuyển thành glucose trong môi trường base). Nhưng chỉ glucose có nhóm –CHO nên làm mất màu nước bromine; fructose không làm mất màu nước bromine. Vậy nhận xét C là sai.'),
    mc('Phản ứng giữa C2H5OH với CH3COOH (xúc tác H2SO4 đặc, đun nóng) là phản ứng', ['xà phòng hóa.', 'ester hóa.', 'trùng hợp.', 'trùng ngưng.'], 1,
      'Carboxylic acid + alcohol (xúc tác H2SO4 đặc, t°) ⇌ ester + H2O gọi là phản ứng ester hóa; sản phẩm là ethyl acetate.'),
    mc('Phát biểu nào sau đây sai?', ['Amylopectin có cấu trúc mạch phân nhánh.', 'Fructose là sản phẩm của phản ứng thủy phân tinh bột.', 'Thủy phân hoàn toàn cellulose thu được glucose.', 'Fructose và glucose là đồng phân của nhau.'], 1,
      'Thủy phân tinh bột (hay cellulose) chỉ thu được glucose, không thu được fructose; fructose chỉ có từ thủy phân saccharose (cùng glucose). Các phát biểu A, C, D đều đúng.'),
    mc('Công thức cấu tạo dạng mạch vòng α-glucose là (xem hình A, B, C, D)', ['Hình A.', 'Hình B.', 'Hình C.', 'Hình D.'], 0,
      'α-glucose có vòng 6 cạnh (pyranose) và nhóm –OH hemiacetal ở C1 nằm khác phía với nhóm –CH2OH (ở C5) trên mặt phẳng vòng (–OH ở C1 hướng xuống). Hình A đúng. Hình B có –OH ở C1 hướng lên là β-glucose; hình C và D là vòng 5 cạnh của fructose.',
      { fixed: true, img: { src: IMG + 'haworth-abcd.png', alt: 'Bốn công thức mạch vòng A, B, C, D' } }),
    mc('Điều chế xà phòng bằng thí nghiệm nào sau đây?', ['Cho chất béo tác dụng với acid.', 'Cho chất béo tác dụng với dung dịch base.', 'Cho chất béo tác dụng với muối.', 'Cho chất béo tác dụng với ammonia.'], 1,
      'Xà phòng hóa chất béo: (RCOO)3C3H5 + 3NaOH → 3RCOONa + C3H5(OH)3 (đun nóng). Với acid thì thu được acid béo, không phải xà phòng.'),
    mc('Hợp chất CH3–NH–CH2–CH3 (công thức khung gồm nhóm –NH– nối một gốc methyl và một gốc ethyl) có tên thay thế là', ['N-methylethanamine.', 'dimethylamine.', 'N-ethylmethanamine.', 'diethylamine.'], 0,
      'Với amine bậc hai, chọn mạch carbon dài hơn làm mạch chính (ethan → ethanamine) và gốc còn lại đặt làm nhóm thế trên nitrogen: N-methylethanamine. "Dimethylamine" và "diethylamine" là tên gốc – chức và không đúng cấu tạo; "N-ethylmethanamine" chọn sai mạch chính.'),
    mc('Amino acid là hợp chất hữu cơ trong phân tử', ['chứa nhóm carboxyl và nhóm amino.', 'chỉ chứa nhóm amino.', 'chỉ chứa nhóm carboxyl.', 'chỉ chứa nitrogen hoặc carbon.'], 0,
      'Amino acid là hợp chất tạp chức, phân tử chứa đồng thời nhóm amino (–NH2) và nhóm carboxyl (–COOH).'),
    mc('Tripeptide là hợp chất mà phân tử có', ['hai liên kết peptide, ba gốc β-amino acid.', 'hai liên kết peptide, ba gốc α-amino acid.', 'ba liên kết peptide, hai gốc α-amino acid.', 'ba liên kết peptide, ba gốc α-amino acid.'], 1,
      'Peptide được tạo từ các gốc α-amino acid; tripeptide có 3 gốc α-amino acid nối với nhau bằng 3 – 1 = 2 liên kết peptide.'),
    mc('Ở pH thấp, amino acid tồn tại chủ yếu dưới dạng', ['ion lưỡng cực.', 'phân tử.', 'anion.', 'cation.'], 3,
      'Trong môi trường acid (pH < pI), nhóm –NH2 nhận H+ thành –NH3+ và nhóm –COOH giữ nguyên, nên amino acid mang điện tích dương (cation): H3N+–R–COOH.'),
    mc('Trong cây thuốc lá tự nhiên và khói thuốc lá chứa một amine rất độc, đó là nicotin với công thức cấu tạo như hình. Số nguyên tử carbon trong một phân tử nicotin là', ['11.', '9.', '10.', '8.'], 2,
      'Vòng pyridine (6 cạnh, có 1 N) gồm 5 carbon; vòng pyrrolidine (5 cạnh, có 1 N) gồm 4 carbon; nhóm N–CH3 có 1 carbon. Tổng: 5 + 4 + 1 = 10 carbon (nicotin có CTPT C10H14N2).',
      { img: { src: IMG + 'nicotine.png', alt: 'Công thức cấu tạo nicotin' } }),
    mc('Glucose có thể lên men tạo lactic acid có trong sữa chua qua phản ứng nào sau đây?', ['2C6H12O6 + Cu(OH)2 → (C6H11O6)2Cu + 2H2O.', 'C6H12O6 –(enzyme)→ 2C2H5OH + 2CO2.', 'C6H12O6 –(enzyme)→ 2CH3CH(OH)COOH.', 'CH2OH–[CHOH]4–CHO + Br2 + H2O –(t°)→ CH2OH–[CHOH]4–COOH + 2HBr.'], 2,
      'Lactic acid là CH3CH(OH)COOH. Lên men lactic: C6H12O6 → 2CH3CH(OH)COOH (enzyme). Phản ứng A là tạo phức với Cu(OH)2; B là lên men rượu; D là oxi hóa glucose bằng nước bromine tạo gluconic acid.'),
    mc('Cho một số đặc điểm và tính chất của saccharose: (1) là polysaccharide. (2) là chất kết tinh, không màu. (3) khi thủy phân tạo thành sản phẩm trong đó có glucose. (4) tham gia phản ứng tráng bạc. (5) phản ứng được với Cu(OH)2. Số nhận định đúng là:', ['(2), (4), (5).', '(1), (3), (5).', '(1), (2), (3).', '(2), (3), (5).'], 3,
      '(1) Sai: saccharose là disaccharide. (2) Đúng. (3) Đúng: saccharose + H2O → glucose + fructose. (4) Sai: saccharose không có nhóm –CHO tự do nên không tráng bạc. (5) Đúng: nhiều nhóm –OH kề nhau nên hòa tan Cu(OH)2 cho dung dịch xanh lam. Các nhận định đúng: (2), (3), (5).', { fixed: true }),
    mc('Thực hiện phản ứng ester hoá: cho 0,1 mol alcohol tác dụng với 0,1 mol carboxylic acid, có mặt H2SO4 đặc làm xúc tác. Đồ thị nào sau đây biểu diễn sự thay đổi số mol (n) alcohol theo thời gian (t)?', ['Đồ thị A.', 'Đồ thị B.', 'Đồ thị C.', 'Đồ thị D.'], 2,
      'Lúc đầu n(alcohol) = 0,1 mol và giảm dần theo thời gian khi tạo ester. Phản ứng ester hóa là thuận nghịch nên không hết: khi đạt cân bằng, n(alcohol) giữ không đổi ở một giá trị lớn hơn 0 (đường nằm ngang phía trên trục hoành). Đồ thị C phù hợp. A, B là n tăng; D giảm về 0 (phản ứng hoàn toàn) nên sai.',
      { fixed: true, img: { src: IMG + 'do-thi-este-hoa.png', alt: 'Bốn đồ thị A, B, C, D biểu diễn n theo t' } }),
    mc('Aniline tác dụng với (HNO2 + HCl) ở 0 – 5 °C tạo muối diazonium để tổng hợp phẩm nhuộm azo và dược phẩm: C6H5NH2 + HONO + HCl –(0–5 °C)→ X + 2H2O. Chất X có công thức cấu tạo là', ['[C6H5N2]+Cl–', '[C6H5NH2]+Cl–', '[C6H5NH3]+Cl–', '[C6H5N2H]+Cl–'], 0,
      'Bảo toàn nguyên tử: vế trái C6H5NH2 + HNO2 + HCl = C6H9N2O2Cl. Trừ đi 2H2O (H4O2) còn C6H5N2Cl. Vậy X là muối benzenediazonium chloride [C6H5–N≡N]+Cl–, có công thức [C6H5N2]+Cl–.'),
    mc('Cho m gam cellulose tác dụng vừa đủ với 56,7 gam HNO3 có trong hỗn hợp HNO3 đặc và H2SO4 đặc, tạo thành 97,2 gam hỗn hợp X gồm cellulose dinitrate và cellulose trinitrate. Giá trị m và thành phần phần trăm về khối lượng của cellulose dinitrate trong X lần lượt là', ['40,5 và 61,11%', '56,7 và 38,89%', '56,7 và 61,11%', '57,6 và 38,89%'], 1,
      'n(HNO3) = 56,7 : 63 = 0,9 mol. Mỗi mắt xích [C6H7O2(OH)3] bị thế x nhóm –OH bởi –ONO2: dinitrate [C6H7O2(OH)(ONO2)2] (M = 252) dùng 2 HNO3, trinitrate [C6H7O2(ONO2)3] (M = 297) dùng 3 HNO3.\nGọi a, b là số mol dinitrate, trinitrate: 2a + 3b = 0,9 và 252a + 297b = 97,2 → a = 0,15; b = 0,2.\nSố mol mắt xích cellulose = a + b = 0,35 mol → m = 0,35 × 162 = 56,7 gam.\n%m dinitrate = 0,15 × 252 : 97,2 × 100% = 38,89%.')
  ]);

  E.part('de15', 'tf', [
    tf('Thí nghiệm: Phản ứng xà phòng hoá chất béo. Chuẩn bị: chất béo (dầu thực vật hoặc mỡ động vật), dung dịch NaOH 40%, dung dịch NaCl bão hoà; bát sứ, cốc thuỷ tinh, đũa thuỷ tinh, kiềng sắt, đèn cồn. Tiến hành: Cho khoảng 2 g chất béo và khoảng 4 mL dung dịch NaOH 40% vào bát sứ. Đun hỗn hợp khoảng 10 phút và liên tục khuấy bằng đũa thuỷ tinh. Nếu thể tích nước giảm cần bổ sung thêm nước. Kết thúc phản ứng, đổ hỗn hợp vào cốc thuỷ tinh chứa khoảng 30 mL dung dịch NaCl bão hoà, khuấy nhẹ. Để nguội hỗn hợp, tách lấy khối xà phòng nổi lên ở trên.', [
      ['Phải dùng đũa thủy tinh khuấy đều hỗn hợp trong bát sứ để phản ứng xảy ra nhanh hơn; có cho thêm vài giọt nước để hỗn hợp không cạn đi (thể tích không đổi) thì phản ứng mới thực hiện được.', true, 'Chất béo không tan trong dung dịch NaOH nên phải khuấy để tăng diện tích tiếp xúc, phản ứng nhanh hơn. Thêm nước để giữ thể tích không đổi, tránh hỗn hợp bị cạn, khô và cháy khét.'],
      ['Việc thêm NaCl bão hòa để tách xà phòng ra khỏi glycerol do xà phòng tan nhiều trong NaCl bão hòa và nhẹ hơn nên nổi lên trên.', false, 'Xà phòng gần như không tan trong dung dịch NaCl bão hòa nên kết tinh tách ra và nổi lên (nhẹ hơn dung dịch). Phát biểu "tan nhiều" là sai.'],
      ['Sau phản ứng khi chưa thêm NaCl bão hòa thì dung dịch đồng nhất; sau khi thêm NaCl bão hòa thì sản phẩm tách lớp: phần xà phòng rắn ở trên, phần lỏng ở dưới gồm NaCl bão hòa và glycerol.', true, 'Sau khi xà phòng hóa hết chất béo, xà phòng và glycerol tan trong dung dịch nên hỗn hợp đồng nhất. Thêm NaCl bão hòa làm xà phòng tách ra (muối hóa) nổi lên trên; lớp dưới là dung dịch NaCl bão hòa và glycerol.'],
      ['Phương trình phản ứng xà phòng hoá chất béo tripalmitin: C3H5(OCOC17H31)3 + 3NaOH → C3H5(OH)3 + 3C17H31COONa.', false, 'Tripalmitin là (C15H31COO)3C3H5 (gốc palmitic acid C15H31COOH), tạo ra C15H31COONa. Công thức trong phương trình chứa gốc C17H31– là gốc của linoleic acid (trilinolein), nên phát biểu sai.']]),
    tf('Glucose và fructose thuộc nhóm monosaccharide, không bị thủy phân.', [
      ['Glucose là chất rắn, vị ngọt, dễ tan trong nước, glucose có trong nhiều loại trái cây chín.', true, 'Đây là tính chất vật lí của glucose: tinh thể không màu, vị ngọt (kém saccharose), dễ tan; có nhiều trong quả chín (nho chín…).'],
      ['Ở người trưởng thành, khoẻ mạnh thì lượng glucose trong máu trước khi ăn khoảng 4,4 – 7,2 mmol/L.', true, 'Nồng độ glucose trong máu người khỏe mạnh lúc đói khoảng 4,4 – 7,2 mmol/L (SGK).'],
      ['Fructose là chất rắn, dễ tan trong nước, có vị ngọt hơn glucose, fructose có nhiều trong mật ong.', true, 'Fructose là đường ngọt nhất, có nhiều trong mật ong (khoảng 40%).'],
      ['Trong dung dịch, glucose tồn tại chủ yếu ở dạng vòng 6 cạnh và fructose tồn tại chủ yếu ở dạng mạch hở.', false, 'Cả glucose và fructose trong dung dịch đều tồn tại chủ yếu ở dạng mạch vòng (glucose: vòng 6 cạnh; fructose: vòng 5 cạnh), dạng mạch hở chiếm tỉ lệ rất nhỏ.']]),
    tf('Một học sinh tiến hành thí nghiệm tráng bạc của glucose theo hai bước: Bước 1: Cho vào một ống nghiệm sạch 1 mL dung dịch AgNO3 1%, sau đó nhỏ tiếp từng giọt dung dịch NH3 vào cho đến khi kết tủa vừa xuất hiện lại tan hết. Bước 2: Thêm tiếp 1 mL dung dịch glucose 1% vào ống nghiệm trên rồi đun nóng nhẹ.', [
      ['Phản ứng hóa học xảy ra ở bước 2 là CH2OH–[CHOH]4–CHO + 2AgNO3 + 3NH3 + H2O → CH2OH–[CHOH]4–COONH4 + 2Ag + 3NH4NO3.', false, 'Phương trình chưa cân bằng đúng. Kiểm tra nguyên tử N: vế trái có 2 + 3 = 5 N; vế phải có 1 + 3 × 1 = 4 (nếu 3NH4NO3 thì có 1 + 6 = 7 N). Hệ số đúng của NH4NO3 là 2: CH2OH–[CHOH]4–CHO + 2AgNO3 + 3NH3 + H2O → CH2OH–[CHOH]4–COONH4 + 2Ag + 2NH4NO3.'],
      ['Hiện tượng hóa học quan sát được ở bước 2 là có xuất hiện kết tủa màu đen.', false, 'Hiện tượng là có lớp bạc kim loại sáng bóng như gương bám trên thành ống nghiệm (phản ứng tráng bạc), không phải kết tủa đen.'],
      ['Ở bước 2, chất oxi hóa là glucose, chất khử là AgNO3.', false, 'Ngược lại: Ag+ (trong AgNO3) nhận electron thành Ag nên là chất oxi hóa; glucose (nhóm –CHO) nhường electron thành gluconate nên là chất khử.'],
      ['Trong công nghiệp, người ta dùng sucrose làm nguyên liệu để tráng ruột phích mà không dùng glucose là vì sucrose có lượng nhiều trong tự nhiên, giá thành thấp đồng thời khi thủy phân sinh ra glucose và fructose đều có phản ứng tráng bạc còn glucose có lượng ít trong tự nhiên, giá thành cao.', true, 'Saccharose rẻ, phổ biến (mía, củ cải đường); thủy phân cho glucose + fructose, cả hai đều tráng bạc. Đây cũng là lí do trong công nghiệp tráng ruột phích, tráng gương dùng saccharose thay vì glucose.']]),
    tf('Papain là enzyme có tác dụng thuỷ phân protein, có nhiều trong quả đu đủ. Papain được tách từ nhựa đu đủ xanh, là một enzyme thực vật, rất tốt cho hệ tiêu hóa, giúp tiêu hóa thức ăn giàu protein dễ dàng hơn.', [
      ['Thịt được ướp với nước ép đu đủ thì khi nấu sẽ nhanh mềm hơn.', true, 'Papain trong nước ép đu đủ thủy phân protein của thịt thành các peptide ngắn, amino acid nên thịt nhanh mềm.'],
      ['Do enzyme có nhiều trong quả đu đủ có tác dụng phân giải protein có trong thịt nên khiến cho thịt khi nấu cùng sẽ nhanh mềm hơn.', true, 'Giải thích đúng cho ý a): enzyme phân giải protein trong thịt.'],
      ['Từ quả đu đủ xanh có thể chiết xuất được Bromelain.', false, 'Bromelain là enzyme phân giải protein chiết xuất từ quả dứa (thơm), không phải từ đu đủ; từ nhựa đu đủ xanh chiết xuất được papain.'],
      ['Papain có công thức phân tử C9H15N4O3.', false, 'Đếm từ công thức cấu tạo trong hình: C9H14N4O3. Công thức C9H15N4O3 vô lí vì hợp chất chứa 4 nguyên tử N (số chẵn) phải có số nguyên tử H chẵn.']],
      { img: { src: IMG + 'peptide-papain.png', alt: 'Công thức cấu tạo trong hình của đề' } })
  ]);

  E.part('de15', 'short', [
    sh('Trong công thức cấu tạo dạng mạch vòng α-glucose (vòng 6 cạnh, các carbon được đánh số từ C1 đến C6), nhóm –OH hemiacetal là –OH gắn ở carbon số mấy?', 1,
      'Nhóm –OH hemiacetal là nhóm –OH tạo ra khi nhóm –CHO (C1) cộng với –OH ở C5 để đóng vòng. Nó gắn ở carbon anomer C1 – carbon này liên kết đồng thời với O của vòng và nhóm –OH. Đáp số: 1.'),
    sh('Cho ethylamine lần lượt vào: dung dịch FeCl3; dung dịch HCl; Cu(OH)2; dung dịch NaCl; dung dịch Br2. Ethylamine phản ứng được với bao nhiêu chất?', 3,
      'Ethylamine là base yếu (nhờ nitrogen còn cặp electron tự do) và có khả năng tạo phức với Cu(OH)2. Phản ứng được với:\n– FeCl3: 3C2H5NH2 + 3H2O + FeCl3 → Fe(OH)3↓ + 3C2H5NH3Cl.\n– HCl: C2H5NH2 + HCl → C2H5NH3Cl.\n– Cu(OH)2: 2C2H5NH2 + Cu(OH)2 → [Cu(C2H5NH2)2](OH)2 (phức tan màu xanh lam), tương tự amine tạo phức với Cu(OH)2 như NH3.\nKhông phản ứng với NaCl (muối của base mạnh – acid mạnh) và dung dịch Br2 (phản ứng thế vòng thơm là đặc trưng của aniline, không phải amine mạch hở). Đáp số: 3.'),
    sh('Cho các chất: saccharose, glucose, fructose, ethyl formate, formic acid và acetic aldehyde. Trong các chất trên, có bao nhiêu chất vừa có khả năng tham gia phản ứng tráng bạc vừa có khả năng phản ứng với Cu(OH)2 ở điều kiện thường?', 3,
      'Phản ứng tráng bạc: glucose, fructose (môi trường base), ethyl formate, formic acid, acetic aldehyde (saccharose thì không). Phản ứng với Cu(OH)2 ở điều kiện thường: saccharose, glucose, fructose (tạo phức xanh lam), formic acid (phản ứng acid – base hòa tan Cu(OH)2). Ethyl formate và acetic aldehyde không phản ứng với Cu(OH)2 ở nhiệt độ thường. Chất thỏa mãn cả hai: glucose, fructose, formic acid → 3. Đáp số: 3.'),
    sh('Valine là một loại amino acid thiết yếu. Khi cho 1,404 gam valine hòa tan trong nước được dung dịch. Dung dịch này phản ứng vừa đủ với 12 mL dung dịch NaOH có nồng độ C (mol/L), thu được 1,668 gam muối. Tính giá trị của C?', 1,
      'Valine (CH3)2CH–CH(NH2)–COOH có M = 117 → n = 1,404 : 117 = 0,012 mol.\nVì chỉ có nhóm –COOH phản ứng với NaOH (1 : 1) nên n(NaOH) = 0,012 mol.\n(Kiểm tra: muối H2N–C4H8–COONa M = 139 → 0,012 × 139 = 1,668 gam đúng đề.)\nC = n : V = 0,012 : 0,012 = 1 mol/L. Đáp số: 1.'),
    sh('Mỗi viên dầu cá chứa 180 mg EPA và 120 mg DHA (cấu tạo như hình). Hãy tính tổng số mol EPA và DHA có trong một lọ Now Ultra Omega-3 Fish Oil 90, biết trong một lọ có chứa 90 viên dầu cá trên? (làm tròn đến hàng phần nghìn)', 0.087,
      'EPA (eicosapentaenoic acid): mạch 20 carbon có 5 liên kết đôi C=C và nhóm –COOH → C20H30O2 (M = 302). DHA (docosahexaenoic acid): 22 carbon, 6 liên kết đôi → C22H32O2 (M = 328).\nTrong một lọ (90 viên): m(EPA) = 0,18 × 90 = 16,2 g; m(DHA) = 0,12 × 90 = 10,8 g.\nn(EPA) = 16,2 : 302 ≈ 0,0536 mol; n(DHA) = 10,8 : 328 ≈ 0,0329 mol.\nTổng ≈ 0,0866 mol ≈ 0,087 mol. Đáp số: 0,087.', 0.0006,
      { img: { src: IMG + 'epa-dha.png', alt: 'Công thức cấu tạo EPA và DHA' } }),
    sh('Phản ứng quang hợp tạo ra glucose cần được cung cấp năng lượng: 6CO2 + 6H2O + 673 kcal → C6H12O6 + 6O2 (xúc tác chlorophyll, ánh sáng). Nếu có một cây xanh với tổng diện tích lá 100 dm², mỗi dm² nhận được 3000 cal năng lượng mặt trời trong 1 giờ và chỉ có 10% năng lượng đó tham gia phản ứng tổng hợp glucose, thì trong 10 giờ có x gam glucose được tạo thành. Xác định giá trị của x (làm tròn một chữ số thập phân).', 80.2,
      'Năng lượng mặt trời nhận được trong 10 giờ: 100 dm² × 3000 cal/(dm²·giờ) × 10 giờ = 3.10^{6} cal = 3000 kcal.\nNăng lượng tham gia tổng hợp glucose: 3000 × 10% = 300 kcal.\nTạo 1 mol glucose cần 673 kcal → n(glucose) = 300 : 673 ≈ 0,4458 mol.\nm = 0,4458 × 180 ≈ 80,2 gam. Đáp số: 80,2.', 0.051)
  ]);
})(window);
