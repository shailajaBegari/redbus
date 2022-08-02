

// const express = require('express');
// const router = express.Router();
// const bcrypt=require('bcryptjs')
// const auth= require('../../middleware/auth')
// const jwt = require('jsonwebtoken')
// const config=require('config')
// const {check,validationResult} = require('express-validator');
// const User =require('../../models/User')
// const adminauth=require("../../middleware/adminauth")
// // var mongoose = require('mongoose');

// // console.log(config)

// // @route GET api/auth
// // @desc  Test route
// //@access public
// router.get('/',auth,async(req,res) => {
//     try{
//         const user = await User.findById(req.user.id).select('-password');
//         res.json(user)
//     }catch(err){
//        console.error(err.message);
//        res.status(500).send('server - error')
//     }
// })

// // @route POST api/auth
// // @desc Authenticatrer &get token
// // @access Public

// router.post('/',[
//     check("email",'please include a valid email').isEmail(),
//     check('password','password is required').exists()
// ],
//     async(req,res)=>{
//         //  console.log(req.body)
//          const errors=validationResult(req);
//          if(!errors.isEmpty()){
//              return res.status(400).json({errors:errors.array()});
             
//             }
//     const {email,password} = req.body;
// try {
//     let user = await User.findOne({ email });
//     if (!user){
//        return res.status(400).json({errors:[{msg:'Invalid Credentials'}] });
//     }
//     const isMatch = await bcrypt.compare(password,user.password);
    
//     if(!isMatch){
//         return res
//         .status(400)
//         .json({errors:[{msg:'Invalid Credentials'}]});
//     }    
//         //  Return jsonwebtoken
//         const payload ={
//             user:{
//                 id:user.id
//             }
//         }
//         jwt.sign(
//             payload,
//             config.get('jwtSecret'),
//         {expiresIn:360000},
//         (err,token)=>{ 
//             if (err) throw err;
//             res.json({token})
//         })

//         // console.log("user route")
// }catch (err){
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
//  }
// )


// // @route GET api/adminauth
// // @desc  Test route
// //@access public
// router.get('/',adminauth,async(req,res) => {
//     try{
//         const admin = await Admin.findById(req.admin.id).select('-password');
//         res.json(admin)
//     }catch(err){
//        console.error(err.message);
//        res.status(500).send('server - error')
//     }
// })


//   // @route   POST api/auth/admin
// // @desc     Authenticate user & get token
// // @access   Public
// router.post('/admin',
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {  



//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       const { email, password } = req.body;
  
//       try {
//         let admin = await Admin.findOne({ email });
  
//         if (!admin) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'Invalid Credentials' }] });
//         }
  
//         const isMatch = await bcrypt.compare(password, admin.password);
  
//         if (!isMatch) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'Invalid Credentials' }] });
//         }
  
//         const payload = {
//           admin: {
//             id: admin.id
//           }
//         };
    
//         jwt.sign(
//           payload,
//           config.get('jwtSecret'),
//           { expiresIn: '5 days' },
//           (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//           }
//         );
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//       }
//     }
//   );
  


// module.exports=router;






const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
// const Admin = require('../../models/Admin');

  


// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
   try {
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error');
   }
 });

 // @route   POST api/auth
// @desc     Authenticate user & get token
// @access   Public  


router.post(
   '/',
   check('email', 'Please include a valid email').isEmail(),
   check('password', 'Password is required').exists(),
   async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
 
     const {email, password } = req.body;
 
     try {
       let user = await User.findOne({email});
 
       if (!user) {
         return res
           .status(400)
           .json({ errors: [{ msg: 'Invalid Credentials' }] });
       }
 
       const isMatch = await bcrypt.compare(password, user.password);
 
       if (!isMatch) {
         return res
           .status(400)
           .json({ errors: [{ msg: 'Invalid Credentials' }] });
       }
 
       const payload = {
         user: {
           id: user.id
         }
       }

       jwt.sign(
         payload,
         config.get('jwtSecret'),
         { expiresIn: '5 days' },
         (err, token) => {
           if (err) throw err;
           res.json({ token });
         }
       );

     } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
     }
   }
)

module.exports=router;