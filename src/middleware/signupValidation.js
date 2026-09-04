import {body,validationResult} from "express-validator"
 export const signupValidation=[
 body("name")
        .notEmpty()
        .withMessage("name is req"),
    body("email")
    .isEmail()
    .withMessage("valid email to be enter"),
    body("password")
    .isLength({min:6})
    .withMessage("password must be of 6 characters"),
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }next();
    }
    //use it in route
]