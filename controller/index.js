const express=require('express');
const router=express.Router();
const verifyToken=require('../middleware/index');
const Vehicle=require('../model/vehicle');
// const multer=require('multer');
// const upload=multer({dest:'uploads/'})

// var upload = multer({ storage: storage })
// const router=express.Router();
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
// post  data 
router.post('/',async(req,res)=>{
    let postVehicle= new Vehicle({
        make:req.body.make,
        model:req.body.model,
        color:req.body.model,
        Image:req.body.Image,

    });

    try{
        await postVehicle.save();
        res.status(200).json(postVehicle);

    }catch(err){
        res.json({msg:err})
    }

    
})

// proses get semua data
router.get('/',verifyToken,async(req,res)=>{

    try{
        let dataget=await Vehicle.find();
        res.json(dataget);

    }catch(err){
        res.send(err);
    }

})
// get data berdasarkan id
router.get('/:id',async(req,res)=>{
    try {
        let getIddata=await Vehicle.findById({_id:req.params.id});
        res.json(getIddata);
    } catch (err) {
        res.send(err);
        
    }
    


})

// update data
router.put('/:id',async(req,res)=>{

    try {
        await Vehicle.updateOne({_id:req.params.id},{
            make:req.body.make,
            model:req.body.model,
            color:req.body.color
        

        });
        res.json({msg:'Berhasil update data'});
        
    } catch (err) {
        res.send(err);
        
    }
})

// detelet data berdasarkan id
router.delete('/:id',async(req,res)=>{
    try {
        await Vehicle.deleteOne({_id:req.params.id});
        res.json({msg:'Berhasil melakukan delet data'});
        
    } catch (err) {
        res.send(err);
        
    }

})

module.exports=router;
