import jwt from "jsonwebtoken"
const AuthMiddle = async (req, res, next) => {
    try {
        console.log("cookies", req.cookies)
        const token = req.cookies?.token
        if (!token) {
            return res.json({
                message: "token req"
            })
        }
        const decoded = jwt.verify(
            token, process.env.SECRET
        )
        //SETuser info
        req.user = decoded
        next()
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}
export {AuthMiddle}