import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

app.get("/health", (req, res) => {
  const appStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.status(appStatus === "Connected" ? 200 : 500).send(appStatus);
});


const startServer = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`\x1b[36m`, "Connected to MongoDB");
    app.listen(port, () => {
      console.log(`\x1b[36m`, "Server is running kinto");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    app.listen(port, () => {
      console.log(`\x1b[36m`, "Server is running kinto");
    });
  }
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

startServer();
