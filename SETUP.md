# Hướng dẫn cài đặt và chạy web Ôn tập THPT

## 1. Chạy trực tiếp trên máy tính
- Tải toàn bộ mã nguồn về máy.
- Nháy đúp vào file `index.html` để mở ngay trên trình duyệt, hoặc dùng tiện ích **Live Server** trên VS Code.
- Khi chưa cấu hình Firebase, website tự chạy ở chế độ cục bộ: đăng nhập, tiến trình và bảng xếp hạng được lưu bằng `localStorage` trên từng thiết bị.

## 2. Đưa web lên mạng bằng GitHub Pages
1. Vào mục **Settings** của Repository trên GitHub.
2. Ở cột bên trái, chọn mục **Pages**.
3. Tại phần **Build and deployment** -> **Branch**, chọn nhánh `main` (hoặc `master`) và thư mục `/ (root)`.
4. Bấm **Save** và đợi khoảng 1–2 phút để GitHub cấp đường link trang web cho bạn.

## 3. Bật Firebase cho đăng nhập, tiến trình và bảng xếp hạng

### 3.1. Project đang dùng
Website đã được điền sẵn cấu hình của project **`nham-19561`** trong file `js/firebase-config.js`. Các giá trị này là cấu hình công khai của Firebase Web App, được phép đặt trong mã nguồn.

Nếu muốn dùng project khác, vào **Project settings** → **Your apps** → **Add app** → **Web** (`</>`), copy `firebaseConfig` và thay toàn bộ object trong `js/firebase-config.js`.

### 3.2. Bật Authentication (bắt buộc để đăng nhập thật)
1. Mở trực tiếp <https://console.firebase.google.com/project/nham-19561/authentication>.
2. Bấm **Get started** nếu Firebase hiển thị nút này.
3. Tab **Sign-in method**, bật:
   - **Email/Password** → **Enable** → **Save**.
   - **Google** → **Enable** → chọn email hỗ trợ → **Save**.
4. Tab **Settings** → **Authorized domains**, thêm:
   - `leducthangvt2009-cpu.github.io` (domain GitHub Pages của web).
   - `localhost` (thường có sẵn; dùng để chạy thử trên máy).
5. Nếu đăng nhập Google bị lỗi `auth/unauthorized-domain`, kiểm tra lại bước này.

### 3.3. Bật Authentication
1. Vào **Build** → **Authentication** → **Get started**.
2. Tab **Sign-in method**, bật:
   - **Email/Password**.
   - **Google** (chọn email hỗ trợ và lưu).
3. Tab **Settings** → **Authorized domains**, thêm:
   - `leducthangvt2009-cpu.github.io` (domain GitHub Pages của web).
   - `localhost` nếu chạy thử trên máy.
4. Nếu đăng nhập Google bị lỗi `auth/unauthorized-domain`, kiểm tra lại bước này.

### 3.4. Tạo Firestore
1. Mở trực tiếp <https://console.firebase.google.com/project/nham-19561/firestore>.
2. Bấm **Create database**, chọn chế độ **Production mode** (khuyến nghị).
3. Chọn khu vực gần Việt Nam, ví dụ `asia-southeast1`.
4. Vào tab **Rules**, dán toàn bộ nội dung file `firestore.rules` trong repo rồi bấm **Publish**.

Rules hiện tại:
- Mỗi người chỉ đọc/ghi được hồ sơ và tiến trình của chính mình.
- Bảng xếp hạng cho phép mọi người đọc, nhưng chỉ chủ tài khoản được ghi entry của mình.
- Mỗi đề/chế độ là một `category` riêng, ví dụ `hoa:de8:thi`, `hoa:de8:luyen`, `anh:anh-test-01:exam`.

### 3.5. Dữ liệu được lưu ở đâu?
- `users/{uid}`: hồ sơ, biệt danh.
- `users/{uid}/progress/{category}`: tiến trình đang làm dở.
- `leaderboards/{category}/entries/{uid}`: điểm cao nhất của mỗi tài khoản cho từng hạng mục.

### 3.6. Kiểm tra sau khi bật
1. Mở web, bấm **Đăng nhập / Đăng ký**.
2. Tạo tài khoản email hoặc đăng nhập Google.
3. Làm thử một đề, trả lời vài câu rồi tải lại trang ở thiết bị khác: bài làm phải được khôi phục.
4. Nộp bài: điểm phải xuất hiện trong bảng xếp hạng của đúng đề/chế độ.

### Lưu ý bảo mật
- Điểm số hiện được gửi từ trình duyệt nên chỉ phù hợp cho lớp học/tự ôn. Nếu cần chống gian lận tuyệt đối, hãy chuyển phần chấm điểm sang Cloud Functions và bắt buộc xác thực phía server.
- Không đặt mật khẩu admin hoặc khóa bí mật trong mã nguồn công khai.
