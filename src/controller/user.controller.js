import mongoose from "mongoose"
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new ApiError(400, "all fields are req")
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new ApiError(400, "user Already exists")
        }
        console.log("ORG PASS", password);
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("ORG PASS", hashedPassword);
        const user = await User.create({
            name, email, password: hashedPassword
        })
        return res.status(201).json(
            new ApiResponse(201, user, "signup successfully")
        )
    } catch (error) {
        return res.status(400).json(
            new ApiError(400, "signup failure", error.message)
        )
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "field is req")
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "email not found"
            })
        }
        console.log("Entered password:", password);
        console.log("Stored password:", user.password);
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({
                message: "incorrect password"
            })
        }
        // if login is successfull then generate tokens
        console.log("secret", process.env.SECRET)
        const token = jwt.sign({
            id: user._id,
            email: user.email
        },

            process.env.SECRET,
            {
                expiresIn: "1d"
            })
        //cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })
        res.status(200).json({
            message: "signin succesfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(400).json({
            message: "not able to sign in" + error.message
        })
    }
}
const getUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "user authorized successfully",
            user: req.user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:false
        })
        res.status(200).json({
            message: "logout successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


export { signup, login, getUser,logout }