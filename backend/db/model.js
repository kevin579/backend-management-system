const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
        name:{type:String,required:true},
        age:{type:Number,default:18},
        gender:{type:String,enum:['M','F']}
})

let model = mongoose.model('users',Schema);
module.exports = model;