const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    requried: true,
  },
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MarketplaceInventory",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = { BookingModel };
