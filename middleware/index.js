
const jwt=require('jsonwebtoken')
require('dotenv/config')

const verifyToken=(req,res,next)=> {
    // dapatkan token dari paramter yang di kirim
    const token = req.header('x-auth-token');

    if(!token){
        res.status(404).json({
            msg:'Anda tidak memiliki token'
        })
        
    }
    try {
        // prose verifikasi token
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        console.log('proses middleware bekerja');
        req.user=decode;
        next();
        
    } catch (err) {

        res.status(500).json({msg:err});
        
    }
    
}
module.exports=verifyToken;