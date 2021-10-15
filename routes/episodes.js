const express = require('express');
const router = express.Router()

const { authCheck , adminCheck } = require('../middleware/auth')
const { list, addEpisode, listRealted, readEpisode } = require('../controllers/episodes')

router.post('/episode/:movieId', list)
router.post('/add-episode/:movieId', authCheck, adminCheck, addEpisode)
router.post('/episode/:movieId/:episodeId', listRealted)
router.post('/episode-details/:episodeId', readEpisode)

module.exports = router