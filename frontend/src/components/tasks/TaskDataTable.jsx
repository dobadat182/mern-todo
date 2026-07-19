import { Table, TableBody } from "@/components/ui/table"

import { TaskTableHeader } from "./TaskTableHeader"
import { TaskTableRow } from "./TaskTableRow"

export function TaskDataTable({ tasks }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TaskTableHeader />
        <TableBody>
          {tasks.map((task) => (
            <TaskTableRow key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
