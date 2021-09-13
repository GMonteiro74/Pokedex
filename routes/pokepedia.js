const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();


router.get('pokepedia/pokemon-search', async (req, res) => {
    try {
      const pokemon = await pokedex.getPokemonByName(req.query.namePokemon)
      
      // console.log(pokemon.sprites);
    res.render('pokepedia/detail', pokemon);    
    } catch (error) {
      res.render('not-found')
      console.log('Error searching the pokemon', error);
    }
  })
  
  router.get('pokepedia/search-region', async (req, res) => {
    try{
    const region = await pokedex.getPokedexByName(req.query.regionName);
  
    console.log(region.pokemon_entries);
    res.render('pokepedia/region', region)
    } catch (error) {
      res.render('not-found');
      console.log(error);
    }
  })

  module.exports = router;