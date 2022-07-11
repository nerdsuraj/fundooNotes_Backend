import User from '../models/user.model';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import {producer} from '../utils/rabbitmq'
// import { string } from '@hapi/joi';

// import helper from '../utils/helper.js'
import { sendMail } from '../utils/helper.js';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user by registration
export const userRegistration = async (body) => {
  const result = await User.findOne({email:body.email,firstname:body.firstname,lastname:body.lastname});
  if(result)
  {
    throw new Error("user already existed")
  }else{
    const saltRounds=10
    const hashpassword =await bcrypt.hash(body.password,saltRounds)
    body.password = hashpassword;
    const data = await User.create(body);

    producer(data);

    return data;
  }
};



// login User############

export const login = async (body) => {

  const result = await User.findOne({email:body.email});
  // console.log(result)
  
  if(result != null){
    
    const comparePass =await bcrypt.compare(body.password, result.password);
    if(comparePass){

      var token = jwt.sign({ id:result._id, email:result.email, firstname:result.firstname,lastname:result.lastname,password:result.password }, process.env.SECRATEKEY);
      return token
    
    }else{
      throw new Error("Password is incorrect")
    }


  }else{
    throw new Error("Mail Is not exist")
  }
}

// if(result){
  //   const comparePass =await bcrypt.compare(body.password, result.password);
  //   console.log(comparePass);
  //   if(comparePass){
  //     return result;
  //   }
  //   else{
  //     difError;
  //   }
    
  // }

// };

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};


// get service from forget password
export const forgetPassword = async (body) => {
  const data = await User.findOne({"email":body.email});
 if(data != null)
 {
  var token = jwt.sign({ email:data.email }, process.env.ForgetSecretKey);
     sendMail(data.email,token)

 }
 else{
  throw new Error("data not match or found")
}
};

// get service for reset password
 
export const resetPassword = async (body)=>{
 // const tokenData = await jwt.verify(_token, process.env.ForgetSecretKey);
  const saltRounds = 5
  const hashpassword = await bcrypt.hash(body.password,saltRounds);
  body.password= hashpassword
  const newData = User.findOneAndUpdate(
    {email:body.email },
    {password: body.password},
    {new: true})
   return newData;
};


