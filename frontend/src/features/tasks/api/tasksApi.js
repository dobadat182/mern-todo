import api from "@/lib/axios";

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.message || fallback;
}

export function normalizeTask(task) {
  return {
    ...task,
    id: task._id ?? task.id,
  };
}

export async function fetchTasks({ filter = "all", signal } = {}) {
  try {
    const { data } = await api.get("/", {
      params: { filter },
      signal,
    });

    return {
      tasks: (data.tasks ?? []).map(normalizeTask),
      activeCount: data.activeCount ?? 0,
      completeCount: data.completeCount ?? 0,
    };
  } catch (error) {
    if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
      throw error;
    }
    throw new Error(getErrorMessage(error, "Không thể tải tasks"));
  }
}

export async function createTask(payload) {
  try {
    const { data } = await api.post("/", payload);
    return normalizeTask(data);
  } catch (error) {
    throw new Error(getErrorMessage(error, "Không thể tạo task"));
  }
}

export async function deleteTask(id) {
  try {
    const { data } = await api.delete(`/${id}`);
    return normalizeTask(data);
  } catch (error) {
    throw new Error(getErrorMessage(error, "Không thể xóa task"));
  }
}
