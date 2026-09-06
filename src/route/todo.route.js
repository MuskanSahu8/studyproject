import Router from "express"
import { AuthMiddle } from "../middleware/auth.middleware.js";
import { createTodo, deleteTodo, getOne, getTodo, updateTodo } from "../controller/todo.controller.js";
const router=Router();
router.post("/",AuthMiddle,createTodo);
router.get("/",AuthMiddle,getTodo);
router.get("/:id",AuthMiddle,getOne);
router.put("/:id",AuthMiddle,updateTodo);
router.delete("/:id",AuthMiddle,deleteTodo);
export default router