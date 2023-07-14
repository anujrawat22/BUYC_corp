const { InventoryModel } = require("../models/InventoryModel");

exports.createInventory = async (req, res) => {
  try {
    const { OEM_id } = req.params;
    const {
      kmsOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      userId,
      price,
    } = req.body;

    const inventory = await new InventoryModel({
      oemSpecs: OEM_id,
      kmsOnOdometer,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      price,
      dealerId: userId,
    });
    inventory.save();
    res.status(201).send({ msg: "Inventory for model created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryData = await InventoryModel.findById(id);
    res.status(201).send({ msg: "Inventory data", data: inventoryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.alldata = async (req, res) => {
  try {
    const inventoryData = await InventoryModel.aggregate([
      {
        $lookup: {
          from: 'oem_specs',
          localField: 'oemSpecs',
          foreignField: '_id',
          as: 'oemData',
        },
      },{
        $lookup: {
          from: 'users',
          localField: 'dealerId',
          foreignField: '_id',
          as: 'userData',
        }
      }
    ]);
    res.status(201).send({ msg: "Inventory data", data: inventoryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, payload } = req.body;
    const inventoryItem = await InventoryModel.findOne({
      _id: id,
      dealerId: userId,
    });
    if (!inventoryItem) {
      return res.status(404).send({ msg: "No data found" });
    }

    await InventoryModel.findOneAndUpdate(({ _id: id }, { $set: payload }));

    res.status(201).send({ msg: "Inventory data updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, payload } = req.body;
    const inventoryItem = await InventoryModel.findOne({
      _id: id,
      dealerId: userId,
    });
    if (!inventoryItem) {
      return res.status(404).send({ msg: "No data found" });
    }

    await InventoryModel.deleteOne({ _id: id });

    res.status(201).send({ msg: `Inventory data deleted with id ${id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
