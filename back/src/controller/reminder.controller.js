import Reminder from "../models/reminder.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// CREATE REMINDER
const createReminder = async (req, res) => {
  try {
    const { date, time, message } = req.body;

    if (!date || !time || !message) {
      throw new ApiError(
        400,
        "Date, time and message are required"
      );
    }

    const reminder = await Reminder.create({
      user: req.user._id,
      date,
      time,
      message,
      active: true,
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        reminder,
        "Reminder created successfully"
      )
    );

  } catch (error) {
    console.log(error);

    return res.status(
      error.statusCode || 500
    ).json({
      message:
        error.message || "Something went wrong",
    });
  }
};


// GET USER REMINDERS
const getReminders = async (req, res) => {
  try {

    const reminders = await Reminder.find({
      user: req.user._id,
    }).sort({
      date: 1,
      time: 1,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        reminders,
        "Reminders fetched successfully"
      )
    );

  } catch (error) {

    return res.status(500).json({
      message: "Unable to fetch reminders",
    });

  }
};


// DELETE REMINDER
const deleteReminder = async (req, res) => {
  try {

    const reminder =
      await Reminder.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!reminder) {
      throw new ApiError(
        404,
        "Reminder not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        reminder,
        "Reminder deleted successfully"
      )
    );

  } catch (error) {

    return res.status(
      error.statusCode || 500
    ).json({
      message:
        error.message || "Something went wrong",
    });

  }
};


// MARK REMINDER DONE
const completeReminder = async (req, res) => {
  try {

    const reminder =
      await Reminder.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        {
          active: false,
        },
        {
          new: true,
        }
      );

    if (!reminder) {
      throw new ApiError(
        404,
        "Reminder not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        reminder,
        "Reminder completed"
      )
    );

  } catch (error) {

    return res.status(
      error.statusCode || 500
    ).json({
      message:
        error.message || "Something went wrong",
    });

  }
};


export {
  createReminder,
  getReminders,
  deleteReminder,
  completeReminder,
};