const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();


router.get('/search-pokemon', async (req, res) => {
    try {
      const pokemon = await pokedex.getPokemonByName(req.query.namePokemon)
      
      console.log(pokedex.getTypeByName("ground"));
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

  // router.get('/search-species', async (req, res) => {
  //   try {
  //     const pokemon = await pokedex.getPokemonByName(req.query.speciesName)
  //     console.log(generation.pokemon-entries);
  //   res.render('pokepedia/detail', pokemon);    
  //   } catch (error) {
  //     res.render('not-found')
  //     console.log('Error searching the pokemon', error);
  //   }
  // })



  module.exports = router;