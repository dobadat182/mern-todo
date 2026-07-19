import { Badge } from "@/components/ui/badge"

export function TaskTypeBadge({ label }) {
  return (
    <Badge variant="outline" className="rounded-md font-medium">
      {label}
    </Badge>
  )
}
