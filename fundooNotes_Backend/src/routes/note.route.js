const express = require('express');
const { userAuth } = require('../middlewares/auth.middleware');
import { noteValidator } from '../validators/note.validator';
import * as noteController from '../controllers/note.controller';
const router = express.Router();

//route to create new note
router.post('',noteValidator,  noteController.createNote);

export default router;