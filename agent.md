# agent.md

Tài liệu bàn giao cho model AI/người tiếp nhận dự án **Ôn tập THPT (Cờ Tỷ Phú Edition)**.

- Cập nhật lần cuối: **2026-11-06**
- Ngôn ngữ giao diện: Tiếng Việt; nội dung đề Tiếng Anh dùng tiếng Anh.
- Trạng thái: website tĩnh, chạy trực tiếp trên GitHub Pages, không có bước build.

---

## 1. Project

**Tên dự án:** Ôn tập THPT — Cờ Tỷ Phú Edition.

**Mục đích:** website hỗ trợ học sinh lớp 12 ôn thi THPT môn **Tiếng Anh** và **Hóa học**, kết hợp lý thuyết, luyện đề tương tác, lưu tiến trình, bảng xếp hạng và tài liệu PDF/DOCX.

**Thông tin vận hành:**

| Hạng mục | Giá trị |
|---|---|
| Repository | `leducthangvt2009-cpu/THPTQG` |
| Nhánh chính | `main` |
| Website live | `https://leducthangvt2009-cpu.github.io/THPTQG/` |
| Trang quản trị | `https://leducthangvt2009-cpu.github.io/THPTQG/admin.html` |
| Hosting | GitHub Pages, thư mục gốc repo, có `.nojekyll` |
| Công nghệ | HTML, CSS, JavaScript thuần; Firebase Auth + Firestore; GitHub REST API |
| Build tool | Không có. Không cần `npm`, `node`, bundler hay framework |
| Giao diện | Monopoly/Cờ Tỷ Phú: xanh bàn cờ, đỏ Monopoly, vàng kim, viền đen, bóng khối |

**Điểm nhấn:**

- Landing `index.html` dạng bàn cờ với 3 thẻ môn: Đề Tiếng Anh, Từ vựng, Hóa học.
- Nền tương tác "Bàn cờ sống": aurora, hạt sáng, token pixel; có nút bật/tắt, lưu lựa chọn trong `localStorage`, tự giảm tải trên mobile và tôn trọng `prefers-reduced-motion`.
- Tiếng Anh: 6 đề **Giữa HKI** (290 câu) gộp trong một mục duy nhất, thi thử/luyện tập, bảng xếp hạng riêng từng đề/chế độ, kèm PDF + DOCX.
- Hóa học: lý thuyết Ester–Lipid, Carbohydrate; 11 đề tương tác (308 câu); 10 bộ tài liệu PDF/DOCX (280 câu); mô phỏng phản ứng.
- Từ vựng: flashcard, phát âm, quiz và bộ từ vựng/idiom tĩnh.
- Quản trị: dashboard riêng, soạn nội dung động, đăng lên GitHub, Quản lí Users chỉ đọc từ dữ liệu công khai của bảng xếp hạng.

---

## 2. Context

### 2.1. Người dùng và phạm vi

- Học sinh THPT, chủ yếu lớp 12, tự ôn thi giữa học kì 1 và thi THPT.
- Giáo viên/quản trị viên dùng `admin.html` để cập nhật đề, từ vựng và xem thống kê người học.
- Website không có backend riêng; dữ liệu người dùng nằm ở Firebase (hoặc `localStorage` khi chưa cấu hình Firebase).

### 2.2. Tiếng Anh — cấu trúc mới

Tiếng Anh được chuyển sang mô hình giống Hóa: **một cổng môn học + một trang luyện đề + một trang tài liệu**.

| Trang | Vai trò |
|---|---|
| `anh.html` | Landing tĩnh kiểu Hóa, 2 thẻ: **Đề thi tương tác** và **6 đề Giữa HKI – PDF + DOCX** |
| `anh-de-thi.html` | Trang luyện đề tương tác; toàn bộ 6 đề nằm trong mục **Giữa HKI** |
| `anh-bai-tap.html` | Tải/xem PDF gốc và DOCX của 6 đề |

**6 đề Tiếng Anh:**

