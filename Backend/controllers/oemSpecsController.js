const { OEM_spec_Model } = require("../models/OEMSpecModel");

exports.create = async (req, res) => {
  try {
    const {
      model,
      year,
      listPrice,
      colors,
      mileage,
      power,
      image,
      torque,
      maxSpeed,
      userId,
    } = req.body;
    
    const findcar = await OEM_spec_Model.find({ model, year, listPrice });

    

    if (findcar.length) {
      return res.status(400).send({
        msg: `Vehicle with model - ${model} year - ${year} already exists , try updating the details`,
      });
    }

    const car = await new OEM_spec_Model({
      model,
      year,
      listPrice,
      colors,
      mileage,
      power,
      torque,
      maxSpeed,
      image,
      OEM_id: userId,
    });
    car.save();
    res
      .status(201)
      .send({ msg: `Model of the vehicle create sucessfully`, model: car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};





exports.getSpecsbyOEMId = async (req, res) => {
  try {
    const { OEM_id } = req.params;

    const model = await OEM_spec_Model.find({ OEM_id });
    res.status(201).send({ msg: `Model data with OEM_id - ${OEM_id}`, model });
  } catch (error) {}
};



exports.getSpecsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await OEM_spec_Model.findById(id);
    res.status(201).send({ msg: `Model with id - ${id}`, model });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateSpecs = async (req, res) => {
  try {
    const { payload , userId } = req.body
    const {id} = req.params;
    const findByOEMId  = await OEM_spec_Model.find({_id : id ,OEM_id : userId})
    if(!findByOEMId.length>0){
       return res.status(404).send({msg : `Data not found `})
    }
    await OEM_spec_Model.findOneAndUpdate({_id : id},{$set : payload})
    res.status(204).send({msg : `Data with OEM_id - ${userId} updated`})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteSpecs = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const findByOEMId  = await OEM_spec_Model.find({_id : id ,OEM_id : userId})
    if(!findByOEMId.length>0){
       return res.status(404).send({msg : `Data not found `})
    }

    await OEM_spec_Model.findByIdAndDelete(id)
    res.status(204).send({msg : `Model with id - ${id} deleted sucessfully`})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
