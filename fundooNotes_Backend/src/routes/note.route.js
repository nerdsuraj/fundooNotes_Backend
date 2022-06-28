const express = require('express');
const { userAuth } = require('../middlewares/auth.middleware');
import * as noteController from '../controllers/note.controller';
const router = express.Router();

//route to create new note
router.post('',userAuth,  noteController.createNote);