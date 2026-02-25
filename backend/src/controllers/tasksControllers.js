export const getAllTasks = (req, res) => {
  res.status(200).send("Bạn có 1 task cần làm!");
};

export const createTask = (req, res) => {
  res.status(201).json({ message: "Thêm task thành công!" });
};

export const updateTask = (req, res) => {
  res.status(200).json({ message: "Thay đổi task thành công!" });
};

export const deleteTask = (req, res) => {
  res.status(200).json({ message: "Xóa task thành công!" });
};
