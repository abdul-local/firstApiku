const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const app=express();
const indexcontroller=require('./controller/index')

// konfigurasi bodyParser()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// koneksi ke database mongoDB
mongoose.connect("mongodb://localhost:27017/api",{useNewUrlParser:true},(error)=>{
    if (!error){
        console.log('connect success to database');
    }
    else{
    console.log("error connecting to database");
    }
});


// buat route
const router=express.Router();
// test route
router.get('/',(req,res)=>{
    res.json({message:'Selamat datang di Api ku'});
})

app.use('/api',indexcontroller);


// setup server
const port=process.env.port || 3000;
app.listen(port,()=>{
   console.log(`Server running to port ${3000}..`)
})
