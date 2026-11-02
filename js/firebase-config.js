/* ==========================================================================
   Cấu hình Firebase · Ôn tập THPT
   --------------------------------------------------------------------------
   Project: nham-19561
   Đã kết nối Firebase Auth (email/mật khẩu + Google).
   Tiến trình và bảng xếp hạng dùng Firestore khi đã tạo database + publish
   file firestore.rules trong repo này.

   Lưu ý: các giá trị dưới đây là cấu hình công khai của Firebase Web App,
   được phép đặt trong mã nguồn. Không đặt service account / private key ở đây.
   ========================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBqeA560MHjl9UiYiJ9ewz35wM75cuL3Ls',
  authDomain: 'nham-19561.firebaseapp.com',
  projectId: 'nham-19561',
  storageBucket: 'nham-19561.firebasestorage.app',
  messagingSenderId: '267755212231',
  appId: '1:267755212231:web:34e280e5820e4bb1285de2',
  measurementId: 'G-9NL4JPJSSL'

  // Nếu dùng Firebase Emulator khi phát triển, bật các dòng dưới:
  // , useEmulator: true
  // , emulatorHost: '127.0.0.1'
  // , emulatorPorts: { auth: 9099, firestore: 8080 }
};
