import { promises as fs } from "fs";
import path from "path";
import { NoteType } from "../types/note.types";
import { CreateNoteType, UpdateNoteType } from "../types/note.types";
import { getCurrentDate } from "../utils/date";

const filePath = path.join(__dirname, "..","data", "data.json");
console.log(filePath)
const getAllNotes = async (): Promise<NoteType[]> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};
const saveAllNotes = async (data: NoteType[]): Promise<void> => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, "utf-8");
  } catch (err) {
    throw new Error("Failed to save Notes");
  }
};
const createNote = async (noteData: CreateNoteType): Promise<NoteType> => {
  const notes = await getAllNotes();
  const newNote: NoteType = {
    ...noteData,
    lastUpdated: getCurrentDate(),
    changesCounter: 0,
  };
  notes.push(newNote);
  await saveAllNotes(notes);
  return newNote;
};

const updateNote = async (noteData: UpdateNoteType): Promise<NoteType> => {
  const { id, title, desc } = noteData;
  if (!id || Number.isNaN(id)) throw new Error("Please enter a valid id");
  const notes = await getAllNotes();
  const note = notes.find((note) => note.id === id);
  if (!note) throw new Error("Cound't find note into our database!");
  if (title !== undefined) note.title = title;
  if (desc !== undefined) note.desc = desc;
  if (title !== undefined || desc !== undefined) {
    note.lastUpdated = getCurrentDate();
    note.changesCounter = note.changesCounter + 1;
  }
  await saveAllNotes(notes);
  return note
};

const deleteNote = async (id: number): Promise<void>=>{
  const notes = await getAllNotes();
  const filtered = notes.filter(note => note.id !== id)
  await saveAllNotes(filtered)
}
export { getAllNotes, saveAllNotes, createNote, updateNote, deleteNote };
