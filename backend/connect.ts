// import mongoose from 'mongoose';
import model from './db/model.js';
import db from './db/db.js';
db(()=>{
    console.log('connect')
    
    // model.create({
    //     name:'jack',
    //     age:19,
    //     gender:'M'
    // })
    // .then(result=>{
    //     console.log(result)
    // })

    // model.deleteMany({name:'jack'}).then(e=>console.log(e));
    // model.updateOne({name:'tony'},{gender:'F'}).then((err,data)=>{console.log(err)});
    model.findOne({name:'name'})
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        });


    },
    (err)=>{
        console.log(err);
    }
);