| STT | ID trong `window.TESTS` | Tên hiển thị | Số câu | Thời lượng | File PDF/DOCX |
|---|---|---|---|---|---|
| Minh họa | `anh-midterm-hk1-2627` | Đề GK1 Lê Quý Đôn 26–27 (Mã đề 121) | 40 | 45 phút | `gk1-anh-12-minh-hoa-le-quy-don.*` |
| 01 | `anh-test-01` | Test 01 | 50 | 60 phút | `gk1-anh-12-de-01.*` |
| 02 | `anh-test-02` | Test 02 | 50 | 60 phút | `gk1-anh-12-de-02.*` |
| 03 | `anh-test-03` | Test 03 | 50 | 60 phút | `gk1-anh-12-de-03.*` |
| 04 | `anh-test-04` | Test 04 | 50 | 60 phút | `gk1-anh-12-de-04.*` |
| 05 | `anh-test-05` | Test 05 | 50 | 60 phút | `gk1-anh-12-de-05.*` |

Tổng: **290 câu**. Không còn giao diện luyện riêng từng phần; mỗi đề có 3 hành động: **Thi thử**, **Luyện tập**, **Tiếp tục** (nếu có tiến trình đang làm dở).

**Hành vi trang luyện đề:**

- Hero thống kê số đề, số câu, thang điểm 10 và khoảng thời lượng.
- Một tiêu đề duy nhất **Giữa HKI**, bên dưới là 6 `exam-card`.
- Chọn đề/chế độ cho bảng xếp hạng bằng `#enLbTest` và `#enLbMode`; đổi lựa chọn sẽ mount lại leaderboard.
- Hỗ trợ mở nhanh qua query string:
  - `anh-de-thi.html?test=anh-test-02&mode=exam`
  - `anh-de-thi.html?test=anh-midterm-hk1-2627&mode=practice`
  - `mode` không hợp lệ sẽ mặc định là `exam`.
- Hash nội bộ: `#lam-bai` (phòng thi) và `#ket-qua` (kết quả).
- Kết quả có điểm thang 10, số đúng/sai/bỏ trống, thời gian, thống kê từng phần, xem lại bài, làm lại câu sai, làm lại từ đầu và bảng xếp hạng của đề/chế độ tương ứng.

**Thi thử và luyện tập:**

- **Thi thử:** bấm giờ, đánh dấu câu `⚑`, xác nhận trước khi nộp, không lộ đáp án trong lúc làm.
- **Luyện tập:** chấm ngay sau mỗi câu, hiện đáp án đúng và lời giải; hỗ trợ điều hướng bằng phím mũi tên và Enter/Space.
- Tiến trình được lưu tự động vào `localStorage`, đồng bộ Firestore khi đăng nhập Firebase; lịch sử lưu tối đa 60 lượt gần nhất.
- Bảng xếp hạng chỉ ghi nhận khi làm **đủ toàn bộ đề**; điểm cao nhất theo tài khoản được giữ.

**Tài liệu PDF/DOCX:**

- PDF trong `bai-tap/anh/` là bản gốc, giữ nguyên nội dung và định dạng.
- DOCX được tạo lại từ đúng dữ liệu `window.TESTS` (do không có DOCX gốc), có thể chỉnh sửa và có **ĐÁP ÁN THAM KHẢO** ở cuối.
- Trang `anh-bai-tap.html` có 6 thẻ, mỗi thẻ gồm: Làm đề, Xem PDF, Tải DOCX.
- Nếu sửa nội dung đề, phải cập nhật đồng thời `js/data-anh.js`, PDF gốc (nếu có) và DOCX để tránh lệch nội dung.

### 2.3. Hóa học — hiện trạng

| Trang | Vai trò |
|---|---|
| `hoa.html` | Landing môn Hóa; 2 thẻ: Đề thi tương tác + Bài tập PDF/DOCX; link lý thuyết |
| `hoa-de-thi.html` | 11 đề tương tác, 308 câu; thi thử/luyện tập, bảng xếp hạng |
| `hoa-bai-tap.html` | 10 bộ tài liệu PDF/DOCX, 280 câu |
| `carbohydrate.html` | Lý thuyết Carbohydrate, mô phỏng, hình minh họa |
| `ester-lipid.html` | Lý thuyết Ester – Lipid, mô phỏng phản ứng |

