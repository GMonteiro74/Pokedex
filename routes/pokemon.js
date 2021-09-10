const router = require("express").Router();
const PokemonType = require('../models/PokemonType.model');
const fileUpload = require("../config/cloudinary");

const Pokemon = require('../models/Pokemon.model');

router.get('/create', async (req, res) => {
    const poketypes = await PokemonType.find();
    res.render("create", {poketypes});
});

router.post('/create', fileUpload.single('image'), async (req, res) => {
    let fileUrlOnCloudinary = '';
    if (req.file) {
        fileUrlOnCloudinary = req.file.path; // the path on cloudinary
    }
    const { name, rating, description, type } = req.body;
    console.log(name, rating,description, type);
    await Pokemon.create({ 
        name,
        rating,
        description,
        type,
        imageUrl: fileUrlOnCloudinary
     });
    res.redirect('/');
});

module.exports = router;