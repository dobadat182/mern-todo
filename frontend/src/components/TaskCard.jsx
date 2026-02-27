import { FilterType } from "@/lib/data";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Check, Circle, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

const TaskCard = ({ task, index }) => {
  let isEditing = false;

  return (
    <Card
      className={cn(
        "p-4 border-0 shadow hover:shadow-lg transition-all duration-200 animate-fade-in group",
        task.status === FilterType.completed && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === FilterType.completed
              ? "bg-success text-success-foreground hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {task.status === FilterType.completed ? (
            <Check className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* Task Title */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={task.title}
              onChange={(e) => {}}
              onBlur={() => {}}
              onKeyDown={(e) => {}}
              placeholder="Cần phải làm gì ?"
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status == FilterType.completed
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
        </div>

        {/* Date Created */}
        <div className="flex item-center gap-1 mt-1">
          <Calendar className="size-3 text-muted-foreground shrink-0 " />
          <span className="text-xs text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>

          {task.completedAt && (
            <>
              <span className="text-xs text-muted-foreground">|</span>
              <Calendar className="size-3 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground">
                {new Date(task.completedAt).toLocaleDateString()}
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex item-center gap-2">
          <Button size="icon">
            <Pencil className="size-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
