import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const app = express();

app.get("/home/:username", (req, res) => {
  const name = req.params.username;
  res.send("kiss me " + name);
});

app.get("/health", (req, res) => {
  const appStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.status(appStatus === "Connected" ? 200 : 500).send(appStatus);
});


const startServer = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

connectDB();

const app = express();

app.get("/home/:username", (req, res) => {
  const name = req.params.username;
  res.send("kiss me " + name);
});

app.listen(port, () => {
  console.log(`\x1b[36m`, "Server is running kinto");
});
