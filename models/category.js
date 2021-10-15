const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
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
        image:{
            type:String,
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("Category", categorySchema)
