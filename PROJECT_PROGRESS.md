# Tiến độ Dự án Xuexi Hanyu (🐼 学习汉语)

Bảng theo dõi tiến độ hoàn thành các tính năng của dự án.

## 1. Cơ sở dữ liệu (Database / CSDL)
- [x] Thiết kế Schema cho bảng `users` và `words`.
- [x] Tạo file script SQL [xuexi_hanyu.sql](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/xuexi_hanyu.sql) để khởi tạo.
- [x] Triển khai quan hệ Relational: `Category`, `Sentence`, `UserWordProgress`, `QuizHistory`.
- [x] Nạp dữ liệu mẫu (Seed data) tự động cho HSK 1.
- [x] Tích hợp Seeder từ file JSON (`complete.min.json`).
- [ ] Thiết kế bảng cho `lessons` (bài học) và `grammar` (ngữ pháp).

## 2. Backend (BE - Spring Boot)
- [x] Cấu hình kết nối PostgreSQL.
- [x] Module Từ vựng (Vocabulary) - **Nâng cấp Quan hệ**:
    - [x] Entity: `Word`, `Sentence`, `Category`, `UserWordProgress`, `QuizHistory`.
    - [x] Repositories & Services tương ứng.
    - [x] Controller `/api/words` hỗ trợ phân loại theo HSK Level.
- [x] **Security & Stability**:
    - [x] Triển khai `SecurityConfig` cho phép truy cập API công khai (`permitAll`).
    - [x] Cấu hình `JacksonConfig` hỗ trợ Java Time và bean management.
    - [x] Xử lý lỗi đệ quy JSON (Infinite Recursion) bằng `@JsonIgnore`.
- [ ] Module Người dùng (User):
    - [x] Entity cơ bản.
    - [ ] Hệ thống Authentication (JWT / Spring Security).

## 3. Frontend (FE - Next.js)
- [x] Cấu hình khung dự án (Next.js 16, Tailwind, Framer Motion).
- [x] **Tích hợp Backend (Integration)**:
    - [x] Đồng bộ Type System (TypeScript) với Schema mới.
    - [x] Cập nhật `vocabularyService` kết nối trực tiếp với Spring Boot API.
    - [x] Trang `/vocabulary` hiển thị dữ liệu thực tế từ Database (Hiển thị nhiều câu ví dụ).
- [x] UI/UX:
    - [x] Trang chủ (Landing Page) hiện đại.
    - [x] Thanh điều hướng (Header/Nav) với Dropdown chuyên nghiệp.
    - [x] Hỗ trợ đa ngôn ngữ (vi/en) cho tất cả các trang chính.

## 4. Trợ lý AI (Panda 🐼)
- [x] Tích hợp Google Gemini 2.0 Flash.
- [x] API Chat đơn giản (`/api/chat`).
- [x] Thiết lập tính cách "Gấu Panda" thân thiện, hỗ trợ song ngữ VI/EN.
- [ ] Tính năng AI chỉnh sửa lỗi ngữ pháp.

---

*Cập nhật lần cuối: 20:05, 01/04/2026*
