const express = require("express");
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const authUser = require("../middlewares/auth.middleware")

/**
 * @route   POST = /api/auth/register
 * @desc    register a user
 * @access  public
 */
authRouter.post("/register",  authController.registerController);

/**
 * @route   POST = /api/auth/login
 * @desc    login user
 * @access  public
 */
authRouter.post("/login",  authController.loginController);

/**
 * @route   GET = /api/auth/getMe
 * @desc    get logged in user
 * @access  private
 */
authRouter.get("/getMe", authUser, authController.getMeController)

module.exports = authRouter;
