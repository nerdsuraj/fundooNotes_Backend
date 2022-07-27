import * as noteService from '../services/note.service';
import { client } from '../config/redis';
import HttpStatus from 'http-status-codes';
import { json } from 'express';



// for getting all the data
// export const redis_Gnote =async (req,res,next) => {
//   const data =  await client.get('getAllNotes',(err,redis_data) => {
//         if(err)
//         {
//             throw new err;
//         }
//         else if(redis_data){
//             console.log("redis data")
//             res.send(JSON.parse(redis_data))
//         }
//         else{
//             next();
//         }
//     })
//  };

export const redis_Gnote = async (req,res,next) =>{
    const data = await client.get("reddisDB");
    if(data != null )
    {
        const sumData = JSON.parse(data);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:sumData,
            message:'all notes fetched successfully from redis data'
        });
    } else{
        next();
    }
}