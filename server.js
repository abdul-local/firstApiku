const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const app=express();
const indexcontroller=require('./controller/index');
const usercontroller=require('./controller/user');
const postcontroller=require('./controller/post');
require('dotenv/config');
const multer=require('multer');
const path=require('path');


app.use('/images',express.static(path.join(__dirname,'images')));
// konfigurasi bodyParser()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// koneksi ke database mongoDB
mongoose.connect(process.env.MongoUri,{useNewUrlParser:true,useUnifiedTopology:true},(error)=>{
    if (!error){
        console.log('connect success to database');
    }
    else{
    console.log("error connecting to database");
    }
});

// deklarasikan tempat nyimpen filenya
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')

    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime() +'-' +file.originalname)
    }
}

)

const filterImage=(req,file,cb)=>{
    if(file.mimetype ==='image/png'||file.mimetype ==='image/jpg'|| file.mimetype==='image/jpeg'){
    
    cb(null,true)
    }else{
       cb(null,false)
    }
}
app.use(multer({storage:fileStorage,fileFilter:filterImage}).single('image'))

app.use('/api',indexcontroller);
app.use('/api',usercontroller);
app.use('/api',postcontroller);


// setup server
const port=process.env.PORT || 3000;
app.listen(port,()=>{
   console.log(`Server running to port ${port}..`)
})
