const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRouter")
const { SpecRouter } = require("./routes/oemSpecsRouter")
const { authenticate } = require("./middleware/authMiddleware")
const { InventoryRouter } = require("./routes/inventoryRouter")
require("dotenv").config()
const cors = require('cors')
const { bookingRouter } = require("./routes/bookingRouter")


const app  = express()
const port = process.env.PORT
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to Buy Cars !</h1>`)
})

app.use("/api/user",userRouter)
app.use("/api/OEMSpecs",authenticate,SpecRouter)
app.use("/api/inventory",authenticate,InventoryRouter)
app.use("/api/booking",authenticate,bookingRouter)

app.listen(port,async ()=>{
  try {
    await connection;
    console.log(`Connected to DB`);
    console.log(`Listening on PORT ${port}`);
  } catch (error) {
    console.log('Error in server connection',error)
  }
})