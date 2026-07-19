import { IconDots } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function TaskRowActions() {
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
  )
}
