import { useEffect, useState } from "react";

import {
  createTask as createTaskRequest,
  deleteTask as deleteTaskRequest,
  fetchTasks,
  updateTask as updateTaskRequest,
} from "../api/tasks-api";

export function useTasks({ dateFilter = "all" } = {}) {
  const [tasks, setTasks] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTasks({
          dateFilter,
          signal: controller.signal,
        });
        setTasks(data.tasks);
        setActiveCount(data.activeCount);
        setCompleteCount(data.completeCount);
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
  }, [dateFilter]);

  async function createTask(payload) {
    const task = await createTaskRequest(payload);
    setTasks((prev) => [task, ...prev]);
    setActiveCount((prev) => prev + 1);
    return task;
  }

  async function deleteTask(id) {
    const removed = tasks.find((task) => task.id === id || task._id === id);
    await deleteTaskRequest(id);
    setTasks((prev) =>
      prev.filter((task) => task.id !== id && task._id !== id),
    );
    if (removed?.status === "completed") {
      setCompleteCount((prev) => Math.max(0, prev - 1));
    } else if (removed) {
      setActiveCount((prev) => Math.max(0, prev - 1));
    }
  }

  async function updateTask(id, payload) {
    const previous = tasks.find((task) => task.id === id || task._id === id);
    const updated = await updateTaskRequest(id, payload);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id || task._id === id ? { ...task, ...updated } : task,
      ),
    );

    if (previous && payload.status && previous.status !== updated.status) {
      const wasCompleted = previous.status === "completed";
      const isCompleted = updated.status === "completed";
      if (!wasCompleted && isCompleted) {
        setActiveCount((prev) => Math.max(0, prev - 1));
        setCompleteCount((prev) => prev + 1);
      } else if (wasCompleted && !isCompleted) {
        setCompleteCount((prev) => Math.max(0, prev - 1));
        setActiveCount((prev) => prev + 1);
      }
    }

    return updated;
  }

  return {
    tasks,
    activeCount,
    completeCount,
    loading,
    error,
    createTask,
    deleteTask,
    updateTask,
  };
}
