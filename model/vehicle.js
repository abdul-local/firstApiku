const mongoose=require('mongoose')

 const Schema =mongoose.Schema;

// Sechema Vehicles
const vehiclesSchema= new Schema({
   make:String,
   model:String,
   color:String

});
// export

module.exports=mongoose.model('Vehicle',vehiclesSchema);