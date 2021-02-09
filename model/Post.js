const mongoose=require('mongoose');
const { model } = require('./vehicle');

const SchemaPost=mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Post',SchemaPost);