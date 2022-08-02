const mongoose = require('mongoose');

const ticketSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    busName:{
        type:String,
        required:true
    },

    phoneNumber:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    startCity:{
        type:String,
        required:true
    },
    endCity:{
        type:String,
        required:true
    },
    seatNumber:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        required:true
    },
    costOfTicket:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    busId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus' 
    },

})

module.exports=Ticket=mongoose.model("ticket",ticketSchema)