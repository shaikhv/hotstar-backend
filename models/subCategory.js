const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const subCategorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            rquired:'Name is required',
            minLength:[3, 'Too Short'],
            maxLength:[32, "Too Long"]
        },
        slug:{
            type:String,
            unique:true,
            lowercase:true,
            index:true,
        },
        parent:{
            type:ObjectId,
            ref:"Category",
            required:true
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("Sub", subCategorySchema)
