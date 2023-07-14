const mongoose = require("mongoose");

const OEMSpecsSchema = new mongoose.Schema({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  listPrice: { type: Number, required: true },
  colors: { type: [String], required: true },
  mileage: { type: Number, required: true },
  power : { type: Number, required: true },
  torque : { type: Number, required: true },
  maxSpeed: { type: Number, required: true },
  image : { type: String, required: true },
  OEM_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required : true},
});

const OEM_spec_Model = mongoose.model("OEM_Specs", OEMSpecsSchema);

module.exports = { OEM_spec_Model };
