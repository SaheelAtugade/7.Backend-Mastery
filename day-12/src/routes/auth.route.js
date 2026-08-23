const express = require('express')
const authRoute =  express.Router()
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

authRoute.post('/register', async(req, res)=>{

    const {name, email, password} = req.body; 

    //email exist check
    const isEmailAlreadyExist = await userModel.findOne({email})
    if (isEmailAlreadyExist) {
        return res.status(400).json({
            message: "User with this email already exist"
        })
    } 

    //creating user in DB
    const user = await userModel.create({
        name,
        email,
        password
    })

    //Creating JWT token
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRETE
    )

    //Storing JWT token in cookie storage
    res.cookie("JWT_token", token)

    res.status(201).json({
        message: "User created successfully",
        user,
        token
    })
})

module.exports = authRoute;