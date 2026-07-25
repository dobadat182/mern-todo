import { useEffect, useState } from "react";

import {
  createTask as createTaskRequest,
  deleteTask as deleteTaskRequest,
  fetchTasks,
} from "../api/tasksApi";

export function useTasks({ filter = "all" } = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTasks({
          filter,
          signal: controller.signal,
        });
        setTasks(data.tasks);
      } catch (err) {
        if (err.code === "ERR_CANCELED" || err.name === "CanceledError") {
          return;
        }
        setError(err.message || "Không thể tải tasks");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => controller.abort();
  }, [filter]);

  async function createTask(payload) {
    const task = await createTaskRequest(payload);
    setTasks((prev) => [task, ...prev]);
    return task;
  }

  async function deleteTask(id) {
    await deleteTaskRequest(id);
    setTasks((prev) =>
      prev.filter((task) => task.id !== id && task._id !== id),
    );
  }

  return { tasks, loading, error, createTask, deleteTask };
}
