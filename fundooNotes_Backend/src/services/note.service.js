import note from '../models/note.model';

// for creating the note
export const createNote = async (body) => {
    const data = await note.create(body);
  return data;
}