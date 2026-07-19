# Task Dashboard UI Design

**Date:** 2026-07-19  
**Status:** Approved (pending final user review of this spec)  
**Scope:** Frontend UI only — static layout with mock data

## Goal

Build a Task Management page that visually matches the provided reference (shadcn-style tasks table): header, toolbar, and data table. Use clear React composition. No backend integration in this phase.

## Non-goals

- Connecting to Express/Mongo API
- Working search, filters, sort, column visibility, or Add Task persistence
- Expanding the Task model (`label`, `priority`, multi-status enums)
- Auth / real user avatar

## Approach

**Manual composition with shadcn/ui primitives** (not TanStack Table).

Rationale: matches composition requirement, stays light for a static UI, and can later add interactivity without a large rewrite.

## Layout

Centered card-like page on a light gray background:

1. **Header** — title “Welcome back!”, subtitle about tasks this month, circular avatar (top right)
2. **Toolbar** — filter input, “+ Status”, “+ Priority”, “View”, primary “Add Task”
3. **Table** — checkbox, Task ID, Title (badge + text), Status, Priority, row actions (`…`)

## Component tree

```
App
└── TaskDashboard
    ├── DashboardHeader
    ├── TaskTableToolbar
    └── TaskDataTable
        ├── TaskTableHeader
        └── TaskTableRow (map)
            ├── TaskTypeBadge
            ├── TaskStatus
            ├── TaskPriority
            └── TaskRowActions
```

### Responsibilities

| Component | Responsibility |
|-----------|----------------|
| `TaskDashboard` | Page shell: background, max-width card, padding; composes children |
| `DashboardHeader` | Title, subtitle, avatar display |
| `TaskTableToolbar` | Presentational toolbar controls (no handlers beyond stubs) |
| `TaskDataTable` | Receives `tasks` array; renders header + rows |
| `TaskTableHeader` | Column labels + sort affordance icons (non-functional) |
| `TaskTableRow` | One task row; delegates badge/status/priority/actions |
| `TaskTypeBadge` | Label badge (`Documentation`, `Bug`, `Feature`) |
| `TaskStatus` | Icon + label (`In Progress`, `Backlog`, `Todo`) |
| `TaskPriority` | Icon + label (`High`, `Medium`, `Low`) |
| `TaskRowActions` | Ellipsis button only (no menu open) |

## Data

File: `frontend/src/data/tasks.js`

Shape:

```js
{
  id: "TASK-8782",
  title: "You can't compress the program without quantifying the open-source SSD pixel!",
  label: "Documentation", // Documentation | Bug | Feature
  status: "in_progress",  // in_progress | backlog | todo | done | canceled
  priority: "medium",     // high | medium | low
}
```

Include ~4–6 mock tasks aligned with the reference screenshot. Data is imported and passed down as props; no React state required for filtering/sorting.

## shadcn / dependencies

Add via CLI as needed:

- `input`, `badge`, `table`, `checkbox`, `avatar`

Already available: `button`, Tabler icons (`@tabler/icons-react`), Tailwind + theme from preset `b1YmsdpbM`.

Optional later (out of scope): `dropdown-menu`, `@tanstack/react-table`.

## Styling

- Follow existing shadcn theme tokens in `src/index.css`
- Page background: muted gray; content: white card with border / soft shadow / rounded corners
- Typography and spacing should closely match the reference; Inter Variable already wired by the preset
- Remove default Vite starter chrome (`App.css` hero, etc.) from the main view

## File layout (frontend)

```
frontend/src/
  App.jsx
  data/tasks.js
  pages/ (optional) or components/tasks/
    TaskDashboard.jsx
    DashboardHeader.jsx
    TaskTableToolbar.jsx
    TaskDataTable.jsx
    TaskTableHeader.jsx
    TaskTableRow.jsx
    TaskTypeBadge.jsx
    TaskStatus.jsx
    TaskPriority.jsx
    TaskRowActions.jsx
  components/ui/   # shadcn primitives
```

Prefer `components/tasks/` for feature components to keep `components/ui/` for primitives only.

## Behavior

- Static: clicks do not change application state
- Checkboxes may be uncontrolled for visual parity only
- No loading / error UI
- No routing beyond rendering the dashboard as the home view in `App.jsx`

## Success criteria

- Visual match to the reference at desktop width
- Clear React composition (one concern per component)
- Mock data drives the table
- `npm run build` succeeds
- No backend changes

## Follow-ups (explicitly later)

- Wire filters/search/sort to local state
- Connect to existing MERN API (may require schema changes)
- Implement Add Task dialog and row action menus
