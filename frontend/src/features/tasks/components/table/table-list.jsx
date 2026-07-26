import { TableCell, TableRow } from "@/components/ui/table";

import TableItem from "./table-item";

export default function TableList({
  tasks = [],
  onDeleteTask,
  onUpdateTask,
  rowOffset = 0,
}) {
  if (tasks.length === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={7}
          className="py-8 text-center text-sm text-muted-foreground"
        >
          Không có task nào
        </TableCell>
      </TableRow>
    );
  }

  return tasks.map((task, index) => (
    <TableItem
      key={task.id ?? task._id}
      task={task}
      index={rowOffset + index}
      onDeleteTask={onDeleteTask}
      onUpdateTask={onUpdateTask}
    />
  ));
}
