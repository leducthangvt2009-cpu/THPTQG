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
      title: 'Từ vựng và ngữ pháp (Câu 1–10)',
      instruction: 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.',
      questions: [
        Q(1, 'My father is getting old and forgetful ______ he is experienced and helpful.', ['regardless', 'consequently', 'lest', 'be that as it may'], 'D', '“Be that as it may” = dù vậy / tuy nhiên, nối hai ý đối lập.'),
        Q(2, 'Last-minute withdrawal of the sponsor threw a ______ in the works to organize the cultural festivals.', ['caution', 'information', 'spanner', 'notice'], 'C', 'Thành ngữ “throw a spanner in the works” = gây trở ngại cho kế hoạch.'),
        Q(3, 'The first amusement park in our city was a ______ success for its owners. Everyone would go there to have a good time.', ['roaring', 'ringing', 'cracking', 'sparkling'], 'A', 'Kết hợp từ “a roaring success” = thành công vang dội.'),
        Q(4, 'We walk through a park, ______ had been uprooted in the storm. It was a scene of utter desolation.', ['that the most trees', 'whose most trees', 'most trees of which', 'most of whose trees'], 'D', 'Mệnh đề quan hệ chỉ sở hữu: “most of whose trees”.'),
        Q(5, '______ in Stevenson’s landscapes, the more vitality and character the painting seems to possess.', ['The loose brushwork is', 'The looser brushwork', 'The looser the brushwork is', 'The brushwork is loose'], 'C', 'So sánh kép: “The + so sánh hơn + S + V, the + so sánh hơn + S + V”.'),
        Q(6, 'It was ______ that he was kept in hospital for nearly a month.', ['a such serious accident', 'such serious an accident', 'so a serious accident', 'so serious an accident'], 'D', 'Cấu trúc “so + adj + a/an + N + that…”.'),
        Q(7, 'One of the most disappointing things in life is to be ______ by a friend when you truly need his or her support.', ['backed out', 'marked up', 'let down', 'stood for'], 'C', '“Let sb down” = làm ai thất vọng.'),
        Q(8, 'In the Netherlands, a highly successful biking scheme has been ______, which helps to reduce the carbon footprint associated with transportation.', ['originated', 'implemented', 'controlled', 'diverged'], 'B', '“Implement a scheme” = triển khai một chương trình.'),
        Q(9, 'By using public transports, everyone can contribute to the reduction of greenhouse gas emissions, which does ______ for the environment.', ['wonders', 'dreams', 'horizons', 'pearls'], 'A', 'Thành ngữ “do wonders for” = mang lại lợi ích rất lớn cho.'),
        Q(10, 'Due to ______, people can now enjoy foods and products from different cultures without leaving their home country.', ['globalism', 'globe', 'being globalized', 'globalization'], 'D', 'Sau “Due to” cần danh từ chỉ sự toàn cầu hóa: “globalization”.')
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
        'It is the one show that brings you a life-changing journey (12) ______ for the ambitious souls eager to carve their own paths. We’re bringing together life coaches, self-made entrepreneurs, and independence gurus to equip you (13) ______ the tools, knowledge, and confidence to take on the world.'
      ],
      questions: [
        Q(11, GAPQ, ['self-abandonment', 'self-condemnation', 'self-absorption', 'self-reliance'], 'D', '“Self-reliance” (tự lực) hợp với chủ đề independence.'),
        Q(12, GAPQ, ['tailoring', 'to tailor', 'tailor', 'tailored'], 'D', 'Rút gọn mệnh đề quan hệ bị động: “tailored for”.'),
        Q(13, GAPQ, ['on', 'in', 'for', 'with'], 'D', 'Cấu trúc “equip sb with sth”.')
      ]
    }
    /* Bạn có thể dán tiếp các block b3 -> b7 từ code trước vào đây */
  ]
}];
