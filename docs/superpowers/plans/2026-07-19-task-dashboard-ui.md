# Task Dashboard UI Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox syntax.

**Goal:** Static Task Management UI matching the reference screenshot, React composition, mock data only.

**Architecture:** Feature components under `components/tasks/`, shadcn primitives under `components/ui/`, mock data in `data/tasks.js`.

**Tech Stack:** React 19, Vite, Tailwind v4, shadcn/ui (base-nova), Tabler icons

## Global Constraints

- UI static — no filter/sort/API
- Match reference layout at desktop width
- One concern per component (see design spec)
- No backend changes

---

### Task 1: Add shadcn primitives

- [x] `npx shadcn@latest add input badge table checkbox avatar -y`
- [x] Verify files under `src/components/ui/`

### Task 2: Mock data + leaf components

- [x] Create `src/data/tasks.js` (4–6 tasks from reference)
- [x] Create `TaskTypeBadge`, `TaskStatus`, `TaskPriority`, `TaskRowActions`

### Task 3: Table + toolbar + header + dashboard

- [x] Create `TaskTableHeader`, `TaskTableRow`, `TaskDataTable`
- [x] Create `TaskTableToolbar`, `DashboardHeader`, `TaskDashboard`

### Task 4: Wire App + verify

- [x] Replace Vite starter in `App.jsx`; remove unused `App.css` usage
- [x] `npm run build` succeeds
