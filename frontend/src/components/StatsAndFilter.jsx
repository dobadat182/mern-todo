import { FilterIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Separator } from "./ui/separator";

const StatsAndFilter = ({
  activeTasks = 0,
  completedTasks = 0,
  filter = "all",
}) => {
  return (
    <div className="flex justify-between items-center">
      {/* Thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20 p-3 text-sm"
        >
          {activeTasks} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20 p-3 text-sm"
        >
          {completedTasks} {FilterType.completed}
        </Badge>
      </div>
      {/* Lọc */}
      <ButtonGroup>
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            className={type === filter ? "bg-black text-white" : ""}
          >
            <span>{FilterType[type]}</span>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default StatsAndFilter;
