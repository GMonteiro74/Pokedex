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

  router.get('/community', async (req, res) => {
    const pokemons = await Pokemon.find();
    res.render('community/index', {pokemons});
  });

  router.get("community/:pokemonsId", async (req, res) => {
    const pokemon = await Pokemon.findById(req.params.pokemonsId);
    res.render("/", pokemon);
  });

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
    console.log(name, rating,description, type);
    await Pokemon.create({ 
        name,
        rating,
        description,
        type,
        imageUrl: fileUrlOnCloudinary
     });
    res.redirect('/community');
});

// router.get("/community/:pokemonsId/edit", async (req, res) => {
//   const pokemon = await Pokemon.findById(req.params.pokemonsId)//.populate("user");
//   //const authors = await Author.find();
//   res.render("community/pokemon-edit", { pokemon, authors });
// });

// router.post("/community/:pokemonsId/edit", async (req, res) => {
//   const { name, rating, description, type, imageUrl } = req.body;
//   await Pokemon.findByIdAndUpdate(req.params.pokemonsId, {
//     name, rating, description, type, imageUrl
//   });
//   res.redirect(`/community/${req.params.pokemonsId}`);
// });

// router.post("/community/:pokemonsId/delete", async (req, res) => {
//   await Pokemon.findByIdAndRemove(req.params.pokemonsId);
//   res.redirect("/community/index");
// });

// router.post("/reviews/:pokemonsId/add", async (req, res) => {
//   const { name, comment } = req.body;
//   await Pokemon.findByIdAndUpdate(req.params.pokemonsId, {
//     $push: { reviews: { name, comment } },
//   });
//   res.redirect(`/community/${req.params.pokemonsId}`);
// }); // do we want reviews - then add reviews to the pokemon.model
// reviews: [
//   {
//     name: String,
//     comment: String,
// }

module.exports = router;