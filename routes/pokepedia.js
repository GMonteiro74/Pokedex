const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();


router.get('/search-pokemon', async (req, res) => {
    try {
      const pokemon = await pokedex.getPokemonByName(req.query.namePokemon)
      
      console.log(pokemon.types[0].type.name);
      // pokedex.getTypeByName("ground")
    res.render('pokepedia/detail', pokemon);    
    } catch (error) {
      res.render('not-found')
      console.log('Error searching the pokemon', error);
    }
  })
  
  router.get('/search-region', async (req, res) => {
    try{
    const region = await pokedex.getPokedexByName(req.query.regionName);
  
    console.log(region.pokemon_entries);
    res.render('pokepedia/region', region)
    } catch (error) {
      res.render('not-found');
      console.log(error);
    }
  })

  router.get('/search-types', async (req, res) => {
    try {
      const types = await pokedex.getTypeByName(req.query.typeName)
      console.log(types.pokemon[0].pokemon.name);
    res.render('pokepedia/types', types);    
    } catch (error) {
      res.render('not-found')
      console.log('Error searching the pokemon', error);
    }
  })

  module.exports = router;