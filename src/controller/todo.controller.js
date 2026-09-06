
import Todo from "../models/todo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            throw new ApiError(400, "fields are require")
        }
        const todo = await Todo.create({
            title, user: req.user._id
        })
        return res.status(200).json(
            new ApiResponse(200, todo, "todo created successfully")
        )
    } catch (error) {
        throw new ApiError(error.statusCode, error.message)
    }
}
const getTodo = async (req, res) => {
    try {
        const todo = await Todo.find({
           user: req.user._id
    })
        if (!todo) {
            throw new ApiError(404, "todo not found")
        }
        return res.status(200).json(
            new ApiResponse(200, todo, "todo fetched successfully")
        )
    } catch (error) {
         console.log("GET todo ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
const getOne =async (req,res)=>{
     try{
         const todo = await Todo.findOne({
            _id:req.params.id,
           user: req.user._id
    })
        if (!todo) {
            throw new ApiError(404, "todo not found")
        }
        return res.status(200).json(
            new ApiResponse(200, todo, "todo fetched successfully")
        )
     }catch(error){
        throw new ApiError(
            error.status,error.message
        )
     }
}
const updateTodo =async(req,res)=>{
  try {
      const {title,isDone}=req.body;
      const todo =await Todo.findOneAndUpdate({
          _id:req.params.id,
          user:req.user._id
      },{title,isDone},{
          new:true
      })
       if (!todo) {
           throw new ApiError(404,"todo not found")
        }

        return res.status(200).json(
            new ApiResponse(200,todo,"todo updated successfully")
        );

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
const deleteTodo =async(req,res)=>{
    try{
        const todo=await Todo.findOneAndDelete(
           { _id:req.params.id,
            user:req.user._id,}
        )
        if (!todo) {
           throw new ApiError(404,"todo not found")
        }

     return   res.status(200).json(
            new ApiResponse(200,todo,"todo deleted successfully")
        );
    }catch(error){
         throw new ApiError(
            error.status,error.message
        )
    }
}
export { createTodo ,getTodo,getOne,updateTodo,deleteTodo}