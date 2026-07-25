import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PRIORITY_CONFIG, STATUS_CONFIG } from "../../constants";

export function TaskTypeBadge({ label }) {
  return (
    <Badge variant="outline" className="rounded-md font-medium">
      {label}
    </Badge>
  );
}

export function TaskStatus({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.todo;
  const Icon = config.icon;

  const items = Object.entries(STATUS_CONFIG).map(([value, config]) => ({
    value,
    label: config.label,
    icon: config.icon,
  }));

  const handleSelect = (value) => {
    console.log(value);
  };

  return (
    <>
      <Select items={items} onValueChange={handleSelect}>
        <SelectTrigger className="min-w-32">
          <SelectValue placeholder={config.label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(STATUS_CONFIG).map(([value, config]) => (
              <SelectItem key={value} value={value}>
                <Icon className="size-4 text-muted-foreground" aria-hidden />
                {config.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export function TaskPriority({ priority }) {
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.normal;
  const Icon = config.icon;

  return (
    <>
      <div className="flex items-center gap-2">
        {/* <Icon className="size-4 text-muted-foreground" aria-hidden /> */}
        <span>{config.label}</span>
      </div>
    </>
  );
}