- Dữ liệu đề Hóa nằm trong `js/exams-hoa/de8.js` … `de19.js` (trừ de13) và `setup.js`; logic trong `js/hoa-exam.js`; giao diện trong `css/hoa-exam.css`.
- Không thay đổi cấu trúc đề Hóa khi làm việc với Tiếng Anh, trừ khi có yêu cầu riêng.

### 2.4. Từ vựng

- Trang `tu-vung.html`, CSS `css/vocab.css`.
- Dữ liệu tĩnh khoảng 322 mục từ vựng/idiom; dữ liệu động do admin thêm có mã từ **1000** trở lên để tránh trùng.
- Có flashcard, phát âm, quiz; nội dung động lưu trong `content/vocab.json`.

### 2.5. Xác thực, tiến trình và bảng xếp hạng

- Cấu hình Firebase Web App: `js/firebase-config.js` (project `nham-19561`).
- Logic xác thực, đồng bộ, leaderboard: `js/cloud.js`.
- Khi Firebase chưa cấu hình hoặc lỗi mạng, ứng dụng fallback sang tài khoản cục bộ SHA-256, lưu trong `localStorage`.
- Firestore:
  - `users/{userId}/**`: chỉ chủ tài khoản đọc/ghi.
  - `leaderboards/{category}/entries/{userId}`: đọc công khai; chỉ chủ tài khoản được tạo/sửa/xóa entry của mình và `uid` phải khớp.
  - Category leaderboard được tạo từ ID đề + chế độ, ví dụ `anh-test-02::exam`, `hoa-de10::practice`.
- Không đọc `collectionGroup('entries')`; Quản lí Users lấy dữ liệu theo từng category đã biết.

### 2.6. Nội dung động và quản trị

- Trang người dùng tải `content/english.json`, `content/hoa.json`, `content/vocab.json` qua `js/content.js`; ưu tiên GitHub Raw, fallback bản local và cache `localStorage`.
- Dữ liệu tĩnh (`js/data-anh.js`, `js/exams-hoa/*`) không bị ghi đè; nội dung động được hợp nhất khi tải.
- `js/admin.js` là dashboard quản trị; `css/admin.css` là giao diện.
- Token GitHub fine-grained chỉ lưu trong trình duyệt admin, không nằm trong mã nguồn.
- Khi bấm **Đăng lên website**, admin tạo commit mới trên `main` qua GitHub REST API; GitHub Pages cần 1–2 phút để cập nhật.

### 2.7. Ràng buộc môi trường hiện tại

- Không có `node`, `npm`, `git`, `python` ổn định trong môi trường phát triển; thao tác repo dùng PowerShell + GitHub REST API.
- Có thể kiểm thử local bằng một HTTP server tĩnh (ví dụ Live Server của VS Code) tại thư mục gốc; cần MIME đúng cho `.pdf` và `.docx`.
- Word trên máy có thể ở trạng thái "Unlicensed Product"; DOCX được tạo trực tiếp bằng OOXML để không phụ thuộc Word COM.
- Nội dung tiếng Việt phải lưu **UTF-8**, không dùng encoding mặc định của Windows PowerShell 5.1 khi ghi file.

---

## 3. About us

**Ôn tập THPT** là dự án website học tập phi thương mại, được xây dựng và vận hành bởi **leducthangvt2009-cpu** nhằm giúp học sinh lớp 12 ôn tập Tiếng Anh và Hóa học thuận tiện hơn.

- Định hướng: nội dung bám sát cấu trúc THPT, dễ dùng trên điện thoại, miễn phí và không cần cài đặt.
- Không thu thập email/số điện thoại của người học; tên hiển thị trên bảng xếp hạng là nickname do người dùng đặt.
- Không có quảng cáo, không bán dữ liệu, không có mục đích thương mại.
- Kênh liên hệ/kỹ thuật: GitHub repository `leducthangvt2009-cpu/THPTQG`.
- Quản trị viên duy nhất: **leducthangvt2009@gmail.com** (chỉ dùng cho đăng nhập Google vào trang quản trị; không hiển thị công khai trong giao diện người học).

---

## 4. Rules

### 4.1. Quy tắc bắt buộc

