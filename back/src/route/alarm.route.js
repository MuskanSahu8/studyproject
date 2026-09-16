import express from "express";

import {createAlarm,getAlarms,deleteAlarm,toggleAlarm,updateAlarmTime} from "../controller/alarm.controller.js";

import { AuthMiddle } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",AuthMiddle,createAlarm);

router.get("/",AuthMiddle,getAlarms);

router.delete("/:id",AuthMiddle,deleteAlarm);

router.patch("/toggle/:id",AuthMiddle,toggleAlarm);
router.patch(
  "/update-time/:id",
  AuthMiddle,
  updateAlarmTime
);

export default router;