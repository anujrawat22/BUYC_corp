const { Router } = require("express")
const { authorizeRoles } = require("../middleware/authMiddleware")
const { createBooking, deleteBooking } = require("../controllers/bookingController")

const bookingRouter = Router()

bookingRouter.post("/create/:id",authorizeRoles(['Buyer']),createBooking)

bookingRouter.delete("/delete/:id",authorizeRoles(['Buyer']),deleteBooking)

module.exports = {bookingRouter}