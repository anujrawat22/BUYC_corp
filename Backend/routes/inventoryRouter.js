const { Router } = require("express");
const { authorizeRoles } = require("../middleware/authMiddleware");
const { createInventory, getInventory, alldata } = require("../controllers/InventoryConroller");

const InventoryRouter = Router();

InventoryRouter.post("/create/:OEM_id",authorizeRoles(["Dealer"]),createInventory)

InventoryRouter.get("/get/:id",getInventory )

InventoryRouter.get("/allData",alldata)

module.exports = { InventoryRouter };
