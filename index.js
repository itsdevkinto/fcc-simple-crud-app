import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Test from "./models/test.model.js";
import Product from "./models/product.model.js";

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product);
    return res.status(201).send(product);
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

app.post("/api/test", async (req, res) => {
  try {
    const test = await Test.create(req.body);
    console.log(test);
    return res.status(201).send(test);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Failed to create", error: error.message });
  }
});

app.get("/health", (req, res) => {
  const appStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.status(appStatus === "Connected" ? 200 : 500).send(appStatus);
});

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`\x1b[36m`, "Connected to MongoDB");
    return {success: true}
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    setTimeout(connectDB, 5000);
    return {success: false, message: error.message}
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
