# MERN Todo

Ứng dụng quản lý task theo kiến trúc **MERN** (MongoDB · Express · React · Node.js), với giao diện dashboard dạng bảng / kanban và API REST.

---

## Tổng quan

| Lớp | Công nghệ chính |
|-----|-----------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, shadcn/ui (Base UI) |
| Backend | Node.js, Express 4, Mongoose 8 |
| Database | MongoDB |
| UI kit | shadcn/ui (`base-nova`), Tabler Icons, Inter |

**Tính năng hiện có**

- Xem danh sách task (table view)
- Tạo task mới qua modal (title, description, label, priority)
- Chuyển view Table / Kanban (Kanban đang placeholder)
- Lọc theo thời gian phía API (`today` · `week` · `month` · `all`)
- Cập nhật / xóa task qua API (UI chưa wire đầy đủ)

---

## Yêu cầu môi trường

- **Node.js** 18+ (khuyến nghị LTS)
- **npm** 9+
- **MongoDB** (local hoặc Atlas)

---

## Cài đặt

### 1. Clone & cài dependency

```bash
git clone <repo-url> mern-todo
cd mern-todo

cd backend && npm install
cd ../frontend && npm install
```

### 2. Cấu hình biến môi trường (backend)

Tạo file `backend/.env`:

```env
PORT=5001
MONGODB=mongodb://127.0.0.1:27017/mern-todo
# hoặc MongoDB Atlas:
# MONGODB=mongodb+srv://<user>:<password>@<cluster>/<db>

# production (serve frontend build):
# NODE_ENV=production
```

| Biến | Mô tả | Mặc định |
|------|--------|----------|
| `PORT` | Cổng API | `5001` |
| `MONGODB` | Connection string MongoDB | *(bắt buộc)* |
| `NODE_ENV` | `production` để serve `frontend/dist` | development |

### 3. Chạy development

Mở **2 terminal**:

```bash
# Terminal 1 — API
cd backend
npm run dev
# → http://localhost:5001

# Terminal 2 — UI
cd frontend
npm run dev
# → http://localhost:5173
```

CORS đã cấu hình cho origin `http://localhost:5173` ở môi trường non-production.

---

## Scripts

### Backend (`backend/`)

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy server với Nodemon |
| `npm start` | Chạy server production (`node`) |

### Frontend (`frontend/`)

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Vite dev server |
| `npm run build` | Build production → `frontend/dist` |
| `npm run preview` | Xem bản build local |
| `npm run lint` | ESLint |

---

## Stack & thư viện

### Backend

