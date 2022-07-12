const express = require('express');
const { userAuth } = require('../middlewares/auth.middleware');
import { noteValidator } from '../validators/note.validator';
import * as noteController from '../controllers/note.controller';
import { redis_Gnote } from '../middlewares/reddis';

const router = express.Router();

//route to create new note
router.post('',  noteValidator,  userAuth,   noteController.createNote);

//route to get all note
router.get('', userAuth,  redis_Gnote,  noteController.getAllNotes);   

//route to get single note by their id
router.get('/:_id',userAuth,     noteController.getSingleNote);

//route to update single note by their id
router.put('/:_id', userAuth,      noteController.updateNote);

//route to delete a single note by their id
router.delete('/:_id',userAuth, noteController.deleteNote);

//route to archive note
router.put('/:_id/isArchived',userAuth,noteController.archiveNote);

//route for trash note
router.put('/:_id/isTrashed',userAuth,noteController.trashNote);



export default router;