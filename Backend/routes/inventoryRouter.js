const { Router } = require("express");
const { authorizeRoles } = require("../middleware/authMiddleware");
const { createInventory, getInventory } = require("../controllers/InventoryConroller");

const InventoryRouter = Router();

InventoryRouter.post("/create/:OEM_id",authorizeRoles(["Dealer"]),createInventory)

InventoryRouter.get("/get/:id",getInventory )

module.exports = { InventoryRouter };
