const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const episodesSchema = new mongoose.Schema(
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
        movie:{
            type:ObjectId,
            ref:"Movie"
        },
        thumbnail:{
            type:String,
        },
        video:{
            type:String,
        },
        movieType:{
            type:String,
        },
    },
    {timestamps:true}
    
);

module.exports = mongoose.model("Episodes", episodesSchema)
