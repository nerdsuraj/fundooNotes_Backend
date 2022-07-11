import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { emailAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user for registration
router.post('', newUserValidator, userController.UserRegistration);

//route to get all users
router.get('', userController.getAllUsers);


//route to login a user
router.post('/login',userController.login);


//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

//route to get forget password 
router.post('/forgotpassword', userController.forgetPassword);

//route to get reset passwword
router.post('/resetpassword/:token', emailAuth,userController.resetPassword);

export default router;
