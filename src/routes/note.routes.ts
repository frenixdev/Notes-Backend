import { Router } from "express";
import{
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes
} from "@/controllers/note.controller";

const router = Router();
router.get("/", getNotes)
.post("/", createNotes)
.put("/", updateNotes)
.delete("/:id",deleteNotes)
export default router
