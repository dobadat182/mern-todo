# Tasks Feature Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move task UI into `features/tasks` with `api` + `hooks` + merged components so the feature is easier to manage without changing behavior.

**Architecture:** Feature folder under `frontend/src/features/tasks/`. Data access lives in `api/tasksApi.js`, read state in `hooks/useTasks.js`, presentational UI in `components/` (table / kanban / shared). `App.jsx` imports only the public barrel `index.js`.

**Tech Stack:** React 19, Vite, Tailwind v4, shadcn/ui, Tabler icons, native `fetch` (no new deps)

## Global Constraints

- No backend / Task schema changes
- No create / update / delete in this refactor
- Do not modify `components/ui/*`
- Preserve current visual behavior (table + kanban `active`/`complete`)
- API: `http://localhost:5001/api/tasks?filter=all`
- Public export only: `TaskDashboard` from `@/features/tasks`
- Delete old `components/tasks/**` and unused `data/tasks.js` after switchover
- No new test runner — verify with Node assert script + `npm run build` + manual UI check

## File structure (target)

```
frontend/src/features/tasks/
  api/tasksApi.js
  hooks/useTasks.js
  constants.js
  components/
    TaskDashboard.jsx
    TaskToolbar.jsx
    TaskHeader.jsx
    table/TaskTable.jsx
    kanban/TaskKanban.jsx
    shared/TaskMeta.jsx
  index.js
```

---

### Task 1: Data layer — `constants` + `tasksApi` + `useTasks`

**Files:**
- Create: `frontend/src/features/tasks/constants.js`
- Create: `frontend/src/features/tasks/api/tasksApi.js`
- Create: `frontend/src/features/tasks/hooks/useTasks.js`

**Interfaces:**
- Consumes: `GET http://localhost:5001/api/tasks?filter=...` → `{ tasks, activeCount, completeCount }`
- Produces:
  - `STATUS_CONFIG`, `PRIORITY_CONFIG`, `KANBAN_COLUMNS`
  - `normalizeTasks(tasks)`, `fetchTasks({ filter, signal })`
  - `useTasks()` → `{ tasks, loading, error }`

- [ ] **Step 1: Create `constants.js`**

```js
import { IconArrowDown, IconArrowRight, IconArrowUp } from "@tabler/icons-react";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconHelpCircle,
  IconStopwatch,
} from "@tabler/icons-react";

export const STATUS_CONFIG = {
  active: { label: "Todo", icon: IconCircle },
  complete: { label: "Done", icon: IconCircleCheck },
  in_progress: { label: "In Progress", icon: IconStopwatch },
  backlog: { label: "Backlog", icon: IconHelpCircle },
  todo: { label: "Todo", icon: IconCircle },
  done: { label: "Done", icon: IconCircleCheck },
  canceled: { label: "Canceled", icon: IconCircleX },
};

export const PRIORITY_CONFIG = {
  high: { label: "High", icon: IconArrowUp },
  medium: { label: "Medium", icon: IconArrowRight },
  normal: { label: "Normal", icon: IconArrowRight },
  low: { label: "Low", icon: IconArrowDown },
};

export const KANBAN_COLUMNS = [
  { status: "active", title: "Todo", icon: IconCircle },
  { status: "complete", title: "Done", icon: IconCircleCheck },
];
```

- [ ] **Step 2: Create `api/tasksApi.js`**

