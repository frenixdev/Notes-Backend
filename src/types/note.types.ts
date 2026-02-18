interface NoteType {
  id: number;
  title: string;
  desc: string;
  changesCounter: number;
  lastUpdated: string;
}
type CreateNoteType = Omit<NoteType, "lastUpdated">;
type UpdateNoteType = Omit<NoteType, "lastUpdated">;
export { NoteType, CreateNoteType, UpdateNoteType };
