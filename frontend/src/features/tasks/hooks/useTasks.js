import { useEffect, useState } from "react";

import { fetchTasks } from "../api/tasksApi";

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
        const data = await fetchTasks({ filter, signal: controller.signal });
        setTasks(data.tasks);
      } catch (err) {
        if (err.name === "AbortError") return;
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

  return { tasks, loading, error };
}
