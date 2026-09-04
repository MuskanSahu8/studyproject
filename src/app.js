import express from "express"
import userRouter from "./route/user.route.js"
const app=express()
app.use("/api/user",userRouter)
export default app;
