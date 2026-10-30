# Ôn tập THPT (Cờ Tỷ Phú Edition)

Ứng dụng web hỗ trợ ôn tập THPT môn Tiếng Anh, Hóa học và Sinh học với giao diện lấy cảm hứng từ bàn cờ Tỷ Phú (Monopoly).

## Tính năng
- **Đăng nhập / Đăng ký**: mật khẩu được băm SHA-256 kèm salt riêng, phiên đăng nhập có hạn 7 ngày và tự động nâng cấp mật khẩu cũ. Tài khoản admin mặc định `admin@gmail.com` / `admin123` sẽ buộc đổi mật khẩu ở lần đăng nhập đầu tiên.
- **Giao diện Cờ Tỷ Phú (Monopoly Theme)**: Tông màu xanh bàn cờ (`#cde6d0`), đỏ Monopoly (`#d9232a`) và vàng kim (`#f5b800`), thẻ môn học thiết kế dạng Bằng khoán (Title Deed).
- **Môn Tiếng Anh (6 đề · 290 câu · 7 phần mỗi đề)**:
  - Chế độ **Luyện tập** (chấm và giải thích ngay sau mỗi câu, hỗ trợ điều hướng bằng phím mũi tên + Enter/Space) và **Thi thử** (bấm giờ, đánh dấu câu `⚑`, xác nhận trước khi nộp).
  - Hỗ trợ **Luyện theo từng phần**, **Làm lại các câu sai** và lọc **Chỉ hiện câu sai** khi xem lại bài.
  - **Tự động lưu tiến độ** đang làm dở và lịch sử làm bài vào `localStorage` (an toàn cả khi duyệt web riêng tư).
- **Môn Hóa học & Sinh học**: Tóm tắt lý thuyết trọng tâm và mô phỏng phản ứng / phiên mã tương tác.

## Lưu ý về tài khoản
Trang là web tĩnh (GitHub Pages) nên tài khoản, tiến độ và lịch sử làm bài được lưu trong `localStorage` của từng trình duyệt, không đồng bộ giữa các thiết bị. Đây là lớp bảo vệ giao diện, không thay thế hệ thống đăng nhập máy chủ. Không dùng mật khẩu quan trọng và hãy đổi mật khẩu admin mặc định ngay sau lần đăng nhập đầu tiên.
