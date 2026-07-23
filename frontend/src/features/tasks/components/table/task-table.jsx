import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import TableList from "./table-list";
import { IconLoader2 } from "@tabler/icons-react";

function TaskTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10 px-3">
          <Checkbox aria-label="Select all" />
        </TableHead>
        <TableHead className="w-25">Task</TableHead>
        <TableHead>Title</TableHead>
        <TableHead className="w-96">Description</TableHead>
        <TableHead className="w-25">Status</TableHead>
        <TableHead className="w-25">Priority</TableHead>
        <TableHead className="w-12" />
      </TableRow>
    </TableHeader>
  );
}

export function TaskTable({ data, loading }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TaskTableHeader />
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="py-8 px-3 text-center">
                <div className="flex items-center justify-center">
                  <IconLoader2 className="size-6 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <TableList data={data} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
