/**
 * 
 * @param {*} success 
 * @param {*} error 
 */
import mongoose from "mongoose"
import config from './config.js'

export default async function(success,error){
    //get the database config
    const {DBHOST:host,DBPORT:port,DBNAME:name} = config;
    const url = `mongodb://${host}:${port}/${name}`;
    try{
        await mongoose.connect(url);

        mongoose.connection.once('open',()=>{
            success();
        })

        mongoose.connection.on('error', ()=>{
            console.log('Error');
            error();
        })

        mongoose.connection.on('close', ()=>{
            console.log('End');
        })
        console.log('DB connected');
    } catch(err){
        console.log(err);
        process.exit(1)
    }
}

