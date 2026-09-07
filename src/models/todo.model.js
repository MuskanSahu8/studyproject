import mongoose from "mongoose"
const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Todo =mongoose.model("Todo",todoSchema);
export default Todo;