# Tiến độ Dự án Xuexi Hanyu (🐼 学习汉语)

Bảng theo dõi tiến độ hoàn thành các tính năng của dự án.

## 1. Cơ sở dữ liệu (Database / CSDL)
- [x] Thiết kế Schema cho bảng `users` và `words`.
- [x] Tạo file script SQL [xuexi_hanyu.sql](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/xuexi_hanyu.sql) để khởi tạo.
- [x] Nạp dữ liệu mẫu (Seed data) cho HSK 1.
- [ ] Thiết kế bảng cho `lessons` (bài học) và `grammar` (ngữ pháp).

## 2. Backend (BE - Spring Boot)
- [x] Cấu hình kết nối PostgreSQL trong [application.properties](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/server/src/main/resources/application.properties).
- [x] Module Từ vựng (Vocabulary):
    - [x] Entity [Word.java](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/server/src/main/java/tanquoc73/app/entity/Word.java).
    - [x] Repository [WordRepository.java](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/server/src/main/java/tanquoc73/app/repository/WordRepository.java).
    - [x] Service [WordService.java](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/server/src/main/java/tanquoc73/app/service/WordService.java).
    - [x] Controller [WordController.java](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/server/src/main/java/tanquoc73/app/controller/WordController.java) (`/api/words`).
    - [x] Tự động nạp dữ liệu [WordSeeder.java](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/server/src/main/java/tanquoc73/app/config/WordSeeder.java).
- [ ] Module Người dùng (User):
    - [x] Entity cơ bản.
    - [ ] Hệ thống Authentication (JWT / Spring Security).
- [ ] Module Bài học & Ngữ pháp (Đang chờ triển khai).

## 3. Frontend (FE - Next.js)
- [x] Cấu hình khung dự án (Next.js 16, Tailwind, Framer Motion).
- [x] Trang chủ (Landing Page) với giao diện hiện đại.
- [x] Thanh điều hướng (Header/Nav):
    - [x] Sử dụng **Shadcn/ui DropdownMenu** chuyên nghiệp.
    - [x] Hỗ trợ mở bằng cách **Click** (thay vì Hover).
    - [x] Layout gọn gàng, không bị nhảy dòng, tối ưu hóa hiển thị.
    - [x] Tích hợp HSK Levels (1-6) và Nhóm tài nguyên.
- [x] Trang Từ vựng [vocabulary/page.tsx](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/website/app/%5Blocale%5D/vocabulary/page.tsx):
    - [x] Hiển thị danh sách thẻ từ vựng (Hanzi, Pinyin, Nghĩa).
    - [x] Kết nối API với Backend.
- [ ] Trang Bài học (`/lessons`) - *Chờ triển khai*.
- [ ] Trang Ngữ pháp (`/grammar`) - *Chờ triển khai*.

## 4. Trợ lý AI (Panda 🐼)
- [x] Tích hợp Google Gemini 2.0 Flash.
- [x] API Chat đơn bày (`/api/chat`).
- [x] Thiết lập tính cách "Gấu Panda" thân thiện, hỗ trợ song ngữ VI/EN.
- [ ] Tính năng AI chỉnh sửa lỗi ngữ pháp.

## 5. Đa ngôn ngữ (i18n)
- [x] Cấu hình `next-intl`.
- [x] Bản dịch [vi.json](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/website/messages/vi.json) và [en.json](file:///c:/Users/cutor/Desktop/Project/Xuexi_Hanyu_Website/website/messages/en.json).

---

*Cập nhật lần cuối: 14:01, 01/04/2026*
