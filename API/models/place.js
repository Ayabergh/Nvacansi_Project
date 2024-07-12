import mongoose from 'mongoose';


const placeschema = new mongoose.Schema({
    owner:mongoose.Schema.Types.ObjectId,ref:'user',
    title:String,
    address:String,
    photo:[String],
    description:String,
    perks:[String],
    extrainf:String,
    checkIn:Number,
    checkOut:Number,
    maxGuest:Number,
});

const placemodel =mongoose.model('place',placeschema);
module.exports=placemodel;
