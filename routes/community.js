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

router.get('/community', async (req, res) => {
    const pokemons = await Pokemon.find().sort().populate('user');
    res.render('community/index', {pokemons});
 });

router.get("community/:pokemonsId", async (req, res) => {
    const pokemon = await Pokemon.findById(req.params.pokemonsId);
    res.render("community/mypokemons", pokemon);
});

router.get('/create', requireLogin, async (req, res) => {
    const poketypes = await PokemonType.find();
    res.render("community/create", {poketypes});
});

router.post('/create', fileUpload.single('image'), async (req, res) => {
    let fileUrlOnCloudinary = '';
    if (req.file) {
        fileUrlOnCloudinary = req.file.path;
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

router.get("/community/:pokemonsId/edit", async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.pokemonsId).populate("user");
  const users = await User.find();
  res.render("community/pokemon-edit", { pokemon, users });
});

router.post("/community/:pokemonsId/edit", fileUpload.single('image'), async (req, res) => {
  let fileUrlOnCloudinary = '';
    if (req.file) {
        fileUrlOnCloudinary = req.file.path;
    }
  const { name, rating, description } = req.body;
  await Pokemon.findByIdAndUpdate(req.params.pokemonsId, {
    name,
    rating, 
    description,
    imageUrl: fileUrlOnCloudinary,
  });
  res.redirect('/mypokemons');
});

router.post("/community/:pokemonsId/delete", async (req, res) => {
  await Pokemon.findByIdAndRemove(req.params.pokemonsId);
  res.redirect("/community");
});

router.post("/reviews/:pokemonsId/add", async (req, res) => {
  const { name, comment } = req.body;
  await Pokemon.findByIdAndUpdate(req.params.pokemonsId, {
    $push: { reviews: { name, comment } },
  });
  res.redirect(`/community`);
}); 

///${req.params.pokemonsId}

module.exports = router;