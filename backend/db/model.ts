import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    id:{type:String,required:true},
    uname:{type:String,required:true},
    password:{type:Number,required:true},
})

export default mongoose.model('users',Schema);
