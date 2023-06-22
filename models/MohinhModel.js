var mongoose = require('mongoose');

var MohinhSchema = mongoose.Schema(
   {
      name : String,
      origin : String,
      price : Number,
      brand : String,
      brand_origin : String,
      quantity : Number,
      image: String,
      date: Date
   }
);
var MohinhModel = mongoose.model("Mohinhxe", MohinhSchema, "mohinh");
module.exports = MohinhModel;