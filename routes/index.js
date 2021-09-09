const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();

const Pokemon = require('pokemon.js');


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/search', async (req, res) => {
  try {
    const pokemon = await pokedex.getPokemonByName(req.query.namePokemon);
  console.log(pokemon);
  res.render('pokemons/detail', pokemon);    
  } catch (error) {
    res.render('not-found')
    console.log('Error searching the pokemon', error);
  }
  
})

router.get('/search-location', async (req, res) => {
  const location = await pokedex.getLocationByName(req.query.locationName);
  console.log(location.game_indices[0].generation.url.pokemon_species);
})


module.exports = router;
