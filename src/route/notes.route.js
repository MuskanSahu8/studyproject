import Router from "express"
import { AuthMiddle } from "../middleware/auth.middleware.js";
import { createNote, deleteNotes, getNoteById, getNotes, updateNotes } from "../controller/notes.controller.js";
const router=Router();
router.post("/create",AuthMiddle,createNote);
router.get("/",AuthMiddle,getNotes);
router.get("/:id",AuthMiddle, getNoteById)
router.put("/:id",AuthMiddle,updateNotes)
router.delete("/:id",AuthMiddle,deleteNotes)
export default router