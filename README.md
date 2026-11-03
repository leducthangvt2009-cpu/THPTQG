# Ôn tập THPT (Cờ Tỷ Phú Edition)

Ứng dụng web hỗ trợ ôn tập THPT môn Tiếng Anh và Hóa học với giao diện lấy cảm hứng từ bàn cờ Tỷ Phú (Monopoly).

## Tính năng
- **Đăng nhập / Đăng ký**: hỗ trợ Firebase Authentication (email/mật khẩu + Google) khi đã cấu hình; tự động quay về đăng nhập cục bộ SHA-256 khi chưa có Firebase. Hướng dẫn bật Firebase nằm trong `SETUP.md`.
- **Giao diện Cờ Tỷ Phú (Monopoly Theme)**: Tông màu xanh bàn cờ (`#cde6d0`), đỏ Monopoly (`#d9232a`) và vàng kim (`#f5b800`), thẻ môn học thiết kế dạng Bằng khoán (Title Deed).
- **Nền tương tác "Bàn cờ sống"**: aurora chuyển động chậm, hạt sáng nối với nhau và các token pixel (xúc xắc, nhà, khách sạn, xu, sao, thẻ). Di chuột/chạm để đẩy token và tạo gợn sóng; nút **Nền động** lưu lựa chọn trên thiết bị. Nền tự chuyển tĩnh khi vào phòng thi, tự giảm tải trên điện thoại và tôn trọng `prefers-reduced-motion`.
- **Môn Tiếng Anh (6 đề · 290 câu · 7 phần mỗi đề)**:
  - Chế độ **Luyện tập** (chấm và giải thích ngay sau mỗi câu, hỗ trợ điều hướng bằng phím mũi tên + Enter/Space) và **Thi thử** (bấm giờ, đánh dấu câu `⚑`, xác nhận trước khi nộp).
  - Hỗ trợ **Luyện theo từng phần**, **Làm lại các câu sai** và lọc **Chỉ hiện câu sai** khi xem lại bài.
  - **Tự động lưu tiến độ** đang làm dở và lịch sử làm bài; đồng bộ tiến trình lên Firestore khi đăng nhập Firebase.
  - **Bảng xếp hạng riêng từng đề và từng chế độ** (Thi thử / Luyện tập), lưu điểm cao nhất theo tài khoản.
- **Môn Hóa học**: Lý thuyết Ester – Lipid, Carbohydrate, mô phỏng phản ứng, **10 bộ bài tập/đề kiểm tra** (280 câu) dạng PDF + DOCX và **11 đề thi tương tác** (308 câu) có chấm điểm, đếm giờ, lời giải chi tiết, lưu tiến trình/lịch sử và **bảng xếp hạng riêng từng đề**.

## Giao diện quản trị
- Trang quản trị riêng: `admin.html`, chỉ mở được khi đăng nhập Google bằng **leducthangvt2009@gmail.com**. Người dùng thường không thấy link quản trị và không ghi được nội dung.
- Quản trị viên có thể tạo/sửa đề **Tiếng Anh**, đề **Hóa học**, thêm **từ vựng/idiom**, quản lý chuyên mục Hóa, nhập/xuất JSON và tải file JSON lên.
- Nội dung quản trị được lưu trong `content/english.json`, `content/hoa.json`, `content/vocab.json`. Trang người dùng tải các file này qua `js/content.js` và hợp nhất với đề tĩnh sẵn có; đề tĩnh trong `js/data-anh.js` và `js/exams-hoa/` không bị sửa.
- Để đăng nội dung, vào **Cài đặt & GitHub** trên trang quản trị và dán **fine-grained personal access token** của repo `leducthangvt2009-cpu/THPTQG` với quyền **Contents: Read and write**. Token chỉ lưu trong trình duyệt của quản trị viên, không nằm trong mã nguồn.
- Sau khi bấm **Đăng lên website**, hệ thống tạo một commit mới trên nhánh `main`; GitHub Pages có thể cần 1–2 phút để cập nhật. Bản nháp trên máy giúp tránh mất bài khi lỡ đóng tab.
- Từ vựng động dùng mã từ **1000** trở lên để không trùng 322 mục từ vựng/idiom có sẵn.

## Lưu ý về tài khoản
- Khi chưa cấu hình Firebase, tài khoản, tiến trình, lịch sử và bảng xếp hạng được lưu trong `localStorage` của từng trình duyệt.
- Khi đã điền `js/firebase-config.js` và publish `firestore.rules`, tài khoản dùng Firebase Auth; tiến trình và điểm xếp hạng được đồng bộ giữa các thiết bị.
- Điểm xếp hạng hiện được gửi từ trình duyệt, phù hợp cho lớp học/tự ôn; nếu cần chống gian lận tuyệt đối hãy chuyển chấm điểm sang Cloud Functions.
- Không dùng mật khẩu quan trọng và không đặt khóa bí mật trong mã nguồn công khai.

> Cập nhật: đã sửa lỗi hiển thị công thức Hóa học, bổ sung 10 bộ bài tập/đề kiểm tra (280 câu) tại trang Bài tập Hóa học 12 và 11 đề thi tương tác (308 câu) tại trang Đề thi Hóa 12. Đã thêm Firebase Auth, đồng bộ tiến trình và bảng xếp hạng riêng từng đề (11 đề Hóa + 6 đề Tiếng Anh), cùng nền tương tác "Bàn cờ sống" có thể bật/tắt.
