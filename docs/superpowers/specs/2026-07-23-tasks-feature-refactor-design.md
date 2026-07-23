# Tasks Feature Refactor Design

**Date:** 2026-07-23  
**Status:** Approved in conversation (option C)  
**Goal:** Làm phần task dễ quản lý hơn bằng feature folder + tách data khỏi UI + gộp component nhỏ.

## Problem

- `frontend/src/components/tasks/` có ~14 file (~490 dòng), nhiều file chỉ 10–40 dòng → khó định hướng.
- Fetch API nằm trong `TaskDashboard` → UI và data coupling.
- Mock `frontend/src/data/tasks.js` không còn dùng sau khi đã fetch API.

## Non-goals

- Không đổi backend / schema Task.
- Không thêm CRUD create/update/delete trong lần này.
- Không đụng `components/ui/*`.
- Không đổi visual design đáng kể (chỉ reorganize code).

## Target structure

```
frontend/src/features/tasks/
  api/tasksApi.js
  hooks/useTasks.js
  constants.js
  components/
    TaskDashboard.jsx
    TaskToolbar.jsx
    TaskHeader.jsx
    table/
      TaskTable.jsx
    kanban/
      TaskKanban.jsx
    shared/
      TaskMeta.jsx
  index.js
```

**Public API:** chỉ export `TaskDashboard` từ `features/tasks/index.js`.  
`App.jsx` import: `@/features/tasks`.

## File mapping (old → new)

| Old | New |
|-----|-----|
| `TaskDashboard.jsx` (fetch + UI) | `TaskDashboard.jsx` (orchestration only) + `hooks/useTasks.js` + `api/tasksApi.js` |
| `DashboardHeader.jsx` | `TaskHeader.jsx` |
| `TaskTableToolbar.jsx` + `ViewModeToggle.jsx` | `TaskToolbar.jsx` |
| `TaskDataTable.jsx` + `TaskTableHeader.jsx` + `TaskTableRow.jsx` + `TaskRowActions.jsx` | `table/TaskTable.jsx` |
| `TaskKanbanBoard.jsx` + `TaskKanbanColumn.jsx` + `TaskKanbanCard.jsx` | `kanban/TaskKanban.jsx` |
| `TaskStatus.jsx` + `TaskPriority.jsx` + `TaskTypeBadge.jsx` | `shared/TaskMeta.jsx` |
| Status/priority/kanban column configs (scattered) | `constants.js` |
| `data/tasks.js` | Xóa |

## Layer responsibilities

### `api/tasksApi.js`

- `BASE_URL = http://localhost:5001/api/tasks`
- `fetchTasks({ filter = "all", signal } = {})` → GET `?filter=...`
- Normalize: map mỗi task `_id` → `id`
- Throw Error nếu `!response.ok`
- Return shape: `{ tasks, activeCount, completeCount }`

### `hooks/useTasks.js`

- State: `tasks`, `loading`, `error`
- `useEffect` gọi `fetchTasks`, hỗ trợ `AbortController`
- Return: `{ tasks, loading, error }`
- Scope lần này: chỉ đọc (read). Không expose mutate helpers.

### `constants.js`

- `STATUS_CONFIG` cho `active` / `complete` (+ giữ key cũ nếu cần fallback)
- `PRIORITY_CONFIG` gồm `high` / `medium` / `normal` / `low`
- `KANBAN_COLUMNS`: `active` → Todo, `complete` → Done

### `shared/TaskMeta.jsx`

Export:

- `TaskStatus`
- `TaskPriority`
- `TaskTypeBadge`

Dùng chung bởi table row và kanban card.

### `components/TaskDashboard.jsx`

- `useTasks()` + `viewMode` state
- Render: Header → Toolbar → loading/error → Table hoặc Kanban
- Không chứa URL/fetch logic

## Data flow

```
App
 └─ TaskDashboard
     ├─ useTasks() → tasksApi.fetchTasks()
     ├─ TaskHeader
     ├─ TaskToolbar (viewMode)
     └─ TaskTable | TaskKanban  ← tasks[]
            └─ TaskMeta (status/priority/label)
```

## Cleanup

1. Xóa `frontend/src/components/tasks/**` sau khi migrate.
2. Xóa `frontend/src/data/tasks.js` nếu không còn import.
3. Cập nhật import trong `App.jsx`.

## Success criteria

- UI table/kanban hoạt động như hiện tại với API `localhost:5001/api/tasks?filter=all`.
- Không còn fetch trong component tree ngoài `tasksApi` / `useTasks`.
- Số file feature tasks ≤ 9 (không tính `index.js` nếu muốn tách; tổng khoảng 9–10 file).
- Import path ổn định qua `features/tasks`.

## Out of scope follow-ups (sau này)

- `VITE_API_URL` env
- Create / update / delete task
- Filter toolbar thật (status/priority search)
