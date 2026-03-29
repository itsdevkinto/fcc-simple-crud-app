import mongoose from "mongoose";
import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
  const { name } = req.query; // Still works automatically!
  const filter = name ? { name: { $regex: name, $options: "i" } } : {};

  try {
    const products = await Product.find(filter);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch", error: error.message });
  }
};

const getProduct = async ({ params: { id } }, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Product ID" });
  }
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch", error: error.message });
  }
};

const createProduct = async ({ body }, res) => {
  try {
    const product = await Product.create(body);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: "Failed to create", error: error.message });
  }
};

const updateProduct = async ({ params: { id }, body }, res) => {
  try {
    const product = await Product.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!product) return res.status(404).send({ message: "Product not found" });
    res.status(200).send(product);
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 404;
    res.status(status).send({ message: error.message });
  }
};

const deleteProduct = async ({ params: { id } }, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Product ID" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    res.status(200).send({ message: "Product deleted" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete", error: error.message });
  }
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
