const mongoose=require("mongoose");

const BusSchema=new mongoose.Schema({
    busName:{
        type:String,
        required:true
    },
    busNumber:{
        type:String,
        required:true
    },
    numberofseats:{
        type:Number,
        required:true
    },
    startcity:{
        type:String,
        required:true
    }, 
    endcity:{
        required:true
    }, 
    endcity:{
        required:true
    }, 
    endcity:{
        type:String,
        required:true
    },
    Arrival_time:{
      type: String,
        required: true

    },
    Departure_time:{
      type: String,
       required: true
    },
    date: {
        type: String,
        required: true,
    },   


})

// // module.exports= Bus = mongoose.model("bus",BusSchema)


// const mongoose = require('mongoose');
// const BusSchema= new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     numberOfSeats:{
//         type:Number,
//         required:true
//     },
//     startCity:{
//         type:String,
//         rquired:true
//     },
//     destinationCity:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     arrivalTime:{
//         type:String,
//         required:true
//     },
//     departueTime:{
//         type:String,
//         required:true
//     }

// })
 module.exports = Bus = mongoose.model('bus',BusSchema)
//  from: {
//     type: Date,
//     required: true
// },
// to: {
//     type: Date,


// https://www.redbus.in/bus-tickets/bangalore-to-hyderabad?fromCityName=Bangalore&fromCityId=122&toCityName=Hyderabad&toCityId=124&onward=30-Jun-2022&srcCountry=IND&destCountry=IND&opId=0&busType=Any