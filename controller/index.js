const express=require('express');
const auth=require('../middleware/index')
const Vehicle=require('../model/vehicle');

const router=express.Router();

router.post('/',auth,(req,res)=>{

    const vehicle=new Vehicle();
    vehicle.name=req.body.name;
    vehicle.save((err)=>{
        if(!err){
            console.log('berhasil save data')
        }
    });
    

})

module.exports=router;
