window.Q = function (n, stem, opts, ans, exp) {
  return { n: n, stem: stem, opts: opts, ans: ans, exp: exp };
};
window.GAPQ = null;

window.TESTS = [
  /* =====================================================================
     ĐỀ 0: ĐỀ MINH HỌA GIỮA HỌC KỲ 1 (2026 - 2027) - THPT CHUYÊN LÊ QUÝ ĐÔN
     Theo Ma trận: 40 câu (1.5đ Leaflet/Ad + 1.5đ Announcement + 1.25đ Sắp xếp
     + 1.25đ Điền câu + 2.5đ Đọc hiểu + 1.5đ Use of English + 0.5đ Tự luận)
     ===================================================================== */
  {
    id: 'anh-midterm-hk1-2627',
    subject: 'anh',
    title: 'Đề GK1 Lê Quý Đôn 26-27 (Mã đề 121)',
    blocks: [
      {
        id: 'gk1-b1',
        short: 'Thông báo: Green Movement (1–6)',
        part: 'Part 1 · Leaflet / Advertisement Gap-Fill',
        title: 'Join the Green Movement Today! (Câu 1–6)',
        instruction: 'Read the following announcement and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks.',
        passageTitle: 'Join the Green Movement Today!',
        paras: [
          'Let\'s protect our planet with simple eco-friendly habits.',
          '• Why does it matter? Pollution and waste harm nature daily. Small actions make a big difference.',
          '• What can you do?',
          '- Bring reusable bags and containers. Many marine creatures die because of plastic waste, and (1) ______ are seriously endangered by pollution.',
          '- Dispose of waste properly. Don\'t just (2) ______ your old clothes - donate or repurpose them.',
          '- Instead of drinking bottled water, use a reusable bottle to cut down on plastic waste. Billions of plastic bottles end up in (3) ______ and oceans every year. A refillable bottle not only reduces waste but also saves money.',
          '- Consider the (4) ______ of packaging when shopping. Less packaging means less waste!',
          '- Support brands that care about the environment. (5) ______ their commitment, pollution can be reduced.',
          '- Recycle properly by sorting paper, plastic, and glass. These materials can be turned into useful (6) ______ rather than being discarded.',
          'Together, we can make a difference!'
        ],
        questions: [
          Q(1, GAPQ, ['others', 'other', 'the others', 'another'], 'A', '“others” làm đại từ đại diện cho các sinh vật khác (“other marine creatures”).'),
          Q(2, GAPQ, ['take off', 'throw away', 'set up', 'look after'], 'B', '“throw away” = vứt bỏ rác/quần áo cũ thay vì tái chế, quyên góp.'),
          Q(3, GAPQ, ['landfill sites', 'dumping areas', 'disposal places', 'junk yards'], 'A', 'Thuật ngữ chính xác: “landfill sites” = bãi chôn lấp rác.'),
          Q(4, GAPQ, ['number', 'amount', 'group', 'variety'], 'B', '“amount of packaging”: “packaging” là danh từ không đếm được.'),
          Q(5, GAPQ, ['According to', 'Thanks to', 'As far as', 'On top of'], 'B', '“Thanks to their commitment” = Nhờ vào cam kết của họ.'),
          Q(6, GAPQ, ['ingredients', 'factors', 'resources', 'substances'], 'C', '“useful resources” = các nguồn tài nguyên hữu ích sau khi tái chế.')
        ]
      },
      {
        id: 'gk1-b2',
        short: 'Bản tin: Bão Milton (7–12)',
        part: 'Part 2 · Announcement Gap-Fill',
        title: 'Super Typhoon Milton and its Destruction (Câu 7–12)',
        instruction: 'Read the following announcement and mark the letter A, B, C or D on your answer sheet to indicate the option that best fits each of the numbered blanks.',
        passageTitle: 'Super Typhoon Milton and its Destruction',
        paras: [
          'Super Typhoon Milton struck the eastern coastline last weekend, causing widespread devastation. Many residents described it as the most (7) ______ experience they had ever faced. The combination of (8) ______ and relentless rain left the town completely paralyzed.',
          'The typhoon, (9) ______ the coast at around 3 PM, brought winds exceeding 180 km/h. This resulted in massive flooding and left thousands in (10) ______ of emergency assistance. The authorities worked hard to (11) ______ a difference, but the sheer scale of the disaster made recovery efforts slow.',
          'Now, the community is (12) ______ rebuilding their homes, hoping to restore what was lost.'
        ],
        questions: [
          Q(7, GAPQ, ['terrifying', 'terrified', 'terrifies', 'terrify'], 'A', 'Tính từ mang nghĩa chủ động miêu tả tính chất trải nghiệm: “terrifying experience”.'),
          Q(8, GAPQ, ['strong stormy winds', 'winds strong stormy', 'stormy strong winds', 'stormy winds strong'], 'A', 'Trật tự tính từ: ý kiến/tính chất (strong) + loại hình (stormy) + danh từ (winds).'),
          Q(9, GAPQ, ['which had hit', 'hitting', 'that hit', 'hit'], 'B', 'Rút gọn mệnh đề quan hệ chủ động dùng V-ing: “hitting the coast”.'),
          Q(10, GAPQ, ['charge', 'lack', 'control', 'need'], 'D', 'Cụm cố định “in need of” = đang cần sự giúp đỡ.'),
          Q(11, GAPQ, ['make', 'take', 'do', 'have'], 'A', 'Cụm cố định “make a difference” = tạo ra sự thay đổi/tác động tích cực.'),
          Q(12, GAPQ, ['already', 'fast', 'slowly', 'never'], 'C', 'Trạng từ “slowly” phù hợp với văn cảnh nỗ lực phục hồi còn chậm chạp.')
        ]
      },
      {
        id: 'gk1-b3',
        short: 'Sắp xếp câu (13–17)',
        part: 'Part 3 · Arrangement',
        title: 'Sắp xếp câu tạo đoạn văn / hội thoại (Câu 13–17)',
        instruction: 'Mark the letter A, B, C or D on your answer sheet to indicate the best arrangement of utterances or sentences to make a meaningful exchange or text.',
        questions: [
          Q(13, 'Hello Emma,\na. I\'m really excited about our upcoming trip next month, especially since it will be our first time traveling together to such a fascinating destination.\nb. To avoid any last-minute stress, we should book our accommodation soon, perhaps within the next few days, to secure the best deals available.\nc. Have you considered what specific attractions or landmarks you want to prioritize visiting during our stay?\nd. It\'s going to be absolutely wonderful exploring a completely new city together and discovering all the unique places it has to offer.\ne. By the way, I\'ve already done some preliminary research on hotels and managed to find several promising options with excellent reviews and reasonable prices.\nBest regards, Sophie', ['a-d-c-e-b', 'd-c-e-b-a', 'c-d-a-e-b', 'a-d-b-e-c'], 'A', 'Trình tự: Hào hứng chuyến đi (a) -> Mong chờ khám phá (d) -> Hỏi điểm tham quan (c) -> Đã tìm hiểu khách sạn (e) -> Đề xuất chốt đặt phòng sớm (b).'),
          Q(14, 'a. For example, behaviors that are acceptable in one culture, such as direct eye contact, may be considered impolite in another.\nb. At first, people may feel excited about exploring a new culture, but this initial enthusiasm often fades as they begin to notice differences in language, customs, and social norms.\nc. Culture shock, which occurs when individuals struggle to adapt to a foreign culture, is a common experience for travelers and expatriates.\nd. This period of adjustment can be challenging, but it ultimately helps individuals develop a deeper understanding of and respect for cultural diversity.\ne. Such differences can lead to feelings of frustration, confusion, or even isolation for newcomers.', ['c-e-a-b-d', 'b-c-a-e-d', 'c-a-e-b-d', 'c-b-a-e-d'], 'D', 'Định nghĩa sốc văn hóa (c) -> Diễn biến tâm lý ban đầu (b) -> Ví dụ về sự khác biệt (a) -> Hậu quả của khác biệt (e) -> Tổng kết thời kỳ thích nghi (d).'),
          Q(15, 'a. Mark: That\'s a great idea! They can significantly reduce your bills.\nb. Nam: Yes, I\'m thinking about installing solar panels on the roof.\nc. Mark: Composting is excellent; it enriches the soil and helps plants.\nd. Nam: I also want to start composting to reduce food waste.\ne. Mark: Have you considered switching to renewable energy sources in your home?', ['e-b-a-d-c', 'b-a-d-e-c', 'e-d-c-b-a', 'd-c-e-b-a'], 'A', 'Mark hỏi về năng lượng tái tạo (e) -> Nam nêu ý tưởng pin mặt trời (b) -> Mark khen ngợi (a) -> Nam nói tiếp về ủ phân hữu cơ (d) -> Mark đồng tình (c).'),
          Q(16, 'Dear Mimi,\nI hope you\'re well.\na. In addition, students should be taught about natural and cultural importance of the heritage sites.\nb. These ways can result in the fact that people\'s awareness of preserving heritage sites will be raised.\nc. First, it\'s a good idea to spread information on social media because more people will get useful information quickly.\nd. To respond to your \'Go with the Culture Everywhere\' Project, I am thinking about what can be done to preserve heritage sites in my local community.\ne. Particularly, they all know that preserving heritages sites plays a pivotal role in keeping our traditions alive.\nf. I hope that my opinion can help you more.\nBest regards, Kate', ['e-f-a-c-d-b', 'd-c-a-b-e-f', 'b-e-c-d-f-a', 'd-a-c-e-b-f'], 'B', 'Mục đích viết thư (d) -> Biện pháp 1 mạng xã hội (c) -> Biện pháp 2 giáo dục học sinh (a) -> Nâng cao nhận thức (b) -> Ý nghĩa giữ gìn truyền thống (e) -> Lời chào (f).'),
          Q(17, 'a. Nam: Hi, Jessica. I\'m so excited as I\'ve never met a talking robot before. Let\'s have a photo taken together!\nb. Teacher: Hello, class. Please meet Jessica. She\'s a human-like robot and will be your guide today.\nc. Jessica: Good morning, everybody. Welcome to the New Tech Centre.', ['a-b-c', 'b-a-c', 'c-a-b', 'b-c-a'], 'D', 'Giáo viên giới thiệu Jessica (b) -> Robot chào mừng (c) -> Nam hào hứng đáp lời (a).')
        ]
      },
      {
        id: 'gk1-b4',
        short: 'Điền câu: Cultural Exchange (18–22)',
        part: 'Part 4 · Phrase-Clause Insertion',
        title: 'Chương trình Trao đổi Văn hóa (Câu 18–22)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the option that best fits each of the numbered blanks.',
        passageTitle: 'Cultural Exchange Programs',
        paras: [
          'Cultural exchange programs have many benefits for individuals, communities, and the world. (18) ______ Working in a new cultural environment helps develop various soft skills like adaptability, organization, problem-solving, and self-confidence. (19) ______ a valuable learning opportunity that participants can use long after the program ends. Therefore, cultural exchange is an excellent way for young people to grow professionally and improve their career prospects. Future employers often view international experience positively, giving individuals (20) ______',
          'Engaging with people from different cultures provides an eye-opening experience as it exposes individuals to different norms and values. This experience can significantly shape personal and professional growth. (21) ______ helps develop a broader view, known as intercultural competence. Intercultural competence not only fosters empathy and understanding but also uncovers aspects of one\'s own culture that were previously unknown.',
          'Cultural exchange programs offer a unique way to travel, distinct from typical tourist experiences. These programs provide a deeper understanding of other countries and cultures, allowing participants to live like locals. Experiencing community-based travel, with its hidden gems, undiscovered streets, and delicious homemade meals, (22) ______ how they engage with different cultures, leading them to vow never to travel like tourists again.'
        ],
        questions: [
          Q(18, GAPQ, [
            'Providing learning opportunities for participants in these programs is an aim',
            'These programs aim to provide learning opportunities for participants',
            'Participants in these programs aim to learning to provide opportunities',
            'To learn to provide opportunities is aimed for the participants in these programs'
          ], 'B', 'Mệnh đề chuẩn ngữ pháp và văn phong: “These programs aim to provide learning opportunities for participants”.'),
          Q(19, GAPQ, ['Such experiences can be', 'The experience is that', 'This experience is', 'All the experiences are'], 'A', '“Such experiences can be” = Những trải nghiệm như thế có thể là một cơ hội quý giá.'),
          Q(20, GAPQ, [
            'an advantage in today\'s competitive job market',
            'the today advantage of competitive job market',
            'a competitive advantage toward today\'s job market',
            'the today\'s job market with competitive advantage'
          ], 'A', 'Cụm từ tự nhiên: “giving individuals an advantage in today\'s competitive job market”.'),
          Q(21, GAPQ, [
            'Involve oneself in another culture',
            'To be involving oneself in another culture',
            'Involving oneself in another culture',
            'Be involved oneself in another culture'
          ], 'C', 'V-ing làm chủ ngữ cho động từ số ít “helps”: “Involving oneself in another culture”.'),
          Q(22, GAPQ, [
            'encourages individuals reconsider',
            'encouraging individuals to reconsider',
            'to encourage individuals to reconsider',
            'encourages individuals to reconsider'
          ], 'D', 'Chủ ngữ “Experiencing...” cần động từ chính chia số ít “encourages” + tân ngữ + “to V”.')
        ]
      },
      {
        id: 'gk1-b5',
        short: 'Đọc hiểu: Landslides (23–30)',
        part: 'Part 5 · Reading Comprehension',
        title: 'Hiểm họa Sạt lở đất ở miền núi phía Bắc (Câu 23–30)',
        instruction: 'Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the best answer to each of the questions.',
        passageTitle: 'Landslides in Northern Vietnam',
        numbered: true,
        paras: [
          '[I] Landslides are a significant environmental challenge in the northern mountainous provinces of Vietnam, particularly during the rainy season. The region, characterized by steep slopes and heavy rainfall, is prone to this natural disaster, which poses serious threats to both the local population and infrastructure. [II] In recent years, numerous landslides have occurred, often triggered by prolonged periods of heavy rain, resulting in devastating impacts on communities and livelihoods.',
          'The mountainous terrain, combined with deforestation and improper land use, exacerbates the risk of landslides. [III] As farmers clear forests for agriculture, the natural vegetation that stabilizes the soil is lost, making slopes more susceptible to erosion. When heavy rains saturate the soil, it can quickly become unstable, leading to sudden and destructive landslides. [IV]',
          'In response to this growing threat, local authorities and environmental organizations are taking proactive measures to mitigate the risks associated with landslides. Efforts include reforestation projects, improving drainage systems, and raising public awareness about safe practices during the rainy season. Additionally, advanced monitoring systems are being implemented to provide early warnings, allowing communities to evacuate before a disaster strikes.',
          'Despite these efforts, the challenges remain significant, and ongoing education and support for sustainable land management practices are crucial for reducing the incidence and impact of landslides in northern Vietnam.'
        ],
        questions: [
          Q(23, 'Where in this passage does the following sentence best fit?\n“These events not only destroy homes and roads but also disrupt essential services such as education and healthcare.”', ['[I]', '[II]', '[III]', '[IV]'], 'B', 'Vị trí [II] nối tiếp sau thông tin “resulting in devastating impacts on communities and livelihoods”.'),
          Q(24, 'The word “prone” in paragraph 1 could be best replaced by ______.', ['resistant', 'vulnerable', 'indifferent', 'immune'], 'B', '“prone to” = dễ mắc phải, dễ bị tác động = vulnerable to.'),
          Q(25, 'The word “it” in paragraph 2 refers to ______.', ['the soil', 'the rainy season', 'the local population', 'the infrastructure'], 'A', '“When heavy rains saturate the soil, it can quickly become unstable…” -> it = the soil.'),
          Q(26, 'According to paragraph 3, which of the following is NOT a proactive measure to mitigate the risks associated with landslides?', ['Reforestation projects', 'Improving drainage systems', 'Increasing logging activities', 'Raising public awareness'], 'C', '“Increasing logging activities” (Gia tăng phá rừng) là hành vi tàn phá, không phải biện pháp giảm thiểu hiểm họa.'),
          Q(27, 'Which of the following best summarises paragraph 3?', [
            'Local authorities and organizations are actively working to reduce the risks of landslides through various projects and public education initiatives.',
            'The government is focusing on implementing advanced technologies to predict landslides and ensure the safety of local communities.',
            'Reforestation and improved drainage systems are essential for enhancing the environment and preventing landslides in northern Vietnam.',
            'Communities are encouraged to participate in disaster preparedness training to minimize the impact of landslides during the rainy season.'
          ], 'A', 'Đoạn 3 bao quát các giải pháp trồng rừng, thoát nước, tuyên truyền và hệ thống cảnh báo sớm.'),
          Q(28, 'The phrase “susceptible to” in paragraph 2 is OPPOSITE in meaning to ______.', ['open to', 'immune to', 'prone to', 'favorable for'], 'B', '“susceptible to” (dễ bị ảnh hưởng) trái nghĩa với “immune to” (miễn nhiễm, không bị tổn hại).'),
          Q(29, 'Which of the following can be inferred from the passage?', [
            'Ongoing reforestation and improved land management practices are essential for minimizing future landslide risks in northern Vietnam.',
            'The frequency of landslides in northern Vietnam will likely decrease in the coming years due to effective government interventions.',
            'Local communities are fully aware of the risks of landslides and are actively participating in mitigation efforts.',
            'Climate change is the sole cause of the increasing landslide occurrences in the northern mountainous provinces of Vietnam.'
          ], 'A', 'Đoạn cuối nhấn mạnh: giáo dục liên tục và quản lý đất bền vững là yếu tố cốt lõi để giảm thiểu nguy cơ.'),
          Q(30, 'Which of the following best summarises the passage?', [
            'Landslides are a minor issue in northern Vietnam.',
            'The effects of landslides are temporary and easily managed.',
            'Landslides pose a significant threat, but measures are being taken to reduce their impact.',
            'Local authorities have completely eliminated the risk of landslides.'
          ], 'C', 'Ý tóm tắt toàn bài: Sạt lở đất đe dọa nghiêm trọng, nhưng các biện pháp ứng phó đang được triển khai tích cực.')
        ]
      },
      {
        id: 'gk1-b6',
        short: 'Lỗi sai & Ngữ pháp (31–38)',
        part: 'Part 6 · Use of English',
        title: 'Sửa lỗi sai và Trắc nghiệm tổng hợp (Câu 31–38)',
        instruction: 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer.',
        questions: [
          Q(31, 'Tìm lỗi sai: As home to people from many countries, London is one of the most [cultural diverse] cities in the world.', ['home to', 'the', 'cultural diverse', 'As'], 'C', 'Sửa tính từ “cultural” thành trạng từ “culturally” bổ nghĩa cho tính từ “diverse”: “culturally diverse”.'),
          Q(32, 'Tìm lỗi sai: [Dislike] mass tourism, which often prioritizes volume and profit, sustainable practices focus on long-term well-being.', ['focus on', 'well-being', 'Dislike', 'which'], 'C', 'Sửa động từ “Dislike” thành giới từ chỉ sự tương phản: “Unlike mass tourism...”.'),
          Q(33, 'The environment project they ______ last month was so effective that our school was able to reduce its energy bill by 30 per cent.', ['relied on', 'washed off', 'looked after', 'carried out'], 'D', 'Cụm “carry out a project” = tiến hành, triển khai một dự án.'),
          Q(34, 'She\'s a dedicated student who consistently hit the ______ to maintain her high grades.', ['books', 'hay', 'headlines', 'roof'], 'A', 'Thành ngữ “hit the books” = vùi đầu vào việc học tập.'),
          Q(35, 'Many people tend to leave their fully charged phones connected, not knowing that it ______ around 2.24 watts and the figure goes up to 29.84 watts for laptops.', ['boosts', 'costs', 'saves', 'consumes'], 'D', '“consume power/electricity” = tiêu thụ điện năng.'),
          Q(36, 'Leonardo qualified as a master artist and his work made a huge ______ on the Duke who decided to offer him a position in his court.', ['impressively', 'impress', 'impression', 'impressive'], 'C', 'Cụm kết hợp “make an impression on someone” = để lại ấn tượng sâu đậm đối với ai.'),
          Q(37, 'In Brazil, the rapid pace of urbanization, with ______ population living in urban areas by 1991, has led to serious social challenges.', ['this', 'the', 'X (no article)', 'a'], 'B', 'Dùng mạo từ xác định “the” trước danh từ được bổ nghĩa bởi cụm phân từ: “the population living in urban areas”.'),
          Q(38, 'Tony: "We won a trip to Hawaii, Kim. I\'m ______!" — Kim: "Wow! That\'s fantastic!"', ['under the weather', 'in the spot light', 'on cloud nine', 'up to the moon'], 'C', 'Thành ngữ “on cloud nine” = cực kỳ vui sướng, hạnh phúc ngập tràn.')
        ]
      },
      {
        id: 'gk1-b7',
        short: 'Tự luận viết lại câu (39–40)',
        part: 'Part 7 · Writing Transformation',
        title: 'Tự luận viết lại câu (Câu 39–40)',
        instruction: 'Rewrite the following sentences as directed.',
        questions: [
          Q(39, 'Rewrite using the word given:\nVietnamese teenagers now really enjoy Korean music. (POPULARITY)\n→ Korean music now __________________________________________________', [
            'has gained immense popularity among Vietnamese teenagers.',
            'enjoys great popularity with Vietnamese teenagers.',
            'is growing popularity in Vietnamese teenagers.',
            'has popular among Vietnamese teenagers.'
          ], 'A', 'Đáp án chính xác: “Korean music now has gained popularity among / enjoys great popularity with Vietnamese teenagers.”'),
          Q(40, 'Rewrite beginning as given:\nIt doesn\'t take me a long time to get to work anymore now that the new road has opened.\n→ I used __________________________________________________', [
            'to spend a lot of time getting to work before the new road opened.',
            'to take a long time to work before the new road opened.',
            'to be taken long time to work.',
            'to spend much time to work now.'
          ], 'A', 'Đáp án chính xác: “I used to spend a long time getting to work before the new road opened.” (hoặc “I used to take a long time to get to work before...”).')
        ]
      }
    ]
  },

  /* =====================================================================
     TEST 01 (50 CÂU)
     ===================================================================== */
  {
    id: 'anh-test-01',
    subject: 'anh',
    title: 'Test 01',
    blocks: [
      {
        id: 't1-b1', short: 'Lexico-Grammar (1–10)', part: 'Part 1 · Lexico-Grammar',
        title: 'Từ vựng và ngữ pháp',
        instruction: 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.',
        questions: [
          Q(1, 'My father is getting old and forgetful ______ he is experienced and helpful.', ['regardless', 'consequently', 'lest', 'be that as it may'], 'D', '“Be that as it may” = dù vậy / tuy nhiên, nối hai ý đối lập: ông già và hay quên, nhưng vẫn giàu kinh nghiệm.'),
          Q(2, 'Last-minute withdrawal of the sponsor threw a ______ in our plans in the works to organize the cultural festivals.', ['caution', 'information', 'spanner', 'notice'], 'C', 'Thành ngữ “throw a spanner in the works” = phá hỏng, gây trở ngại cho kế hoạch.'),
          Q(3, 'The first amusement park in our city was a ______ success for its owners. Everyone would go there to have a good time.', ['roaring', 'ringing', 'cracking', 'sparkling'], 'A', 'Kết hợp từ “a roaring success” = thành công vang dội.'),
          Q(4, 'We walk through a park, ______ had been uprooted in the storm. It was a scene of utter desolation.', ['that the most trees', 'whose most trees', 'most trees of which', 'most of whose trees'], 'D', 'Mệnh đề quan hệ chỉ sở hữu của “park”: “most of whose trees” = phần lớn số cây của công viên đó.'),
          Q(5, '______ in Stevenson’s landscapes, the more vitality and character the painting seems to possess.', ['The loose brushwork is', 'The looser brushwork', 'The looser the brushwork is', 'The brushwork is loose'], 'C', 'So sánh kép: “The + so sánh hơn + S + V, the + so sánh hơn + S + V”.'),
          Q(6, 'It was ______ that he was kept in hospital for nearby a month.', ['a such serious accident', 'such serious an accident', 'so a serious accident', 'so serious an accident'], 'D', 'Cấu trúc “so + adj + a/an + N + that…”: so serious an accident that…'),
          Q(7, 'One of the most disappointing things in life is to be ______ by a friend when you truly need his or her support.', ['backed out', 'marked up', 'let down', 'stood for'], 'C', '“Let sb down” = làm ai thất vọng, không giúp khi cần.'),
          Q(8, 'In the Netherlands, a highly successful biking scheme has been ______, which helps to reduce the carbon footprint associated with transportation.', ['originated', 'implemented', 'controlled', 'diverged'], 'B', '“Implement a scheme” = triển khai, thực hiện một chương trình.'),
          Q(9, 'By using public transports, everyone can contribute to the reduction of greenhouse gas emissions, which does ______ for the environment.', ['wonders', 'dreams', 'horizons', 'pearls'], 'A', 'Thành ngữ “do wonders for” = mang lại lợi ích rất lớn cho.'),
          Q(10, 'Due to ______, people can now enjoy foods and products from different cultures without leaving their home country.', ['globalism', 'globe', 'being globalized', 'globalization'], 'D', 'Sau “Due to” cần danh từ “globalization” (toàn cầu hóa).')
        ]
      },
      {
        id: 't1-b2', short: 'Đọc điền từ: Quảng cáo (11–13)', part: 'Part 2 · Reading',
        title: 'Điền từ vào thông báo quảng cáo (Câu 11–13)',
        instruction: 'Read the following advertisement/announcement and mark the letter A, B, C, or D to indicate the correct option that best fits each of the numbered blanks.',
        passageTitle: 'Unleash Your Potential: The Road to Independence!',
        paras: [
          'Calling all young visionaries! Are you ready to dive into a world of (11) ______ and empowerment? Join us for the must-see show of the season: “Mastering Independence: A Youngster’s Guide to Living Bold”!',
          'Date: Coming Soon! | Venue: The Grand Auditorium of Youth Empowerment | Time: Doors open at 6 PM',
          'It is the one show that brings you a life-changing journey (12) ______ for the ambitious souls eager to carve their own paths. We’re bringing together life coaches, self-made entrepreneurs, and independence gurus to equip you (13) ______ the tools, knowledge, and confidence to take on the world. Tickets: Early bird specials available now!'
        ],
        questions: [
          Q(11, GAPQ, ['self-abandonment', 'self-condemnation', 'self-absorption', 'self-reliance'], 'D', '“Self-reliance” (tự lực) hợp với chủ đề independence và empowerment.'),
          Q(12, GAPQ, ['tailoring', 'to tailor', 'tailor', 'tailored'], 'D', 'Rút gọn mệnh đề quan hệ bị động: “a journey (which is) tailored for…”.'),
          Q(13, GAPQ, ['on', 'in', 'for', 'with'], 'D', '“Equip sb with sth” = trang bị cho ai cái gì.')
        ]
      },
      {
        id: 't1-b3', short: 'Đọc điền từ: Trung tâm (14–16)', part: 'Part 2 · Reading',
        title: 'Điền từ vào quảng cáo trung tâm Anh ngữ (Câu 14–16)',
        instruction: 'Read the following advertisement/announcement and mark the letter A, B, C, or D to indicate the correct option that best fits each of the numbered blanks.',
        passageTitle: 'Advertisements for New Star English Center',
        paras: [
          'In today’s interconnected world, proficiency in English is not just an asset; it’s a necessity. Our English Centers are committed to equipping you with the linguistic tools to navigate global conversations, enhance your career prospects, and foster meaningful connections across cultures.',
          '## What Sets Us Apart?',
          '✔ Innovative Learning Environment: Our (14) ______ facilities are designed to inspire creativity and collaboration, providing you with the ideal backdrop for your educational journey.',
          '✔ Cutting-Edge Technology: Utilize the latest digital resources and interactive platforms that enhance your learning experience and keep you engaged.',
          '✔ Networking Opportunities: Join a (15) ______ community of learners and professionals, expanding your network while you learn. Participate in events that connect you with industry leaders and fellow language enthusiasts.',
          '✔ Comprehensive Assessment: Regular evaluations ensure that you are (16) ______ to meet your personal language goals, with constructive feedback to guide your progress.',
          '✔ Lifelong Learning: Our commitment to your education doesn’t end with the completion of your course. Enjoy access to alumni resources, workshops, and continued learning opportunities that keep you connected and growing.'
        ],
        questions: [
          Q(14, GAPQ, ['luxurious', 'exquisite', 'customized', 'state-of-the-art'], 'D', '“State-of-the-art facilities” = cơ sở vật chất hiện đại nhất.'),
          Q(15, GAPQ, ['vibrant', 'mercurial', 'enigmatic', 'assertive'], 'A', '“Vibrant community” = cộng đồng sôi nổi, năng động.'),
          Q(16, GAPQ, ['on the horizon', 'in line', 'in the running', 'on track'], 'D', '“On track to do sth” = đang đi đúng hướng để đạt được điều gì.')
        ]
      },
      {
        id: 't1-b4', short: 'Điền câu: Cân nặng (17–22)', part: 'Part 2 · Reading',
        title: 'Chọn cụm/câu điền vào đoạn văn (Câu 17–22)',
        instruction: 'Mark the letter A, B, C, D in your answer sheet to indicate the correct option that fits each of the numbered blanks.',
        passageTitle: 'Weight and eating habits',
        paras: [
          'It was once believed that being overweight was healthy, but nowadays few people subscribe to this viewpoint. (17) ______, studies are being conducted concerning the appetite and how it is controlled by both emotional and biochemical factors. Some of the conclusions of these studies may give insights into how to deal with weight problems. For example, when several hundred people were asked about (18) ______ in times of stress, 44 percent said they reacted to stressful situations by eating. Further investigations with both humans and animals indicated that it is not food which relieves tension but rather the act of chewing. A test in which subjects were blindfolded showed that obese people have a keener sense of taste and (19) ______. (20) ______, obese people are not satisfied and consequently eat more to fulfill this need. Blood samples taken from people after they were shown a picture of food revealed that (21) ______, a chemical associated with appetite. This did not happen to average-weight people. In another experiment, results showed that certain people have (22) ______. Eating carbohydrates raise the level of serotonin, a neurotransmitter in the brain. Enough serotonin produces a sense of satiation, and hunger for carbohydrates subsides.',
          'Exercise has been recommended as an important part of a weight-loss program. However, it has been found that mild exercise, such as using the stairs instead of the elevator, is better in the long run than taking on a strenuous program, such as jogging, which many people find difficult to continue over long periods of time and which also increases appetite.'
        ],
        source: '(Adapted from Cambridge Preparation for the TOEFL Test by Jolene Gear)',
        questions: [
          Q(17, GAPQ, ['Even if many people are fighting the battle to reduce weight', 'Though many people are fighting the battle to reduce weight', 'In case many people are fighting the battle to reduce weight', 'While many people are fighting the battle to reduce weight'], 'D', '“While” diễn tả hai việc diễn ra song song.'),
          Q(18, GAPQ, ['these eating habits', 'their eating habits', 'its eating habits', 'our eating habits'], 'B', '“Their” thay cho “several hundred people”.'),
          Q(19, GAPQ, ['craved more none-obese people than flavorful food', 'crave more flavorful food than non-obese people', 'craved more flavorful food than non-obese people', 'crave more none-obese people than flavorful food'], 'B', 'Song song với “have a keener sense of taste and crave more flavorful food…”.'),
          Q(20, GAPQ, ['Depriving of the variety of tastes and intensity', 'When deprived of the variety and intensity of tastes', 'Being deprived of the variety and intensity of tastes', 'After having deprived of the variety of tastes and intensity'], 'B', '“When deprived of…” = mệnh đề rút gọn ở dạng bị động.'),
          Q(21, GAPQ, ['insulin in blood that reacted overweight people increased', 'an increase in blood insulin reacted with overweight people', 'people reacted with an increase in blood insulin are overweight', 'overweight people reacted with an increase in blood insulin'], 'D', 'Sau “revealed that” cần một mệnh đề đầy đủ.'),
          Q(22, GAPQ, ['a biological induced hunger for specific carbohydrates', 'a specific carbohydrates for biological induced hunger', 'a biologically specific induced hunger for carbohydrates', 'a specific, biologically induced hunger for carbohydrates'], 'D', 'Trạng từ “biologically” bổ nghĩa cho phân từ “induced”: “a specific, biologically induced hunger for carbohydrates”.')
        ]
      },
      {
        id: 't1-b5', short: 'Điền từ: Composer (23–33)', part: 'Part 2 · Reading',
        title: 'Điền từ vào bài “A Great Composer” (Câu 23–33)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase that best fits each of the numbered blanks.',
        passageTitle: 'A Great Composer',
        paras: [
          'The classical composer Ernst Hoffsberger, who passed away earlier this week, truly (23) ______ the world of contemporary classical music and was a great source of inspiration to a whole generation of (24) ______ young artists in various fields. In many ways his three symphonies completely (25) ______ the achievements of all other composers of the late twentieth century and by (26) ______ the classical genre with jazz, rock and latterly hip-hop, his work at times bore little (27) ______ to what is commonly considered to be classical.',
          'Born in California just after the Second World War, Hoffsberger had a strict religious upbringing during which he was taught classical piano by his father. He first found work as a(n) (28) ______ journalist, playing and composing music in his free time. During the late sixties, he worked together in (29) ______ with a number of other amateur musicians before finally (30) ______ professional with the first public performance of his inspirational Tenor Sax Concerto in 1971. From then on, throughout the seventies and eighties, each new work seemed to (31) ______ the limits of the orchestral medium and also helped to bring classical music to a wider audience.',
          'What many people consider Hoffsberger’s defining quality that kept his music fresh and original was that he never lost the human (32) ______ which gave him the ability to sit down and jam with musicians and artists from all (33) ______ of life.'
        ],
        questions: [
          Q(23, GAPQ, ['renovated', 'revolutionised', 'refurbished', 'restored'], 'B', '“Revolutionise” = tạo cuộc cách mạng.'),
          Q(24, GAPQ, ['budding', 'branching', 'blooming', 'bursting'], 'A', '“Budding young artists” = những nghệ sĩ trẻ mới chớm nở, đầy triển vọng.'),
          Q(25, GAPQ, ['overshadowed', 'overturned', 'overwhelmed', 'overcame'], 'A', '“Overshadow” = làm lu mờ.'),
          Q(26, GAPQ, ['attaching', 'fusing', 'adjoining', 'co-joining'], 'B', '“Fuse A with B” = hòa trộn, kết hợp A với B.'),
          Q(27, GAPQ, ['identification', 'similarity', 'resemblance', 'familiarity'], 'C', '“Bear little resemblance to” = chẳng giống mấy với.'),
          Q(28, GAPQ, ['odd-job', 'non-contract', 'freelance', 'off-the-books'], 'C', '“Freelance journalist” = nhà báo tự do.'),
          Q(29, GAPQ, ['attribution', 'collaboration', 'contribution', 'combination'], 'B', '“In collaboration with” = hợp tác với.'),
          Q(30, GAPQ, ['getting', 'taking', 'turning', 'making'], 'C', '“Turn professional” = chuyển sang chuyên nghiệp.'),
          Q(31, GAPQ, ['overpass', 'encompass', 'bypass', 'surpass'], 'D', '“Surpass the limits” = vượt qua giới hạn.'),
          Q(32, GAPQ, ['touch', 'feeling', 'contact', 'aspect'], 'A', '“The human touch” = sự gần gũi, nét con người.'),
          Q(33, GAPQ, ['walks', 'corners', 'paths', 'routes'], 'A', '“From all walks of life” = từ mọi tầng lớp xã hội.')
        ]
      },
      {
        id: 't1-b6', short: 'Đọc hiểu: Lãnh đạo (34–41)', part: 'Part 2 · Reading',
        title: 'Đọc hiểu: Lãnh đạo trong nhóm xã hội (Câu 34–41)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the questions.',
        passageTitle: 'Leadership in social groups',
        numbered: true,
        paras: [
          'According to sociologists, there are several different ways in which a person may become recognized as the leader of a social group in the United States. In the family, traditional cultural patterns confer leadership on one or both of the parents. In other cases, such as friendship groups, one or more persons may gradually emerge as leaders, although there is no formal process of selection. In larger groups, leaders are usually chosen formally through election or recruitment.',
          'Although leaders are often thought to be people with unusual personal ability, decades of research have failed to produce consistent evidence that there is any category of “natural leaders”. It seems that there is no set of personal qualities that all leaders have in common; rather, virtually any person may be recognized as a leader if the person has qualities that meet the needs of that particular group.',
          'Furthermore, although it is commonly supposed that social groups have a single leader, research suggests that there are typically two different leadership roles that are held by different individuals. Instrumental leadership emphasizes the completion of tasks by a social group. Group members look to instrumental leaders to get things done. Expressive leadership, on the other hand, emphasizes the collective well-being of a social group’s members. Expressive leaders are less concerned with the overall goals of the group than with providing emotional support to group members and attempting to minimize tension and conflict among them. Group members expect expressive leaders to maintain stable relationships within the group and provide support to individual members.',
          'Instrumental leaders are likely to have a rather secondary relationship to other group members. They give orders and may discipline group members who inhibit attainment of the group’s goals. Expressive leaders cultivate a more personal or primary relationship to others in the group. They offer sympathy when someone experiences difficulties or is subjected to discipline, are quick to lighten a serious moment with humor, and try to resolve issues that threaten to divide the group. As the differences in these two roles suggest, expressive leaders generally receive more personal affection from group members; instrumental leaders, if they are successful in promoting group goals, may enjoy a more distant respect.'
        ],
        questions: [
          Q(34, 'What does the passage mainly discuss?', ['The problems faced by leaders', 'The roles of leaders in social groups', 'The relationship between leaders of social groups', 'How social groups determine who will lead them'], 'B', 'Bài thảo luận chính về các vai trò của người lãnh đạo trong nhóm xã hội.'),
          Q(35, 'The passage mentions all of the following ways by which people can become leaders EXCEPT ______.', ['formal election process', 'traditional cultural patterns', 'specific leadership training', 'recruitment'], 'C', 'Đoạn 1 không đề cập đến “specific leadership training”.'),
          Q(36, 'In mentioning “natural leaders” in paragraph 2, the author is making the point that ______', ['there is no proof that “natural leaders” exist', '“natural leaders” share a similar set of characteristics', '“natural leaders” are easily accepted by the members of a social group', 'few people qualify as “natural leaders”'], 'A', 'Nhiều thập kỷ nghiên cứu không tìm ra bằng chứng nhất quán nào về “natural leaders”.'),
          Q(37, 'Which of the following statements about leadership can be inferred from paragraph 2?', ['Most people desire to be leaders but can produce little evidence of their qualifications.', 'A person can best learn how to be an effective leader by doing research on leadership.', 'Few people succeed in sharing a leadership role with another person.', 'A person who is an effective leader of a particular group may not be an effective leader in another group.'], 'D', 'Người làm lãnh đạo hiệu quả ở nhóm này có thể không hiệu quả ở nhóm khác vì nhu cầu mỗi nhóm khác nhau.'),
          Q(38, 'The word “them” in paragraph 3 refers to ______.', ['group members', 'expressive leaders', 'goals of the group', 'tension and conflict'], 'A', '“Them” quy chiếu cho “group members”.'),
          Q(39, 'The word “stable” in paragraph 3 is opposite in meaning to ______.', ['versatile', 'settled', 'sturdy', 'cohesive'], 'A', '“Stable” (ổn định) trái nghĩa với “versatile” (hay thay đổi, linh hoạt).'),
          Q(40, 'A “secondary relationship” mentioned in paragraph 4 between a leader and the members of a group could best be characterized as ______.', ['unimportant', 'distant', 'enthusiastic', 'unreliable'], 'B', '“Secondary relationship” gắn với “a more distant respect” (mối quan hệ xa cách).'),
          Q(41, 'The word “resolve” in paragraph 4 is closest in meaning to ______.', ['talk about', 'find a solution to', 'avoid thinking about', 'avert repeating'], 'B', '“Resolve” = giải quyết = find a solution to.')
        ]
      },
      {
        id: 't1-b7', short: 'Đọc hiểu: Tặng quà (42–50)', part: 'Part 2 · Reading',
        title: 'Đọc hiểu: Tặng quà (Câu 42–50)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the questions.',
        passageTitle: 'Gift-giving',
        numbered: true,
        paras: [
          'Every day, millions of shoppers hit the stores in full force - both online and on foot - searching excitedly for the perfect gifts. Last year, Americans spent over $30 billion at retail stores in the month of December alone. Aside from purchasing holiday gifts, most people regularly buy presents for other occasions throughout the year, including weddings, birthdays, anniversaries, graduations, and baby showers. This frequent experience of gift-giving can engender ambivalent feelings in gift-givers. Many relish the opportunity to buy presents because gift-giving offers a powerful means to build stronger bonds with one’s closest peers. At the same time, many dread the thought of buying gifts; they worry that their purchases will disappoint, rather than delight, the intended recipients.',
          'Anthropologists describe gift-giving as a positive social process, serving various political, religious, and psychological functions. Economists, however, offer a less favorable view. According to Waldfogel (1993), gift-giving represents an objective waste of resources. People buy gifts that recipients would not choose to buy on their own, or at least not spend as much money to purchase (a phenomenon referred to as “the deadweight loss of Christmas”). This “deadweight loss” suggests that gift-givers are not very good at predicting what gifts others will appreciate. That in itself is not surprising to social psychologists. Research has found that people often struggle to take account of others’ perspectives, their insights are subject to egocentrism, social projection, and multiple attribution errors.',
          'What is surprising is that gift-givers have considerable experience acting as both gift-givers and gift-recipients, but nevertheless, tend to overspend each time they set out to purchase a meaningful gift. In the present research, we propose a unique psychological explanation for this overspending problem, i.e. that gift-givers equate how much they spend with how much recipients will appreciate the gift (the more expensive the gift, the stronger the gift-recipient’s feelings of appreciation). Although a link between gift price and feelings of appreciation might seem intuitive to gift-givers, such an assumption may be unfounded. Indeed, we suggest that gift-recipients will be less likely to base their feelings of appreciation on the magnitude of a gift than givers assume.',
          'Why do gift-givers assume that gift price is closely linked to gift-recipients’ feelings of appreciation? Perhaps givers believe that bigger (that is, more expensive) gifts convey stronger signals of thoughtfulness and consideration. According to Camerer (1988) and others, gift-giving represents a symbolic ritual, whereby gift-givers attempt to signal their positive attitudes toward the intended recipients and their willingness to invest resources in a future relationship. In this sense, gift-givers may be motivated to spend more money on a gift in order to send a “stronger signal” to their intended recipients. As for gift-recipients, they may not construe smaller or larger gifts as representing smaller or larger signals of thoughtfulness and consideration.'
        ],
        questions: [
          Q(42, 'What is the main idea discussed in the passage?', ['Gift-giving may have certain drawbacks alongside its positive qualities.', 'Gift-giving, despite its uneconomical downsides, cultivates a positive social process.', 'Gift-recipients are widely acknowledged as considerably experienced in gift-giving.', 'Gifts can serve as implicit signals of thoughtfulness and consideration.'], 'A', 'Bài viết bàn về cả mặt tích cực lẫn những hạn chế của việc tặng quà.'),
          Q(43, 'In paragraph 1, the word “ambivalent” most nearly means _____.', ['conflicted', 'unrealistic', 'apprehensive', 'supportive'], 'A', '“Ambivalent” = mâu thuẫn cảm xúc = conflicted.'),
          Q(44, 'The author indicates that people value gift-giving because they feel it _____.', ['functions as a form of self-expression', 'can serve to strengthen a relationship', 'requires the gift-recipients to share the same opinion', 'is an inexpensive way to show appreciation'], 'B', 'Đoạn 1: “build stronger bonds” = củng cố mối quan hệ.'),
          Q(45, 'The author most likely uses the examples of gift-giving occasions in paragraph 1 to highlight the _____.', ['recent increase in the amount of money spent on gifts', 'number of special occasions involving gift-giving', 'anxiety gift-shopping causes for consumers', 'regularity with which people shop for gifts'], 'D', 'Nhấn mạnh tần suất mua quà đều đặn quanh năm.'),
          Q(46, 'The word “many” in line 6 paragraph 1 refers to _____.', ['presents', 'peers', 'gift-givers', 'gift-recipients'], 'C', '“Many” chỉ “gift-givers”.'),
          Q(47, 'In paragraph 3, the author indicates that the assumption made by gift-givers may be _____.', ['incorrect', 'insincere', 'fundamental', 'justified'], 'A', '“Unfounded” = không có cơ sở, không chính xác (incorrect).'),
          Q(48, 'In paragraph 4, the word “construe” most probably means _____.', ['take', 'state', 'respond', 'understand'], 'D', '“Construe” = hiểu, diễn giải = understand.'),
          Q(49, 'In paragraph 4, the word “ritual” cannot be replaced with_____.', ['tradition', 'trend', 'ceremony', 'etiquette'], 'B', '“Ritual” (nghi thức, thông lệ) không thể thay bằng “trend” (xu hướng).'),
          Q(50, 'The social psychologists mentioned in paragraph 2 would likely describe the “deadweight loss” phenomenon as ___.', ['disturbing', 'predictable', 'unprecedented', 'questionable'], 'B', '“Not surprising to social psychologists” = dễ đoán (predictable).')
        ]
      }
    ]
  },

  /* =====================================================================
     TEST 02 (50 CÂU)
     ===================================================================== */
  {
    id: 'anh-test-02',
    subject: 'anh',
    title: 'Test 02',
    blocks: [
      {
        id: 't2-b1', short: 'Lexico-Grammar (1–20)', part: 'Part 1 · Lexico-Grammar',
        title: 'Từ vựng và ngữ pháp (Câu 1–20)',
        instruction: 'Mark the letter A, B, C, or D to indicate the option that best completes each of the following questions.',
        questions: [
          Q(1, 'Some international students experience culture ______ when they first move to a country with unfamiliar customs.', ['barrier', 'value', 'surprise', 'shock'], 'D', 'Cụm danh từ “culture shock” = cú sốc văn hóa.'),
          Q(2, 'Even though James performed very well as a college undergraduate, he was unable to meet the ______ admission requirements of the medical school.', ['scrupulous', 'righteous', 'stringent', 'upstanding'], 'C', '“Stringent requirements” = những yêu cầu tuyển sinh khắt khe, nghiêm ngặt.'),
          Q(3, 'Martha Stewart’s career ______ after she was found guilty of obstruction and conspiracy charges related to a stock sale and sent to prison.', ['fallen down', 'paid dirt', 'come off', 'hit bottom'], 'D', '“Hit bottom” = chạm đáy (sự nghiệp tụt dốc thảm hại).'),
          Q(4, 'She couldn’t turn down the position at the prestigious research institute, as it was ______ that would not only grant her full funding for her environmental projects but also connect her with top-tier scientists from around the globe.', ['a peach of an opportunity', 'a bowl of cherries', 'a surge of excitement', 'a battery of effects'], 'A', '“A peach of an opportunity” = một cơ hội tuyệt vời hiếm có.'),
          Q(5, 'And fundamentally it is the government telling you how to behave and if you behave in a certain way, then the government will be ______ enough to hand you back some money.', ['beneficial', 'benefit', 'beneficent', 'beneficently'], 'C', 'Sau “be” + adj + “enough”: “beneficent” = hào phóng, rộng lượng (ban phát tiền hỗ trợ).'),
          Q(6, 'Up to now ______ space exploring still remains ______ very risky, complex and expensive endeavor.', ['a / Ø', 'a / the', 'Ø / the', 'Ø / a'], 'D', '“Space exploring” không dùng mạo từ (Ø); “a very risky... endeavor” (một nỗ lực đầy rủi ro).'),
          Q(7, '______ circling the globe faster than Jules Verne’s fictional Phileas Fogg.', ['A pioneer journalist, Nellie Bly’s exploits included', 'Also included in the exploits of Nellie Bly, a pioneer journalist, was', 'The exploits of Nellie Bly, a pioneer journalist, included', 'The pioneer journalist’s exploits of the Nellie Bly included'], 'C', 'Chủ ngữ chuẩn ngữ pháp là “The exploits of Nellie Bly, a pioneer journalist, included…”. Câu A bị lỗi bổ ngữ lơ lửng (Nellie Bly’s exploits không phải là journalist).'),
          Q(8, 'Although he only just managed to get his degree, when he left university, he ______ straight into a job in an excellent company.', ['walked', 'run', 'went', 'jumped'], 'A', 'Thành ngữ “walk straight into a job” = dễ dàng có ngay một công việc tốt.'),
          Q(9, 'Jeremy’s friends were fond of him, ______ because of his generosity.', ['at least', 'still less', 'even less', 'not least'], 'D', '“Not least” = đặc biệt là, nhất là (nhấn mạnh lý do quan trọng).'),
          Q(10, 'Studying consistently every day is tiring, but ______ the long run it leads to success.', ['on', 'for', 'from', 'in'], 'D', 'Cụm cố định “in the long run” = về lâu dài.'),
          Q(11, 'I haven’t got the ______ idea of what you’re talking about.', ['least', 'slightest', 'biggest', 'smallest'], 'B', 'Cụm “not have the slightest idea” = hoàn toàn không biết chút gì.'),
          Q(12, 'Traditional dishes often ______ the history and lifestyle of the communities that created them.', ['identify', 'appreciate', 'exchange', 'reflect'], 'D', '“Reflect” = phản ánh lịch sử và lối sống.'),
          Q(13, 'They appeared ______ pessimistic about their chances of winning.', ['surprisingly', 'advisedly', 'firmly', 'repeatedly'], 'A', '“Surprisingly pessimistic” = bi quan một cách đáng ngạc nhiên.'),
          Q(14, 'It is moved that the campaign ______ funds ______ at once.', ['to raise - be launched', 'raise - to be launched', 'raise - launched', 'to raise - is launched'], 'A', '“The campaign to raise funds” (chiến dịch gây quỹ); cấu trúc giả định “It is moved that + S + (should) be V3/ed” -> “be launched”.'),
          Q(15, 'I would rather ______ my holiday in Egypt than in Turkey. I really couldn’t stand the food.', ['take', 'had taken', 'to have taken', 'have taken'], 'D', '“Would rather + have V3/ed” diễn tả sự tiếc nuối về một việc trong quá khứ (vì vế sau “couldn’t stand” ở quá khứ).'),
          Q(16, '65-year-old women with fewer than eight years of schooling are expected, ______, to live to 82. Those who continued their education live an extra seven years.', ['on average', 'in general', 'on the whole', 'on the one hand'], 'A', '“On average” = trung bình (dùng với số liệu tuổi thọ thống kê 82 tuổi).'),
          Q(17, 'With its special shock absorbers to ______ the effect of sudden sideways movements from an earthquake, the thirty-six-storey Kasumigaseki building in central Tokyo was considered a masterpiece of modern engineering.', ['increase', 'dry out', 'dampen', 'augment'], 'C', '“Dampen the effect” = làm giảm nhẹ, triệt tiêu tác động rung lắc của động đất.'),
          Q(18, 'With all ______ respect, I think your comments are very short-sighted.', ['anticipated', 'due', 'limited', 'firm'], 'B', 'Cụm “With all due respect” = Với tất cả sự tôn trọng (dùng trước khi bày tỏ ý kiến bất đồng).'),
          Q(19, 'Losing my job was ______. I never would have found this one if it hadn’t happened.', ['a bone to pick with', 'a breath of fresh air', 'a bleeding heart', 'a blessing in disguise'], 'D', '“A blessing in disguise” = trong cái rủi có cái may.'),
          Q(20, 'I utterly ______ your argument. In my opinion, you have distorted the facts.', ['confound', 'refute', 'dispute', 'declined'], 'B', '“Utterly refute” = bác bỏ hoàn toàn lập luận.')
        ]
      },
      {
        id: 't2-b2', short: 'Sắp xếp đoạn văn (21–24)', part: 'Part 2 · Arrangement',
        title: 'Sắp xếp câu tạo đoạn văn / thư / hội thoại (Câu 21–24)',
        instruction: 'Mark the letter A, B, C or D to indicate the correct arrangement of the sentences to make a meaningful paragraph/letter/dialogue.',
        questions: [
          Q(21, 'a. However, in Asian American families, the adaptation to American culture widens the generation gap.\nb. This often leads to a clash in cultural values, as parents uphold their native country’s ideals while their Americanized children may diverge in preferences and behaviors.\nc. In many cultures, generational differences often revolve around variations in musical preferences, career paths, and lifestyles.\nd. Conversely, many first-generation Asian American parents struggle to adapt, maintaining their native language and adhering to traditional lifestyles.\ne. Consequently, Asian American parents may face challenges in passing on their family’s traditional values to their children.\nf. The children of Asian American immigrants naturally embrace American culture at a faster pace, with English becoming their primary language and a quick adoption of American values and traditions.', ['c, f, d, a, b, e', 'c, b, f, d, a, e', 'c, d, b, a, f, e', 'c, a, f, d, b, e'], 'D', 'Mở đầu bằng câu chủ đề chung (c) -> chuyển sang gia đình gốc Á (a) -> con cái hòa nhập nhanh (f) -> ngược lại cha mẹ giữ truyền thống (d) -> dẫn đến xung đột (b) -> hệ quả (e).'),
          Q(22, 'a. Having eagerly awaited your return, I’m keen to hear all the details about your first venture into a foreign land.\nb. Eagerly awaiting your reply. Your loving cousin, Sarah\nc. Dearest Maria, I was thrilled to learn from my mother that you’ve returned home safely after your trip. I hope it was an enjoyable and secure experience.\nd. I was concerned about the reported bomb blasts during your stay and sincerely hope that you and everyone there remained safe.\ne. Apart from this, I trust everything else went well. Your mother mentioned you’ll be home in two weeks, and I’ve seen your Instagram pictures; I can’t wait to meet you and hear your stories.\nf. From what my friends have shared, the place is incredibly beautiful, and the people are charming.', ['c, e, f, d, a, b', 'c, d, f, a, e, b', 'c, f, d, e, a, b', 'c, a, f, d, e, b'], 'D', 'Lời chào mở đầu thư (c) -> mong nghe chi tiết chuyến đi (a) -> khen vẻ đẹp nơi đến (f) -> hỏi thăm vụ nổ bom (d) -> Apart from this (ngoài chuyện đó ra...) (e) -> kết thư (b).'),
          Q(23, 'b. “Good morning!” she said. To her surprise, she suddenly wanted to kiss him on the cheek. So she did, and sat down next to him at the table. He was eating in front of a big pile of books, looking cute with a pen behind his ear. “What are you doing?”\na. “I’m applying for money for my next research project,” he said.\ne. “Oh, good luck! What’s the project about?”\nc. When she got home, Michael was already in bed so she ate dinner alone, taking her Limeren with a big glass of water. The next morning, she woke up early as usual, but instead of jumping straight in the shower, she joined Michael downstairs for breakfast.\nd. After breakfast, she thought how nice it had been to see him talking about something he cared about. She’d forgotten how cute his dimples were when he smiled, she thought. Or maybe she hadn’t seen him smile much recently. Anyway, she decided to have breakfast with him every day, since it had been such a lovely start to the day. It couldn’t hurt to make a bit more effort, could it?', ['b-d-e-a-c', 'c-b-a-e-d', 'd-a-c-b-e', 'b-a-e-d-c'], 'B', 'Trình tự thời gian: tối hôm trước về nhà và sáng hôm sau xuống ăn sáng (c) -> chào buổi sáng và hỏi đang làm gì (b) -> trả lời (a) -> hỏi tiếp về dự án (e) -> suy nghĩ sau bữa sáng (d).'),
          Q(24, 'a. Overall, a trip to Trang An offers a unique experience for nature lovers and history buffs alike.\nb. It is a scenic landscape complex that includes limestone karst mountains, caves, rivers, and rice paddies. The area is famous for its natural beauty and cultural significance, as it was once the capital of Vietnam during the Dinh and Le dynasties.\nc. Visitors can take a boat tour through the complex, which typically lasts around two to three hours. During the tour, you can see the breathtaking views of limestone cliffs, explore the caves, and visit the temples and pagodas located throughout the complex.\nd. Trang An is a UNESCO World Heritage Site located in Ninh Binh Province, Vietnam.\ne. Trang An is also home to several endangered species, including the Delacour’s langur, a species of leaf monkey. The complex has been recognized as an important site for biodiversity conservation and ecotourism.', ['d-b-c-e-a', 'c-d-a-e-b', 'a-e-d-c-b', 'd-a-b-e-c'], 'A', 'Giới thiệu Tràng An (d) -> mô tả cảnh quan & lịch sử (b) -> hoạt động đi thuyền tham quan (c) -> đa dạng sinh học “Trang An is also home to…” (e) -> tóm kết “Overall…” (a).')
        ]
      },
      {
        id: 't2-b3', short: 'Đọc điền từ: Radio (25–29)', part: 'Part 3 · Reading Cloze',
        title: 'Điền từ vào thông báo chương trình Radio (Câu 25–29)',
        instruction: 'Read the following advertisement/announcement and mark the letter A, B, C, or D to indicate the correct option that best fits each of the numbered blanks.',
        passageTitle: 'RADIO PROGRAMMES WE RECOMMEND THIS WEEK',
        paras: [
          '## BEFORE OUR TIME',
          'This Saturday’s programme (25) ______ the very latest CD releases, so there will be a great mix of music from all over the world. This week’s special report comes from Senegal. On Saturday, this weekly programme includes the first part of a documentary series (26) ______ the discovery of the site of a 15th-century village. Professor John Frost and his team will talk about what life was like for the villagers. This Wednesday, a local team tries to prove that people lived in the (27) ______ of their area thousands of years ago. Specialist presenter Dr Clive Sparky describes what they find. Listeners can ring in and ask him questions, and discuss their own (28) ______ and local discoveries.',
          '## SHOWTIME',
          'This is a perfect programme for lovers of new plays, music and poetry. On Saturday, listeners have the chance (29) ______ the prize-winning play “Machines”. Poet Roger Brookes will also read from his new collection “Rainbow” and composer Jack Williams will play his latest piece for classical guitar.'
        ],
        questions: [
          Q(25, GAPQ, ['discusses', 'talks', 'focuses', 'analyses'], 'A', 'Ngoại động từ đi trực tiếp với tân ngữ (không cần giới từ “on/about”): “discusses the very latest CD releases”.'),
          Q(26, GAPQ, ['at', 'on', 'in', 'about'], 'D', '“A documentary series about…” = loạt phim tài liệu về…'),
          Q(27, GAPQ, ['rocky hills', 'remote areas', 'mountainous areas', 'rocks'], 'A', '“Lived in the rocky hills of their area” (sống ở những ngọn đồi đá trong khu vực của họ).'),
          Q(28, GAPQ, ['interest', 'interests', 'interesting', 'interested'], 'B', 'Danh từ số nhiều song song với “local discoveries”: “their own interests and local discoveries”.'),
          Q(29, GAPQ, ['hearing', 'hear', 'to hear', 'heard'], 'C', 'Cấu trúc “have the chance to do sth” = có cơ hội làm gì.')
        ]
      },
      {
        id: 't2-b4', short: 'Đọc hiểu: Paul Bunyan (30–37)', part: 'Part 4 · Reading Comprehension',
        title: 'Đọc hiểu: Nhân vật dân gian Paul Bunyan (Câu 30–37)',
        instruction: 'Read the following passage and mark the letter A, B, C or D to indicate the correct answer to each of the questions.',
        passageTitle: 'Paul Bunyan',
        numbered: true,
        paras: [
          'Paul Bunyan is perhaps America’s best-known folk hero. A fictional logger of incredible strength, he was most likely based on an actual nineteenth-century logger from the northern United States or Canada. As a folk hero, he struck a chord with Americans on some level, perhaps because he was incredibly strong but also because he was hard-working and capable, ingenious in solving problems, and fun-loving.',
          'Though there is evidence that Paul Bunyan tales were part of oral tradition in the nineteenth century, Paul Bunyan stories did not appear in written form until the early twentieth century. Journalist James McGillivray included descriptions of Bunyan in a series of essays entitled “The Round River Drive” which appeared in a number of Midwestern newspapers between 1906 and 1910. However, it was through an extensive advertising campaign that Paul Bunyan moved solidly into print.',
          'Recognizing the appeal of Paul Bunyan as a figure for his company’s advertising, William Laughead, an advertising executive for the Red River Lumber Company, initiated a campaign that consisted of a series of publications featuring Paul Bunyan. For several decades, the company distributed these publications free of charge and made no attempt to obtain a copyright on them. In fact, the company vigorously encouraged other writers to make use of Paul Bunyan because it felt that the use of this character enhanced the name recognition of the Red River Lumber Company inasmuch as the name of the folk hero and the name of the company had become interwoven.',
          'The Bunyan stories published by Red River and further circulated by others were tall tales of gigantic proportions. In these tales, Bunyan is depicted as a man of superhuman proportions, who is strong, hard-working, entrepreneurial, and innovative. In one story, for example, Paul is credited with digging the Great Lakes in order to create a watering hole for his giant ox, Babe. In another of these tales, Paul caused an entire winter of blue snow to fall by swearing a blue streak after he injured himself by smashing his thumb with a large hammer. A third story in the series describes Paul’s role in establishing the Mississippi River.',
          'Fascination with Paul Bunyan has continued to grow, and today he is a standard of American folklores. The prevalence of Bunyan as a figure of folklore today is evidenced by references to him in countless stories, cartoons, poems, and songs as well as the numerous community festivals and logging competitions featuring Paul Bunyan that can be found throughout the sections of the country where logging has strong tradition.'
        ],
        questions: [
          Q(30, 'The purpose of this passage is to ______.', ['present the actual feats of a real-life logger', 'provide an overview of American folktales', 'describe logging in North America', 'discuss a “larger than life” folk hero'], 'D', 'Bài viết tập trung giới thiệu và bàn luận về người anh hùng dân gian có sức mạnh phi thường Paul Bunyan.'),
          Q(31, 'It is NOT stated in the passage that Paul Bunyan is known for his ______.', ['unusual strength', 'dedication to work', 'ingenuity in difficult situations', 'serious nature'], 'D', 'Đoạn 1 nêu ông “fun-loving” (vui tính), không phải có bản tính nghiêm nghị (serious nature).'),
          Q(32, 'The passage states that Paul Bunyan tales first appeared ______.', ['in oral stories', 'in advertising', 'in newspapers', 'in a series of essays'], 'A', 'Đoạn 2: “Paul Bunyan tales were part of oral tradition in the nineteenth century” (xuất hiện đầu tiên qua truyền miệng).'),
          Q(33, 'Which of the following CANNOT be inferred about the Red River Lumber Company’s advertising campaign featuring Paul Bunyan?', ['It endured for quite a time.', 'The company did not protect its ownership of the stories.', 'The campaign did little to enhance the company’s profitability.', 'The company wanted the name Paul Bunyan to be known as widely as possible.'], 'C', 'Không có thông tin nào nói chiến dịch ít mang lại lợi nhuận cho công ty.'),
          Q(34, 'The pronoun “them” in paragraph 3 refers to ______.', ['publications', 'series', 'decades', 'writers'], 'A', '“Distributed these publications free of charge and made no attempt to obtain a copyright on them” -> them = publications.'),
          Q(35, 'The word “interwoven” in paragraph 3 could be best replaced by ______.', ['unfashionable', 'mixed together', 'not compatible', 'too separate'], 'B', '“Interwoven” = đan xen, gắn kết chặt chẽ với nhau = mixed together.'),
          Q(36, 'Where in the passage does the author discuss a weather phenomenon that Paul Bunyan supposedly caused?', ['Paragraph 1', 'Paragraph 3', 'Paragraph 4', 'Paragraph 5'], 'C', 'Ở đoạn 4: “Paul caused an entire winter of blue snow to fall…”.'),
          Q(37, 'The word “countless” in paragraph 5 could be best replaced by the expression ______.', ['an overestimated number of', 'an insubstantial number of', 'a large number of', 'a specified number of'], 'C', '“Countless” = vô số = a large number of.')
        ]
      },
      {
        id: 't2-b5', short: 'Điền từ: Wind (38–42)', part: 'Part 5 · Reading Cloze',
        title: 'Điền từ vào bài “WIND - The untamable weather machine” (Câu 38–42)',
        instruction: 'Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct word(s) for each of the blanks.',
        passageTitle: 'WIND - The untamable weather machine',
        paras: [
          'On 15 October 1987, the southern counties of Britain were struck by the strongest winds they had experienced in 200 years. Gusts of over 130 kilometers per hour slammed across the region and £1.5-billion-worth of damage was (38) ______ in just a few hours.',
          'Extreme weather events like this are dramatic (39) ______ of the power of the wind. It’s one part of the weather we generally don’t give a second thought to in Britain but it plays a vital role in people’s lives across the world. Without the formation and circulation of winds there would quite simply be no climate.',
          'Some parts of the world seem to suffer more than others from the effects of “ill winds”, and links between particular winds and psychological problems date back centuries. The Föhn, the hot dry wind that slides off the slopes of the Alps, is capable of boosting temperatures quite suddenly by 10°C or more. It affects as many as one in three people in its (40) ______, making them feel anxious, irritable and generally ill. In California, many people dread the arrival of the Santa Ana, which rushes down from the high Mojave desert. Lyall Watson, in his book Heaven’s Breath, claims that when the Santa Ana blows, murder rates soar.',
          'The wind may get into the headlines when it comes in the form of tornadoes and hurricanes, but for the (41) ______ part it goes about its job of shifting huge masses of air around the planet. Plants take (42) ______ of this free ride to send their pollen grains far and wide. Trees rely on it to remove old leaves and make way for new growth. Spiders have been caught hitching a lift at altitudes of almost 4.5 kilometers.'
        ],
        questions: [
          Q(38, GAPQ, ['made', 'caused', 'destroyed', 'completed'], 'B', '“Damage was caused” = thiệt hại bị gây ra.'),
          Q(39, GAPQ, ['reminders', 'recollections', 'mementos', 'memorial'], 'A', '“Dramatic reminders of…” = những lời nhắc nhở đầy ấn tượng về sức mạnh của gió.'),
          Q(40, GAPQ, ['line', 'road', 'path', 'bypass'], 'C', '“In its path” = trên đường đi / hướng quét qua của gió.'),
          Q(41, GAPQ, ['most', 'maximum', 'majority', 'general'], 'A', 'Cụm cố định “for the most part” = phần lớn, nhìn chung.'),
          Q(42, GAPQ, ['benefit', 'chance', 'occasion', 'advantage'], 'D', 'Cụm “take advantage of” = tận dụng.')
        ]
      },
      {
        id: 't2-b6', short: 'Đọc hiểu: Kinh tế Mỹ (43–50)', part: 'Part 6 · Reading Comprehension',
        title: 'Đọc hiểu: Vai trò kinh tế của chính quyền bang ở Mỹ thế kỷ 19 (Câu 43–50)',
        instruction: 'Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer to each of the questions.',
        passageTitle: 'State and Federal Governments in the 19th-Century Economy',
        numbered: true,
        paras: [
          'In the United States in the early 1800’s, individual state governments had more effect on the economy than did the federal government. States chartered manufacturing, banking, mining, and transportation firms and participated in the construction of various internal improvements such as canals, turnpikes, and railroads. The states encouraged internal improvements in two distinct ways; first, by actually establishing state companies to build such improvements; second, by providing part of the capital for mixed public-private companies setting out to make a profit.',
          'In the early nineteenth century, state governments also engaged in a surprisingly large amount of direct regulatory activity, including extensive licensing and inspection programs. Licensing targets reflected both similarities and differences between the economy of the nineteenth century and that of today: in the nineteenth century, state regulation through licensing fell especially on peddlers, innkeepers, and retail merchants of various kinds. The perishable commodities of trade generally came under state inspection, and such important frontier staples as lumber and gunpowder were also subject to state control. Finally, state governments experimented with direct labor and business regulation designed to help the individual laborer or consumer, including setting maximum limits on hours of work and restrictions on price-fixing by businesses.',
          'Although the states dominated economic activity during this period, the federal government was not inactive. Its goals were the facilitation of western settlement and the development of native industries. Toward these ends, the federal government pursued several courses of action. It established a national bank to stabilize banking activities in the country and, in part, to provide a supply of relatively easy money to the frontier, where it was greatly needed for settlement. It permitted access to public western lands on increasingly easy terms, culminating in the Homestead Act of 1862, by which title to land could be claimed on the basis of residence alone. Finally, it set up a system of tariffs that was basically protectionist in effect, although maneuvering for position by various regional interests produced frequent changes in tariff rates throughout the nineteenth century.'
        ],
        questions: [
          Q(43, 'What does the passage mainly discuss?', ['States’ rights versus federal rights.', 'The participation of state governments in railroad, canal, and turnpike construction.', 'The roles of state and federal governments in the economy of the nineteenth century.', 'Regulatory activity by state governments.'], 'C', 'Bài đọc thảo luận vai trò của cả chính quyền tiểu bang (đoạn 1–2) và chính phủ liên bang (đoạn 3) trong nền kinh tế thế kỷ 19.'),
          Q(44, 'All of the following are mentioned in the passage as areas that involved state governments in the nineteenth century EXCEPT ______.', ['mining', 'banking', 'manufacturing', 'higher education'], 'D', 'Đoạn 1 nêu “manufacturing, banking, mining, and transportation firms”, không có “higher education”.'),
          Q(45, 'The word “distinct” in paragraph 1 is closest in meaning to ______.', ['separate', 'innovative', 'alarming', 'provocative'], 'A', '“Distinct” = riêng biệt, khác nhau = separate.'),
          Q(46, 'It can be inferred from the first paragraph that in the nineteenth century canals and railroads were ______.', ['built with money that came from the federal government', 'much more expensive to build than they had been previously', 'built predominantly in the western part of the country', 'sometimes built in part by state companies'], 'D', 'Đoạn 1: các bang lập công ty nhà nước để xây dựng hoặc góp một phần vốn.'),
          Q(47, 'The regulatory activities of state governments included all of the following EXCEPT ______.', ['licensing of retail merchants', 'inspecting materials used in turnpike maintenance', 'imposing limits on price-fixing', 'control of lumber'], 'B', 'Đoạn 2 không hề nói đến việc thanh tra vật liệu bảo trì đường thu phí (turnpike maintenance).'),
          Q(48, 'The word “ends” in paragraph 3 is closest in meaning to ______.', ['benefits', 'decisions', 'services', 'goals'], 'D', '“Toward these ends” = để đạt được những mục tiêu này (quy chiếu câu trước “Its goals were…”).'),
          Q(49, 'According to the passage, which of the following is true of the Homestead Act of 1862?', ['It made it increasingly possible for settlers to obtain land in the West.', 'It was a law first passed by state governments in the West.', 'It increased the money supply in the West.', 'It established tariffs in a number of regions.'], 'A', 'Đạo luật Homestead 1862 cho phép người định cư nhận quyền sở hữu đất miền Tây dễ dàng hơn chỉ dựa trên việc cư trú.'),
          Q(50, 'Which of the following activities was the responsibility of the federal government in the nineteenth century?', ['Control of the manufacture of gunpowder.', 'Determining the conditions under which individuals worked.', 'Regulation of the supply of money.', 'Inspection of new homes built on western lands.'], 'C', 'Đoạn 3: Chính phủ liên bang lập ngân hàng quốc gia để ổn định hoạt động ngân hàng và cung cấp tiền tệ (supply of money).')
        ]
      }
    ]
  },

  /* =====================================================================
     TEST 03 (50 CÂU)
     ===================================================================== */
  {
    id: 'anh-test-03',
    subject: 'anh',
    title: 'Test 03',
    blocks: [
      {
        id: 't3-b1', short: 'Lexico-Grammar (1–20)', part: 'Part 1 · Lexico-Grammar',
        title: 'Từ vựng và ngữ pháp (Câu 1–20)',
        instruction: 'Mark the letter A, B, C, or D to indicate the correct answer to each of the following questions.',
        questions: [
          Q(1, 'Garbage ______, the town looked much cleaner and more inviting.', ['collected', 'collecting', 'had been collecting', 'was collected'], 'A', 'Cấu trúc tuyệt đối (Absolute phrase) rút gọn bị động: “Garbage (having been) collected, the town looked…”.'),
          Q(2, '______, things are going well.', ['Worries aside', 'Much to worries', 'Worries as well', 'Except from worries'], 'A', '“Worries aside” = Gác những nỗi lo sang một bên.'),
          Q(3, 'The cashier can’t have given us the change, ______?', ['hasn’t she', 'can she', 'must she', 'did she'], 'D', 'Câu hỏi đuôi cho “can’t have + V3/ed” chỉ hành động trong quá khứ: dùng trợ động từ “did she”.'),
          Q(4, 'Had it not been for the last-minute donation, the animal shelter ______ down.', ['would close', 'had closed', 'would have closed', 'closed'], 'C', 'Đảo ngữ câu điều kiện loại 3: “Had it not been for…, S + would have V3/ed”.'),
          Q(5, 'The new policy is intended to ______ a balance between national security and individual privacy.', ['strike', 'beat', 'hit', 'press'], 'A', 'Cụm cố định “strike a balance” = đạt được sự cân bằng.'),
          Q(6, 'Progress made today will shape our world for years ______.', ['to come', 'coming', 'in coming', 'that will come'], 'A', 'Cụm cố định “for years to come” = trong nhiều năm tới.'),
          Q(7, 'She was so absorbed in the novel that she was completely ______ to the noise around her.', ['attentive', 'acquainted', 'oblivious', 'conscious'], 'C', '“Oblivious to sth” = không để ý, quên lãng mọi thứ xung quanh.'),
          Q(8, 'Scarcely ______ the presentation when the fire alarm went off.', ['had the lecturer begun', 'the lecturer had begun', 'did the lecturer begin', 'the lecturer began'], 'A', 'Đảo ngữ “Scarcely + had + S + V3/ed + when + S + V2/ed”.'),
          Q(9, 'The company survived the recession only by cutting its assets to the ______.', ['bat', 'prong', 'tree', 'bone'], 'D', 'Thành ngữ “cut sth to the bone” = cắt giảm tới mức tối đa.'),
          Q(10, 'The witness’s account was completely at ______ with the evidence collected at the scene.', ['comparison', 'agreement', 'harmony', 'odds'], 'D', 'Thành ngữ “at odds with” = mâu thuẫn, trái ngược với.'),
          Q(11, 'I need to ______ up on the latest regulations before attending tomorrow’s meeting.', ['brush', 'sweep', 'polish', 'clean'], 'A', 'Cụm động từ “brush up on sth” = ôn lại, cập nhật nhanh kiến thức.'),
          Q(12, 'Long before the votes were counted, his victory was regarded as a ______ conclusion.', ['foremost', 'foregone', 'forthcoming', 'foreseen'], 'B', 'Cụm “a foregone conclusion” = kết quả đã biết trước, tất yếu.'),
          Q(13, 'Although the defendant was acquitted for lack of evidence, public opinion remained firmly ______ him.', ['beside', 'against', 'opposite', 'contrary'], 'B', '“Remain firmly against sb” = vẫn kiên quyết chống lại / bất lợi cho ai.'),
          Q(14, 'Through trial and ______, the researchers eventually developed a reliable method of conducting the experiment.', ['fault', 'flaw', 'blunder', 'error'], 'D', 'Cụm cố định “trial and error” = thử và sai.'),
          Q(15, 'During their first few months abroad, the students could afford only the ______ necessities.', ['mere', 'sheer', 'scant', 'bare'], 'D', 'Cụm “the bare necessities” = những nhu yếu phẩm tối thiểu nhất.'),
          Q(16, 'After keeping the problem to myself for weeks, I finally got it off my ______ by speaking to the school counsellor.', ['head', 'eye', 'chest', 'hand'], 'C', 'Thành ngữ “get it off one’s chest” = nói ra cho nhẹ lòng.'),
          Q(17, 'The school has introduced a new curriculum, but it ______ to be seen whether it will improve students’ results.', ['remains', 'stays', 'lasts', 'endures'], 'A', 'Cấu trúc “it remains to be seen whether…” = vẫn còn phải chờ xem liệu…'),
          Q(18, 'Mai: “I hear you’ve been awarded a full scholarship. Congratulations!” — Lan: “______”', ['That’s beside the point.', 'You can say that again.', 'It’s out of the question.', 'Thanks. I’m over the moon.'], 'D', '“Thanks. I’m over the moon.” = Cảm ơn bạn, mình đang vui sướng tột cùng.'),
          Q(19, 'CLOSEST in meaning: The spokesperson’s deliberately [ambiguous] statement failed to clarify the government’s position.', ['transparent', 'irrelevant', 'emphatic', 'equivocal'], 'D', '“Ambiguous” (mơ hồ, nước đôi) đồng nghĩa với “equivocal”.'),
          Q(20, 'OPPOSITE in meaning: The emergency programme was suspended after its financial resources had been [depleted].', ['squandered', 'replenished', 'reduced', 'exhausted'], 'B', '“Depleted” (cạn kiệt) trái nghĩa với “replenished” (được làm đầy, bổ sung lại).')
        ]
      },
      {
        id: 't3-b2', short: 'Điền từ: Urban Rewilding (21–27)', part: 'Part 2 · Reading Cloze',
        title: 'Điền từ vào đoạn văn “Urban Rewilding” (Câu 21–27)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D to indicate the word or phrase that best fits each numbered blank.',
        passageTitle: 'Urban Rewilding',
        paras: [
          'For much of the twentieth century, city planners treated nature as something that had to be controlled. Rivers were forced into concrete channels, fallen leaves were immediately removed, and grass was cut as short as possible. Recently, however, a growing number of cities have adopted a different approach known as urban rewilding.',
          'Rather than merely planting decorative flower beds, rewilding aims to restore natural ecological processes and allow native plants and animals to (21) ______. At first sight, leaving a patch of grass unmown may appear to be a sign of neglect. In reality, such areas can provide insects with food and shelter, (22) ______ supporting birds and bats that feed on them.',
          'Urban rewilding is not beyond controversy. Some residents object (23) ______ the apparently untidy appearance of wild areas, while others worry that ponds and dense vegetation may attract pests. (24) ______ these concerns are properly addressed, public support tends to grow once people understand the rationale behind the policy.',
          'The benefits can (25) ______ from lowering urban temperatures to reducing flood risk. Wild vegetation absorbs rainwater more effectively than concrete surfaces, while mature trees provide shade during increasingly frequent heatwaves. Unlike conventional parks, rewilded areas also require less intensive maintenance once they are (26) ______.',
          'Urban rewilding is therefore not a retreat from planning. It is a different kind of planning — one that works (27) ______ nature rather than constantly attempting to overcome it.'
        ],
        questions: [
          Q(21, GAPQ, ['accumulate', 'manufacture', 'negotiate', 'thrive'], 'D', '“Thrive” = sinh sôi, phát triển mạnh.'),
          Q(22, GAPQ, ['despite', 'thereby', 'whereas', 'otherwise'], 'B', '“Thereby + V-ing” = qua đó, nhờ đó hỗ trợ các loài chim và dơi.'),
          Q(23, GAPQ, ['for', 'with', 'to', 'against'], 'C', 'Cấu trúc “object to sth” = phản đối điều gì.'),
          Q(24, GAPQ, ['Provided that', 'Unless', 'Even though', 'As if'], 'A', '“Provided that” = miễn là, với điều kiện là những lo ngại này được giải quyết thỏa đáng.'),
          Q(25, GAPQ, ['account', 'derive', 'depend', 'range'], 'D', 'Cấu trúc “range from A to B” = trải rộng từ A đến B.'),
          Q(26, GAPQ, ['established', 'imposed', 'arranged', 'vanquished'], 'A', '“Once they are established” = một khi chúng đã được hình thành ổn định.'),
          Q(27, GAPQ, ['over', 'upon', 'beyond', 'with'], 'D', '“Works with nature” = vận hành hài hòa cùng với tự nhiên.')
        ]
      },
      {
        id: 't3-b3', short: 'Đọc hiểu: Productive Failure (28–34)', part: 'Part 3 · Reading Comprehension',
        title: 'Đọc hiểu: Giá trị của sự thất bại có ích (Câu 28–34)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D to indicate the correct answer to each question.',
        passageTitle: 'THE VALUE OF PRODUCTIVE FAILURE',
        numbered: true,
        paras: [
          'Students often assume that successful learning means finding the correct answer as quickly as possible. Teachers, too, may feel that they are doing their job well when they explain a procedure clearly enough for students to avoid making mistakes. However, an approach known as “productive failure” challenges this assumption. It suggests that, under certain conditions, attempting and failing to solve a problem before receiving formal instruction can result in deeper learning.',
          'In a productive-failure lesson, students are first given a complex problem for which they have not yet been taught the standard method. Working individually or in groups, they attempt to devise their own solutions. Most of these solutions are incomplete or incorrect. The teacher then presents the accepted method and helps the class compare it with the approaches the students have generated.',
          'At first, this sequence appears counterintuitive. Why ask students to struggle when the teacher could simply show them what to do? One explanation is that unsuccessful attempts activate relevant prior knowledge and make learners aware of gaps in their understanding. When learners compare their attempts with a formal method, they are more likely to notice why particular features of that method matter. By contrast, students who are shown a solution immediately may be able to imitate it without understanding the principles on which it depends.',
          'Studies have found that students taught through productive failure sometimes perform less well on immediate tests of routine procedures. However, they often outperform directly instructed students when asked to explain concepts or apply them to unfamiliar situations. In other words, the initial struggle may reduce short-term efficiency while improving the ability to transfer knowledge.',
          'Nevertheless, productive failure does not mean leaving learners to struggle indefinitely. The task must be challenging but accessible, and students must possess enough background knowledge to engage with it meaningfully. Timely explanation and guidance are essential after the initial problem-solving stage. A classroom environment in which mistakes are treated as useful information rather than evidence of low ability is equally important.',
          'Critics point out that direct instruction remains highly effective for teaching basic facts and procedures, particularly to complete beginners. Productive failure should therefore not be viewed as a replacement for teaching. Its value lies in changing the sequence of teaching: carefully designed exploration comes first, followed by explicit explanation.'
        ],
        questions: [
          Q(28, 'Which of the following best expresses the main idea of the passage?', ['Students learn best only when direct instruction is delayed indefinitely.', 'Productive failure can promote deeper learning when it is carefully structured.', 'Incorrect answers should receive the same marks as correct answers.', 'Complex problems are generally unsuitable for inexperienced learners.'], 'B', 'Ý chính toàn bài: “Productive failure” giúp học sâu hơn khi được thiết kế và hướng dẫn bài bản.'),
          Q(29, 'The word “counterintuitive” in paragraph 3 is CLOSEST in meaning to ______.', ['contrary to what one would normally expect', 'impossible to measure accurately', 'based entirely on personal experience', 'likely to produce immediate success'], 'A', '“Counterintuitive” = ngược với trực giác/suy nghĩ thông thường.'),
          Q(30, 'Which of the following is NOT true about productive failure?', ['Students attempt a problem before being shown the standard method.', 'The teacher later helps students compare different approaches.', 'Students are expected to struggle until they independently discover the correct method.', 'The approach may improve students’ ability to use knowledge in new situations.'], 'C', 'Đoạn 2 và 5 nêu rõ giáo viên sẽ trình bày phương pháp chuẩn và hướng dẫn kịp thời chứ không để học sinh tự xoay xở vô thời hạn.'),
          Q(31, 'According to paragraph 3, why can incorrect solutions be useful?', ['They reduce the amount of preparation required from teachers.', 'They make students’ work easier to assess.', 'They reveal gaps in understanding and prepare students to compare methods.', 'They eliminate the need for subsequent direct instruction.'], 'C', 'Đoạn 3: Các nỗ lực chưa thành công giúp kích hoạt kiến thức nền và nhận ra lỗ hổng hiểu biết để so sánh với phương pháp chuẩn.'),
          Q(32, 'What can be inferred about the successful use of productive failure?', ['It is equally effective regardless of students’ existing knowledge.', 'It always improves students’ scores on immediate procedural tests.', 'The greater the students’ frustration, the more effective the lesson becomes.', 'It depends on appropriate tasks, prior knowledge and follow-up guidance.'], 'D', 'Đoạn 5 khẳng định phương pháp này cần bài tập vừa sức, kiến thức nền đủ và sự hướng dẫn kịp thời sau đó.'),
          Q(33, 'The word “they” in paragraph 3 refers to ______.', ['teachers', 'problems', 'formal methods', 'learners'], 'D', '“When learners compare their attempts with a formal method, they are more likely…” -> they = learners.'),
          Q(34, 'What is the author’s main purpose in writing the passage?', ['To explain the benefits, limitations and conditions of an instructional approach', 'To argue that direct instruction has become completely obsolete', 'To describe the historical development of classroom examinations', 'To criticise teachers who correct their students’ mistakes'], 'A', 'Tác giả phân tích lợi ích, giới hạn và điều kiện áp dụng của phương pháp “productive failure”.')
        ]
      },
      {
        id: 't3-b4', short: 'Đọc hiểu: Beavers (35–42)', part: 'Part 4 · Reading Comprehension',
        title: 'Đọc hiểu: Hải ly — Kỹ sư hệ sinh thái (Câu 35–42)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D to indicate the correct answer to each question.',
        passageTitle: 'BEAVERS AS ECOSYSTEM ENGINEERS',
        numbered: true,
        paras: [
          'Beavers once inhabited rivers and streams across much of Europe and North America. For centuries, however, they were intensively hunted for their fur, meat and scent glands. By the beginning of the twentieth century, they had disappeared from many regions. Legal protection and reintroduction programmes have since enabled beaver populations to recover, leading scientists and land managers to reconsider the role these animals play in shaping landscapes.',
          'Beavers are commonly described as “ecosystem engineers” because they physically modify their surroundings. By cutting down trees and constructing dams, they impound water that would otherwise flow rapidly downstream. The resulting ponds cause water to spread across the surrounding floodplain. Sediment settles, groundwater levels rise and new wetland habitats develop.',
          'These changes can benefit numerous species. Aquatic insects, amphibians and water birds often become more abundant around beaver ponds. Wetlands created by dams can also retain water during dry periods and slow the movement of storm water, potentially reducing the severity of floods farther downstream. In areas vulnerable to wildfire, the damp vegetation around beaver wetlands may even act as a natural firebreak.',
          'Nevertheless, the effects of beavers are not universally positive. Their dams may flood agricultural fields, block drainage systems or damage valuable trees. The relationship between beaver dams and migratory fish such as salmon is particularly complicated. A dam may temporarily delay a fish’s journey, but the deeper pools and cooler water it creates can also provide valuable shelter and feeding grounds. The overall effect therefore varies from one river system to another.',
          'Various techniques have been developed to reduce conflicts. Trees can be protected with wire guards, while specially designed pipes known as flow devices can be inserted through dams. These devices allow water to pass through at a controlled level without requiring the entire dam to be destroyed. In some cases, beavers may be relocated, although this is costly and does not guarantee that other animals will not occupy the same area.',
          'Researchers warn against presenting beavers as a simple solution to every environmental problem. Their influence depends on valley shape, soil permeability, rainfall patterns and existing land use. A dam that creates a valuable wetland in one location may flood a road or a productive field in another. Successful reintroduction programmes therefore require careful site selection, long-term monitoring and communication with local communities.',
          'Beavers can make an important contribution to restoring damaged ecosystems, but their return involves trade-offs. Rather than asking whether beavers are entirely beneficial or harmful, land managers increasingly ask where their activities can be tolerated and how conflicts can be managed.'
        ],
        questions: [
          Q(35, 'The word “impound” in paragraph 2 is CLOSEST in meaning to ______.', ['hold back', 'warm up', 'divert permanently', 'pollute'], 'A', '“Impound water” = giữ nước lại, ngăn nước chảy tuột xuống hạ lưu = hold back.'),
          Q(36, 'What is one direct physical effect of a beaver dam?', ['It causes rain to fall more frequently.', 'It slows water and spreads it across the floodplain.', 'It removes sediment from riverbeds.', 'It lowers the level of groundwater.'], 'B', 'Đoạn 2: đập hải ly giữ nước và làm nước lan rộng ra vùng bãi bồi (floodplain).'),
          Q(37, 'Which sentence best expresses the essential information in “Their influence depends on valley shape, soil permeability, rainfall patterns and existing land use”?', ['Beaver dams have identical effects wherever they are constructed.', 'Rainfall is the only factor determining the effects of beaver activity.', 'Existing land use becomes unimportant when beavers enter an area.', 'The consequences of beaver activity vary according to several local conditions.'], 'D', 'Tác động của hải ly thay đổi tùy thuộc vào nhiều điều kiện địa phương khác nhau.'),
          Q(38, 'Why does the author discuss salmon in paragraph 4?', ['To prove that all beaver dams prevent fish from migrating', 'To illustrate that the ecological effects of dams can be complex', 'To explain why salmon are more valuable than other species', 'To show that beavers depend on salmon as their main food source'], 'B', 'Ví dụ về cá hồi minh họa rằng tác động sinh thái của đập hải ly rất phức tạp (vừa cản đường tạm thời nhưng lại tạo nơi trú ẩn và kiếm ăn).'),
          Q(39, 'All of the following are mentioned as possible effects of beaver activity EXCEPT ______.', ['the creation of wetland habitats', 'reduced downstream flood peaks', 'damage to trees and drainage systems', 'guaranteed improvements to agricultural land'], 'D', 'Đoạn 4 nói đập có thể làm ngập ruộng nông nghiệp (flood agricultural fields), không phải đảm bảo cải thiện đất nông nghiệp.'),
          Q(40, 'Why are flow devices placed through some beaver dams?', ['To frighten beavers away from the river', 'To allow fish to be caught more easily', 'To regulate the level of water without removing the whole dam', 'To prevent other animals from entering the wetland'], 'C', 'Đoạn 5: “allow water to pass through at a controlled level without requiring the entire dam to be destroyed”.'),
          Q(41, 'What can be inferred about successful beaver-reintroduction programmes?', ['They require both suitable environmental conditions and effective conflict management.', 'They are unlikely to require monitoring after the animals have been released.', 'They should be limited to places where no human activity occurs.', 'They are successful only when all existing dams are left untouched.'], 'A', 'Đoạn 6–7: cần chọn địa điểm phù hợp, giám sát lâu dài và quản lý xung đột với cộng đồng.'),
          Q(42, 'Which of the following best describes the author’s view of beavers?', ['They are dangerous animals whose reintroduction should be stopped.', 'They can provide environmental benefits, but their effects require careful management.', 'They offer a complete and inexpensive solution to climate change.', 'They should be allowed to modify every river system without human intervention.'], 'B', 'Đoạn kết khẳng định hải ly mang lại lợi ích sinh thái nhưng cần được quản lý hợp lý.')
        ]
      },
      {
        id: 't3-b5', short: 'Sắp xếp & Điền câu (43–50)', part: 'Part 5 · Arrangement & Cloze',
        title: 'Sắp xếp đoạn văn & Điền mệnh đề “Brownwashing” (Câu 43–50)',
        instruction: 'Mark the letter A, B, C, or D to indicate the best option for each of the following questions.',
        passageTitle: 'Brownwashing (Questions 46–50)',
        paras: [
          'While greenwashing has received significant public attention, brownwashing remains less widely recognised. It occurs when companies intentionally minimise or obscure their genuine environmental progress in public communication. (46) ______. As a result, firms may appear less environmentally responsible than they actually are.',
          'One reason for this behaviour is the increasing pressure placed on companies to meet ambitious sustainability targets. (47) ______. In such situations, organisations may prefer to avoid strong claims altogether rather than draw attention to commitments they may struggle to fulfil. This cautious approach can be particularly common in highly competitive industries.',
          'However, brownwashing can also create unintended consequences, (48) ______. When companies fail to communicate their achievements clearly, stakeholders may struggle to identify which firms are genuinely making progress.',
          'Another concern is that inconsistent communication practices make comparison difficult. (49) ______, those that communicate more clearly may gain an advantage, regardless of their actual environmental performance.',
          'To address these challenges, experts suggest that improving both transparency and consistency is essential. The key issue is (50) ______.'
        ],
        questions: [
          Q(43, 'Dear Parents,\na. Should you have any questions regarding the revised fee structure, please contact the school office for further clarification.\nb. The updated tuition rates will take effect from the beginning of the next academic term in January.\nc. We understand that this adjustment may require careful consideration, and we appreciate your continued support.\nd. Due to rising operational costs and improvements in educational facilities, the school will be implementing a revised tuition policy.\ne. We are writing to inform you of an important update concerning the school’s tuition fees.\nYours faithfully, Greenfield International School', ['d-b-e-a-c', 'e-d-b-a-c', 'd-e-b-c-a', 'e-b-a-d-c'], 'B', 'Mở đầu thư thông báo học phí (e) -> nêu lý do điều chỉnh (d) -> thời điểm áp dụng (b) -> liên hệ nếu có thắc mắc (a) -> lời cảm ơn kết thư (c).'),
          Q(44, 'a. In the end, I came to see that leaving my comfort zone had been the most valuable part of the experience.\nb. These challenges became clear when navigating unfamiliar streets, sampling local dishes and dealing with a different dialect proved more demanding than I had anticipated.\nc. Having to handle everything alone, without the support of friends or family, left me feeling slightly uneasy.\nd. In retrospect, the journey not only strengthened my independence but also made me more confident in unfamiliar situations.\ne. During the summer holiday, I chose to travel alone to a small coastal town, expecting nothing more than a peaceful break.', ['e-b-c-a-d', 'b-c-e-a-d', 'b-e-c-d-a', 'e-c-b-a-d'], 'D', 'Giới thiệu chuyến đi một mình (e) -> cảm giác lo lắng khi phải tự xoay xở (c) -> những thử thách cụ thể “These challenges…” (b) -> nhận ra giá trị “In the end…” (a) -> nhìn lại “In retrospect…” (d).'),
          Q(45, 'a. Over the past few years, the organisation has struggled with communication gaps and declining employee morale.\nb. To enhance collaboration, the company introduced regular team-building workshops and cross-departmental projects.\nc. As a result, overall productivity improved, and employees reported higher levels of job satisfaction.\nd. These initiatives encouraged staff members to share ideas more openly and develop stronger professional relationships.\ne. Recognising these challenges, senior managers decided to implement a comprehensive strategy to strengthen teamwork across the company.', ['e-b-a-c-d', 'a-b-e-d-c', 'e-a-b-c-d', 'a-e-b-d-c'], 'D', 'Nêu vấn đề của tổ chức (a) -> lãnh đạo nhận ra thử thách “Recognising these challenges…” (e) -> triển khai workshop & dự án (b) -> tác động của “These initiatives…” (d) -> kết quả cuối cùng “As a result…” (c).'),
          Q(46, GAPQ, ['This may seem counterintuitive, as businesses are generally expected to highlight their achievements', 'This is often driven by companies’ desire to improve their image through environmental communication', 'In addition, sustainability reporting has become an important tool for corporate communication', 'For this reason, many firms attempt to expand their environmental campaigns to reach wider audiences'], 'A', 'Việc che giấu thành tích môi trường nghe có vẻ ngược đời (counterintuitive) vì doanh nghiệp thường muốn khoe thành tựu.'),
          Q(47, GAPQ, ['In many cases, companies that fail to live up to these expectations may face criticism and reputational damage', 'As a result, companies invest more resources in promoting their environmental achievements to attract support', 'For example, some organisations prioritise internal improvements before sharing their results publicly', 'In addition, sustainability reporting helps firms communicate their long-term strategies more clearly to investors'], 'A', 'Nếu không đạt được kỳ vọng, công ty có thể bị chỉ trích và tổn hại danh tiếng, nên ở câu sau họ chọn né tránh tuyên bố mạnh mẽ.'),
          Q(48, GAPQ, ['leaving responsible firms less recognised for their real environmental efforts', 'reflecting differences in standards across sectors and reporting systems', 'reinforcing the role of sustainability reporting in corporate communication', 'making sustainability reporting less common in competitive industries'], 'A', 'Hệ quả ngoài ý muốn của brownwashing là khiến các công ty có trách nhiệm thực sự ít được ghi nhận hơn.'),
          Q(49, GAPQ, ['Since corporate communication strategies play an important role in shaping public perception', 'When companies adopt different ways of presenting their environmental results in reports', 'Because environmental reports are often used to support broader corporate messaging', 'Although many organisations aim to improve transparency in sustainability communication'], 'B', 'Khi các công ty trình bày kết quả theo những cách khác nhau (không nhất quán), bên nào truyền thông rõ hơn sẽ chiếm ưu thế.'),
          Q(50, GAPQ, ['whether companies are communicating accurately or creating misleading impressions selectively', 'the extent to which environmental policies influence business decisions in competitive markets', 'how companies can strengthen their reputation through clearer environmental communication', 'why sustainability reporting has become increasingly important in modern corporate practices'], 'A', 'Vấn đề cốt lõi của tính minh bạch và nhất quán là liệu doanh nghiệp có truyền thông chính xác hay đang tạo ấn tượng sai lệch có chọn lọc.')
        ]
      }
    ]
  },

  /* =====================================================================
     TEST 04 (50 CÂU)
     ===================================================================== */
  {
    id: 'anh-test-04',
    subject: 'anh',
    title: 'Test 04',
    blocks: [
      {
        id: 't4-b1', short: 'Sắp xếp & Điền câu (1–8)', part: 'Part 1 · Arrangement & Cloze',
        title: 'Sắp xếp đoạn văn & Điền câu bài “Protein Hunger” (Câu 1–8)',
        instruction: 'Mark the letter A, B, C, or D to indicate the best option for each of the following questions.',
        passageTitle: 'Protein Hunger (Questions 4–8)',
        paras: [
          'New research supports the idea that lack of protein leads to overeating. Researchers from the University of Sydney followed the dietary habits of almost 10,000 Australians for one year, (4) ______. They found that people eat to get enough protein, so when their food is low in protein, they must eat more. This is sometimes called “protein hunger.”',
          'Other participants in the study (5) ______ in order to compensate for insufficient protein intake, often without realizing it. Eating more of the food that is prevalent in modern supermarkets, i.e. processed food, also means eating more calorie-dense types of food.',
          'Many people who consumed less protein at breakfast tended to snack more and eat fewer healthy foods. (6) ______. In contrast, those who consumed sufficient protein in the morning generally reported reduced hunger later in the day. (7) ______. Protein performs many essential biological functions. It is vital for building muscle and repairing tissue damage, and it also contributes to hormone regulation and immune function.',
          'Finally, increasing protein intake can improve dietary balance and reduce overeating tendencies, (8) ______, particularly when individuals rely heavily on processed foods that are high in fat and sugar.'
        ],
        questions: [
          Q(1, 'a. Hence, community engagement in eco-friendly activities has surged, with a 40% increase in local participation.\nb. Still, in spite of this momentum, the city continues to struggle with air quality issues, highlighting the need for ongoing improvements in urban planning.\nc. The focus on sustainable practices has dramatically influenced urban life over the last decade.\nd. This dedication to the environment has inspired numerous community initiatives, from tree planting events to educational workshops on sustainability.\ne. Once overlooked, parks and natural habitats are now being restored and maintained, reflecting a commitment to preserving biodiversity.', ['c-d-a-e-b', 'a-d-e-b-c', 'c-e-b-d-a', 'b-e-a-c-d'], 'A', 'Câu chủ đề (c) -> sự tận tâm này truyền cảm hứng cho các sáng kiến (d) -> do đó sự tham gia tăng 40% (a) -> công viên được khôi phục (e) -> tuy nhiên vẫn còn vấn đề chất lượng không khí (b).'),
          Q(2, 'a. After about 90 minutes of cleaning, we gather with smiles, proud of our efforts, knowing that we’ve made a positive impact on the environment.\nb. First, we split into smaller groups and collect trash around Notre-Dame Cathedral and 30-4 Park, ensuring that every corner is clean.\nc. While working, we often talk, make friends, and practice Japanese together, which makes the experience more enjoyable and meaningful.\nd. Every Sunday morning, I join around 40 Vietnamese and Japanese volunteers in front of the Saigon Central Post Office to clean nearby parks.\ne. Finally, we sit down for coffee, share stories, and plan for the next weekend’s cleanup, looking forward to continuing our work.', ['d-b-c-a-e', 'd-b-a-e-c', 'b-c-d-a-e', 'b-a-c-d-e'], 'A', 'Giới thiệu hoạt động sáng Chủ nhật (d) -> First… (b) -> While working… (c) -> After about 90 minutes… (a) -> Finally… (e).'),
          Q(3, 'Dear Mike,\na. These activities not only make our school a better place but also help us become more responsible for protecting the environment.\nb. Hope you’re doing well! In your last letter, you asked me about what our school does to protect the environment.\nc. We also encourage everyone to save energy by turning off lights and fans when they’re not needed.\nd. Besides, we often organize environmental campaigns where students make posters and give presentations about eco-friendly habits.\ne. Well, we have a lot of activities to keep our school green and clean. For example, we plant trees and have a composting system to reduce waste.\nBest, Phillips', ['c-a-d-b-e', 'b-e-c-d-a', 'd-b-a-c-e', 'a-d-b-c-e'], 'B', 'Mở đầu thư (b) -> trả lời câu hỏi “Well, we have a lot of activities…” (e) -> bổ sung “We also…” (c) -> thêm nữa “Besides…” (d) -> kết luận “These activities…” (a).'),
          Q(4, GAPQ, ['which provided them with detailed data on eating patterns', 'result in the collection of detailed data on eating patterns', 'they provided them with detailed data on eating habits', 'a process that it provided with detailed information about their diets'], 'A', 'Mệnh đề quan hệ nối tiếp bổ nghĩa cho cả mệnh đề trước: “, which provided them with…”.'),
          Q(5, GAPQ, ['tend to consume more calories', 'showing a tendency to increase calorie intake', 'are associated with higher calorie consumption', 'likely to consume additional calories'], 'A', 'Chủ ngữ “Other participants in the study” cần động từ chính chia thì: “tend to consume more calories in order to compensate…”.'),
          Q(6, GAPQ, ['This pattern suggests inadequate protein raises calorie intake.', 'Such dietary behaviour causing to excessive calorie use.', 'Suggesting inadequate protein raises calorie consumption.', 'That insufficient protein intake lead to overeating.'], 'A', 'Cần một câu hoàn chỉnh đúng ngữ pháp; B, C, D đều thiếu động từ chính hoặc sai cấu trúc.'),
          Q(7, GAPQ, ['Our bodies need protein, it supports many vital processes.', 'While protein performs many essential biological functions, it is often underconsumed.', 'It makes sense that our bodies want protein because it does many things for us.', 'This biological role contributes to hormone regulation explains the importance of protein.'], 'C', 'Câu C dẫn nhập tự nhiên cho câu tiếp theo giải thích các chức năng sinh học của protein.'),
          Q(8, GAPQ, ['with differences observed across people', 'since individual responses are not identical', 'because reactions differ from person to person', 'although this effect may vary among individuals'], 'D', 'Mệnh đề nhượng bộ “although this effect may vary among individuals” phù hợp về ngữ nghĩa và ngữ pháp.')
        ]
      },
      {
        id: 't4-b2', short: 'Tờ rơi & Ngữ pháp (9–24)', part: 'Part 2 · Leaflet & Lexico-Grammar',
        title: 'Điền từ Tờ rơi Bảo tồn & Trắc nghiệm Ngữ pháp – Từ vựng (Câu 9–24)',
        instruction: 'Read the leaflet and choose the best option A, B, C or D for each question.',
        passageTitle: 'Conserving Our Planet: An Urgent Call (Questions 9–14)',
        paras: [
          '## The Growing Threat',
          'Every day, we hear about the decline of wildlife. Habitat loss and deforestation caused by forest clearance are pushing many species to the (9) ______ of extinction. Primate species like the gibbon or marine life on coral reefs are all under severe pressure. We cannot (10) ______ from taking action.',
          '## Immediate Action',
          'We need to take effective measures to protect the geographic range of animals. Poaching and illegal hunting mean that poachers must be strictly punished. Some countries are introducing stricter laws to address this issue. Several veterinarians and wildlife rescuers work hard (11) ______ release rehabilitated animals back into the wild.',
          '## Global Scope',
          'The natural world is home to a great deal of life. Many species, such as the sturgeon or the banana frog, are now listed as critically endangered. Even a small (12) ______ of marine debris can cause severe harm. Efforts to rescue injured creatures are vital, but (13) ______ major problem is preventing extinction.',
          '## Conservation Partnership',
          'The (14) ______ of biodiversity is a collective responsibility. We must raise funds for ecosystem restoration projects in areas that have been degraded. Successful conservation campaigns happen when many people participate. By contributing to these efforts, we ensure the survival of future generations.'
        ],
        questions: [
          Q(9, GAPQ, ['brink', 'edge', 'foot', 'range'], 'A', 'Cụm cố định “push… to the brink of extinction” = đẩy tới bờ vực tuyệt chủng.'),
          Q(10, GAPQ, ['hold up', 'hold back', 'hold out', 'hold on'], 'B', '“Hold back from doing sth” = chần chừ, ngần ngại làm gì.'),
          Q(11, GAPQ, ['consequent to', 'in order to', 'because of', 'on account of'], 'B', '“In order to + V” = để làm gì.'),
          Q(12, GAPQ, ['volume', 'load', 'number', 'amount'], 'D', '“A small amount of + danh từ không đếm được (marine debris)”.'),
          Q(13, GAPQ, ['another', 'the other', 'other', 'others'], 'A', '“Another + danh từ đếm được số ít (major problem)” = một vấn đề lớn khác.'),
          Q(14, GAPQ, ['preservation', 'exploitation', 'maintenance', 'recovery'], 'A', '“The preservation of biodiversity” = sự bảo tồn đa dạng sinh học.'),
          Q(15, 'Hyperinflation is not a rare event. Since Weimar Germany, there have been 29 additional hyperinflations around the world, including those in Austria, Argentina, Greece and Brazil, to name but ______.', ['too much', 'a little', 'too many', 'a few'], 'D', 'Cụm thành ngữ “to name but a few” = kể sơ qua một vài ví dụ.'),
          Q(16, 'After a month of apprenticeship, I hope to ______ the ropes and won’t keep bothering you for help.', ['study', 'learn', 'grasp', 'hold'], 'B', 'Thành ngữ “learn the ropes” = học cách nắm bắt công việc.'),
          Q(17, 'In some movies, a stepmother is often described as a completely hard and selfish person, not having the ______ of human kindness.', ['tear', 'flesh', 'milk', 'blood'], 'C', 'Thành ngữ “the milk of human kindness” = lòng trắc ẩn, tình người.'),
          Q(18, '______ kept beeping the car horn loudly and the other drivers got annoyed.', ['It is him that', 'He was the one', 'It was he who', 'The one who'], 'C', 'Câu chẻ ở thì quá khứ: “It was he who kept beeping…”.'),
          Q(19, 'The film, which was made ______, surprised everyone by winning three Oscars, including the one for Best Picture.', ['up to speed', 'all in good time', 'under the counter', 'on a shoestring'], 'D', 'Thành ngữ “on a shoestring” = với kinh phí cực kỳ ít ỏi.'),
          Q(20, 'He apologized for having accidentally hurt me, saying that it just ______ like that.', ['came out', 'went out', 'broke out', 'missed out'], 'A', '“It just came out like that” = lời nói vô tình buột miệng thốt ra như vậy.'),
          Q(21, 'When wood, natural gas, oil, or any other fuel burns, ______ with oxygen in the air to produce heat.', ['a combination of substances in the fuel', 'combining substances in the fuel', 'substances in the fuel that combine', 'substances in the fuel combine'], 'D', 'Mệnh đề chính cần chủ ngữ + động từ chia thì: “substances in the fuel combine”.'),
          Q(22, 'The first village ______ was not far from my city.', ['where I visited', 'that I visited to', 'to which I visited', 'I visited'], 'D', '“Visit” là ngoại động từ, đại từ quan hệ làm tân ngữ có thể lược bỏ: “The first village (that/which) I visited”.'),
          Q(23, 'Buying a first home is still a milestone for many young couples, ______ earlier generations.', ['as it was for', 'like that of', 'so have', 'as did'], 'A', 'Song song với “is still a milestone for…”: “as it was for earlier generations”.'),
          Q(24, 'When we got to the island, we realized that the water was not safe to drink and that we ______ have brought water purification tablets.', ['would', 'must', 'could', 'should'], 'D', '“Should have V3/ed” = lẽ ra đã nên mang theo (nhưng thực tế đã không mang).')
        ]
      },
      {
        id: 't4-b3', short: 'Đọc điền từ: Spain & 5G (25–30)', part: 'Part 3 · Announcements',
        title: 'Điền từ vào quảng cáo Du lịch Tây Ban Nha & Viettel 5G (Câu 25–30)',
        instruction: 'Read the following leaflet and announcement and choose the option A, B, C or D to fill in the blanks.',
        passageTitle: 'Southern Spain & Viettel 5G Launch Day',
        paras: [
          '## Discover the Timeless Beauty of Southern Spain!',
          '• Cultural Journey: Explore sunlit landscapes where (25) ______ whitewashed villages blend harmoniously with endless olive groves.',
          '• Authentic Encounters: Experience Andalusia’s essence through captivating flamenco, delicious local cuisine, and traditional markets (26) ______ with history.',
          '• Natural Wonders: (27) ______ the region’s breathtaking diversity, from sparkling coastlines to the Sierra Nevada mountains.',
          '## Embark on the Future: Viettel 5G Launch Day!',
          '• Lightning-Fast Speeds: Experience download speeds up to 100 times (28) ______ 4G, transforming how you access content.',
          '• Extensive Connectivity: Seamlessly connect a multitude of devices, (29) ______ the era of smart cities and the Internet of Things.',
          '• Seize the opportunity to witness how 5G will (30) ______ our digital landscape!'
        ],
        questions: [
          Q(25, GAPQ, ['rewinding', 'towering', 'soaring', 'ascending'], 'B', '“Towering whitewashed villages” = những ngôi làng quét vôi trắng nằm cao vút trên sườn đồi.'),
          Q(26, GAPQ, ['alive', 'cool', 'deep', 'acute'], 'A', '“Alive with history” = sống động những dấu ấn lịch sử.'),
          Q(27, GAPQ, ['Notice', 'Detect', 'Explore', 'Investigate'], 'C', '“Explore the region’s breathtaking diversity” = Khám phá sự đa dạng ngoạn mục của vùng đất.'),
          Q(28, GAPQ, ['faster than', 'faster and faster', 'the fastest', 'so fast as'], 'A', 'So sánh gấp bội: “100 times faster than 4G”.'),
          Q(29, GAPQ, ['catching up', 'clinging on', 'stemming from', 'ushering in'], 'D', '“Ushering in the era of…” = mở ra kỷ nguyên của…'),
          Q(30, GAPQ, ['retrieve', 'reproduce', 'redefine', 'refrain'], 'C', '“Redefine our digital landscape” = tái định nghĩa bức tranh kỹ thuật số.')
        ]
      },
      {
        id: 't4-b4', short: 'Đọc hiểu: Limestone Caves (31–40)', part: 'Part 4 · Reading Comprehension',
        title: 'Đọc hiểu: Hang động đá vôi (Câu 31–40)',
        instruction: 'Read the following passage and mark the letter A, B, C or D to indicate the best answer to each of the following questions.',
        passageTitle: 'Limestone Caves',
        numbered: true,
        paras: [
          'Caves are underground chambers formed in three main ways: by ocean waves eroding shorelines to create sea caves, by cooling lava that forms lava tube caves, and most commonly by the dissolution of limestone rock by rainwater and melting snow. Limestone caves occur worldwide and include some of the largest and deepest cave systems on Earth, such as the Mammoth-Flint Ridge system in Kentucky, which stretches more than 306 kilometers. The formation of these caves takes millions of years.',
          'Limestone originates in shallow seas from the accumulation of shells and skeletons of marine organisms such as coral. Over long periods, these deposits harden into solid rock and may eventually rise above sea level due to geological processes. Rainwater absorbs carbon dioxide from the soil, forming a weak carbonic acid solution. This slightly acidic water seeps into cracks and weaknesses in the limestone, gradually dissolving the rock into calcium carbonate in solution. As the acidic water continues to flow downward toward the water table, it enlarges underground channels over thousands of years, producing distinctive landscapes known as karst. Openings to the surface may form when rock collapses into sinkholes or when streams cut horizontal entrances into cave walls.',
          'As these channels widen, they hold more water and dissolve more rock, eventually developing into large cave systems. [I] However, some caves may dry out when the water table drops or when tectonic movements lift them above the groundwater level, allowing air to enter. [II] Flowing water may continue shaping the caves, while dripping mineral-rich water forms deposits known as speleothems. [III] The most familiar formations are stalactites, which hang from ceilings, and stalagmites, which rise from floors. Other formations include drapery, flowstone, gypsum flowers, and helictites. [IV] Famous examples of limestone caves include Carlsbad Caverns in New Mexico and Luray Caverns in Virginia.',
          'Caves have long provided shelter for both humans and animals. Prehistoric people once lived in caves, and early artworks have been discovered on their walls. Today, many species — including bats, birds, insects, and bears — depend on cave environments for survival. In particular, bat droppings (guano) support entire underground ecosystems by providing essential nutrients for other organisms.'
        ],
        questions: [
          Q(31, 'According to the passage, which of the following is the most common way caves are formed?', ['By the dissolution of limestone rock', 'By ocean waves eroding shorelines', 'By cooling lava forming tubes', 'By tectonic movements underground'], 'A', 'Đoạn 1: “…and most commonly by the dissolution of limestone rock”.'),
          Q(32, 'The word “accumulation” in paragraph 2 is closest in meaning to ______.', ['collection', 'destruction', 'separation', 'exposure'], 'A', '“Accumulation” = sự tích tụ, tập hợp lại = collection.'),
          Q(33, 'Which sentence best summarizes paragraph 1?', ['Limestone caves are famous for their impressive mineral formations and underground beauty.', 'Caves form in different ways and limestone caves are the most common and extensive.', 'Caves were once used by prehistoric humans as underground chambers to store their food.', 'Many endangered animals depend on some of the largest and deepest cave systems for survival.'], 'B', 'Đoạn 1 nêu 3 cách hình thành hang động và nhấn mạnh hang đá vôi là phổ biến và rộng lớn nhất.'),
          Q(34, 'According to the passage, which substance in rainwater helps dissolve limestone?', ['oxygen', 'carbon dioxide', 'sulfur', 'nitrogen'], 'B', 'Đoạn 2: “Rainwater absorbs carbon dioxide from the soil, forming a weak carbonic acid solution”.'),
          Q(35, 'Which of the following is NOT mentioned as a type of speleothem?', ['coral', 'drapery', 'helictites', 'flowstone'], 'A', '“Coral” (san hô) là sinh vật biển tạo nên đá vôi ban đầu, không phải thạch nhũ (speleothem).'),
          Q(36, 'The word “it” in paragraph 2 refers to ______.', ['acidic water', 'underground channel', 'water table', 'calcium carbonate'], 'A', '“As the acidic water continues to flow downward…, it enlarges underground channels” -> it = acidic water.'),
          Q(37, 'Which of the following best paraphrases the sentence “However, some caves may dry out when the water table drops or when tectonic movements lift them above the groundwater level, allowing air to enter”?', ['Caves may become wetter when groundwater rises and air is prevented from entering.', 'Powerful earthquakes may flood caves permanently and block outside air from entering.', 'Caves may dry out if groundwater falls or land rises, allowing air to enter.', 'Flowing streams may create caves underground while preventing outside air from entering.'], 'C', 'Hang có thể khô đi khi mực nước ngầm hạ xuống hoặc vận động kiến tạo nâng hang lên cao hơn mực nước ngầm, cho không khí tràn vào.'),
          Q(38, 'What can be inferred about karst landscapes?', ['They are formed suddenly as a result of earthquakes.', 'They develop gradually through long-term limestone dissolution.', 'They are created entirely from hardened volcanic lava.', 'They are found only in extremely dry desert regions.'], 'B', 'Đoạn 2: hình thành qua hàng ngàn năm do nước có tính axit hòa tan đá vôi.'),
          Q(39, 'Where in Paragraph 3 does the sentence “These changes can significantly alter the internal structure of the cave over time.” best fit?', ['[I]', '[IV]', '[II]', '[III]'], 'C', 'Đặt ở [II] ngay sau câu nói về mực nước ngầm hạ xuống và không khí tràn vào (“These changes…”).'),
          Q(40, 'Which option best summarizes the entire passage?', ['Modern animals benefit from caves, but humans rarely depend on them today.', 'Lava caves are more widespread worldwide and more significant than limestone caves.', 'Limestone caves form gradually through geological processes and provide habitats for humans and wildlife.', 'Caves are primarily tourist attractions admired for their impressive mineral formations.'], 'C', 'Tóm tắt trọn vẹn cả quá trình hình thành địa chất (đoạn 1–3) và vai trò nơi cư trú (đoạn 4).')
        ]
      },
      {
        id: 't4-b5', short: 'Đọc hiểu: Career & Giao tiếp (41–50)', part: 'Part 5 · Reading & Communication',
        title: 'Đọc hiểu: Lựa chọn nghề nghiệp & Tình huống giao tiếp (Câu 41–50)',
        instruction: 'Read the passage and mark the letter A, B, C, or D to indicate the correct answer to each question.',
        passageTitle: 'CAREER CHOICES (Questions 41–48)',
        numbered: true,
        paras: [
          'In the past, the path from high school to a career was often linear and predictable. A student would graduate, perhaps attend university, join a company, and steadily climb the corporate ladder until retirement. However, for today’s high school students, the landscape of work is shifting beneath their feet. The “job for life” concept is rapidly becoming a relic of the past, replaced by the “gig economy,” remote work, and a dynamic market where adaptability is the new currency.',
          'One of the most significant sources of anxiety for teenagers is the pressure to choose a “perfect” career at the age of 18. This anxiety is fueled by the misconception that a choice made now is irreversible. Career counselors today emphasize that students should not focus solely on job titles, which may become obsolete in a decade due to automation. Instead, the focus should shift toward acquiring transferable skills such as critical thinking, digital literacy, and emotional intelligence. These are the tools that will allow young people to pivot across different industries as the market evolves.',
          'Furthermore, the debate between following one’s passion and seeking financial stability remains contentious. While the adage “do what you love, and you’ll never work a day in your life” sounds appealing, it can be misleading. Not every hobby translates into a viable career. Experts suggest a “career prototype” approach: trying out small versions of a job through internships, volunteering, or shadowing professionals. This allows students to test their assumptions about a career before committing years of education to it.',
          'Another crucial factor is the rise of interdisciplinary fields. The most exciting opportunities often lie at the intersection of different domains, such as bioinformatics (biology and computer science) or green architecture (environmental science and design). Students are encouraged to maintain a broad curiosity rather than narrowing their focus too early.',
          'Ultimately, the most successful individuals in the future will be “lifelong learners.” The diploma received at university graduation is no longer the finish line but merely a checkpoint. The willingness to unlearn old habits and relearn new technologies will be the defining characteristic of the modern workforce.'
        ],
        questions: [
          Q(41, 'The word “This” in paragraph 3 refers to ______.', ['The misleading adage about doing what you love.', 'The debate between passion and stability.', 'The approach of trying out small versions of a job.', 'The commitment to years of education.'], 'C', '“This” quy chiếu cho phương pháp “career prototype: trying out small versions of a job…”.'),
          Q(42, 'In which paragraph does the author discuss the importance of skills that can be used in various industries?', ['Paragraph 5', 'Paragraph 3', 'Paragraph 2', 'Paragraph 1'], 'C', 'Đoạn 2 bàn về “transferable skills” giúp chuyển đổi linh hoạt giữa các ngành.'),
          Q(43, 'According to the passage, why do many teenagers feel anxious about choosing a career?', ['They are forced to choose careers that their parents prefer.', 'They believe that their current choice cannot be changed later.', 'They are afraid of the “gig economy” and remote work.', 'They lack the necessary digital literacy skills for modern jobs.'], 'B', 'Đoạn 2: “fueled by the misconception that a choice made now is irreversible” (tin rằng lựa chọn hiện tại không thể thay đổi).'),
          Q(44, 'The word “contentious” in paragraph 3 is CLOSEST in meaning to ______.', ['insignificant', 'universal', 'controversial', 'agreeable'], 'C', '“Contentious” = gây nhiều tranh cãi = controversial.'),
          Q(45, 'Which paragraph mentions the strategy of testing a job before fully committing to it?', ['Paragraph 4', 'Paragraph 1', 'Paragraph 3', 'Paragraph 2'], 'C', 'Đoạn 3 nêu chiến lược “career prototype” (thử nghiệm công việc qua thực tập, tình nguyện).'),
          Q(46, 'The word “obsolete” in paragraph 2 is OPPOSITE in meaning to ______.', ['expensive', 'outdated', 'useless', 'modern'], 'D', '“Obsolete” (lỗi thời) trái nghĩa với “modern” (hiện đại).'),
          Q(47, 'Which of the following is NOT true according to the passage?', ['The concept of staying in one job for a lifetime is becoming outdated.', 'Career counselors advise students to focus primarily on specific job titles.', 'Interdisciplinary fields combine knowledge from different domains.', 'A university diploma is considered just a checkpoint in a lifelong learning journey.'], 'B', 'Đoạn 2 nêu rõ: “students should not focus solely on job titles”.'),
          Q(48, 'Which of the following best paraphrases “The willingness to unlearn old habits and relearn new technologies will be the defining characteristic of the modern workforce”?', ['Modern workers are defined by their ability to refuse old habits and reject new technologies.', 'To succeed in the modern workforce, one must be ready to discard outdated practices and acquire new technical skills.', 'Workers today are willing to learn new technologies only if they can keep their old habits.', 'The defining characteristic of the workforce is the stability of old habits combined with new technologies.'], 'B', 'Sẵn sàng từ bỏ thói quen lạc hậu và học hỏi công nghệ mới.'),
          Q(49, 'Rosie: “______” — Jolie: “Once bitten, twice shy.”', ['How terrible is the test score!', 'She was defeated again.', 'Has the cat got your tongue?', 'She is still all on her own.'], 'D', '“She is still all on her own” -> “Once bitten, twice shy” (Chim phải đạn sợ cành cong).'),
          Q(50, 'Harry: “You look so tired!” — Tina: “______”', ['Never mind! All work and no play makes Jack a dull boy.', 'There’s no way for me to miss that deadline.', 'I’ve been snowed under with work this week.', 'We haven’t got any hope in hell of meeting such a tight deadline.'], 'C', '“I’ve been snowed under with work this week” = Tuần này mình ngập đầu trong công việc.')
        ]
      }
    ]
  },

  /* =====================================================================
     TEST 05 (50 CÂU)
     ===================================================================== */
  {
    id: 'anh-test-05',
    subject: 'anh',
    title: 'Test 05',
    blocks: [
      {
        id: 't5-b1', short: 'Lexico-Grammar (1–10)', part: 'Part 1 · Lexico-Grammar',
        title: 'Từ vựng và ngữ pháp (Câu 1–10)',
        instruction: 'CIRCLE the words/phrases that best complete the sentences.',
        questions: [
          Q(1, 'When autumn leaves fall to the ground, they slowly ______ and enrich the soil with vital nutrients.', ['integrate', 'delegate', 'decompose', 'alleviate'], 'C', '“Decompose” = phân hủy.'),
          Q(2, 'Let’s ______ the situation before we make a final decision.', ['catch up with', 'brush up on', 'take stock of', 'make up for'], 'C', '“Take stock of the situation” = xem xét, đánh giá kỹ tình hình.'),
          Q(3, 'The claim that eating red and processed meat increases the risk of heart attack ______ our eyebrows.', ['should be raising', 'have raised', 'will be raised', 'has been raising'], 'A', 'Chủ ngữ số ít “The claim” + động từ chủ động có tân ngữ: “should be raising our eyebrows”.'),
          Q(4, 'The doctor recommended that Neil should take Echinacea, a plant that is used as a medicine, to keep colds at ______.', ['bay', 'channel', 'lake', 'river'], 'A', 'Thành ngữ “keep sth at bay” = ngăn ngừa, đẩy lùi bệnh tật.'),
          Q(5, 'The survey indicates that Coronavirus may ______ the end of foreign travel for a while.', ['flee', 'hit', 'spell', 'strike'], 'C', '“Spell the end of sth” = báo hiệu sự kết thúc / chấm dứt của cái gì.'),
          Q(6, 'Seo-yeon’s 40th birthday party was very ______, just a few friends at a local pub.', ['lowland', 'lowlight', 'low-flying', 'low-key'], 'D', '“Low-key” = kín tiếng, giản dị, không phô trương.'),
          Q(7, 'After the earthquake, the entrance hall was turned into a ______ Casualty Ward.', ['mainstay', 'makeshift', 'piecework', 'wayside'], 'B', '“Makeshift” = tạm thời, dã chiến (phòng cấp cứu dã chiến).'),
          Q(8, 'It was a ______ in the guts when the students’ exams were cancelled at the last minute.', ['fake story', 'real kick', 'free spirit', 'red alert'], 'B', 'Thành ngữ “a real kick in the guts/teeth” = một cú sốc / sự thất vọng nặng nề.'),
          Q(9, 'By eating organic, you can enjoy delicious food and ______ to a healthier planet, so let’s encourage your family and friends to try organic food too!', ['achieve', 'object', 'contribute', 'treat'], 'C', '“Contribute to” = đóng góp vào.'),
          Q(10, 'The company plans to go ______ by installing solar panels and using recyclable packaging.', ['white', 'green', 'pink', 'dark'], 'B', '“Go green” = sống xanh, thân thiện với môi trường.')
        ]
      },
      {
        id: 't5-b2', short: 'Đọc hiểu: Meteorite Impact (11–18)', part: 'Part 2 · Reading Comprehension',
        title: 'Đọc hiểu: Va chạm thiên thạch và sự tuyệt chủng của khủng long (Câu 11–18)',
        instruction: 'Read the passage then CIRCLE the correct answers to the questions.',
        passageTitle: 'METEORITE IMPACT AND DINOSAUR EXTINCTION',
        numbered: true,
        paras: [
          'There is increasing evidence that the impacts of meteorites have had important effects on Earth, particularly in the field of biological evolution. Such impacts continue to pose a natural hazard to life on Earth. Twice in the twentieth century, large meteorite objects are known to have collided with Earth.',
          'If an impact is large enough, it can disturb the environment of the entire Earth and cause an ecological catastrophe. The best-documented such impact took place 65 million years ago at the end of the Cretaceous period of geological history. This break in Earth’s history is marked by a mass extinction, when as many as half the species on the planet became extinct. While there are a dozen or more mass extinctions in the geological record, the Cretaceous mass extinction has always intrigued paleontologists because it marks the end of the age of the dinosaurs. For tens of millions of years, those great creatures had flourished. Then, suddenly, they disappeared.',
          'The body that impacted Earth at the end of the Cretaceous period was a meteorite with a mass of more than a trillion tons and a diameter of at least 10 kilometers. Scientists first identified this impact in 1980 from the worldwide layer of sediment deposited from the dust cloud that enveloped the planet after the impact. This sediment layer is enriched in the rare metal iridium and other elements that are relatively abundant in a meteorite but very rare in the crust of Earth. Even diluted by the terrestrial material excavated from the crater, this component of meteorites is easily identified. By 1990 geologists had located the impact site itself in the Yucatán region of Mexico. The crater, now deeply buried in sediment, was originally about 200 kilometers in diameter.',
          'This impact released an enormous amount of energy, excavating a crater about twice as large as the lunar crater Tycho. The explosion lifted about 100 trillion tons of dust into the atmosphere, as can be determined by measuring the thickness of the sediment layer formed when this dust settled to the surface. Such a quantity of material would have blocked the sunlight completely from reaching the surface, plunging Earth into a period of cold and darkness that lasted at least several months. The explosion is also calculated to have produced vast quantities of nitric acid and melted rock that sprayed out over much of Earth, starting widespread fires that must have consumed most terrestrial forests and grassland. Presumably, those environmental disasters could have been responsible for the mass extinction, including the death of the dinosaurs.',
          'Several other mass extinctions in the geological record have been tentatively identified with large impacts, but none is so dramatic as the Cretaceous event. But even without such specific documentation, it is clear that impacts of this size do occur and that their results can be catastrophic. What is a catastrophe for one group of living things, however, may create opportunities for another group. Following each mass extinction, there is a sudden evolutionary burst as new species develop to fill the ecological niches opened by the event.',
          'Impacts by meteorites represent one mechanism that could cause global catastrophes and seriously influence the evolution of life all over the planet. According to some estimates, the majority of all extinctions of species may be due to such impacts. Such a perspective fundamentally changes our view of biological evolution. The standard criterion for the survival of a species is its success in competing with other species and adapting to slowly changing environments. Yet an equally important criterion is the ability of a species to survive random global ecological catastrophes due to impacts.',
          'Earth is a target in a cosmic shooting gallery, subject to random violent events that were unsuspected a few decades ago. In 1991 the United States Congress asked NASA to investigate the hazard posed today by large impacts on Earth. The group conducting the study concluded from a detailed analysis that impacts from meteorites can indeed be hazardous. Although there is always some risk that a large impact could occur, careful study shows that this risk is quite small.'
        ],
        source: '(TOEFL Practice Test 1, Volume 1)',
        questions: [
          Q(11, 'In paragraph 2, why does the author include the information that dinosaurs had flourished for tens of millions of years and then suddenly disappeared?', ['To explain why as many as half of the species on Earth at the time are believed to have become extinct at the end of the Cretaceous', 'To explain why paleontologists have always been intrigued by the mass extinction at the end of the Cretaceous', 'To provide evidence that an impact can be large enough to disturb the environment of the entire planet and cause an ecological disaster', 'To support the claim that the mass extinction at the end of the Cretaceous is the best-documented of the dozen or so mass extinctions in the geological record'], 'B', 'Đoạn 2 giải thích lý do các nhà cổ sinh vật học luôn bị thu hút bởi sự kiện tuyệt chủng kỷ Phấn trắng.'),
          Q(12, 'Which of the following can be inferred from paragraph 3 about the location of the meteorite impact in Mexico?', ['Geologists knew that there had been an impact before they knew where it had occurred.', 'It was a well-known fact that the impact had occurred in the Yucatán region.', 'The location of the impact site in Mexico was kept secret by geologists from 1980 to 1990.', 'The Yucatán region was chosen by geologists as the most probable impact site because of its climate.'], 'A', 'Năm 1980 các nhà khoa học đã xác định có vụ va chạm qua lớp trầm tích, nhưng đến năm 1990 mới tìm ra vị trí hố va chạm ở Yucatán.'),
          Q(13, 'According to paragraph 3, how did scientists determine that a large meteorite had impacted Earth?', ['They discovered a large crater in the Yucatán region of Mexico.', 'They found a unique layer of sediment worldwide.', 'They located a meteorite with a mass of over a trillion tons.', 'They were alerted by archaeologists who had been excavating in the Yucatán region.'], 'B', 'Đoạn 3: “Scientists first identified this impact in 1980 from the worldwide layer of sediment…”.'),
          Q(14, 'The word “excavating” in paragraph 4 is closest in meaning to ______.', ['covering up', 'destroying', 'digging out', 'extending'], 'C', '“Excavating” = đào khoét tạo thành hố = digging out.'),
          Q(15, 'The word “consumed” in paragraph 4 is closest in meaning to ______.', ['changed', 'covered', 'destroyed', 'exposed'], 'C', '“Consumed most terrestrial forests” = thiêu rụi, phá hủy hầu hết rừng trên cạn = destroyed.'),
          Q(16, 'According to paragraph 4, all of the following statements are true of the impact at the end of the Cretaceous period EXCEPT:', ['A large amount of dust blocked sunlight from Earth.', 'Earth became cold and dark for several months.', 'Large quantities of nitric acid were produced.', 'New elements were formed in Earth’s crust.'], 'D', 'Đoạn 4 không nói các nguyên tố mới được hình thành trong vỏ Trái Đất.'),
          Q(17, 'The phrase “tentatively identified” in paragraph 5 is closest in meaning to ______.', ['easily identified', 'identified after careful study', 'identified without certainty', 'occasionally identified'], 'C', '“Tentatively” = bước đầu, tạm thời, chưa chắc chắn hoàn toàn = without certainty.'),
          Q(18, 'According to the passage, who conducted investigations about the current dangers posed by large meteorite impacts on Earth?', ['Geologists', 'NASA', 'Paleontologists', 'The United States Congress'], 'B', 'Đoạn cuối: Quốc hội Mỹ yêu cầu NASA điều tra (“asked NASA to investigate…”).')
        ]
      },
      {
        id: 't5-b3', short: 'Sắp xếp & Điền câu (19–27)', part: 'Part 3 · Arrangement & Cloze',
        title: 'Sắp xếp đoạn văn & Điền câu bài “Studying Abroad” (Câu 19–27)',
        instruction: 'Mark the letter A, B, C, or D to indicate the correct option for each of the following questions.',
        passageTitle: 'Studying Abroad (Questions 23–27)',
        paras: [
          'Studying abroad can be an enriching experience, but it also involves a number of uncertainties that prospective students must carefully consider. These may include concerns about academic standards, cultural differences, financial pressures, or (23) ______. Before making a final decision, students often weigh the likelihood of such challenges occurring, assess whether they can be managed effectively, and consider the long-term impact they may have on their personal and professional development.',
          'For some individuals, uncertainty is part of the appeal, as it encourages independence and personal growth, (24) ______. Others, however, prefer stability and predictability, and therefore seek to minimize uncertainty as much as possible. Naturally, the perceived seriousness of potential difficulties plays a crucial role in this process. (25) ______. As a result, more cautious students tend to favour institutions with established reputations, well-defined support systems, and clearly structured programmes, as these features help reduce uncertainty and perceived risk.',
          '(26) ______. Research suggests that many students still hesitate to rely solely on online platforms when selecting overseas universities. This hesitation can be explained partly by the absence of direct interaction with experienced advisors and partly by (27) ______.'
        ],
        source: '(Adapted from Higher Education and Global Mobility)',
        questions: [
          Q(19, 'a. Linh: That’s right. They organize courses to help teachers improve their teaching skills and use digital technology in classrooms.\nb. Linh: Exactly! Plus, they offer training on life-saving skills for both teachers and students, and help children and households who are in need.\nc. Minh: They also create more opportunities for children in remote areas by giving them books and school materials so they can have access to learning.\nd. Linh: Have you heard about Save the Children? It’s an international NGO that helps improve children’s lives around the world.\ne. Minh: Yes, I know! They started their work in Vietnam in 1990 and provide practical support in areas like education and training.', ['d-c-a-e-b', 'b-e-a-c-d', 'b-c-a-e-d', 'd-e-a-c-b'], 'D', 'Linh hỏi về Save the Children (d) -> Minh đáp “Yes, I know!” (e) -> Linh đồng tình và nói thêm về khóa học cho giáo viên (a) -> Minh bổ sung “They also…” (c) -> Linh chốt “Exactly! Plus…” (b).'),
          Q(20, 'Dear Alex,\na. This integration of technology seems to be transforming traditional teaching methods and enhancing educational outcomes.\nb. I recently came across an article discussing the increasing use of artificial intelligence in classrooms, which I found quite fascinating.\nc. I hope you’re doing well and had a chance to relax over the weekend.\nd. I’d love to hear your thoughts on this development and how you think it might impact our education system.\ne. The piece highlighted how AI tools are now assisting teachers by grading assignments and providing personalized learning experiences for students.\nBest regards, Taylor', ['c-b-e-a-d', 'c-d-e-a-b', 'a-e-b-c-d', 'a-b-e-c-d'], 'A', 'Chào hỏi đầu thư (c) -> giới thiệu bài báo vừa đọc (b) -> nội dung bài báo “The piece highlighted…” (e) -> nhận xét “This integration…” (a) -> mong nhận phản hồi (d).'),
          Q(21, 'a. This wave of immigration not only puts pressure on urban services but also raises concerns about the long-term sustainability of cities.\nb. One major reason for immigration to big cities is the limited access to health services in remote areas, which drives people to move in search of better healthcare and living standards.\nc. For example, many rural residents migrate to urban areas because local hospitals often lack trained medical professionals and proper equipment, as seen with hospitals like Bach Mai and K Hospital, which struggle to meet the demands of patients from small provinces.\nd. As a result, the chances of securing a position have decreased significantly, from 33% to as low as 7%.\ne. In addition to healthcare, another factor is the search for better job opportunities; with more people moving to the cities, competition for jobs has become fierce.', ['b-d-c-e-a', 'b-c-e-d-a', 'e-c-b-d-a', 'b-e-c-d-a'], 'B', 'Lý do chính về y tế (b) -> ví dụ cụ thể về bệnh viện (c) -> ngoài y tế còn do tìm việc làm (e) -> kết quả tỷ lệ chọi việc làm giảm (d) -> kết luận chung (a).'),
          Q(22, 'a. For teachers, technology offers tools to design more flexible lessons, track progress efficiently, and provide timely feedback that supports individual growth.\nb. At the same time, meaningful learning still depends on how these tools are used, as passive consumption can limit critical thinking and deep understanding.\nc. Technology plays an increasingly central role in education by expanding access to information and learning opportunities beyond the traditional classroom.\nd. When integrated thoughtfully, technology enhances education not by replacing teachers, but by strengthening the connection between instruction, practice, and real-world application.\ne. Digital platforms allow students to learn at their own pace, revisit complex ideas, and engage with content through interactive formats that suit different learning styles.', ['c-d-b-a-e', 'e-b-d-a-c', 'e-a-c-d-b', 'c-e-a-b-d'], 'D', 'Vai trò trung tâm của công nghệ (c) -> đối với học sinh (e) -> đối với giáo viên (a) -> lưu ý về cách sử dụng (b) -> kết luận tổng hợp (d).'),
          Q(23, GAPQ, ['the education system is directly experienced upon arrival', 'to directly experience the education system after arrival', 'lacking direct experience of the education system until arrival', 'having experienced the education system directly'], 'C', 'Cấu trúc song song sau giới từ “about”: danh từ / cụm V-ing “lacking direct experience of the education system until arrival”.'),
          Q(24, GAPQ, ['although it does not necessarily deter them from pursuing such opportunities', 'if independence is prevented by uncertainty', 'because it creates barriers that cannot be overcome', 'so uncertainty itself always discourages international study'], 'A', 'Mệnh đề nhượng bộ bổ sung ý hợp lý cho những người xem sự bất định là một phần sức hút.'),
          Q(25, GAPQ, ['All potential difficulties are generally considered manageable', 'Challenges perceived as severe are more likely to discourage risk-taking', 'Students tend to underestimate the impact of potential difficulties', 'Serious challenges are often viewed as opportunities for personal development'], 'B', 'Khó khăn được đánh giá là nghiêm trọng sẽ làm giảm xu hướng mạo hiểm -> dẫn tới câu sau “As a result, more cautious students tend to favour…”.'),
          Q(26, GAPQ, ['The methods students use to gather information are also influenced by risk perception', 'Information is gathered by students through methods that are risky', 'Students gather information after risks and methods are chosen carefully', 'Risky methods are chosen when students gather information'], 'A', 'Câu chủ đề cho đoạn cuối bàn về cách thức sinh viên tìm kiếm thông tin chọn trường.'),
          Q(27, GAPQ, ['reliable and objective information is doubted by online platforms', 'objectivity is ensured through online information reliability', 'doubts regarding the reliability and objectivity of online information', 'the online information is reliable despite doubts about objectivity'], 'C', 'Song song với “partly by the absence of…” là “and partly by doubts regarding…”.')
        ]
      },
      {
        id: 't5-b4', short: 'Quảng cáo & Ngữ pháp (28–40)', part: 'Part 4 · Advertisement & Grammar',
        title: 'Điền từ Quảng cáo Bảo vệ Động vật hoang dã & Ngữ pháp (Câu 28–40)',
        instruction: 'Read the advertisement and mark the letter A, B, C or D to indicate the correct option for each question.',
        passageTitle: 'PROTECT OUR PLANET’S WILD HEART (Questions 28–33)',
        paras: [
          'On World Wildlife Day, we pause to celebrate the stunning variety of life (28) ______ our planet unique and vibrant. From the smallest insects to the largest whales, every single species plays a crucial role in the health and function of our shared global ecosystems.',
          'Sadly, this (29) ______ beauty is under severe threat. Habitat loss, climate change, and illegal trade continue to push countless animals and plants closer to the brink of extinction every single day.',
          'We cannot afford to lose these magnificent creatures. (30) ______ wildlife is not just about saving endangered species; it’s fundamentally about protecting the (31) ______ that provides humanity with clean air, fresh water, and vital food security. Every one of us has the power to make a significant difference.',
          'If we act together today to support sustainable initiatives and stricter protection laws, we can truly reverse these dangerous trends and ensure a brighter future (32) ______ global biodiversity. Donate to a trusted conservation organization, volunteer your time, or simply commit (33) ______ your carbon footprint.',
          'Let’s stand up for nature. Our future depends on it.'
        ],
        questions: [
          Q(28, GAPQ, ['to make', 'making', 'maked', 'that make'], 'B', 'Rút gọn mệnh đề quan hệ chủ động: “the stunning variety of life making our planet unique”.'),
          Q(29, GAPQ, ['incredibly', 'incredibility', 'incredibleness', 'incredible'], 'D', 'Trước danh từ “beauty” cần tính từ “incredible”.'),
          Q(30, GAPQ, ['Remaining', 'Reserving', 'Maintaining', 'Preserving'], 'D', '“Preserving wildlife” = Bảo tồn động vật hoang dã.'),
          Q(31, GAPQ, ['ecological balance delicate', 'delicate ecological balance', 'ecological delicate balance', 'balance ecological delicate'], 'B', 'Trật tự từ: Tính từ chỉ tính chất (delicate) + Tính từ phân loại (ecological) + Danh từ (balance).'),
          Q(32, GAPQ, ['with', 'for', 'along', 'under'], 'B', '“Ensure a brighter future for global biodiversity”.'),
          Q(33, GAPQ, ['to reduce', 'reduce', 'to reducing', 'reducing'], 'C', 'Cấu trúc “commit to + V-ing” = cam kết làm gì.'),
          Q(34, 'She explained the directions very quickly, ______ made the children confused.', ['who', 'when', 'that', 'which'], 'D', '“Which” thay thế cho cả mệnh đề phía trước sau dấu phẩy.'),
          Q(35, 'Can you please ______ the containers before putting them in the bin?', ['throw away', 'save up', 'break down', 'rinse out'], 'D', '“Rinse out” = tráng sạch hộp đựng trước khi bỏ vào thùng rác tái chế.'),
          Q(36, 'The local farmers are encouraged to use ______ to provide nutrients for their crops.', ['landfill', 'garbage', 'leftover', 'compost'], 'D', '“Compost” = phân hữu cơ ủ từ rác thực vật.'),
          Q(37, 'Using reusable shopping bags is one of the simplest eco-friendly ______ you can adopt.', ['habits', 'cultures', 'customs', 'rituals'], 'A', '“Eco-friendly habits” = những thói quen thân thiện với môi trường.'),
          Q(38, 'I get angry and frustrated with Hannah’s temper, but I’m a great believer in expressing my feelings to ______ before we went any further.', ['clear the air', 'ring a bell', 'bite the dust', 'strike a note'], 'A', 'Thành ngữ “clear the air” = xóa tan bầu không khí căng thẳng.'),
          Q(39, 'I could not ______ the lecture at all. It was too difficult for me.', ['hold on', 'make off', 'get along', 'take in'], 'D', '“Take in” = hiểu, tiếp thu bài giảng.'),
          Q(40, 'By installing solar panels, we can ______ our goal of reducing our carbon footprint.', ['accomplish', 'succeed', 'conduct', 'satisfy'], 'A', '“Accomplish a goal” = hoàn thành, đạt được mục tiêu.')
        ]
      },
      {
        id: 't5-b5', short: 'Đọc hiểu: AI in Language (41–50)', part: 'Part 5 · Reading Comprehension',
        title: 'Đọc hiểu: AI trong việc học ngôn ngữ (Câu 41–50)',
        instruction: 'Read the following passage and mark the letter A, B, C, or D to indicate the correct answer to each of the following questions.',
        passageTitle: 'AI IN LANGUAGE LEARNING',
        numbered: true,
        paras: [
          'The integration of Artificial Intelligence (AI) into language learning has revolutionized the way individuals acquire new tongues, moving the process from dusty textbooks to dynamic, interactive screens. [I] No longer confined to the rigid schedules of traditional classrooms, learners now have access to personalized tutors in their pockets, available twenty-four seven. [II] This transformation arises from advances in Natural Language Processing (NLP) and machine learning, which analyze large datasets and adapt lessons to each learner’s progress. [III] However, as with any disruptive technology, the ubiquity of AI in education brings both transformative benefits and significant challenges that merit close scrutiny. [IV]',
          'One of the most touted advantages of AI is its ability to provide instant, non-judgmental feedback. In a traditional setting, a student might hesitate to speak for fear of making mistakes in front of peers. AI-powered apps, conversely, offer a safe space where learners can practice pronunciation and grammar repeatedly without embarrassment. Furthermore, these systems employ adaptive learning techniques; if a user struggles with the subjunctive mood in Spanish, the program notices and adds more exercises on that topic later. This level of personalization could not be achieved in a classroom with thirty students before.',
          'Even so, people worry about losing the “human element” in language learning. Language is more than rules; it carries culture, emotion, and nuance. Too much dependence on AI could lead to shallow fluency: knowing the rules but not being able to use language well in real life.',
          'Moreover, the role of the teacher is being reconfigured rather than replaced. The fear that AI will make educators obsolete is largely unfounded. Instead, the teacher’s role is shifting from a deliverer of knowledge to a facilitator and mentor. Teachers can leverage AI tools to handle repetitive tasks like grading and vocabulary drilling, freeing up valuable class time for complex interactive activities, debates, and cultural immersion that machines cannot replicate.',
          'Data privacy is another important issue. These apps collect lots of data to improve their programs. This raises questions about how this data is stored, who owns it, and whether it could be sold in ways that harm privacy.',
          'In conclusion, while AI serves as a powerful supplementary tool that makes language learning more accessible and efficient, it should not replace human interaction. The future of learning will likely mix technology with human guidance. Machines handle the mechanics, while people help with connection and culture.'
        ],
        questions: [
          Q(41, 'Which of the following best serves as the title for the passage?', ['The End of Traditional Language Classrooms.', 'How AI Algorithms Work in Education.', 'Why Human Teachers are Better than Machines.', 'AI in Language Learning: A Double-Edged Sword.'], 'D', 'Bài viết phân tích cả lợi ích đột phá và những thách thức (con dao hai lưỡi) của AI trong việc học ngôn ngữ.'),
          Q(42, 'Which of the following best summarizes the reading passage?', ['AI has transformed language learning by providing 24/7 personalized, data-driven tutoring, and raises little concerns about human connection.', 'AI focuses solely on grammar and ignores cultural context but it is likely to replace teachers in language learning.', 'AI makes language learning more personalized and accessible, but human guidance remains essential for culture, nuance, and privacy.', 'AI’s only benefit is faster feedback, with no significant drawbacks or considerations for culture and privacy.'], 'C', 'Tóm tắt đầy đủ cả ưu điểm cá nhân hóa của AI lẫn vai trò không thể thay thế của con người.'),
          Q(43, 'According to paragraph 2, why is AI considered a “safe space” for learners?', ['It connects them with other learners who are at the same level.', 'It protects their personal data securely.', 'It prevents them from making any grammatical errors.', 'It allows them to practice without fear of judgment from others.'], 'D', 'Đoạn 2: “practice pronunciation and grammar repeatedly without embarrassment”.'),
          Q(44, 'Which of the following is TRUE according to the passage?', ['AI tools can help save time for teachers by handling repetitive tasks.', 'The author believes AI will eventually replace human interaction entirely.', 'Teachers should stop teaching grammar and focus only on culture.', 'AI is currently capable of perfectly understanding sarcasm and cultural nuance.'], 'A', 'Đoạn 4: Giáo viên dùng AI xử lý các việc lặp đi lặp lại như chấm bài và luyện từ vựng để tiết kiệm thời gian trên lớp.'),
          Q(45, 'The word “supplementary” in the last paragraph is OPPOSITE in meaning to ______.', ['auxiliary', 'supporting', 'main', 'unnecessary'], 'C', '“Supplementary” (bổ trợ, phụ thêm) trái nghĩa với “main” (chính, chủ đạo).'),
          Q(46, 'The word “This” in paragraph 5 refers to ______.', ['The ethical privacy of AI.', 'The compromise of user privacy.', 'The collecting of immense amounts of user data.', 'The using of collected data.'], 'C', '“These apps collect lots of data to improve their programs. This raises questions…” -> This = việc thu thập lượng lớn dữ liệu người dùng.'),
          Q(47, 'Which of the following best paraphrases “Teachers can leverage AI tools to handle repetitive tasks like grading and vocabulary drilling, freeing up valuable class time for complex interactive activities…”?', ['Teachers should take care of more engaging activities while repetitive tasks are for AI tools.', 'AI tools can do both the repetitive tasks and complex interactive activities without the help of teachers.', 'Teachers should upgrade AI tools so that they can devote to harder, more engaging activities.', 'Teachers can use AI tools to do repetitive, mechanical tasks so that they can devote to harder, more engaging activities.'], 'D', 'Giáo viên có thể tận dụng công cụ AI để làm các công việc cơ học lặp lại nhằm dành thời gian cho các hoạt động tương tác sâu hơn.'),
          Q(48, 'Where in paragraph 1 does the sentence “For instance, apps like Duolingo or chatbots powered by generative AI can simulate conversations that adapt in real-time to the user’s responses.” best fit?', ['[IV]', '[III]', '[I]', '[II]'], 'B', 'Đặt ở [III] để làm ví dụ minh họa trực tiếp cho câu ngay trước đó nói về NLP và machine learning điều chỉnh bài học.'),
          Q(49, 'What can be inferred about the future of language learning from the passage?', ['It will be completely automated with no need for human teachers.', 'It will focus solely on translation rather than communication.', 'It will likely involve a blend of AI technology and human guidance.', 'It will return to traditional methods as people reject technology.'], 'C', 'Đoạn kết: “The future of learning will likely mix technology with human guidance.”'),
          Q(50, 'The word “reconfigured” in paragraph 4 is closest in meaning to ______.', ['ignored', 'preserved', 'reshaped', 'eliminated'], 'C', '“Reconfigured” = được định hình lại, tái cấu trúc = reshaped.')
        ]
      }
    ]
  }
];