1. **Không phá vỡ chức năng hiện có:** Firebase Auth, Firestore, tiến trình, lịch sử, bảng xếp hạng, nền tương tác, responsive mobile và giao diện Monopoly.
2. **Tiếng Anh chỉ có một mục "Giữa HKI":** không thêm lại tab/ danh sách luyện từng phần; không tách đề khỏi mục này.
3. **Giữ 3 trang Tiếng Anh:** `anh.html` (cổng), `anh-de-thi.html` (luyện đề), `anh-bai-tap.html` (PDF/DOCX). Không gộp lại thành một trang duy nhất nếu không có yêu cầu mới.
4. **Admin chỉ dùng Google `leducthangvt2009@gmail.com`:** tài khoản email/mật khẩu trùng email này phải bị chặn. Không mở quyền admin cho email khác.
5. **Quản lí Users chỉ đọc dữ liệu công khai:** chỉ dùng entry bảng xếp hạng; không hiển thị email, mật khẩu, tiến trình riêng tư hoặc dữ liệu `users/{uid}`. Không thêm chức năng khóa/xóa tài khoản.
6. **Không đưa bí mật vào repo:** GitHub token, mật khẩu, khóa riêng tư chỉ lưu trong trình duyệt/local; không hard-code vào HTML/JS.
7. **Không sửa dữ liệu tĩnh khi chưa cần:** `js/data-anh.js` và `js/exams-hoa/*` là nguồn gốc. Nếu sửa đề, phải kiểm tra lại số câu, đáp án, tiến trình và tài liệu PDF/DOCX liên quan.
8. **Giữ nguyên tên file PDF/DOCX:** `gk1-anh-12-minh-hoa-le-quy-don.*`, `gk1-anh-12-de-01.*` … `gk1-anh-12-de-05.*`.
9. **DOCX phải có đáp án tham khảo ở cuối** và mở được bằng Word; PDF phải là bản gốc, không chèn lại nội dung từ DOCX.
10. **Tăng version cache khi sửa CSS/JS:** đổi `?v=...` trong các file HTML liên quan để tránh trình duyệt dùng bản cũ.
11. **Giữ UTF-8:** mọi file `.html`, `.js`, `.css`, `.json`, `.md` phải đọc/ghi bằng UTF-8; không dùng mặc định ANSI của PowerShell.
12. **Không thêm framework/build step** nếu không thực sự cần; website phải tiếp tục chạy được bằng cách mở file tĩnh hoặc GitHub Pages.
13. **Kiểm tra mobile:** breakpoint chung `max-width: 959px`; không để tràn ngang; thanh làm bài mobile chỉ hiện lại khi ở đầu trang.
14. **Không đổi URL live** của các trang hiện có; có thể thêm query/hash nhưng phải giữ đường dẫn cũ hoạt động.
15. **Tôn trọng dữ liệu người dùng:** không xóa tiến trình/lịch sử/điểm của người khác; thao tác xóa chỉ dành cho chủ tài khoản hoặc admin đúng phạm vi đã định.

### 4.2. Quy ước khi sửa Tiếng Anh

- File dữ liệu: `js/data-anh.js`, mảng `window.TESTS`; mỗi đề có `id`, `subject: 'anh'`, `title`, `blocks`.
- Mỗi block có `id`, `short`, `part`, `title`, `instruction`, tùy chọn `passageTitle`, `paras`, `source`, và `questions`.
- Mỗi câu có `n`, `stem`, `opts` (4 đáp án), `ans` (A/B/C/D), `exp`.
- Câu sắp xếp đoạn văn dùng `stem` nhiều dòng; không tự ý đổi thứ tự đáp án nếu chưa cập nhật `ans` và lời giải.
- Landing `anh.html` và trang tài liệu `anh-bai-tap.html` là HTML tĩnh; không cần `js/content.js`.
- Trang luyện đề dùng CSS của Hóa (`css/hoa-exam.css`) cho hero/card/leaderboard; phần runner dùng CSS sẵn có của `style.css`.
- Giữ hành vi `?test=<id>&mode=exam|practice`; nếu thêm đề mới, cập nhật đồng thời 6 thẻ ở `anh-bai-tap.html` và tài liệu tương ứng.

### 4.3. Quy trình kiểm thử tối thiểu

