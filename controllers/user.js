const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.userCart = async (req, res) => {
    try{
    const { cart } = req.body

    const products = []

    const user = await User.findOne({ email:req.user.email }).exec()

    console.log('user',user._id)

    let ifExistingCart = await Cart.findOne({orderedBy:user._id}).exec()

    if(ifExistingCart){
        ifExistingCart.remove()
        console.log("Cart Removed")
    }

    for(let i = 0; i < cart.length; i++){
        let object = {}

        object.product = cart[i]._id
        object.count = cart[i].count
        object.color = cart[i].color

        let { price } = await Product.findById(cart[i]._id).select("price").exec()
        object.price = price

        products.push(object)
    }

    let cartTotal = 0
    for(let i = 0; i < products.length; i++){
        cartTotal = cartTotal + products[i].price * products[i].count
    }

    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy:user._id
    }).save();

    console.log("new cart", newCart)
    res.json({ok: true})
    }catch(err){
        console.log(err)
        res.json(err.message)
    }
}

exports.read = async (req, res) => {
    try{
        const user = await User.findOne({ email:req.user.email }).exec()
        let cart = await Cart.findOne({orderedBy:user._id})
        .populate('products.product', "_id title price").exec()
        res.json(cart)
    }
    catch(err){
        console.log(err)
        res.json(err.message)
    }
}