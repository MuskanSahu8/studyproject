import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./route/user.route.js"
import notesRouter from "./route/notes.route.js"
const app=express()
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)
export default app;
