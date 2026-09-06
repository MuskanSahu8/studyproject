import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
const AuthMiddle = async (req, res, next) => {
    try {
        const token = req.cookies?.token
         console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({
                message: "token req"
            })
        }
        const decoded = jwt.verify(
            token, process.env.SECRET
        )
         // Find actual user in MongoDB
        const user=await User.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        req.user = user
        next()
        console.log(user)
    } catch (error) {
        console.log("JWT ERROR:", error.name)
        return res.status(401).json({
            message: "invalid or expired token"
        })
    }
}
export {AuthMiddle}