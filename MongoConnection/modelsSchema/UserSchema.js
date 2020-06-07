const mongoose=require('mongoose');

const users=mongoose.Schema({

    fullname:{
            type:String,
            required:true
        },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cart:[mongoose.Schema.Types.ObjectId],
    orders:[mongoose.Schema.Types.ObjectId],
    address:String,

});


module.exports=mongoose.model('users',users);