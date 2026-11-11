# Ôn tập THPT (Cờ Tỷ Phú Edition)

Ứng dụng web hỗ trợ ôn tập THPT môn Tiếng Anh và Hóa học với giao diện lấy cảm hứng từ bàn cờ Tỷ Phú (Monopoly).

## Tính năng
- **Đăng nhập / Đăng ký**: hỗ trợ Firebase Authentication (email/mật khẩu + Google) khi đã cấu hình; tự động quay về đăng nhập cục bộ SHA-256 khi chưa có Firebase. Hướng dẫn bật Firebase nằm trong `SETUP.md`.
- **Giao diện Cờ Tỷ Phú (Monopoly Theme)**: Tông màu xanh bàn cờ (`#cde6d0`), đỏ Monopoly (`#d9232a`) và vàng kim (`#f5b800`), thẻ môn học thiết kế dạng Bằng khoán (Title Deed).
- **Nền tương tác "Bàn cờ sống"**: aurora chuyển động chậm, hạt sáng nối với nhau và các token pixel (xúc xắc, nhà, khách sạn, xu, sao, thẻ). Di chuột/chạm để đẩy token và tạo gợn sóng; nút **Nền động** lưu lựa chọn trên thiết bị. Nền tự chuyển tĩnh khi vào phòng thi, tự giảm tải trên điện thoại và tôn trọng `prefers-reduced-motion`.
- **Môn Tiếng Anh (6 đề Giữa HKI · 290 câu)**:
  - `anh.html` là cổng môn học kiểu Hóa; `anh-de-thi.html` gộp toàn bộ đề vào **một mục Giữa HKI**, không còn luyện riêng từng phần.
  - Chế độ **Luyện tập** (chấm và giải thích ngay sau mỗi câu, hỗ trợ điều hướng bằng phím mũi tên + Enter/Space) và **Thi thử** (bấm giờ, đánh dấu câu `⚑`, xác nhận trước khi nộp).
  - Hỗ trợ **Làm lại các câu sai** và lọc **Chỉ hiện câu sai** khi xem lại bài.
  - **Tự động lưu tiến độ** đang làm dở và lịch sử làm bài; đồng bộ tiến trình lên Firestore khi đăng nhập Firebase.
  - **Bảng xếp hạng riêng từng đề và từng chế độ** (Thi thử / Luyện tập), lưu điểm cao nhất theo tài khoản.
  - `anh-bai-tap.html` tải **PDF gốc** và **DOCX** của cả 6 đề; bản DOCX có đáp án tham khảo ở cuối. Mở nhanh một đề bằng `anh-de-thi.html?test=<id>&mode=exam|practice`.
- **Từ vựng & Idioms**:
  - `tu-vung.html` là cổng chọn 2 bộ; `tu-vung-hoc.html?type=vocab|idiom` là trang học tương ứng.
  - Mỗi bộ có cột **phụ lục** bên trái, flashcard lật thẻ, phát âm, xáo trộn, đánh dấu **đã thuộc/chưa thuộc** kèm lặp lại ngắt quãng và danh sách tra cứu + tìm kiếm.
  - Bộ **Từ vựng** gồm 2.220 mục: 20 mục từ đề thi, các chủ đề do quản trị viên tạo và **11 chủ đề ForumFlash** (2.200 mục) nhập từ `sources/forumflash-*.csv`; bộ **Idioms** gồm 302 thành ngữ chia 6 phụ lục (1–54, 55–109, …, 260–302).
  - Đã bỏ hoàn toàn khung **Thử thách phản xạ nhanh**.
- **Môn Hóa học**: Lý thuyết Ester – Lipid, Carbohydrate, mô phỏng phản ứng, **10 bộ bài tập/đề kiểm tra** (280 câu) dạng PDF + DOCX và **11 đề thi tương tác** (308 câu) có chấm điểm, đếm giờ, lời giải chi tiết, lưu tiến trình/lịch sử và **bảng xếp hạng riêng từng đề**.

