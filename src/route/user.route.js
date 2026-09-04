import {Router} from "express"
import { signup,login } from "../controller/user.controller.js";
import { signupValidation } from "../middleware/signupValidation.js";
import { loginValidation } from "../middleware/loginValidation.js";
const router=Router();
router.post("/signup",signupValidation,signup);
router.post("/login",loginValidation,login);
export default router