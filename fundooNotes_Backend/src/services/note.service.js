import { error } from 'winston';
import note from '../models/note.model';
import { client } from '../config/redis';
import { json } from 'express';

// for creating the note
export const createNote = async (body) => {
    const data = await note.create(body);
    await client.del("reddisDB")
  return data;
}
///////////////////



//for getting all the notes
export const getAllNotes = async(body) =>{
  const data = await note.find({UserID:body.UserID});
  if(data){
    await client.set("reddisDB",JSON.stringify(data))   
    return data;
  }else
  {
    throw new Error('auth not valid');
  }  
   
};

//////////

//getting the single note by thier id 
export const getSingleNote = async(_id,UserID) => {
  const data = await note.findById(_id);
  await client.set("reddisDB",JSON.stringify(data))
  if(data.UserID == UserID)
  {
    return data;
  }else{
    throw new Error("Authntication failed");
  }
}

//update the single note by thier id
export const updateNote = async (_id,body,UserID) =>{
    const data = await note.findById(_id);
    await client.del("reddisDB")
    if(data.UserID == UserID)
    {
      const updatadata = await note.findByIdAndUpdate(
        {
          _id
        },
       body,
       {
        new : true
        }
      );
    return updatadata;
    }
    else{
      throw new Error("Authntication failed");
    }
};

//deleting the single note

// export const deleteNote = async (_id,UserID) => {
//    const data =  await note.findById(_id);
//    if(data.UserID == UserID)
//    {
//     const deleteData = await note.findByIdAndDelete({
//       _id
//     });
//     return deleteData;
//    }else{
//     throw new Error("Authntication failed")
//    }
//   };

export const deleteNote = async (_id,UserID) =>{
  await note.findByIdAndDelete({_id:_id,UserID:UserID});
  return "";
}


  //for archive the notes

  export const archiveNote= async(_id,UserID)=>{
    const data = await note.findById(_id);
    if(data!= null && data.isArchived == false && data.UserID == UserID ){ 
      const updateData = await note.findOneAndUpdate({ _id : _id }, {isArchived : true}, {new : true});
      return updateData ;
    }else if (data!= null && data.isArchived==true && data.UserID == UserID){
      const updateData = await note.findOneAndUpdate({ _id : _id }, {isArchived : false}, {new : true});
      return updateData ;
    }else if ( data!=null && data.UserID != UserID){
      throw new Error("Authentication Failed");
    }
    else
    {
      throw new Error("ID didnot match");
    }
  };
  

// for send the note to the trash

// export const trashNote= async(_id,UserID)=>{
//   const data = await note.findById(_id);
 
//   if(data!= null && data.isDeleted==false && data.UserID==UserID){
//     const updateData = await note.findOneAndUpdate({ _id : _id }, {isDeleted : true}, {new : true});
//     return updateData ;
//   }else if (data!= null && data.isDeleted==true && data.UserID==UserID) {
//     const updateData = await note.findOneAndUpdate({ _id : _id }, {isDeleted : false}, {new : true});
//     return updateData ;
//   } else if (data!= null && data.UserID!=UserID){
//     throw new Error("Authentication Failed");
//   }
//   else
//   {
//     throw new Error("ID did not match");
//   }
// };

export const trashNote= async(_id,UserID)=>{
  const data = await note.findByIdAndUpdate(
    {
      _id:_id,UserID:UserID
    },
    {
      isDeleted:true
    },
    {
      new:true
    }
   
  );
  return data;
}