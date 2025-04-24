import mongoose, { Schema } from "mongoose";

const BusinessSchema = new mongoose.Schema({
  business_name: { type: String, required: true, unique: true },
  description: { type: String, },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category_tb'
  },
  town: { type: String, },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user_tb'
  },
  state: {
    type: String,
    enum: ["active", "inactive",],
    default: "active"
  },
  location: {
    lat: { type: String, },
    lng: { type: String, },
  },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });


export const Business = mongoose.model("business_tb", BusinessSchema);

// desc: item.desc,
// town: item.town,
// category: item.category,
// lat: item.lat,
// lng: item.lng,