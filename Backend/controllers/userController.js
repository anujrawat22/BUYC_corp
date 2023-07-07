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
        .json({ msg: "User doesn't exist , Please signup" });
    }

    bcrypt.compare(password, User.password, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: err });
      }

      if (result) {
        const token = jwt.sign(
          { userId: User._id, role: User.role, name: User.name },
          process.env.privatekey,
          { expiresIn: "7d" }
        );
        res.cookie("token", token);
        res
          .status(201)
          .json({ msg: "User logged in successfully", token, role: User.role });
      } else {
        res.status(401).json({ msg: "Invalid Credentials" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};