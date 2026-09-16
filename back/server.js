import mongoose, { connect } from "mongoose";
import app from "./src/app.js"
import databaseConnect from "./src/db/db.js"
import dotenv from "dotenv";
dotenv.config({ 
    path: "./.env" });

databaseConnect()
.then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
        });
    })