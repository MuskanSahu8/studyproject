import { body, validationResult } from "express-validator";

export const signupValidation = [

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email must be entered"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  (req, res, next) => {

    const errors = validationResult(req);

    console.log("SIGNUP BODY:", req.body);
    console.log("VALIDATION ERRORS:", errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    next();
  }
];