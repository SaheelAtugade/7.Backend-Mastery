const express = require('express')
const authRouter = express.Router()
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/* 
    /api/auth/register
*/
authRouter.post('/register', async(req, res)=>{
    const {name, email, password} = req.body

    //check email exist
    const isEmailExist = await userModel.findOne({email})
    if(isEmailExist){
        return res.status(409).json({
            message: "User with this email already exist..."
        })
    }

    //hash password
    const hash = crypto.createHash("md5").update(password).digest("hex")

    //create user in DB
    const user = await userModel.create({
        name,
        email,
        password: hash
    })

    //create token with user data
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRETE,
        {
            expiresIn : '2hr'
        }
    )

    //Store token in cookie storage
    res.cookie("jwt_token", token)

    //Success response
    res.status(201).json({
        message: "User registered successfully",
        user
    })
})

/* 
   /api/auth/get-me = get logged in user
*/
authRouter.get('/get-me', async (req, res) => {
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRETE
    );

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.log(err);

    res.status(401).json({
      message: "Invalid or expired token"
    });
  }
});

/* 
    /api/auth/login
*/
authRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body

    //check email exist
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message: "User not found with this email address"
        })
    }

    //check password
    const hash = crypto.createHash("md5").update(password).digest("hex")
    const passwordMatched = hash === user.password
    if(!passwordMatched){
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    //create new token
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRETE,
        {
            expiresIn: "2hr"
        }
    )

    //save token to cookie storage
    res.cookie("jwt_token", token)

    //Success response
    res.status(200).json({
        message: "User logged in successfully",
        name: user.name,
        email: user.email
    })
})

module.exports = authRouter