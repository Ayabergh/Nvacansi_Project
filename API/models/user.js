const mongoose = require('mongoose');

const{Schema}=mongoose;

const userschema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
});

const usermodel =mongoose.model('user',userschema);

module.exports=usermodel;



