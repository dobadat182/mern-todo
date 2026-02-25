import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_KEY);
    console.log("Kết nối cơ sơ dữ liệu MongoDB thành công !");
  } catch (error) {
    console.log(`Lỗi kết nối CSDL ${error}`);
    process.exit(1);
  }
};
