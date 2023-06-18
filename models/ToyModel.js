var mongoose = require('mongoose');

var ToySchema = mongoose.Schema(
   {
      name : String,
      origin : String,
      price : Number,
      brand : String,
      brand_origin : String,
      quantity : Number,
      image: String
   }
);
var ToyModel = mongoose.model("Toy", ToySchema, "toys");
module.exports = ToyModel;