1. Mở `index.html` → `anh.html` → `anh-de-thi.html` → `anh-bai-tap.html`.
2. Kiểm tra đủ 6 thẻ đề trong mục **Giữa HKI**; không còn `.part-list` hoặc tab luyện từng phần.
3. Bấm **Thi thử**, **Luyện tập**, **Tiếp tục**; kiểm tra đồng hồ, chọn đáp án, nộp bài, xem kết quả, xem lại bài.
4. Mở `?test=anh-test-02&mode=practice`; kiểm tra vào đúng đề và đúng chế độ.
5. Đổi select đề/chế độ ở bảng xếp hạng; kiểm tra tiêu đề leaderboard thay đổi.
6. Kiểm tra 6 PDF và 6 DOCX trả về HTTP 200, đúng MIME; DOCX mở được và có đáp án.
7. Kiểm tra mobile 390px: không tràn ngang, thẻ đề/hero/leaderboard/runner hiển thị được.
8. Kiểm tra console không có lỗi; kiểm tra `localStorage`/Firestore không bị mất tiến trình cũ.
9. Chạy `agent.md` này như checklist bàn giao trước khi push.

### 4.4. Quy trình phát hành

1. Sửa file trong thư mục repo local.
2. Kiểm thử local bằng HTTP server; kiểm tra PDF/DOCX và console.
3. Dọn file tạm (`tmp-*`) khỏi repo.
4. Cập nhật version query cho JS/CSS đã sửa.
5. Push các file thay đổi lên `main` qua GitHub API (không cần Git CLI).
6. Chờ GitHub Pages build 1–2 phút.
7. Mở URL live kèm cache-busting `?v=...`, kiểm tra lại landing, đề, tài liệu, admin và mobile.
8. Nếu lỗi, sửa và push tiếp; không force-push làm mất lịch sử.

---

## 5. Folder structure

```text
THPTQG-main/
├─ index.html                  # Landing bàn cờ, 3 thẻ môn
├─ anh.html                    # Cổng Tiếng Anh 12 (tĩnh, kiểu Hóa)
├─ anh-de-thi.html             # Luyện 6 đề Giữa HKI (tương tác)
├─ anh-bai-tap.html            # Tải PDF + DOCX 6 đề Tiếng Anh
├─ tu-vung.html                # Từ vựng, flashcard, quiz
├─ hoa.html                    # Cổng Hóa học 12
├─ hoa-de-thi.html             # 11 đề Hóa tương tác
├─ hoa-bai-tap.html            # 10 bộ tài liệu Hóa PDF/DOCX
├─ carbohydrate.html           # Lý thuyết Carbohydrate + mô phỏng
├─ ester-lipid.html            # Lý thuyết Ester – Lipid + mô phỏng
├─ admin.html                  # Dashboard quản trị (noindex)
├─ firestore.rules             # Security rules cho users + leaderboards
├─ .nojekyll                   # Tắt Jekyll cho GitHub Pages
├─ README.md                   # Giới thiệu, tính năng, hướng dẫn chung
├─ SETUP.md                    # Hướng dẫn chạy, GitHub Pages, Firebase
├─ agent.md                    # Tài liệu bàn giao này
│
├─ bai-tap/
│  ├─ anh/
│  │  ├─ gk1-anh-12-minh-hoa-le-quy-don.pdf
│  │  ├─ gk1-anh-12-minh-hoa-le-quy-don.docx
│  │  ├─ gk1-anh-12-de-01.pdf ... gk1-anh-12-de-05.pdf
│  │  └─ gk1-anh-12-de-01.docx ... gk1-anh-12-de-05.docx
│  └─ hoa/
│     └─ 10 bộ PDF + DOCX (bài 4–7, đề ôn chương 2, 6 đề GK1)
│
├─ content/
│  ├─ english.json             # Nội dung Tiếng Anh động do admin đăng
│  ├─ hoa.json                 # Nội dung Hóa động
│  └─ vocab.json               # Từ vựng/idiom động (mã >= 1000)
│
├─ css/
│  ├─ style.css                # Giao diện chung, header, card, runner, responsive
│  ├─ background.css           # Nền "Bàn cờ sống", token, aurora
│  ├─ hoa-exam.css             # Hero/card/leaderboard kiểu Hóa; dùng lại cho Tiếng Anh
│  ├─ vocab.css                # Trang từ vựng
│  ├─ ly-thuyet.css            # Trang lý thuyết Hóa
│  └─ admin.css                # Dashboard quản trị
│
├─ js/
│  ├─ app.js                   # Logic chung + toàn bộ luồng Tiếng Anh
│  ├─ data-anh.js              # window.TESTS: 6 đề Tiếng Anh, 290 câu
│  ├─ hoa-exam.js              # Logic 11 đề Hóa tương tác
│  ├─ exams-hoa/
│  │  ├─ setup.js              # Metadata/cấu hình đề Hóa
│  │  ├─ de8.js ... de12.js    # Dữ liệu đề Hóa
│  │  └─ de14.js ... de19.js   # Dữ liệu đề Hóa
│  ├─ cloud.js                 # Firebase Auth, tiến trình, leaderboard, fallback local
│  ├─ firebase-config.js       # Cấu hình Firebase Web App công khai
│  ├─ content.js               # Tải/hợp nhất content/*.json từ GitHub Raw + cache
│  ├─ admin.js                 # Toàn bộ dashboard quản trị + GitHub publish
│  └─ background.js            # Nền tương tác, token, reduced motion, toggle
│
└─ img/
   ├─ gk1/                     # Hình ảnh đề GK1 Hóa
   ├─ glucose-dang.png
   ├─ fructose-dang.png
   ├─ maltose.png
   └─ saccharose.png
```

