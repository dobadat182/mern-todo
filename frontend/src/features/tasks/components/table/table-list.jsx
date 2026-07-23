import { TableCell, TableRow } from "@/components/ui/table";

import TableItem from "./table-item";

export default function TableList({ data }) {
  if (data.length === 0) {
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

  return data.tasks.map((task, index) => (
    <TableItem key={task._id} task={task} index={index} />
  ));
}
