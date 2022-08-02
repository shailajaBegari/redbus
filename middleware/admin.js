const jwt = require('jsonwebtoken')
const config= require('config')

module.exports=function(req,res,next){

    // Get token from header
    const token = req.header('x-admin-token');

    // Check if not token
        if(!token) {
            return res.status(401).json({ msg: 'NO  token,its not a admin'});
        }

    // verify token
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        req.admin=decoded.admin;
        next()

    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
        
    }

}