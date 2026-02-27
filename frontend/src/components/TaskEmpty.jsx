import { FilterType } from "@/lib/data";
import { EqualApproximatelyIcon } from "lucide-react";

const TaskEmpty = ({ filter }) => (
  <div className="flex flex-col items-center justify-center h-full p-10 bg-foreground/5 rounded-lg">
    <EqualApproximatelyIcon className="mx-auto w-10 h-10 text-gray-500" />
    <h3 className="font-medium text-foreground text-cente text-lg">
      {filter === FilterType.all
        ? "Không có tác vụ nào"
        : filter === FilterType.active
          ? "Không có tác vụ nào đang làm"
          : "Không có tác vụ nào đã hoàn thành"}
    </h3>
    <p className="text-sm text-muted-foreground text-center">
      {filter === FilterType.all
        ? "Thêm mới tác vụ để bắt đầu."
        : `Chuyển sang "tất cả" để thấy task ${filter === FilterType.active ? "đang làm" : "đã hoàn thành"}`}
    </p>
  </div>
);

export default TaskEmpty;
