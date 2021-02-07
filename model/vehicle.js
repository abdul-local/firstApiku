const mongoose=require('mongoose')

 const Schema =mongoose.Schema;

// Sechema Vehicles
const vehiclesSchema= new Schema({
   name:String
});
// export

module.exports=mongoose.model('Vehicle',vehiclesSchema);