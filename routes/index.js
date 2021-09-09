const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/search', async (req, res) => {
  try {
    const pokemon = await pokedex.getPokemonByName(req.query.namePokemon);
  console.log(pokemon.types);
  res.render('pokemons/detail', pokemon);    
  } catch (error) {
    res.render('not-found')
    console.log('Error searching the pokemon', error);
  }
  
})

module.exports = router;
