const express=require("express");
const router=express.Router();
const Ticket=require("../../models/Ticket");
const {check,validationResult}=require("express-validator");

//CREATING A TICKET

router.post("/",[
    check("name","please enter the name").notEmpty(),
    check("busName","please enter the bus number").notEmpty(),
    check("phoneNumber","please enter the phopnenumber").isMobilePhone(),
    check("age","please enter the age of person").notEmpty(),
    check("gender","please mention the gender").notEmpty(),
    check("startCity","please enter the arrivail City ").notEmpty(),
    check("endCity","please enter the destination point").notEmpty(),
    check("seatNumber","please enter the seat number").notEmpty(),
    check("isBooked","please enter the ticket is confrom or not").notEmpty(),
    check("costOfTicket","please enter the cost of ticket").isLength({min:3}),
    check("status","enter the ticket status is available or not").notEmpty(),
    check("busId","busId is reuired").not().isEmpty() ], 
    async(req,res)=>{
        const errors = validationResult(req);
        console.log(errors)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const bus_id = req.body.busId
    
        console.log(bus_id)
        try{
            const busId = await Bus.findOne({bus_id})
            // console.log(Bus.findOne({bus_id}))
    
            // if(!busId)
            if(!busId){
                console.log(Bus.findOne({bus_id}))
                console.log("bus created")
                return res.status(400).json({msg:"incorrect busId"});
                
            }
            
           //for new ticket
           else{
            const ticket = new Ticket(req.body)
            const ticketCreated = await ticket.save()
            res.status(201).send(ticketCreated)
           }
            
        }catch(err){
            res.send(err.message)
        }
    // const errors = validationResult(req);
    // // console.log(errors)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()})
    // }

    // try{
    //     const ticket = new Ticket(req.body)
    //     const ticketCreated = await ticket.save()
    //     res.status(201).send(ticketCreated)

    // // The HTTP 201 Created success status response code .   
    // }catch(err){
    //     res.send(err.message)
    // }
});

// get all tickets
router.get('/all',async(req,res)=>{                                            
    try {
        const tickets = await Ticket.find()
        console.log(tickets)
        // res.json(tickets)
        // const allTickets=res.json(tickets)
        var c = 0
        for (var i=0;i<=tickets.length;i++){
            c=c+1
        }
        var reduce = 40-c
        res.status(200).json({success:true,"message":`This many seats are available ${reduce}`})

        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server -Error");
    }
});

// get tickets
router.get('/',async(req,res)=>{
    try {
        const tickets = await Ticket.find()
        res.json(tickets)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server -Error");
    }
});

// get tickets by using busname and person name:

// router.get("/name",async(req,res)=>{
//     let busname = req.query.busName;
//     let Name = req.query.name;

//     try{
//         let ticketData=await Ticket.findOne({busName:busname,name:Name});
//         if(!ticketData)
//             return res.status(400).json({msg:"sorry no tickets for buses"});
//             res.status(200).json(ticketData)
//         console.log(ticketData)
//     }catch(err){
//         console.error(err.message)
//         res.json({error:err})
//     }
// })

// get token by id 

router.get("/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const ticket= await Ticket.findById(_id)
        if(!ticket){
            res.status(404).send()
        }
        else{
            res.send(ticket)
        }
        
    }catch(error){
        res.status(500).send(error.message)

    }
});

// view bus tickets

// router.get("/open",async(req,res)=>{
//     try{
//         const tickets=await Ticket.find()
//         console.log("res.json(ticket)",res.json(tickets))
//         res.send(tickets)
//         const allTickets=res.json(tickets)
//         var c=0
//         for(var i=0;i<=allTickets.length;i++){
//             c=c+1
//         }
//         var reduce=40-c
//         res.status(200).json({success:true,"message":`this many seats are available ${reduce}`})
//     }
//     catch(err){
//         console.error(err.message)
//         res.status(500).send("server-error")
//     }
// })


// router.get("/open",async(req,res)=>{
//     try {
//         const tickets = await Ticket.find()
//         console.log("res.json(tickets)",res.json(tickets))
//         res.send(tickets)
//         const allTickets=res.json(tickets)
//         var c = 0
//         for (vari=0;i<=allTickets.length;i++){
//             c=c+1
//         }
//         var reduce = 40-c
//         res.status(200).json({success:true,"message":`This many seats are available ${reduce}`})

        
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server -Error");
//     }
// })





// updating tickets
router.put("/:id",async(req,res)=>{
    
    try{
        const id = req.params.id
        const updateTicketData = await Ticket.findByIdAndUpdate(id,req.body)
        res.send(updateTicketData)

    }catch(err){
        res.send(err.message)

    }
})

//cancelling the tickets

router.delete("/:id",async(req,res)=>{
        try {
            const ticket=await Ticket.findById(req.params.id);
            if(!ticket){
                return res.status(404).json({message:"ticket not found"})
            }  
            await ticket.remove(); 
            res.json({msg:"usertiket Removed"})
        } catch (error) {
            console.error(error.message)
            }
    });


module.exports=router;

