import Alarm from "../models/alarm.model.js";

// Create alarm
const createAlarm = async (req, res) => {
  try {
    const { time, label } = req.body;

    if (!time) {
      return res.status(400).json({
        message: "Alarm time is required",
      });
    }

    const alarm = await Alarm.create({
      time,
      label,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Alarm created successfully",
      data: alarm,
    });

  } catch (error) {
    console.log("Create alarm error:", error);

    return res.status(500).json({
      message: "Failed to create alarm",
    });
  }
};


// Get alarms
const getAlarms = async (req, res) => {
  try {

    const alarms = await Alarm.find({
      user: req.user._id,
    }).sort({ time: 1 });

    return res.status(200).json({
      message: "Alarms fetched successfully",
      data: alarms,
    });

  } catch (error) {

    console.log("Get alarms error:", error);

    return res.status(500).json({
      message: "Failed to fetch alarms",
    });
  }
};


// Delete alarm
const deleteAlarm = async (req, res) => {
  try {

    const alarm = await Alarm.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!alarm) {
      return res.status(404).json({
        message: "Alarm not found",
      });
    }

    return res.status(200).json({
      message: "Alarm deleted successfully",
    });

  } catch (error) {

    console.log("Delete alarm error:", error);

    return res.status(500).json({
      message: "Failed to delete alarm",
    });
  }
};


// Toggle alarm
const toggleAlarm = async (req, res) => {
  try {

    const alarm = await Alarm.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!alarm) {
      return res.status(404).json({
        message: "Alarm not found",
      });
    }

    alarm.active = !alarm.active;

    await alarm.save();

    return res.status(200).json({
      message: "Alarm updated successfully",
      data: alarm,
    });

  } catch (error) {

    console.log("Toggle alarm error:", error);

    return res.status(500).json({
      message: "Failed to update alarm",
    });
  }
};
const updateAlarmTime = async (req, res) => {
  try {
    const { time } = req.body;

    if (!time) {
      return res.status(400).json({
        message: "Time is required",
      });
    }

    const alarm = await Alarm.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        time,
        active: true,
      },
      {
        new: true,
      }
    );

    if (!alarm) {
      return res.status(404).json({
        message: "Alarm not found",
      });
    }

    return res.status(200).json({
      message: "Alarm time updated",
      data: alarm,
    });

  } catch (error) {
    console.log("Update alarm error:", error);

    return res.status(500).json({
      message: "Failed to update alarm",
    });
  }
};


export {
  createAlarm,
  getAlarms,
  deleteAlarm,
  toggleAlarm,
  updateAlarmTime
};