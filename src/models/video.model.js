import mongoose from "mongoose"
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    notes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
        required: true
    },
    description:{
    type: String,
    required: true,
}
}, { timestamps: true })
const Video = mongoose.model("Video", videoSchema);
export default Video;