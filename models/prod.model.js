import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  }
});

const Prod = mongoose.model("Prod", prodSchema);
export default Prod;