const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require("cors")

//configurations
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))


//require routers
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const userRouter = require('./routes/user.route')

//created apis
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users", userRouter)

module.exports = app