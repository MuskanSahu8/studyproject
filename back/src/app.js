import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./route/user.route.js"
import notesRouter from "./route/notes.route.js"
import todoRouter from "./route/todo.route.js"
import videoRouter from "./route/video.route.js"
import reminderRoutes from "./route/reminder.route.js"
import alarmRoutes from "./route/alarm.route.js";

const app=express()
app.use(cors({  
    origin: "http://localhost:5173",
    credentials: true,}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter)
app.use("/api/note",notesRouter)
app.use("/api/todo",todoRouter)
app.use("/api/video", videoRouter);
app.use("/api/reminders",reminderRoutes);
app.use("/api/alarms",alarmRoutes);


export default app;
