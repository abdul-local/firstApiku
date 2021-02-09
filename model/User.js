const mongoose=require('mongoose');

const Userschema=mongoose.Schema({
    nama:{
        type:String,
        required:true,
        min:6,
        max:30
    },
    email:{
        type:String,
        required:true,
        min:29,
        max:50
    },
    password:{
        type:String,
        min:6,
        max:50
    },
    create:{
        type:Date,
        default:Date.now()
    },
   
})


module.exports=mongoose.model('User',Userschema);