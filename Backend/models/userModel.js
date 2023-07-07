 const mongoose = require("mongoose")


 const userSchema = mongoose.Schema({
    username : {type : String , required : true},
    email : {type : String , required : true},
    password : {type : String , required : true},
    contact : {type : Number , required : true},
    role : {
        type : String,
        enum : ['Dealer','Buyer','OEM'],
        default : 'Buyer'
    }
 })

 const userModel = mongoose.model('User',userSchema)

 module.exports = { userModel }