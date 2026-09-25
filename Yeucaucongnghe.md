# SvelteKit

Trọng tâm là mô hình reactivity của Svelte, routing/load và ranh giới server–client của SvelteKit.

### Tầng 1A — Lỗi bắt buộc

*   Reactivity của Svelte và luồng cập nhật UI; biết state nào là local, state nào cần dùng chung.
*   Hàm `load` trong route và cách dữ liệu đi vào page.
*   Phân biệt code chạy server và code chạy client; tránh dùng browser API ở server hoặc lộ secret sang client.

### Tầng 1B — Lựa chọn theo mục tiêu ứng dụng

Không có số lượng cứng. Nhóm chọn các mục thực sự cần cho ứng dụng; đã chọn thì phải hiểu cơ chế, cấu hình và kết quả.

*   Form actions cho mutation/form submit.
*   SSR hoặc prerender theo loại trang.
*   Hooks cho xử lý chung (ví dụ auth/context).
*   Stores/context nếu có state dùng chung.
*   Streaming/deferred data nếu ứng dụng có dữ liệu chậm.
*   Adapter/deployment target nếu nhóm muốn nghiên cứu sâu khâu build/deploy.

### Minh chứng tối thiểu cần có

*   Có ít nhất một route dùng `load` và một tương tác làm thay đổi state/data.
*   Chỉ ra file/module nào chỉ chạy server và tại sao.
*   Nếu dùng form action/hook/store, phải có luồng sử dụng thật.

### Chưa được xem là đạt nếu chưa...

*   Chỉ viết component Svelte nhưng không dùng cơ chế của SvelteKit.
*   Đưa secret/API key vào code client.
*   Không phân biệt được dữ liệu nào được load ở server và dữ liệu nào sinh ở browser.

---

### Câu hỏi tự kiểm

*   "Hàm `load` này chạy ở đâu và khi nào?"
*   "Nếu đoạn code này dùng `window`/`localStorage` thì có chạy được ở server không?"
*   "Form action giải quyết vấn đề gì so với fetch thủ công?"

### Ví dụ phạm vi có thể kiểm tra tại chỗ

*(Đây chỉ là ví dụ. Để chính thức được ra từ chính đồ án đã nộp, không hỏi kiến thức ngoài phạm vi nhóm đã làm.)*

*   Thêm một form action vào một luồng có sẵn.
*   Chuyển một trang tính sang prerender/SSR phù hợp và giải thích.
*   Sửa một lỗi do dùng browser-only API sai phía.

> **LƯU Ý — VUE.JS KHÔNG KÈM NUXT**
> Danh mục chính thức hiện dùng Nuxt 4 cho hệ sinh thái Vue. Nhóm chỉ dùng Vue + Vite cần trao đổi với giảng viên để chốt lại công nghệ chính và yêu cầu tương ứng. Không tự mặc định rằng một Vue SPA cơ bản được xem là tương đương Nuxt.

---

# Tầng 3 — Nâng cao chung cho Web Frontend

Chỉ chọn khi phù hợp. Tầng 3 không phải danh sách “phải đủ 2 mục”; độ sâu và minh chứng quan trọng hơn số lượng.

*   **Kéo thả:** Xử lý drag/drop có state thật, lưu được thứ tự hoặc cấu trúc sau thao tác; không chỉ demo kéo một ô màu.
*   **Hoạt hoạ:** CSS View Transitions/Motion/GSAP… dùng có mục đích; nếu nói tối ưu phải quan sát bundle hoặc trải nghiệm chứ không chỉ thêm hiệu ứng.
*   **3D/Canvas/Data visualization:** Three.js/R3F/Konva/D3; cần có tương tác hoặc dữ liệu thật của demo, đồng thời kiểm soát hiệu năng.
*   **Danh sách lớn/virtualization:** Dùng virtual list cho dữ liệu lớn để thấy khác biệt; có so sánh render/scroll trước–sau.
*   **Realtime/cộng tác:** WebSocket/SSE/CRDT; cần xử lý kết nối, cập nhật trạng thái, reconnect hoặc conflict ở mức phù hợp.
*   **Rich editor:** TipTap/Lexical/Slate; cần dữ liệu có cấu trúc, lưu/khôi phục nội dung, không chỉ dùng editor mặc định.
*   **PWA/offline:** Service Worker/IndexedDB; phải chứng minh ứng dụng vẫn xử lý được một luồng khi mất mạng và đồng bộ lại khi có mạng.
*   **Accessibility/performance:** Kiểm tra keyboard/focus/ARIA hoặc Lighthouse/Core Web Vitals theo phạm vi; có số liệu và sửa ít nhất một vấn đề cụ thể.