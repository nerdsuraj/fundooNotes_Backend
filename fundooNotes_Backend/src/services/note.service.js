import note from '../models/note.model';

// for creating the note
export const createNote = async (body) => {
    const data = await note.create(body);
  return data;
}

//for getting all the notes
export const getAllNotes = async(body) =>{
    const data = await note.find({UserID:body.UserID});
    return data;
}

//getting the single note by thier id 
export const getSingleNote = async (id) => {
    const data = await note.findById(id);
    return data;
  };

//update the single note by thier id
export const updateNote = async (_id, body) =>{
    const data = await note.findByIdAndUpdate(
    {
        _id,
    },
    body,
    {
        new: true
    }
    );
    return data;
};

//deleting the single note
export const deleteNote = async (id) => {
    await note.findByIdAndDelete(id);
    return '';
  };


  //for archive the notes

  export const archiveNote = async (body) =>{
   const data = await note.findOneAndUpdate(
     {
        _id:body.id,UserID:body.UserID,
    },
    {
      isArchived : false
    },
    {
        new: true
    }
    );
    return data;

  }

// for send the note to the trash

export const trashNote = async (id) =>{
  const data = await note.findOneAndUpdate(
    {
       _id:id
   },
   {
    isDeleted : true
   },
   {
       new: true
   }
   );
   return data;

 }
