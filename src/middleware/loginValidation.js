import {body,validationResult} from "express-validator"
export const loginValidation = [
    body("email")
    .notEmpty()
    .withMessage("enter valid email"),
    body("password")
    .notEmpty()
    .withMessage("password is req"),

    (req,res,next)=>{
         const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({
                success:fail,
                errors:errors.array()
            })
        }
        next();
    }


]