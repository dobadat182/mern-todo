import TaskCard from "./TaskCard";
import TaskEmpty from "./TaskEmpty";

const TaskList = () => {
  let filter = "all";

  const filteredTasks = [
    {
      _id: "1",
      title: "Keep Going !",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Don't stop",
      status: "active",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmpty filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => {
        return <TaskCard key={task._id ?? index} task={task} index={index} />;
      })}
    </div>
  );
};

export default TaskList;
