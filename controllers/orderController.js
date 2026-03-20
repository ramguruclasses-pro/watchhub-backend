import Order from "../models/orderModel.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0)
      return res.status(400).json({ message: "No order items" });

    // ✅ product field nahi lena — sirf naam, qty, price, image
    const cleanItems = orderItems.map(item => ({
      name:  item.name  || "Product",
      qty:   item.qty   || item.quantity || 1,
      price: item.price || 0,
      image: item.image || "",
    }));

    const order = await Order.create({
      user:            req.user._id,
      orderItems:      cleanItems,
      shippingAddress: shippingAddress || {},
      totalPrice:      totalPrice || 0,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders — admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/orders/:id/status — admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = req.body.status;
    if (req.body.status === "Delivered") order.deliveredAt = Date.now();
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};