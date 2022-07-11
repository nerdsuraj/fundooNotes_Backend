import * as noteService from '../services/note.service';
import HttpStatus from 'http-status-codes';
import { Error } from 'mongoose';

// for create the note
export const createNote = async (req, res,next) => {
    try{
    // console.log("req.body",req.body)
    const data = await noteService.createNote(req.body);
    res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'created successfully'
    });
}catch(err) {
    next(Error);
}
};

//for getting all the notes
export const getAllNotes = async (req, res,next) => {
    try{
    const data = await noteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'showing all notes successfully'
    });
}catch(err) {
    res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
}
};

//for getting single note by their id
export const getSingleNote = async (req, res, next) => {
    try {
        const data = await noteService.getSingleNote(req.params._id,req.body.UserID);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data:data,
            message: 'Notes fetched successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

//for update a single note by thier id
export const updateNote = async (req, res,next) => {
    try{
    const data = await noteService.updateNote(req.params._id, req.body, req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'updated single note successfully'
    });
}catch(err) {
    res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${err}`
    });
}
};

//making to delete  a note
export const deleteNote = async (req, res,next) => {
    try{
    const data = await noteService.deleteNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'deleted note successfully'
    });
}catch(err) {
    res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${err}`
    });
}
};


//for is archive the note

export const archiveNote = async (req, res,next) => {
    try{
    const data = await noteService.archiveNote(req.params._id,req.body.UserID);
    res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'archive note successfully'
    });
}catch(err) {
    res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${err}`
    });
}
};

// for send the note to the trash

export const trashNote = async(req, res) =>{
    try {
      const data = await noteService.trashNote(req.params._id,req.body.UserID);
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note successfully move to Trash'
          });
    }catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      }); 
    }
  };
