const User = require('../models/user')

exports.createOrUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user
    console.log(req.user)
    const user = await User.findOneAndUpdate({email}, {name, picture}, {new: true})
    if(user){
        res.json(user)
    }else{
        const newUser = await new User({
            name, picture, email 
        }).save()
        res.json(newUser)
    }
}

exports.currentUser = async (req, res) => {
    User.findOne({email: req.user.email}).exec((err, user) => {
        if(err) throw new Error(err)
        res.json(user)
    })
}