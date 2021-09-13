const router = require("express").Router();
const PokemonType = require('../models/PokemonType.model');
const fileUpload = require("../config/cloudinary");
const Pokemon = require('../models/Pokemon.model');

function requireLogin(req, res, next) {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect("/login");
    }
  }

  router.get("pokemon/:pokemonsId", async (req, res) => {
    const pokemon = await Pokemon.findById(req.params.pokemonsId);
    res.render("/", pokemon);
  });

router.get('/create', requireLogin, async (req, res) => {
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

router.get("pokemon/:pokemonsId/edit", async (req, res) => {
  const pokemon = await Pokemon.findById(req.params.pokemonsId);
  res.render("user/pokemon-edit", pokemon);
});

router.post("/:pokemonsId/edit", async (req, res) => {
  const { name, rating, description, type, imageUrl } = req.body;
  await Pokemon.findByIdAndUpdate(req.params.pokemonsId, {
    name, rating, description, type, imageUrl
  });
  res.redirect(`/${req.params.pokemonsId}`);
});

router.post("/:pokemonsId/delete", async (req, res) => {
  await Pokemon.findByIdAndRemove(req.params.pokemonsId);
  res.redirect("/pokemon");
});

module.exports = router;