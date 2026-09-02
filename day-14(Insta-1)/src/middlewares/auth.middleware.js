const jwt = require("jsonwebtoken");
const config = require("../config/config");


//function to get user from token
async function identifyUser(req, res, next) {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(401).json({
      message: "unauthorized | token not provided",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, config.JWT_SECRETE);
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }

  req.user = decoded //set new property user to get user data
  next() //after user identified moves to controller
}

module.exports = identifyUser