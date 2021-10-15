const express = require('express');
const router = express.Router()

const { authCheck , adminCheck } = require('../middleware/auth')
const { list, addMovie, readMovie, listRealted, sort, addClip, readyByType } = require('../controllers/movies')

router.get('/movies', list)
router.post('/movies', readyByType)
router.post('/add-movie', authCheck, adminCheck, addMovie)
router.post('/sort', sort)
router.get('/movie/:movieId', readMovie)
router.post('/movie/related/:movieId', listRealted)
router.post('/add-video/:movieId', authCheck, adminCheck, addClip)

module.exports = router