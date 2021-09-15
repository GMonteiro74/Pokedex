const router = require("express").Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();

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


router.post('/search', async (req, res) => {
  if (req.body.searchType === 'pokemon') {
    // const pokemon = await pokedex.getPokemonByName(searchLowerCase);
    res.render('pokepedia/search-pokemon');
    } else if (req.body.searchType === 'region') {
      res.render('pokepedia/search-region');
    } else if (req.body.searchType === 'type') {
        res.render('pokepedia/search-type');
    }
});

  router.get('/search-types', async (req, res) => {
    try {
      const types = await pokedex.getTypeByName(req.query.typeName)
      // console.log(types.pokemon[0].pokemon.name);
    res.render('pokepedia/types', types);    
    } catch (error) {
      res.render('not-found')
      console.log('Error searching the pokemon', error);
    }

})
  module.exports = router;