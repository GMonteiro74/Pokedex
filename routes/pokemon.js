const router = require("express").Router();
const fileUpload = require('../config/cloudinary');
const Pokemon = require('../models/Pokemon.model');

router.get('/create', (req, res) => {
    res.render("create");
});

router.post('/create', fileUpload.single('image'), async (req, res) => {
    let fileUrlOnCloudinary = '';
    if (req.file) {
        fileUrlOnCloudinary = req.file.path; // the path on cloudinary
    }
    const { name, rating, description } = req.body;
    console.log(name, rating,description);
    await Pokemon.create({ 
        name,
        rating,
        description,
        imageUrl: fileUrlOnCloudinary
     });
    res.redirect('/');
});

module.exports = router;