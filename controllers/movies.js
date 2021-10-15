const Movie = require('../models/movie')
const Category = require('../models/category')
const slugify = require('slugify')

exports.list = async (req, res) => {
    try {
        const movie = await Movie.find({}).populate('category', 'name').exec()
        res.json(movie)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.addMovie = async (req, res) => {
    try {
        const { details } = req.body
        const movie = await new Movie({...details, slug: slugify(details.title), imagePoster:details.imagePoster, imageSliderPoster:details.imageSliderPoster}).save();
        res.json(movie)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.addClip = async (req, res) => {
    const { movieId } = req.params
    try {
        const { clips } = req.body
        const movie = await Movie.findByIdAndUpdate({ _id: movieId }, {trailerClips: clips}, { new: true }).exec()
        res.json(movie)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.readMovie = async (req, res) => {
    const {movieId} = req.params
    try {
        const movie = await Movie.findById({_id:movieId}).populate('category', 'name').exec()
        res.json(movie)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.listRealted = async (req, res) => {
    const {movieId} = req.params
    const { type } = req.body
    try {
        const movie = await Movie.findById({_id:movieId}).exec()
        const movies = await Movie.find({
            _id:{$ne: movie._id},
            category:movie.category,
            movieType:type}).populate().exec()
        res.json(movies)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.sort = async (req, res) => {
    try{
        const movie = await Movie.find({}).populate('category').sort([['createdAt', 'desc']]).exec()
        res.json(movie)
    }catch(err){
        console.log(err)
    }
}

exports.readyByType = async (req, res) => {
    const { type } = req.body
    try{
        const movie = await Movie.find({'movieType':type}).populate('category').sort([['createdAt', 'desc']]).exec()
        res.json(movie)
    }catch(err){
        console.log(err)
    }
}



