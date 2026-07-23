import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableList from "./table-list";

function TaskTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10 px-3">
          <Checkbox aria-label="Select all" />
        </TableHead>
        <TableHead className="w-25">Task</TableHead>
        <TableHead>Title</TableHead>
        <TableHead className="w-35">Description</TableHead>
        <TableHead className="w-25">Status</TableHead>
        <TableHead className="w-25">Priority</TableHead>
        <TableHead className="w-10" />
      </TableRow>
    </TableHeader>
  );
}

export function TaskTable({ tasks }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TaskTableHeader />
        <TableBody>
          <TableList tasks={tasks} />
        </TableBody>
      </Table>
    </div>
  );
}
