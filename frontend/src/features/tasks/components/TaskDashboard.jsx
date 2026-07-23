import { useState, useEffect } from "react";

import { TaskHeader } from "./TaskHeader";
import { TaskKanban } from "./kanban/TaskKanban";
import { TaskTable } from "./table/task-table";
import { TaskToolbar } from "./toolbar/TaskToolbar";
import axios from "axios";

export function TaskDashboard() {
  const [viewMode, setViewMode] = useState("table");
  const [dataBuffer, setDataBuffer] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/tasks");
      setDataBuffer(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchTasks();
    console.log("dataBuffer", dataBuffer);
  }, []);

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-6">
        <TaskHeader />
        <TaskToolbar viewMode={viewMode} onViewModeChange={setViewMode} />

        {viewMode === "table" ? (
          <TaskTable data={dataBuffer} loading={loading} />
        ) : (
          // <TaskKanban tasks={dataBuffer} />
          <p className="text-sm text-muted-foreground">
            Không có view mode này
          </p>
        )}
      </div>
    </div>
  );
}
