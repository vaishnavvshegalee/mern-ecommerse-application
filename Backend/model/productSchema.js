import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    pid: {
      type: Number,
      required: true,
      unique: true,
    },

    pName: {
      type: String,
      required: true,
    },
    pQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema);

export default Product;
