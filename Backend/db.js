import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("Connected,", conn.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
