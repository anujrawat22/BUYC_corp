const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRouter")
require("dotenv").config()


const app  = express()
const port = process.env.PORT
app.use(express.json())

app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to Buy Cars !</h1>`)
})

app.use("/api/user",userRouter)


app.listen(port,async ()=>{
  try {
    await connection;
    console.log(`Connected to DB`);
    console.log(`Listening on PORT ${port}`);
  } catch (error) {
    console.log('Error in server connection',error)
  }
})