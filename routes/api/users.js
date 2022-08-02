const express=require("express");
const router=express.Router();
const {check,validationResult}=require("express-validator/check")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require("config")
const User =require("../../models/User")

//  @route Post API/USERS
//   @DESC Register  user
//  @ACECESS PUBLIC
console.log(config)

router.post("/",
    [
        check("name","Name is required").not().isEmpty(),
        check("email","please include a valid email").isEmail(),
        check("password","please enter a password with 6 charcheters").isLength({min:6}),
        check("gender","please enter the gender").not().isEmpty(),
        check("age","please enter the age").not().isEmpty(),
        check("phonenumber","please enter the phone number").isMobilePhone(),
        check("isAdmin","plase enter the tickect is available or not").isBoolean()
    ],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const{name,email,password,gender,age,phonenumber,is_admin}=req.body;
        try {
            let user=await User.findOne({email});
            if(user){
                res.status(400).json({errors :[{msg:"user already exist"}]})
            }

            user=new User({
                name,
                email,
                password,
                gender,
                age,
                phonenumber,
                isAdmin
            })

            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(password,salt);
            await  user.save();

            // const payload={
            //     user: {
            //         id:user.id
            //     }
            // }

            // jwt.sign(
            //     payload,
            //     config.get("jwtSecret"),
            //     {expiresIn:360000},
            //     (err,token)=>{

            //       if(err) throw err;
            //       res.json({token})
            //     }
            
            // )
            res.status(200).json({errors :[{msg:"User Registerd."}]})
    

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")
            
        }

    console.log(req.body);
})

module.exports=router;