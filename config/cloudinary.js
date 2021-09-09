const cloudinary = require('cloudinary').v2;

const multer = require('multer'); // requests of the type form-data

// connects multer with cloudinary and allows to set storage settings
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//authentication in cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'pokemons',
        allowed_formats: ['png'],
    },
    filename: (req, file, cb) => { cb(null, file.originalname ) }
})

module.exports = multer({ storage });