import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  }
});

const Test = mongoose.model("Test", testSchema);
export default Test;