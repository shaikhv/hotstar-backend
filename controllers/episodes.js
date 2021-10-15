const Episodes = require('../models/episodes')
const TrailerClips = require('../models/trailerClips')
const slugify = require('slugify')

exports.list = async (req, res) => {
    const { isType } = req.body
    const { movieId } = req.params
    try {
        let clip
        if(isType === 'episode'){
         clip = await Episodes.find({movie:movieId}).populate('category', 'name', 'movie').exec()
        } else {
         clip = await TrailerClips.find({movie:movieId}).populate('category', 'name', 'movie').exec()
        }
        res.json(clip)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.addEpisode = async (req, res) => {
    const { movieId } = req.params
    try {
        const { clips, isType } = req.body
        let episodes = []
        clips.map(async (clip) => {
            console.log('clipclipclipclipclip',clip)
            if(isType === 'episode'){
                episodes.push(await new Episodes({...clip, slug: slugify(clip.title), movie:movieId}).save())
            } else {
                episodes.push(await new TrailerClips({...clip, slug: slugify(clip.title), movie:movieId}).save())
            }
        })
        res.json(episodes)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.listRealted =  async (req, res) => {
    const { episodeId, movieId } = req.params
    const { isType } = req.body
    try{
        let related
        if(isType === 'episode'){
        related = await Episodes.find({
            _id:{$ne: episodeId},
            movie:movieId
        }).exec()
        } else {
            related = await TrailerClips.find({
                _id:{$ne: episodeId},
                movie:movieId
            }).exec()
        }
        res.json(related)
    }catch(err){
        res.json('ERR')
    }
}

exports.readEpisode =  async (req, res) => {
    const { episodeId } = req.params
    const { isType } = req.body
    try {
        let movie
        if(isType === 'episode'){
         movie = await Episodes.findById({_id:episodeId}).populate('category', 'name').exec()
         console.log('INSIDEEPISODE',movie)
        } else {
         movie = await TrailerClips.findById({_id:episodeId}).populate('category', 'name').exec()
         console.log('INSIDETRAILER',movie)
        }
        console.log('moviemovie',episodeId,'isType',isType)
        console.log('moviemovie',movie)
        res.json(movie)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

