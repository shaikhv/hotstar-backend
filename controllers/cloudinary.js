const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.uploadVideo = async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.body.video, {
            public_id: `${Date.now()}`,
            resource_type: "auto"
        })
        res.json({
            public_id: result.public_id,
            url: result.secure_url
        });
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.upload = async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        })
        res.json({
            public_id: result.public_id,
            url: result.secure_url
        });
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.remove = async (req, res) => {
    let image_id = req.body.public_id
    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) {
            return res.json({ success: false, err })
        } else if (result) {
            res.json({ result }).send('ok')
        }
    })
}