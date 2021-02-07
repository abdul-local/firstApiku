module.exports=function (req,res,next) {
    console.log('ini area middleware bro');
    next();
    
}