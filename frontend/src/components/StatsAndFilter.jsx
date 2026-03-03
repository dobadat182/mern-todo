import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { cn } from "@/lib/utils";
import { useState } from "react";

const StatsAndFilter = ({ activeTasks = 0, completedTasks = 0 }) => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (type) => {
    setFilter(type);
  };

  return (
    <div className="flex justify-between items-center">
      {/* Statistics */}
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

      {/* Filters */}
      <ButtonGroup className={"border rounded-lg"}>
        {Object.keys(FilterType).map((type, index) => (
          <Button
            onClick={() => handleFilter(type)}
            key={type}
            variant={`${type !== filter ? "ghost" : "default"}`}
            className={cn(
              "cursor-pointer",
              type === filter && "bg-black text-white",
            )}
          >
            <span>{FilterType[type]}</span>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default StatsAndFilter;
