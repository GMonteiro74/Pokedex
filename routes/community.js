const router = require("express").Router();
const PokemonType = require('../models/PokemonType.model');
const fileUpload = require("../config/cloudinary");
const Pokemon = require('../models/Pokemon.model');
const User = require("../models/User.model");

function requireLogin(req, res, next) {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect("/login");
    }
  }

router.get('/create', requireLogin, async (req, res) => {
    const poketypes = await PokemonType.find();
    res.render("community/create", {poketypes});
});

router.post('/create', fileUpload.single('image'), async (req, res) => {
    let fileUrlOnCloudinary = '';
    if (req.file) {
        fileUrlOnCloudinary = req.file.path; // the path on cloudinary
    }
    const { name, rating, description, type } = req.body;
    await Pokemon.create({ 
        name,
        rating,
        description,
        type,
        user: req.session.currentUser,
        imageUrl: fileUrlOnCloudinary
     });
    res.redirect('/community');
});

router.get('/mypokemons', requireLogin, async (req, res) => {
  const pokemons = await Pokemon.find({user: req.session.currentUser});
  res.render('community/mypokemons', {pokemons});
})

// $sort...


module.exports = router;