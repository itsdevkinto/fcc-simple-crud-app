import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Failed to fetch", error: error.message });
  }
});

app.get("/api/product/:id", async ({ params: { id } }, res) => {
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Failed to fetch", error: error.message });
  }
});

app.put("/api/product/:id", async ({ params: { id }, body }, res) => {
  try {
    const product = await Product.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(product);
    if (!product) {
      console.log("Product not found");
      return res.status(404).send({ message: "Product not found" });
    }
    return res.status(200).send(product);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).send({ message: "Invalid ID format" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: error.message });
    }

    return res.status(500).send({ message: error.message });
  }
});

app.delete("/api/product/:id", async ({ params: { id } }, res) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Failed to delete", error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product);
    return res.status(201).send(product);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "Failed to create", error: error.message });
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
