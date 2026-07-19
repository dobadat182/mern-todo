import { IconSelector } from "@tabler/icons-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  )
}

export function TaskTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-10 px-3">
          <Checkbox aria-label="Select all" />
        </TableHead>
        <TableHead className="w-[100px]">Task</TableHead>
        <SortableHead>Title</SortableHead>
        <SortableHead className="w-[140px]">Status</SortableHead>
        <SortableHead className="w-[120px]">Priority</SortableHead>
        <TableHead className="w-10" />
      </TableRow>
    </TableHeader>
  )
}
