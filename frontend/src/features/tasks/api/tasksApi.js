const BASE_URL = "http://localhost:5001/api/tasks";

export function normalizeTasks(tasks = []) {
  return tasks.map((task) => ({
    ...task,
    id: task._id ?? task.id,
  }));
}

export async function fetchTasks({ filter = "all", signal } = {}) {
  const url = `${BASE_URL}?filter=${encodeURIComponent(filter)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Không thể tải tasks (${response.status})`);
  }

  const data = await response.json();

  return {
    tasks: normalizeTasks(data.tasks ?? []),
    activeCount: data.activeCount ?? 0,
    completeCount: data.completeCount ?? 0,
  };
}
