import mongoose, { Schema } from "mongoose";

const productScema = new mongoose.Schema({
  product_name: { type: String, required: true, unique: true },
  description: { type: String, },
  price: { type: String, },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'business_tb'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  images: [String], 
  state: {
    type: String,
    enum: ["active", "inactive",],
    default: "active"
  },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const ProductModel = mongoose.model("product_tb", productScema);

