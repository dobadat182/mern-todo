import { IconLoader2 } from "@tabler/icons-react";

import { KANBAN_COLUMNS } from "../../constants";
import { KanbanColumn } from "./kanban-column";

/**
 * Kanban board UI — chỉ layout + group theo status.
 *
 * Props sẵn để bạn nối logic:
 * - tasks: list đã filter theo date (nên không filter status khi ở kanban)
 * - onUpdateTask(id, { status }) — gọi khi drop sang cột khác
 *
 * TODO (gợi ý triển khai với @dnd-kit/react đã cài sẵn):
 * 1. Bọc board bằng <DragDropProvider onDragEnd={...}>
 * 2. Card: useDraggable / useSortable (+ handleRef cho grip)
 * 3. Column: useDroppable({ id: status })
 * 4. onDragEnd → onUpdateTask(taskId, { status: target.id })
 * 5. (Nâng cao) useSortable + move() từ @dnd-kit/helpers để sort giữ chỗ
 */
export function TaskKanban({ tasks = [], loading = false, onUpdateTask: _onUpdateTask }) {
  const columns = KANBAN_COLUMNS.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === column.status),
  }));

  if (loading) {
    return (
      <div className="flex min-h-125 items-center justify-center rounded-xl border">
        <IconLoader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2" data-kanban-board>
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          status={column.status}
          title={column.title}
          icon={column.icon}
          tasks={column.tasks}
        />
      ))}
    </div>
  );
}
