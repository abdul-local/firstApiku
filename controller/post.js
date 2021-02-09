const express=require('express');

const router=express.Router();
const Post=require('../model/Post');

router.post('/post',(req,res)=>{

    const post= new Post({
        title:req.body.title,
        content:req.body.content,
        image:req.file.path
    });
    const datapost=post.save();

    if(!datapost){
        return res.json({msg:'data tidak berhasil di save'})
    }

    return res.json({msg:'data berhasil di save'});



})
router.get('/post/:id',async(req,res)=>{

      try {
         let datapost= await Post.findById({_id:req.params._id});
         res.json(datapost);

          
      } catch (err) {
          res.status(400).json({msg:err})
          
      }


})

module.exports=router