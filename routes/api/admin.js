
const express = require('express');

const router = express.Router();
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check,validationResult}=require('express-validator');
const User = require('../../models/User');
const config = require('config');

// post router for admin

router.post('/',
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
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {name,email,password,gender,age,phonenumber,isAdmin}=req.body;
  try {
    // if admin is already exist
    let admin = await User.findOne({email});

    if(admin){
      return res.status(400).json({errors:[{msg:'Admin already registered'}]});
    }
    // the registartion for Admin

    admin = new User({
      name,
      email,
      password,
      gender,
      age,
      phonenumber,
      isAdmin:true
    });
    const salt = await bcrypt.genSalt()
    admin.password = await bcrypt.hash(password,salt)
    await admin.save();
    res.send('Admin register')

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
}
);


// for admin authentication
router.post('/login',[
  check("email","please include a valid emailid ").isEmail(),
  check("password","password is required ").exists()
],
async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {email,password}=req.body
  try {
    let admin = await User.findOne({email});

    if (!admin){
      console.log("he/she not admin")
      return res.status(400).json({errors:[{message:"Invalid Credentials"}]});

    }
    const isMatch = await bcrypt.compare(password,admin.password);

    if (!isMatch){
      console.log("he/she passwords not matched")
      return res.status(400).json({errors:[{message:"Invalid Credentials"}]});
    }
    const payload = {
      user:{
        id:admin.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn:'5 days'},
      (err,token)=>{
        if (err) throw err;
        res.json({ token })
      }
    )
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error')
    
  }

}
)


module.exports=router;