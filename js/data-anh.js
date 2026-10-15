window.Q = function (n, stem, opts, ans, exp) {
  return { n: n, stem: stem, opts: opts, ans: ans, exp: exp };
};
window.GAPQ = null;

window.TESTS = [{
  id: 'anh-test-01',
  subject: 'anh',
  title: 'Test 01',
  blocks: [
    {
      id: 'b1', short: 'Lexico-Grammar', part: 'Part 1 · Lexico-Grammar',
      title: 'Từ vựng và ngữ pháp',
      instruction: 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.',
      questions: [
        Q(1, 'My father is getting old and forgetful ______ he is experienced and helpful.', ['regardless', 'consequently', 'lest', 'be that as it may'], 'D',
          '“Be that as it may” = dù vậy / tuy nhiên, nối hai ý đối lập: ông già và hay quên, nhưng vẫn giàu kinh nghiệm. “Regardless” cần đi với “of”; “consequently” (do đó) và “lest” (e rằng) đều sai nghĩa.'),
        Q(2, 'Last-minute withdrawal of the sponsor threw a ______ in our plans in the works to organize the cultural festivals.', ['caution', 'information', 'spanner', 'notice'], 'C',
          'Thành ngữ “throw a spanner in the works” = phá hỏng, gây trở ngại cho kế hoạch.'),
        Q(3, 'The first amusement park in our city was a ______ success for its owners. Everyone would go there to have a good time.', ['roaring', 'ringing', 'cracking', 'sparkling'], 'A',
          'Kết hợp từ “a roaring success” = thành công vang dội.'),
        Q(4, 'We walk through a park, ______ had been uprooted in the storm. It was a scene of utter desolation.', ['that the most trees', 'whose most trees', 'most trees of which', 'most of whose trees'], 'D',
          'Cần mệnh đề quan hệ chỉ sở hữu của “park”: “most of whose trees” = phần lớn số cây của công viên đó. “Whose most trees” sai trật tự từ.'),
        Q(5, '______ in Stevenson’s landscapes, the more vitality and character the painting seems to possess.', ['The loose brushwork is', 'The looser brushwork', 'The looser the brushwork is', 'The brushwork is loose'], 'C',
          'So sánh kép: “The + so sánh hơn + S + V, the + so sánh hơn + S + V”. Vế đầu: “The looser the brushwork is…”.'),
        Q(6, 'It was ______ that he was kept in hospital for nearby a month.', ['a such serious accident', 'such serious an accident', 'so a serious accident', 'so serious an accident'], 'D',
          'Cấu trúc “so + adj + a/an + N + that…”: so serious an accident that…'),
        Q(7, 'One of the most disappointing things in life is to be ______ by a friend when you truly need his or her support.', ['backed out', 'marked up', 'let down', 'stood for'], 'C',
          '“Let sb down” = làm ai thất vọng, không giúp khi cần. Back out = rút lui; mark up = tăng giá; stand for = viết tắt cho / ủng hộ.'),
        Q(8, 'In the Netherlands, a highly successful biking scheme has been ______, which helps to reduce the carbon footprint associated with transportation.', ['originated', 'implemented', 'controlled', 'diverged'], 'B',
          '“Implement a scheme” = triển khai, thực hiện một chương trình.'),
        Q(9, 'By using public transports, everyone can contribute to the reduction of greenhouse gas emissions, which does ______ for the environment.', ['wonders', 'dreams', 'horizons', 'pearls'], 'A',
          'Thành ngữ “do wonders for” = mang lại lợi ích rất lớn cho.'),
        Q(10, 'Due to ______, people can now enjoy foods and products from different cultures without leaving their home country.', ['globalism', 'globe', 'being globalized', 'globalization'], 'D',
          'Sau “Due to” cần danh từ. “Globalization” (toàn cầu hóa) đúng nghĩa; “globalism” là chủ nghĩa toàn cầu, “globe” là địa cầu.')
      ]
    },
    {
      id: 'b2', short: 'Đọc điền từ: Quảng cáo', part: 'Part 2 · Reading',
      title: 'Điền từ vào thông báo quảng cáo (Câu 11–13)',
      instruction: 'Read the following advertisement/announcement and mark the letter A, B, C, or D to indicate the correct option that best fits each of the numbered blanks.',
      passageTitle: 'Unleash Your Potential: The Road to Independence!',
      paras: [
        'Calling all young visionaries! Are you ready to dive into a world of (11) ______ and empowerment? Join us for the must-see show of the season: “Mastering Independence: A Youngster’s Guide to Living Bold”!',
        'Date: Coming Soon! | Venue: The Grand Auditorium of Youth Empowerment | Time: Doors open at 6 PM',
        'It is the one show that brings you a life-changing journey (12) ______ for the ambitious souls eager to carve their own paths. We’re bringing together life coaches, self-made entrepreneurs, and independence gurus to equip you (13) ______ the tools, knowledge, and confidence to take on the world. Tickets: Early bird specials available now!'
      ],
      questions: [
        Q(11, GAPQ, ['self-abandonment', 'self-condemnation', 'self-absorption', 'self-reliance'], 'D',
          '“Self-reliance” (tự lực) hợp với chủ đề independence và empowerment. Self-abandonment = tự bỏ rơi; self-condemnation = tự lên án; self-absorption = mải mê bản thân.'),
        Q(12, GAPQ, ['tailoring', 'to tailor', 'tailor', 'tailored'], 'D',
          'Rút gọn mệnh đề quan hệ bị động: “a journey (which is) tailored for…” = hành trình được thiết kế riêng cho…'),
        Q(13, GAPQ, ['on', 'in', 'for', 'with'], 'D',
          '“Equip sb with sth” = trang bị cho ai cái gì.')
      ]
    },
    {
      id: 'b3', short: 'Đọc điền từ: Trung tâm Anh ngữ', part: 'Part 2 · Reading',
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
        Q(14, GAPQ, ['luxurious', 'exquisite', 'customized', 'state-of-the-art'], 'D',
          '“State-of-the-art facilities” = cơ sở vật chất hiện đại nhất, hợp với đoạn nói về môi trường học đổi mới.'),
        Q(15, GAPQ, ['vibrant', 'mercurial', 'enigmatic', 'assertive'], 'A',
          '“Vibrant community” = cộng đồng sôi nổi. Mercurial = thất thường; enigmatic = bí ẩn; assertive = quyết đoán.'),
        Q(16, GAPQ, ['on the horizon', 'in line', 'in the running', 'on track'], 'D',
          '“On track to do sth” = đang đi đúng hướng để đạt được điều gì.')
      ]
    },
    {
      id: 'b4', short: 'Điền câu: Cân nặng và thói quen ăn', part: 'Part 2 · Reading',
      title: 'Chọn cụm/câu điền vào đoạn văn (Câu 17–22)',
      instruction: 'Mark the letter A, B, C, D in your answer sheet to indicate the correct option that fits each of the numbered blanks.',
      passageTitle: 'Weight and eating habits',
      paras: [
        'It was once believed that being overweight was healthy, but nowadays few people subscribe to this viewpoint. (17) ______, studies are being conducted concerning the appetite and how it is controlled by both emotional and biochemical factors. Some of the conclusions of these studies may give insights into how to deal with weight problems. For example, when several hundred people were asked about (18) ______ in times of stress, 44 percent said they reacted to stressful situations by eating. Further investigations with both humans and animals indicated that it is not food which relieves tension but rather the act of chewing. A test in which subjects were blindfolded showed that obese people have a keener sense of taste and (19) ______. (20) ______, obese people are not satisfied and consequently eat more to fulfill this need. Blood samples taken from people after they were shown a picture of food revealed that (21) ______, a chemical associated with appetite. This did not happen to average-weight people. In another experiment, results showed that certain people have (22) ______. Eating carbohydrates raise the level of serotonin, a neurotransmitter in the brain. Enough serotonin produces a sense of satiation, and hunger for carbohydrates subsides.',
        'Exercise has been recommended as an important part of a weight-loss program. However, it has been found that mild exercise, such as using the stairs instead of the elevator, is better in the long run than taking on a strenuous program, such as jogging, which many people find difficult to continue over long periods of time and which also increases appetite.'
      ],
      source: '(Adapted from Cambridge Preparation for the TOEFL Test by Jolene Gear)',
      questions: [
        Q(17, GAPQ, ['Even if many people are fighting the battle to reduce weight', 'Though many people are fighting the battle to reduce weight', 'In case many people are fighting the battle to reduce weight', 'While many people are fighting the battle to reduce weight'], 'D',
          '“While” diễn tả hai việc diễn ra song song: trong khi nhiều người đang giảm cân thì các nghiên cứu cũng đang được tiến hành. “Even if” (dù cho), “In case” (phòng khi) không hợp logic.'),
        Q(18, GAPQ, ['these eating habits', 'their eating habits', 'its eating habits', 'our eating habits'], 'B',
          '“Their” thay cho “several hundred people” được hỏi: thói quen ăn uống của họ khi căng thẳng.'),
        Q(19, GAPQ, ['craved more none-obese people than flavorful food', 'crave more flavorful food than non-obese people', 'craved more flavorful food than non-obese people', 'crave more none-obese people than flavorful food'], 'B',
          'Song song với “have a keener sense of taste and ___”, dùng động từ chia hiện tại “crave”. Nghĩa: thèm đồ ăn đậm vị hơn người không béo phì. Các đáp án còn lại sai nghĩa (A, D) hoặc sai thì (C).'),
        Q(20, GAPQ, ['Depriving of the variety of tastes and intensity', 'When deprived of the variety and intensity of tastes', 'Being deprived of the variety and intensity of tastes', 'After having deprived of the variety of tastes and intensity'], 'B',
          '“When deprived of…” = mệnh đề rút gọn ở dạng bị động: khi bị thiếu sự đa dạng và cường độ của vị giác. A và D sai cấu trúc; C cũng có thể chấp nhận nhưng “When deprived” tự nhiên và chỉ thời điểm rõ hơn.'),
        Q(21, GAPQ, ['insulin in blood that reacted overweight people increased', 'an increase in blood insulin reacted with overweight people', 'people reacted with an increase in blood insulin are overweight', 'overweight people reacted with an increase in blood insulin'], 'D',
          'Sau “revealed that” cần một mệnh đề đầy đủ: “overweight people reacted with an increase in blood insulin”.'),
        Q(22, GAPQ, ['a biological induced hunger for specific carbohydrates', 'a specific carbohydrates for biological induced hunger', 'a biologically specific induced hunger for carbohydrates', 'a specific, biologically induced hunger for carbohydrates'], 'D',
          'Trạng từ “biologically” bổ nghĩa cho “induced”, và tính từ “specific” đứng trước: “a specific, biologically induced hunger for carbohydrates”.')
      ]
    },
    {
      id: 'b5', short: 'Điền từ: A Great Composer', part: 'Part 2 · Reading',
      title: 'Điền từ vào bài “A Great Composer” (Câu 23–33)',
      instruction: 'Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase that best fits each of the numbered blanks.',
      passageTitle: 'A Great Composer',
      paras: [
        'The classical composer Ernst Hoffsberger, who passed away earlier this week, truly (23) ______ the world of contemporary classical music and was a great source of inspiration to a whole generation of (24) ______ young artists in various fields. In many ways his three symphonies completely (25) ______ the achievements of all other composers of the late twentieth century and by (26) ______ the classical genre with jazz, rock and latterly hip-hop, his work at times bore little (27) ______ to what is commonly considered to be classical.',
        'Born in California just after the Second World War, Hoffsberger had a strict religious upbringing during which he was taught classical piano by his father. He first found work as a(n) (28) ______ journalist, playing and composing music in his free time. During the late sixties, he worked together in (29) ______ with a number of other amateur musicians before finally (30) ______ professional with the first public performance of his inspirational Tenor Sax Concerto in 1971. From then on, throughout the seventies and eighties, each new work seemed to (31) ______ the limits of the orchestral medium and also helped to bring classical music to a wider audience.',
        'What many people consider Hoffsberger’s defining quality that kept his music fresh and original was that he never lost the human (32) ______ which gave him the ability to sit down and jam with musicians and artists from all (33) ______ of life.'
      ],
      questions: [
        Q(23, GAPQ, ['renovated', 'revolutionised', 'refurbished', 'restored'], 'B',
          '“Revolutionise” = tạo cuộc cách mạng. Renovate, refurbish, restore thường dùng cho việc sửa chữa, phục hồi công trình hoặc đồ vật.'),
        Q(24, GAPQ, ['budding', 'branching', 'blooming', 'bursting'], 'A',
          '“Budding” = mới chớm, đầy triển vọng: “budding young artists”.'),
        Q(25, GAPQ, ['overshadowed', 'overturned', 'overwhelmed', 'overcame'], 'A',
          '“Overshadow” = làm lu mờ: các bản giao hưởng của ông làm lu mờ thành tựu của những nhà soạn nhạc khác.'),
        Q(26, GAPQ, ['attaching', 'fusing', 'adjoining', 'co-joining'], 'B',
          '“Fuse A with B” = hòa trộn A với B (cổ điển với jazz, rock, hip-hop).'),
        Q(27, GAPQ, ['identification', 'similarity', 'resemblance', 'familiarity'], 'C',
          'Kết hợp từ “bear little resemblance to” = chẳng giống mấy với.'),
        Q(28, GAPQ, ['odd-job', 'non-contract', 'freelance', 'off-the-books'], 'C',
          '“Freelance journalist” = nhà báo tự do.'),
        Q(29, GAPQ, ['attribution', 'collaboration', 'contribution', 'combination'], 'B',
          '“In collaboration with” = hợp tác với.'),
        Q(30, GAPQ, ['getting', 'taking', 'turning', 'making'], 'C',
          '“Turn professional” = chuyển sang làm chuyên nghiệp.'),
        Q(31, GAPQ, ['overpass', 'encompass', 'bypass', 'surpass'], 'D',
          '“Surpass the limits” = vượt qua giới hạn. Encompass = bao gồm; bypass = đi vòng tránh.'),
        Q(32, GAPQ, ['touch', 'feeling', 'contact', 'aspect'], 'A',
          '“The human touch” = sự gần gũi, nét con người.'),
        Q(33, GAPQ, ['walks', 'corners', 'paths', 'routes'], 'A',
          'Thành ngữ “from all walks of life” = từ mọi tầng lớp trong xã hội.')
      ]
    },
    {
      id: 'b6', short: 'Đọc hiểu: Lãnh đạo', part: 'Part 2 · Reading',
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
        Q(34, 'What does the passage mainly discuss?', ['The problems faced by leaders', 'The roles of leaders in social groups', 'The relationship between leaders of social groups', 'How social groups determine who will lead them'], 'B',
          'Bài nêu cách một người trở thành lãnh đạo rồi tập trung vào hai vai trò lãnh đạo (instrumental và expressive). Vì vậy ý chính là vai trò của lãnh đạo trong nhóm. D chỉ khớp với đoạn 1.'),
        Q(35, 'The passage mentions all of the following ways by which people can become leaders EXCEPT ______.', ['formal election process', 'traditional cultural patterns', 'specific leadership training', 'recruitment'], 'C',
          'Đoạn 1 nhắc đến truyền thống văn hóa (cha mẹ), tự nổi lên, bầu cử và tuyển chọn. Không có “huấn luyện lãnh đạo”.'),
        Q(36, 'In mentioning “natural leaders” in paragraph 2, the author is making the point that ______', ['there is no proof that “natural leaders” exist', '“natural leaders” share a similar set of characteristics', '“natural leaders” are easily accepted by the members of a social group', 'few people qualify as “natural leaders”'], 'A',
          'Tác giả nói nhiều thập kỷ nghiên cứu vẫn không tìm được bằng chứng nhất quán về “natural leaders”.'),
        Q(37, 'Which of the following statements about leadership can be inferred from paragraph 2?', ['Most people desire to be leaders but can produce little evidence of their qualifications.', 'A person can best learn how to be an effective leader by doing research on leadership.', 'Few people succeed in sharing a leadership role with another person.', 'A person who is an effective leader of a particular group may not be an effective leader in another group.'], 'D',
          'Đoạn 2: bất kỳ ai cũng có thể là lãnh đạo nếu có phẩm chất đáp ứng nhu cầu của nhóm cụ thể đó. Suy ra, ở nhóm khác với nhu cầu khác, người đó có thể không còn hiệu quả.'),
        Q(38, 'The word “them” in paragraph 3 refers to ______.', ['group members', 'expressive leaders', 'goals of the group', 'tension and conflict'], 'A',
          '“…providing emotional support to group members and attempting to minimize tension and conflict among them” → “them” là group members.'),
        Q(39, 'The word “stable” in paragraph 3 is opposite in meaning to ______.', ['versatile', 'settled', 'sturdy', 'cohesive'], 'A',
          '“Stable” = ổn định, không đổi. Settled, sturdy, cohesive đều gần nghĩa với stable, còn “versatile” (hay thay đổi, biến hóa) là từ trái nghĩa gần nhất trong các lựa chọn.'),
        Q(40, 'A “secondary relationship” mentioned in paragraph 4 between a leader and the members of a group could best be characterized as ______.', ['unimportant', 'distant', 'enthusiastic', 'unreliable'], 'B',
          'Instrumental leaders có “secondary relationship” và chỉ nhận “a more distant respect”, tức mối quan hệ xa cách, không gần gũi cá nhân.'),
        Q(41, 'The word “resolve” in paragraph 4 is closest in meaning to ______.', ['talk about', 'find a solution to', 'avoid thinking about', 'avert repeating'], 'B',
          '“Resolve issues” = giải quyết vấn đề → find a solution to.')
      ]
    },
    {
      id: 'b7', short: 'Đọc hiểu: Tặng quà', part: 'Part 2 · Reading',
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
        Q(42, 'What is the main idea discussed in the passage?', ['Gift-giving may have certain drawbacks alongside its positive qualities.', 'Gift-giving, despite its uneconomical downsides, cultivates a positive social process.', 'Gift-recipients are widely acknowledged as considerably experienced in gift-giving.', 'Gifts can serve as implicit signals of thoughtfulness and consideration.'], 'A',
          'Bài nêu cả mặt tích cực (gắn kết quan hệ) lẫn hạn chế (lãng phí nguồn lực, người tặng chi quá tay) của việc tặng quà. Các đáp án khác chỉ nói một chi tiết hoặc đổi trọng tâm.'),
        Q(43, 'In paragraph 1, the word “ambivalent” most nearly means _____.', ['conflicted', 'unrealistic', 'apprehensive', 'supportive'], 'A',
          'Câu sau đó nêu hai cảm xúc đối lập (thích thú và e ngại), nên “ambivalent” = mâu thuẫn, giằng xé = conflicted.'),
        Q(44, 'The author indicates that people value gift-giving because they feel it _____.', ['functions as a form of self-expression', 'can serve to strengthen a relationship', 'requires the gift-recipients to share the same opinion', 'is an inexpensive way to show appreciation'], 'B',
          'Đoạn 1: gift-giving là “a powerful means to build stronger bonds” = củng cố mối quan hệ.'),
        Q(45, 'The author most likely uses the examples of gift-giving occasions in paragraph 1 to highlight the _____.', ['recent increase in the amount of money spent on gifts', 'number of special occasions involving gift-giving', 'anxiety gift-shopping causes for consumers', 'regularity with which people shop for gifts'], 'D',
          'Các dịp (đám cưới, sinh nhật…) được liệt kê ngay sau “most people regularly buy presents… throughout the year”, nhấn mạnh việc mua quà diễn ra đều đặn. B gần nghĩa nhưng trọng tâm là tần suất, không phải số lượng dịp.'),
        Q(46, 'The word “many” in line 6 paragraph 1 refers to _____.', ['presents', 'peers', 'gift-givers', 'gift-recipients'], 'C',
          '“Many relish the opportunity to buy presents…” → “many” chỉ nhiều người tặng quà (gift-givers).'),
        Q(47, 'In paragraph 3, the author indicates that the assumption made by gift-givers may be _____.', ['incorrect', 'insincere', 'fundamental', 'justified'], 'A',
          '“Such an assumption may be unfounded” = không có cơ sở, tức có thể không đúng (incorrect).'),
        Q(48, 'In paragraph 4, the word “construe” most probably means _____.', ['take', 'state', 'respond', 'understand'], 'D',
          '“Construe” = diễn giải, hiểu theo một cách nào đó → understand.'),
        Q(49, 'In paragraph 4, the word “ritual” cannot be replaced with_____.', ['tradition', 'trend', 'ceremony', 'etiquette'], 'B',
          '“Ritual” (nghi thức, thông lệ mang tính biểu tượng) có thể thay bằng tradition, ceremony, etiquette. “Trend” (xu hướng nhất thời) thì không.'),
        Q(50, 'The social psychologists mentioned in paragraph 2 would likely describe the “deadweight loss” phenomenon as ___.', ['disturbing', 'predictable', 'unprecedented', 'questionable'], 'B',
          '“That in itself is not surprising to social psychologists” → họ thấy hiện tượng này dễ đoán (predictable).')
      ]
    }
  ]
}];
