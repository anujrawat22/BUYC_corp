const { Router } = require("express");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");
const { create, getSpecs, updateSpecs, deleteSpecs, getSpecsbyId, getSpecsbyOEMId } = require("../controllers/oemSpecsController");

const SpecRouter = Router();



SpecRouter.post("/create",authorizeRoles(['OEM']),create)

SpecRouter.get("/getspecs/:OEM_id", getSpecsbyOEMId)

SpecRouter.get("/get/:id",getSpecsbyId)

SpecRouter.patch("/update/:id",authorizeRoles(['OEM']),updateSpecs)

SpecRouter.delete("/delete/:id",authorizeRoles(['OEM']),deleteSpecs)

module.exports = { SpecRouter };
