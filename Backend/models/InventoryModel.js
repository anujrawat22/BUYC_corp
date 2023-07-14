// models/MarketplaceInventory.js
const mongoose = require("mongoose");

const MarketplaceInventorySchema = new mongoose.Schema({
  oemSpecs: { type: mongoose.Schema.Types.ObjectId, ref: "OEM_Specs" },
  kmsOnOdometer: { type: Number, required: true },
  price: { type: Number, required: true },
  majorScratches: { type: Boolean, required: true },
  originalPaint: { type: Boolean, required: true },
  accidentsReported: { type: Number, required: true },
  previousBuyers: { type: Number, required: true },
  registrationPlace: { type: String, required: true },
  dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const InventoryModel = mongoose.model(
  "MarketplaceInventory",
  MarketplaceInventorySchema
);

module.exports = { InventoryModel };
