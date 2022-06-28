import * as noteService from '../services/note.service';
import HttpStatus from 'http-status-codes';

// for create the note
export const createNote =async (req, res,next) => {
    try{
    console.log("req.body",req.body)
    const data = await noteService.createNote(req.body);
    res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'created successfully'
    });
}catch(error) {
    next(error);
}
};