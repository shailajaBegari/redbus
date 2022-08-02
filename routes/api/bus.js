

const express = require("express");
const router = express.Router();
const config = require('config')
const {check, validationResult } = require("express-validator/check");

const Bus = require('../../models/Bus');
const admin = require("../../middleware/admin");

// for creating bus

router.post('/',[admin,[
           check("busName"," name is required").not().isEmpty(),
           check("busNumber","please enter the bus number").notEmpty(),
           check("numberofseats","please enter the number of seats do you want").not().isEmpty(),
           check("startcity","please mention where u have stated postion").not().isEmpty(),
           check("endcity","please enter the destination palce").not().isEmpty(),
           check("Arrival_time","arrival_date is required").not().isEmpty(),
           check("Departure_time","Departure_date is required").not().isEmpty(),
           check("date","please enter the date").not().isEmpty(),

]
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
    try {
        let bus = new Bus(req.body)
        const createbus = await bus.save()
        res.status(200).json({createbus})
        
    } catch (err){
        console.error(err.message);
        res.status(500).send('Sever Error')
    }
    })

    // search bus    // search bus

    router.get('/search', async(req, res)=>{

        let from = req.query.startcity;
        let to = req.query.endcity;
        let arrivalDate = req.query.date
        try{
        let busData = await Bus.findOne({startcity: from, endcity: to,date:arrivalDate});
      
        if(!busData) 
        return res.status(400).json({msg:"Sorry no Buses available",});
      
      
        res.status(200).json(busData)
        // console.log(busData)
        }catch(err){
            console.error(err.message)
            res.json({ error: err })
        }
        
      });
      
// router.get('/search', [
//     check("startcity","startCity is required").not().isEmpty(),
//     check("endcity","destinationcity should be required").not().isEmpty(),
//     check("date","date is required").notEmpty()],
//     async(req, res)=>{
//     const errors  = validationResult(req);
//         if(!errors.isEmpty()){
//             return res.status(400).json({errors:errors.array() })
//         }

//         let from = req.query.startcity;
//         let to = req.query.endcity;
//         let Data = req.query.date;
//             try{
//                 let busData=await Bus.findOne({startcity:from,endcity:to });
//                 if(!busData)
//                     return res.status(400).json({msg:"sorry no available buses"});
//                     res.status(200).json(busData)
//                     console.log(busData)
//             }catch(err){
//                 console.error(err.message)
//                 res.json({error:err})
//             }
        
//     });


//GET ALL Buses
//access PUBLIC

router.get("/",async(req,res)=>{
    try{
    const buses = await Bus.find();
    res.json(buses)

    }catch(err){
        console.error(err.message)
        res.status(500).send("Server -Error");
    }
});

// get bus by bus ID
router.get("/bus/:bus_id",async(req,res)=>{
    try{
       const bus=await Bus.findOne({
           bus:req.params.bus_id});

       if(!bus) 
       return res.status(400).json({msg:"There is no bus for this busID"});

       res.json(bus)

    }catch(err){
        console.error(err.message)
        // it is valid bus id 
        if(err.kind=="ObjectId"){
            return res.status(400).json({msg:"Bus not found"});

        }
        res.status(500).send("Server--Error");

    }
});
// update bus
router.put("/update/:id",admin, async (req, res) => {
    let bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {new : true});

    return res.status(201).send({bus});
});


module.exports = router;