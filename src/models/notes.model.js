import mongoose, { model } from "mongoose";
const NotesSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Notes=mongoose.model("Notes",NotesSchema)
export default Notes