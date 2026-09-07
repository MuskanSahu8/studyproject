import { Router } from "express";
import { AuthMiddle} from "../middleware/auth.middleware.js";
import { createVideo,deleteVideo, getVideo, updateVideo } from "../controller/video.controller.js";

const router = Router();

router.post("/notes/:noteId/video",AuthMiddle,createVideo);
router.get("/notes/:notesId/video",AuthMiddle,getVideo)
router.put("/notes/:notesId/video/:videoId",AuthMiddle,updateVideo);
router.delete("/notes/:notesId/video/:videoId",AuthMiddle, deleteVideo);
export default router;