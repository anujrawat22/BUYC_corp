const express = require("express")
const { connection } = require("./config/db")
require("dotenv").config()


const app  = express()
const port = process.env.PORT
app.use(express.json())




app.listen(port,async ()=>{
  try {
    await connection;
    console.log(`Connected to DB`);
    console.log(`Listening on PORT ${port}`);
  } catch (error) {
    console.log('Error in server connection',error)
  }
})