| Package | Vai trò |
|---------|---------|
| [express](https://expressjs.com/) | HTTP server / routing |
| [mongoose](https://mongoosejs.com/) | ODM MongoDB |
| [dotenv](https://github.com/motdotla/dotenv) | Load `.env` |
| [cors](https://github.com/expressjs/cors) | CORS (dev) |
| [nodemon](https://nodemon.io/) | Hot reload (dev) |

### Frontend

| Package | Vai trò |
|---------|---------|
| [react](https://react.dev/) / react-dom | UI (v19) |
| [vite](https://vite.dev/) | Bundler / dev server |
| [tailwindcss](https://tailwindcss.com/) v4 | Utility CSS |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | Plugin Tailwind cho Vite |
| [shadcn/ui](https://ui.shadcn.com/) | Component primitives (`base-nova`) |
| [@base-ui/react](https://base-ui.com/) | Headless primitives (Dialog, Popover, …) |
| [@tabler/icons-react](https://tabler.io/icons) | Icon set |
| [@fontsource-variable/inter](https://fontsource.org/) | Font Inter |
| [class-variance-authority](https://cva.style/) · [clsx](https://github.com/lukeed/clsx) · [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Variant / class utilities |
| [babel-plugin-react-compiler](https://react.dev/learn/react-compiler) | React Compiler (qua Vite Babel) |

> Gọi API hiện dùng **native `fetch`** trong `features/tasks/api`. Package `axios` có trong `package.json` nhưng chưa dùng cho flow tasks.

---

## Cấu trúc thư mục

```
mern-todo/
├── backend/
│   ├── package.json
│   ├── .env                 # không commit (xem .gitignore)
│   └── src/
│       ├── server.js        # entry: Express, CORS, routes, static (prod)
│       ├── config/
│       │   └── db.js        # kết nối MongoDB
│       ├── models/
│       │   └── Task.js      # schema Task
│       ├── controllers/
│       │   └── tasksControllers.js
│       └── routes/
│           └── tasksRouters.js
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js       # alias `@` → src/, React Compiler, Tailwind
│   ├── components.json      # cấu hình shadcn
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── lib/
│       │   └── utils.js     # cn() helper
│       ├── components/
│       │   └── ui/          # shadcn primitives (button, dialog, table, …)
│       └── features/
│           └── tasks/       # feature module (composition)
│               ├── index.js
│               ├── constants.js
│               ├── api/
│               │   └── tasksApi.js
│               ├── hooks/
│               │   └── useTasks.js
│               └── components/
│                   ├── TaskDashboard.jsx
│                   ├── TaskHeader.jsx
│                   ├── shared/
│                   │   └── TaskMeta.jsx      # Status / Priority / Badge
│                   ├── toolbar/
│                   │   ├── TaskToolbar.jsx
│                   │   ├── TaskFilters.jsx
│                   │   ├── ViewModeToggle.jsx
│                   │   └── CreateNewTask.jsx
│                   ├── table/
│                   │   ├── task-table.jsx
│                   │   ├── table-list.jsx
│                   │   └── table-item.jsx
│                   └── kanban/
│                       └── TaskKanban.jsx
│
└── docs/                    # design specs & implementation plans
```

### Kiến trúc frontend (feature-based)

Feature `tasks` tách rõ lớp:

```
UI (components)  →  hooks/useTasks  →  api/tasksApi  →  Express API
```

- **`api/`** — gọi HTTP, normalize `_id` → `id`
- **`hooks/`** — state `tasks` / `loading` / `error`, `createTask`
- **`components/`** — composition theo vùng (toolbar · table · kanban · shared)
- **`components/ui/`** — chỉ chứa primitive dùng chung, không chứa business logic

---

## API

Base URL (dev): `http://localhost:5001/api/tasks`

| Method | Path | Mô tả |
|--------|------|--------|
| `GET` | `/api/tasks?filter=all` | Lấy danh sách (+ `activeCount`, `completeCount`) |
| `POST` | `/api/tasks` | Tạo task |
| `PUT` | `/api/tasks/:id` | Cập nhật task |
| `DELETE` | `/api/tasks/:id` | Xóa task |

### Query `filter` (GET)

| Giá trị | Ý nghĩa |
|---------|---------|
| `today` | Task tạo từ 00:00 hôm nay *(mặc định backend)* |
| `week` | Từ thứ Hai tuần hiện tại |
| `month` | Từ ngày 1 tháng hiện tại |
| `all` | Tất cả |

Frontend hiện gọi với `filter=all`.

### Model `Task`

| Field | Type | Ghi chú |
|-------|------|---------|
| `title` | String | Bắt buộc |
| `description` | String | Tùy chọn |
| `status` | `active` \| `complete` | Mặc định `active` |
| `label` | String | Mặc định `Bug` |
| `priority` | `normal` \| `medium` \| `high` | Mặc định `normal` |
| `completedAt` | Date \| null | |
| `createdAt` / `updatedAt` | Date | timestamps |

### Ví dụ tạo task

```bash
curl -X POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fix login bug",
    "description": "Optional",
    "label": "Bug",
    "priority": "high"
  }'
```

---

## Production (gợi ý)

1. Build frontend:

```bash
cd frontend && npm run build
```

2. Chạy backend với `NODE_ENV=production` — Express sẽ serve `frontend/dist` và fallback SPA.

```bash
cd backend
NODE_ENV=production npm start
```

---

## Tài liệu thêm

- Design / plan nội bộ: `docs/superpowers/specs/`, `docs/superpowers/plans/`

---

## License

ISC (backend) · dự án cá nhân / học tập.
