require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { username, email, password, contact, role ,image} = req.body;
    
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      res.status(400).send({ msg: "User already exists" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500).send({ error: err });
      }

      const user = await new userModel({
        email,
        password: hash,
        contact,
        role,
        username,
        image
      });
      user.save();
      res.status(201).send({ msg: "Registration successful" });
    });
  } catch (error) {
    console.log("Error in registration", error);
    res.status(500).send({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await userModel.findOne({ email });

    if (!User) {
      return res
        .status(404)
        .json({ msg: "User doesn't exist" });
    }

    bcrypt.compare(password, User.password, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: err });
      }

      if (result) {
        const token = jwt.sign(
          { userId: User._id, role: User.role, name: User.name },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.cookie("token", token);
        res
          .status(201)
          .json({ msg: "User logged in successfully", token, role: User.role , image : User.image , name : User.username});
      } else {
        res.status(401).json({ msg: "Invalid Credentials" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};



exports.details = async(req,res)=>{
  try {
    const {id } = req.params;
   
    const user = await userModel.find({_id : id})
    res.status(201).send({msg : `User details with id - ${id}` , user})

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}


exports.getOEM = async(req,res)=>{
  try {
    const user = await userModel.find({role : "OEM"})
    res.status(201).send({msg : "All OEM data" , data : user})
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}