const express=require('express');
require('dotenv/config');
const router=express.Router();
const User=require('../model/User');
const bcrypt=require('bcrypt');
const {LoginValidation,RegisterValidation}=require('../configs/validation');
const jwt=require('jsonwebtoken');

router.post('/user',async(req,res)=>{

     const validation=RegisterValidation(req.body);
     if(validation){
         res.status(400).json({msg:validation.error.details[0].message});
     }

    // sebelum melakukan registerasi kita cek dulu biar tidak menghindari email yang sama
    const EmailUserExist= await User.findOne({email:req.body.email});
    if (EmailUserExist){

        return res.status(400).json({mg:"Email sudah ada di database"});
    }

      // kita bcrypt passwordnya terlebih dahulu
      const salt=await bcrypt.genSalt(10);
      const hashPassword= await bcrypt.hash(req.body.password,salt);

    let UserPost= new User({
        nama:req.body.nama,
        email:req.body.email,
        password:hashPassword,
        create:req.body.create
    });
    try {
        let userSave=await UserPost.save();
        res.status(200).json({msg:userSave});
    } catch (err) {

        res.send(err)
        
    }


})

// login 
router.post('/login',async(req,res)=>{

// cari data berdasarakan email yang di kirim
    const emaillogin=await User.findOne({email:req.body.email});
    
    if(!emaillogin){
        res.status(400).json({msg:'email yang anda masukan  salah'});
    }
    
    const validpaswod=await bcrypt.compare(req.body.password,emaillogin.password);
    if(!validpaswod){
        res.status(400).json({msg:'Password yang anda masukan tidak valid'});
    }

    // res.send('berhasil login');

    // membuat token dengan jsonwebtokem
    const token=await jwt.sign({_id:emaillogin.id},process.env.SECRET_KEY);

    res.header('x-auth-token',token).json({
        token:token
    })
    


})






module.exports=router;