import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  qty:   { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  // ✅ product field hata diya — cart mein fake IDs hain
});

const orderSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [orderItemSchema],

  shippingAddress: {
    address: { type: String, default: "" },
    city:    { type: String, default: "" },
    pincode: { type: String, default: "" },
    phone:   { type: String, default: "" },
  },

  totalPrice:  { type: Number, required: true, default: 0 },
  isPaid:      { type: Boolean, default: false },
  paidAt:      { type: Date },
  status:      { type: String, default: "Not processed" },
  deliveredAt: { type: Date },

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;