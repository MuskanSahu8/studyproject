import Video from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createVideo = async (req, res) => {
    try {
        const { title, url,desc} = req.body;
        const { notesId } = req.params;

        if (!title || !url || !notesId || !desc) {
            throw new ApiError(400, "all fields are req")
        }
        const notes = await Notes.findOne({
            _id: notesId,
            user: req.user._id
        })
        if (!notes) {
            throw new ApiError(404, "notes not found")
        }
        //create obj
        const video = await Video.create({
            title, url,desc ,notes: notesId, user: req.user._id
        })
        return res.status(200).json(
            new ApiResponse(200, todo, "video added to notes")
        );
    } catch (error) {
        throw new ApiError(
            error.status, error.message
        )
    }
}
const getVideo = async (req, res) => {
    try {
        const {noteId}=req.params;
        const notes= await Notes.findOne({
            _id:notesId,
            user:req.user._id
        })
        if(!notes){
            throw new ApiError(404, "Note not found");
        }
        //find video of this note
        const video=await Video.findOne({
            notes:notes.id,
            user:req.user._id,}).sort({createdAt:-1})
         return res.status(200).json(new ApiResponse(200,video,"video fetch successfully"))
    } catch (error) {
        throw new ApiError(
            error.status, error.message
        )
    }
}
const updateVideo = async (req, res) => {
  try {
    const { videoId, notesId } = req.params;
    const { title, url } = req.body;

    // 1. Check input
    if (!title || !videoUrl) {
      throw new ApiError(
        400,
        "Title and video URL are required"
      );
    }

    // 2. Find and update the video
    const video = await Video.findOneAndUpdate(
      {
        _id: videoId,
        note: noteId,
        user: req.user._id,
      },
      {
        title,
        url,
      },
      {
        new: true,
      }
    );

    // 3. Video not found
    if (!video) {
      throw new ApiError(404, "Video not found");
    }

    // 4. Send response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          video,
          "Video updated successfully"
        )
      );
  } catch (error) {
    throw error;
  }
};
const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { notesId } = req.params;

    const video = await Video.findOneAndDelete({
      _id: videoId,
      notes: notesId,
      user: req.user._id,
    });

    if (!video) {
      throw new ApiError(404, "Video not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          video,
          "Video deleted successfully"
        )
      );
  } catch (error) {
    throw error;
  }
};
export { createVideo ,getVideo,updateVideo,deleteVideo}