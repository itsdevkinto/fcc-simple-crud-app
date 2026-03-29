import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/products.route.js";

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`\x1b[36m`, "Connected to MongoDB");
    return { success: true };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    setTimeout(connectDB, 5000);
    return { success: false, message: error.message };
  }
};

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`\x1b[36m`, "Server is running kinto on port", port);
  });
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

startServer();
