import mongoose from "mongoose";

const alarmSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: "Alarm",
    },

    active: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Alarm = mongoose.model("Alarm", alarmSchema);

export default Alarm;