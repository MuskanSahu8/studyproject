import express from "express";

import {createReminder,getReminders,deleteReminder,completeReminder} from "../controller/reminder.controller.js";

import { AuthMiddle } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  AuthMiddle,
  createReminder
);

router.get(
  "/",
  AuthMiddle,
  getReminders
);

router.delete(
  "/:id",
  AuthMiddle,
  deleteReminder
);
router.patch(
  "/complete/:id",
  AuthMiddle,
  completeReminder
);

export default router;