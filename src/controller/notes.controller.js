import Notes from "../models/notes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            throw new ApiError(
                400,
                "Title and content are required"
            );
        }

        const note = await Notes.create({
            title,
            content,
            user: req.user._id
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                note,
                "Note created successfully"
            )
        );

    } catch (error) {
        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Unable to create note"
            )
        );
    }
};


const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({
            user: req.user.id
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                notes,
                "Notes fetched successfully"
            )
        );

    } catch (error) {
          console.log("GET NOTES ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateNotes = async (req,res)=>{
  try {
      const {title,content}=req.body;
      if(!title ||!content){
          throw new ApiError(400,"all fields are req")
      }
      // Find note + make sure it belongs to logged-in user
      const notes=await Notes.findByIdAndUpdate({
          _id:req.params.id,
          user:req.user.id,},
          {
             title,content
          },{
              new:true,
              runValidators:true
          }
      )
      if(!notes){
          throw new ApiError(400,"note not found")
      }
      return res.status(200).json(
         new ApiResponse(
                200,
                notes,
                "Note updated successfully"
            )
      )
  } catch (error) {
    console.log("UPDATE ERROR:", error);

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message: error.message
        });
    
  }
}
// getNoteById — fetching one specific note while making sure the logged-in user owns it.
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!note) {
            throw new ApiError(
                404,
                "Note not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                note,
                "Note fetched successfully"
            )
        );

    } catch (error) {
        return res.status(
            error.statusCode || 500
        ).json(
            new ApiError(
                error.statusCode || 500,
                error.message || "Unable to fetch note"
            )
        );
    }
};
const deleteNotes =async(req,res)=>{
    try{
        const notes=await Notes.findOneAndDelete({
            _id:req.params.id,
            user:req.user._id,
        })
        if(!notes){
            throw new ApiError(404,"/notes not found")
        }
        return res.status(200).json(
            new ApiResponse(404,notes,"notes deleted successfully")
        )
    }catch(error){
        throw new ApiError(error.statusCode,error.message)
    }
}
export {
    createNote,
    getNotes,updateNotes,getNoteById,deleteNotes
};