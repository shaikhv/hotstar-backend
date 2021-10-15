const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const movieSchema = new mongoose.Schema(
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
        category:[
            {
                type:ObjectId,
                ref:"Category"
            }
        ],
        imagePoster:{
            type:String,
        },
        imageSliderPoster:{
            type:String,
        },
        videoFiles:{
            type:Array,
        },
        movieType:{
            type:String,
        },
        ratings:{
            type:String,
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("Movie", movieSchema)
