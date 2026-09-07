import {Router} from "express"
import { signup,login, getUser, logout } from "../controller/user.controller.js";
import { signupValidation } from "../middleware/signupValidation.js";
import { loginValidation } from "../middleware/loginValidation.js";
import { AuthMiddle } from "../middleware/auth.middleware.js";
const router=Router();
router.post("/signup",signupValidation,signup);
router.post("/login",loginValidation,login);
router.get("/get-user",AuthMiddle,getUser);
router.post("/logout",AuthMiddle,logout);
export default router