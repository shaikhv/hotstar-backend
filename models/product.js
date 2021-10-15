const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            required:'Name is required',
            maxLength:[32, "Too Long"],
            text:true
        },
        slug:{
            type:String,
            unique:true,
            lowercase:true,
            index:true,
        },
        description:{
            type:String,
            required:'Name is required',
            maxLength:[2000, "Too Long"],
            text:true
        },
        price:{
            type:Number,
            required:'Price is required',
            trim:true,
            maxLength:32
        },
        category:{
            type:ObjectId,
            ref:"Category"
        },
        sub:[
            {
                type:ObjectId,
                ref:"Sub"
            }
        ],
        quantity:Number,
        sold:{
            type:Number,
            default:0
        },
        images:{
            type:Array,
        },
        shipping:{
            type:String,
            enum:['Yes','No']
        },
        color:{
            type:String,
            enum:['Black','Brown', 'Silver', 'White', 'Blue']
        },
        brand:{
            type:String,
            enum:['Apple','Sumsung', 'Microsoft', 'Lenovo', 'ASUS']
        },
        ratings:[
            {
                star:Number,
                postedBy:{ type:ObjectId, ref:'User' }
            },
        ],
    },
    {timestamps:true}
    
);

module.exports = mongoose.model("Product", productSchema)