### 5.1. Luồng tải trang Tiếng Anh

```text
index.html
  └─ anh.html
       ├─ anh-de-thi.html
       │    ├─ js/data-anh.js      (6 đề, 290 câu)
       │    ├─ js/content.js       (hợp nhất content/english.json)
       │    ├─ js/app.js           (renderEnglish / startAttempt / renderRunner / renderResult)
       │    ├─ js/cloud.js         (auth, progress, leaderboard)
       │    └─ css/hoa-exam.css    (hero, exam-card, lb-picker)
       └─ anh-bai-tap.html
            ├─ 6 PDF + 6 DOCX trong bai-tap/anh/
            └─ link quay lại anh-de-thi.html?test=<id>&mode=exam
```

### 5.2. Các hàm/khối chính trong `js/app.js`

- `initEnglishApp()` — khởi tạo trang Tiếng Anh, chờ `OntapContentReady`.
- `renderEnglish()` — hero, mục **Giữa HKI**, 6 `exam-card`, leaderboard, nút tải tài liệu.
- `mountEnglishLeaderboard()` — mount leaderboard theo `lbTest` + `lbMode`.
- `startAttempt()` / `resumeAttempt()` — bắt đầu hoặc khôi phục bài làm.
- `renderRunner()` — phòng thi, câu hỏi, palette, điều hướng phần.
- `finish()` / `doFinish()` — xác nhận và chấm điểm.
- `renderResult()` — kết quả, thống kê từng phần, xem lại, làm lại.
- `route()` — điều hướng `#lam-bai` / `#ket-qua`; đọc `?test=&mode=` khi mở trang.
- Các sự kiện `click`/`change`/`keydown` trong `app.js` xử lý chọn đáp án, đổi đề leaderboard, nộp bài, palette và phím tắt.

### 5.3. Ghi chú kỹ thuật

- `css/hoa-exam.css` được dùng chung cho landing/card Tiếng Anh; không sửa selector toàn cục của Hóa nếu không kiểm tra lại Hóa.
- `js/app.js` và `js/hoa-exam.js` độc lập; trang Hóa không gọi `initEnglishApp`, trang Tiếng Anh không gọi logic Hóa.
- `js/content.js` chỉ hợp nhất nội dung khi có `window.TESTS` / `window.HoaExams`; nếu GitHub Raw lỗi, dùng bản local/cache.
- Tất cả tài liệu DOCX Tiếng Anh được tạo từ dữ liệu `window.TESTS`; nếu cần tái tạo, dùng script OOXML trong lịch sử dự án (không dùng Word COM vì môi trường Word có thể bị treo/không bản quyền).
- Không thêm link admin vào menu người dùng; admin chỉ truy cập trực tiếp bằng URL và đăng nhập Google đúng email.
