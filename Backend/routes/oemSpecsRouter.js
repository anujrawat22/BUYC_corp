const { Router } = require("express");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");
const { create } = require("../controllers/oemSpecsController");

const SpecRouter = Router();

SpecRouter.post("/create",authorizeRoles(['OEM']),create)



module.exports = { SpecRouter };
