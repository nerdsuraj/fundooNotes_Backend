import {createClient} from 'redis';

export const client = createClient();

const clientRedis = async () => {
    try{
        await client.connect();
        console.log("conneted to the reddis database..");

        
    } catch(error){
        console.log("could not connect to the reddis database")
    }
}

export default clientRedis;