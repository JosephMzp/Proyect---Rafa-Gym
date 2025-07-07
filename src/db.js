import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Falta la variable MONGODB_URI");

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(">>> DB conectada");
  } catch (error) {
    console.error("Error conectando a DB:", error);
  }
};
