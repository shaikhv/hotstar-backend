const admin = require("../firebase/firebase");
const User = require('../models/user')

exports.authCheck = async (req, res, next) => {
    console.log('firebaseUser',req.headers.authtoken)
    try{
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser
        next();
    }catch(err){
        res.status(401).json({
            err:'Invalid or Expired token'
        })
    }
}

exports.adminCheck = async (req, res, next) => {
    try{
        const adminUser = await User.findOne({email: req.user.email}).exec()
        if(adminUser.role !== 'admin'){
            res.status(403).json({
                err:'Admin resource. Access Denied'
            })
        }else{
           next();
        }
    }catch(err){
        res.status(401).json({
            err:'Admin resource. Access Denied'
        })
    }
}
