const mongoose=require('mongoose');

const products=mongoose.Schema({

    title:String,
    subtitle:String,
    price:Number,
    image:String,
    Date:{
        type:Date,
        default:Date.now
    }

});


module.exports=mongoose.model('products',products);