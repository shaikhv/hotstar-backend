const express = require('express');
const router = express.Router()

// middleware
const { authCheck, adminCheck } = require('../middleware/auth');


// controllers
const { upload, remove, uploadVideo } = require('../controllers/cloudinary');

router.post('/upload-images', authCheck, adminCheck, upload )
router.post('/remove-image', authCheck, adminCheck, remove )
router.post('/upload-video', uploadVideo )



module.exports = router
