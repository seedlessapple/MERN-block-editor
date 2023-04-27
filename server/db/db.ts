import mongoose from "mongoose";

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@test.2yc72ed.mongodb.net/?retryWrites=true&w=majority`

export const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
