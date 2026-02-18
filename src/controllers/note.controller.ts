import { Request, Response } from "express";
import * as noteService from "@/services/note.service";
import { CreateNoteType, UpdateNoteType } from "@/types/note.types";

const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getAllNotes();
    res.json(notes);
  } catch {
    res.status(500).send("Failed fetch notes!z");
  }
};

const createNotes = async (
  req: Request<{}, {}, CreateNoteType>,
  res: Response,
) => {
  try {
    const newNote = await noteService.createNote(req.body);
    return res.status(201).json({
      message: "Note Created Successfully!",
      data: newNote,
    });
  } catch (err) {
    return res.status(500).json({
      message: err || "Failed to create note!",
      error: err instanceof Error ? err.message : err,
    });
  }
};

const updateNotes = async (
  req: Request<{}, {}, UpdateNoteType>,
  res: Response,
) => {
  try {
    const note = await noteService.updateNote(req.body);
    res.status(200).json({
      message: "Note updated successfully!",
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to update note!",
      err: err instanceof Error ? err.message : err,
    });
  }
};
const deleteNotes = async (req: Request, res: Response) => {
  try {
    // if (Number.isNaN(+req.params.id))
    //   throw new Error("please enter a valid id!");
    await noteService.deleteNote(+req.params.id);
    res.status(200).json({
      message: "Note Deleted Successfully!"
    })
  } catch (err) {
    res.status(500).json({
      message: "unable to delete note!"
    });
  }
};

export { getNotes, createNotes, updateNotes, deleteNotes };
