const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/search', async (req, res) => {
  try {
    const pokemon = await pokedex.getPokemonByName(req.query.namePokemon).toLowerCase();
    
    // console.log(pokemon.sprites);
  res.render('pokemons/detail', pokemon);    
  } catch (error) {
    res.render('not-found')
    console.log('Error searching the pokemon', error);
  }
})

router.get('/search-region', async (req, res) => {
  try{
  const region = await pokedex.getPokedexByName(req.query.regionName);

  console.log(region.pokemon_entries);
  res.render('pokemons/region', region)
  } catch (error) {
    res.render('not-found');
    console.log(error);
  }
})


module.exports = router;