```js
const BASE_URL = "http://localhost:5001/api/tasks";

export function normalizeTasks(tasks = []) {
  return tasks.map((task) => ({
    ...task,
    id: task._id ?? task.id,
  }));
}

export async function fetchTasks({ filter = "all", signal } = {}) {
  const url = `${BASE_URL}?filter=${encodeURIComponent(filter)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Không thể tải tasks (${response.status})`);
  }

  const data = await response.json();

  return {
    tasks: normalizeTasks(data.tasks ?? []),
    activeCount: data.activeCount ?? 0,
    completeCount: data.completeCount ?? 0,
  };
}
```

- [ ] **Step 3: Verify `normalizeTasks` with Node**

Run from repo root:

```bash
node --input-type=module -e "
import { createRequire } from 'module';
// Inline check mirroring normalizeTasks logic
const tasks = [{ _id: 'abc', title: 'T' }];
const normalized = tasks.map((t) => ({ ...t, id: t._id ?? t.id }));
if (normalized[0].id !== 'abc') throw new Error('normalize failed');
console.log('normalizeTasks OK');
"
```

Expected: `normalizeTasks OK`

(After files exist, prefer importing via a temporary check or rely on build; the inline assert above validates the contract.)

- [ ] **Step 4: Create `hooks/useTasks.js`**

```js
import { useEffect, useState } from "react";

import { fetchTasks } from "../api/tasksApi";

export function useTasks({ filter = "all" } = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTasks({ filter, signal: controller.signal });
        setTasks(data.tasks);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Không thể tải tasks");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();

    return () => controller.abort();
  }, [filter]);

  return { tasks, loading, error };
}
```

- [ ] **Step 5: Commit**

```bash
git add frontend/src/features/tasks/constants.js \
  frontend/src/features/tasks/api/tasksApi.js \
  frontend/src/features/tasks/hooks/useTasks.js
git commit -m "$(cat <<'EOF'
feat(tasks): add api, hook, and constants layers

EOF
)"
```

---

### Task 2: Shared meta + header + toolbar UI

**Files:**
- Create: `frontend/src/features/tasks/components/shared/TaskMeta.jsx`
- Create: `frontend/src/features/tasks/components/TaskHeader.jsx`
- Create: `frontend/src/features/tasks/components/TaskToolbar.jsx`

**Interfaces:**
- Consumes: `STATUS_CONFIG`, `PRIORITY_CONFIG` from `../../constants`
- Produces: `TaskStatus`, `TaskPriority`, `TaskTypeBadge`, `TaskHeader`, `TaskToolbar`

- [ ] **Step 1: Create `shared/TaskMeta.jsx`**

```jsx
import { Badge } from "@/components/ui/badge";

import { PRIORITY_CONFIG, STATUS_CONFIG } from "../../constants";

export function TaskTypeBadge({ label }) {
  return (
    <Badge variant="outline" className="rounded-md font-medium">
      {label}
    </Badge>
  );
}

export function TaskStatus({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.active;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" aria-hidden />
      <span>{config.label}</span>
    </div>
  );
}

export function TaskPriority({ priority }) {
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.normal;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" aria-hidden />
      <span>{config.label}</span>
    </div>
  );
}
```

- [ ] **Step 2: Create `TaskHeader.jsx`** (copy current `DashboardHeader` behavior)

```jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TaskHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Mern Todo</h1>
        <p className="text-sm text-muted-foreground">
          Build with Mongodb & React.js
        </p>
      </div>
      <Avatar>
        <AvatarImage src="https://avatar.vercel.sh/davis" alt="User avatar" />
        <AvatarFallback>DA</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

- [ ] **Step 3: Create `TaskToolbar.jsx`** (merge toolbar + view toggle)

```jsx
import { IconCirclePlus, IconLayoutKanban, IconTable } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function ViewModeToggle({ viewMode, onViewModeChange }) {
  return (
    <div
      className="inline-flex items-center rounded-lg border bg-background p-0.5"
      role="group"
      aria-label="View mode"
    >
      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-pressed={viewMode === "table"}
        className={cn(
          "h-7 gap-1.5 px-2.5",
          viewMode === "table" && "bg-muted text-foreground",
        )}
        onClick={() => onViewModeChange("table")}
      >
        <IconTable className="size-4" />
        Table
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-pressed={viewMode === "kanban"}
        className={cn(
          "h-7 gap-1.5 px-2.5",
          viewMode === "kanban" && "bg-muted text-foreground",
        )}
        onClick={() => onViewModeChange("kanban")}
      >
        <IconLayoutKanban className="size-4" />
        Kanban
      </Button>
    </div>
  );
}

export function TaskToolbar({ viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter tasks..."
          className="h-8 w-full max-w-xs lg:max-w-sm"
          readOnly
        />
        <Button type="button" variant="outline" size="sm" className="border-dashed">
          <IconCirclePlus data-icon="inline-start" />
          Status
        </Button>
        <Button type="button" variant="outline" size="sm" className="border-dashed">
          <IconCirclePlus data-icon="inline-start" />
          Priority
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <ViewModeToggle
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
        <Button
          type="button"
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/features/tasks/components/shared/TaskMeta.jsx \
  frontend/src/features/tasks/components/TaskHeader.jsx \
  frontend/src/features/tasks/components/TaskToolbar.jsx
git commit -m "$(cat <<'EOF'
feat(tasks): add shared meta, header, and toolbar

EOF
)"
```

---

### Task 3: Table + Kanban views

**Files:**
- Create: `frontend/src/features/tasks/components/table/TaskTable.jsx`
- Create: `frontend/src/features/tasks/components/kanban/TaskKanban.jsx`

**Interfaces:**
- Consumes: `TaskStatus`, `TaskPriority`, `TaskTypeBadge`; `KANBAN_COLUMNS`
- Produces: `TaskTable({ tasks })`, `TaskKanban({ tasks })`
- Task shape: `{ id, title, description?, label, status, priority }`

- [ ] **Step 1: Create `table/TaskTable.jsx`** (header + row + actions inlined)

```jsx
import { IconDots, IconSelector } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TaskPriority, TaskStatus, TaskTypeBadge } from "../shared/TaskMeta";

function SortableHead({ children, className }) {
  return (
    <TableHead className={className}>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1 hover:text-foreground"
      >
        {children}
        <IconSelector className="size-4 text-muted-foreground" aria-hidden />
      </button>
    </TableHead>
  );
}

function TaskRowActions() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8 data-[state=open]:bg-muted"
      aria-label="Open menu"
    >
      <IconDots className="size-4" />
    </Button>
  );
}

function TaskTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10 px-3">
          <Checkbox aria-label="Select all" />
        </TableHead>
        <SortableHead className="w-25">Task</SortableHead>
        <TableHead>Title</TableHead>
        <TableHead className="w-35">Description</TableHead>
        <SortableHead className="w-25">Status</SortableHead>
        <SortableHead className="w-25">Priority</SortableHead>
        <TableHead className="w-10" />
      </TableRow>
    </TableHeader>
  );
}

function TaskTableRow({ task, index }) {
  return (
    <TableRow>
      <TableCell className="px-3">
        <Checkbox aria-label={`Select ${task.id}`} />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <div className="flex max-w-120 items-center gap-2">
          <TaskTypeBadge label={task.label} />
          <span className="truncate">{task.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <span>{task.description}</span>
      </TableCell>
      <TableCell>
        <TaskStatus status={task.status} />
      </TableCell>
      <TableCell>
        <TaskPriority priority={task.priority} />
      </TableCell>
      <TableCell>
        <TaskRowActions />
      </TableCell>
    </TableRow>
  );
}

export function TaskTable({ tasks }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TaskTableHeader />
        <TableBody>
          {tasks.map((task, index) => (
            <TaskTableRow key={task.id} task={task} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

- [ ] **Step 2: Create `kanban/TaskKanban.jsx`**

```jsx
import { KANBAN_COLUMNS } from "../../constants";
import { TaskPriority, TaskTypeBadge } from "../shared/TaskMeta";

function TaskKanbanCard({ task }) {
  return (
    <article className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {task.id}
        </span>
        <TaskTypeBadge label={task.label} />
      </div>
      <p className="mb-3 line-clamp-3 text-sm font-medium leading-snug">
        {task.title}
      </p>
      <TaskPriority priority={task.priority} />
    </article>
  );
}

function TaskKanbanColumn({ title, icon: Icon, tasks }) {
  return (
    <section className="flex min-h-[28rem] min-w-[260px] flex-1 flex-col rounded-xl border bg-muted/30">
      <header className="flex items-center gap-2 border-b px-3 py-2.5">
        {Icon ? <Icon className="size-4 text-muted-foreground" aria-hidden /> : null}
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
          {tasks.length}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {tasks.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-muted-foreground">
            No tasks
          </p>
        ) : (
          tasks.map((task) => <TaskKanbanCard key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}

export function TaskKanban({ tasks }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1">
      {KANBAN_COLUMNS.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status,
        );

        return (
          <TaskKanbanColumn
            key={column.status}
            title={column.title}
            icon={column.icon}
            tasks={columnTasks}
          />
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/features/tasks/components/table/TaskTable.jsx \
  frontend/src/features/tasks/components/kanban/TaskKanban.jsx
git commit -m "$(cat <<'EOF'
feat(tasks): add merged table and kanban views

EOF
)"
```

---

### Task 4: Dashboard + barrel + switch App + cleanup

**Files:**
- Create: `frontend/src/features/tasks/components/TaskDashboard.jsx`
- Create: `frontend/src/features/tasks/index.js`
- Modify: `frontend/src/App.jsx`
- Delete: entire `frontend/src/components/tasks/` directory
- Delete: `frontend/src/data/tasks.js` (if unused)

**Interfaces:**
- Consumes: `useTasks`, `TaskHeader`, `TaskToolbar`, `TaskTable`, `TaskKanban`
- Produces: `export { TaskDashboard } from "./components/TaskDashboard"`

- [ ] **Step 1: Create `TaskDashboard.jsx`** (no fetch URL here)

```jsx
import { useState } from "react";

import { useTasks } from "../hooks/useTasks";
import { TaskHeader } from "./TaskHeader";
import { TaskKanban } from "./kanban/TaskKanban";
import { TaskTable } from "./table/TaskTable";
import { TaskToolbar } from "./TaskToolbar";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const { tasks, loading, error } = useTasks();

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-6">
        <TaskHeader />
        <TaskToolbar viewMode={viewMode} onViewModeChange={setViewMode} />

        {loading ? (
          <p className="text-sm text-muted-foreground">Đang tải tasks...</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : viewMode === "table" ? (
          <TaskTable tasks={tasks} />
        ) : (
          <TaskKanban tasks={tasks} />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `index.js`**

```js
export { TaskDashboard } from "./components/TaskDashboard";
```

- [ ] **Step 3: Update `App.jsx`**

```jsx
import { TaskDashboard } from "@/features/tasks";

function App() {
  return <TaskDashboard />;
}

export default App;
```

- [ ] **Step 4: Delete old files**

```bash
rm -rf frontend/src/components/tasks
rm -f frontend/src/data/tasks.js
```

Confirm no remaining imports:

```bash
rg "components/tasks|data/tasks" frontend/src
```

Expected: no matches

- [ ] **Step 5: Build**

```bash
cd frontend && npm run build
```

Expected: build succeeds with no unresolved import errors

- [ ] **Step 6: Manual smoke check**

1. Backend running on `:5001`
2. `cd frontend && npm run dev`
3. Open app → table shows API tasks
4. Toggle Kanban → columns Todo / Done

- [ ] **Step 7: Commit**

```bash
git add frontend/src/features/tasks frontend/src/App.jsx
git add -u frontend/src/components/tasks frontend/src/data/tasks.js
git commit -m "$(cat <<'EOF'
refactor(tasks): migrate to features/tasks and remove old components

EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| `api/tasksApi.js` with normalize + fetch | Task 1 |
| `hooks/useTasks.js` | Task 1 |
| `constants.js` | Task 1 |
| `TaskMeta` / Header / Toolbar merge | Task 2 |
| Table + Kanban merge | Task 3 |
| Dashboard orchestration only | Task 4 |
| Barrel + App import | Task 4 |
| Delete old `components/tasks` + mock data | Task 4 |
| No CRUD / no UI kit changes | All tasks |
