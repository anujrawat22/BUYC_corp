const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
   

    if (decoded) {
      req.body.userId = decoded.userId;
      req.body.role = decoded.role;
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

const authorizeRoles = (roles) => {
  return async (req, res, next) => {
    try {
      const role = req.body.role;
    
      if (!roles.includes(role)) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };
};


module.exports = {
    authenticate,
    authorizeRoles,
  };