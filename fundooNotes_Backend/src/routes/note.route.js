const express = require('express');
const { userAuth } = require('../middlewares/auth.middleware');
import { noteValidator } from '../validators/note.validator';
import * as noteController from '../controllers/note.controller';
const router = express.Router();

//route to create new note
router.post('',noteValidator,  noteController.createNote);

//route to get all note
router.get('', noteController.getAllNotes);

//route to get single note by their id
router.get('/:_id', noteController.getSingleNote);

//route to update single note by their id
router.put('/:_id', noteController.updateNote);

//route to delete a single note by their id
router.delete('/:_id', noteController.deleteNote);



export default router;