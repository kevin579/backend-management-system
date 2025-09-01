/**
 * 
 * @param {*} success 
 * @param {*} error 
 */
import mongoose from "mongoose"
import config from './config.ts'

export default function(success,error){
    //get the database config
    const {DBHOST:host,DBPORT:port,DBNAME:name} = config;
    
    console.log(`mongodb://${host}:${port}/${name}`)
    mongoose.connect(`mongodb://${host}:${port}/${name}`);

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

    setTimeout(()=>{
        mongoose.disconnect();
    },2000)


}