## Giao diện quản trị
- Trang quản trị riêng: `admin.html`, chỉ mở được khi đăng nhập Google bằng **leducthangvt2009@gmail.com** (tài khoản email/mật khẩu cùng email cũng bị chặn). Người dùng thường không thấy link quản trị và không ghi được nội dung.
- Giao diện quản trị dạng dashboard: sidebar tối bên trái gồm **Tổng quan**, nhóm **Điều khiển nội dung** (Đề Tiếng Anh, Đề Hóa, Từ vựng & Idiom), **Quản lí Users** và **Cài đặt & GitHub**; topbar có tìm kiếm toàn cục, thông báo, link mở trang người dùng và avatar. Trên mobile, sidebar chuyển thành menu trượt.
- Quản trị viên có thể tạo/sửa đề **Tiếng Anh**, đề **Hóa học**, thêm **từ vựng/idiom**, quản lý chuyên mục Hóa, nhập/xuất JSON và tải file JSON lên. Trình soạn từ vựng cho chọn **Loại mục** (Từ vựng / Idioms), chọn một phụ lục có sẵn hoặc **Tạo chủ đề mới** (slug tự sinh từ tên hiển thị).
- Tab **Quản lí Users** tổng hợp người học từ dữ liệu công khai của bảng xếp hạng (`leaderboards/{category}/entries/{uid}`): số người học, tổng lượt làm bài, điểm tốt nhất trung bình, hoạt động 7 ngày, tìm kiếm/sắp xếp và xem chi tiết theo hạng mục. Người học xuất hiện sau khi hoàn thành và nộp một đề (đề Anh hoặc đề Hóa); tài khoản mới chưa có điểm sẽ chưa hiển thị. Danh sách tự làm mới khi mở lại tab sau 30 giây và có nút **Tải lại người học**. Trang chỉ đọc, không hiển thị email, mật khẩu hay tiến trình riêng tư và không có thao tác khóa/xóa tài khoản.
- Nội dung quản trị được lưu trong `content/english.json`, `content/hoa.json`, `content/vocab.json`. Trang người dùng tải các file này qua `js/content.js` và hợp nhất với đề tĩnh sẵn có; đề tĩnh trong `js/data-anh.js` và `js/exams-hoa/` không bị sửa.
- Thanh lưu cuối trang hiển thị trạng thái bản đang soạn: có thay đổi chưa lưu trong trình soạn thảo, có thay đổi chưa đăng, đang tải hoặc đang đăng. Nút **Đăng lên website** bị chặn nếu trình soạn thảo còn thay đổi chưa lưu.
- Để đăng nội dung, vào **Cài đặt & GitHub** trên trang quản trị và dán **fine-grained personal access token** của repo `leducthangvt2009-cpu/THPTQG` với quyền **Contents: Read and write**. Token chỉ lưu trong trình duyệt của quản trị viên, không nằm trong mã nguồn.
- Sau khi bấm **Đăng lên website**, hệ thống tạo một commit mới trên nhánh `main`; GitHub Pages có thể cần 1–2 phút để cập nhật. Bản nháp trên máy giúp tránh mất bài khi lỡ đóng tab.
- Từ vựng động dùng mã từ **1000** trở lên để không trùng 302 Idioms, 20 mục từ vựng đề thi và 2.200 mục ForumFlash (mã **10001–12200**) có sẵn; trường `type` quyết định mục hiển thị ở bộ Từ vựng hay Idioms.

## Lưu ý về tài khoản
- Khi chưa cấu hình Firebase, tài khoản, tiến trình, lịch sử và bảng xếp hạng được lưu trong `localStorage` của từng trình duyệt.
- Khi đã điền `js/firebase-config.js` và publish `firestore.rules`, tài khoản dùng Firebase Auth; tiến trình và điểm xếp hạng được đồng bộ giữa các thiết bị.
- Điểm xếp hạng hiện được gửi từ trình duyệt, phù hợp cho lớp học/tự ôn; nếu cần chống gian lận tuyệt đối hãy chuyển chấm điểm sang Cloud Functions.
- Không dùng mật khẩu quan trọng và không đặt khóa bí mật trong mã nguồn công khai.

> Cập nhật: đã sửa lỗi hiển thị công thức Hóa học, bổ sung 10 bộ bài tập/đề kiểm tra (280 câu) tại trang Bài tập Hóa học 12 và 11 đề thi tương tác (308 câu) tại trang Đề thi Hóa 12. Đã thêm Firebase Auth, đồng bộ tiến trình và bảng xếp hạng riêng từng đề (11 đề Hóa + 6 đề Tiếng Anh), cùng nền tương tác "Bàn cờ sống" có thể bật/tắt. Giao diện Tiếng Anh đã chuyển sang kiểu Hóa: gộp 6 đề vào mục **Giữa HKI** và bổ sung trang tải PDF/DOCX.
