const { Router } = require("express")
const { register, login, details } = require("../controllers/userController")
const { authenticate } = require("../middleware/authMiddleware")

const userRouter = Router()


userRouter.post("/register",register)

userRouter.post("/login",login)

userRouter.get("/details/:id" ,authenticate,details )

module.exports = { userRouter }