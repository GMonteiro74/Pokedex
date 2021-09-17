const router = require("express").Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();
const PokeTypes = require('../models/PokemonType.model');


router.post('/search', async (req, res) => {

  if (req.body.searchType === 'pokemon') {
      res.render('pokepedia/search-pokemon');
    } else if (req.body.searchType === 'region') {
      res.render('pokepedia/search-region');
    } else if (req.body.searchType === 'type') {
      res.render('pokepedia/search-type');
    }
    
});

router.get('/search-pokemon', async (req, res) => {
  try {
      const search = req.query.namePokemon;
      const searchStr = String(search);
      const searchLowerCase = searchStr.toLowerCase();

      const pokemon = await pokedex.getPokemonByName(searchLowerCase);
      const pokeMoves = Array.from(pokemon.moves);
      console.log(pokemon.abilities);

      const promisesArray = [];

      pokeMoves.forEach(move => {
        promisesArray.push(pokedex.getMoveByName(move.move.name));
      });

      const allMoves = await Promise.all(promisesArray);

      res.render('pokepedia/detail', { pokemon, allMoves }); 
    } catch (error) {
      res.render('not-found')
      console.log('Error searching the pokemon', error);
    }
  })

router.post('/search-region', async (req, res) => {

    try{ 
    
    if (req.body.regionName === 'kanto') {
      const region = await pokedex.getPokedexByName('kanto');
      const location = await pokedex.getRegionByName("kanto");
      res.render('pokepedia/region', {region, location})
    } else if (req.body.regionName === 'johto') {
      const region = await pokedex.getPokedexByName('updated-johto');
      const location = await pokedex.getRegionByName("johto");
      console.log(location);
      res.render('pokepedia/region', {region, location})
    } else if (req.body.regionName === 'hoenn') {
      const region = await pokedex.getPokedexByName('hoenn');
      const location = await pokedex.getRegionByName("hoenn");
      res.render('pokepedia/region', {region, location})
    } else if (req.body.regionName === 'unova') {
      const region = await pokedex.getPokedexByName('updated-unova');
      const location = await pokedex.getRegionByName("unova");
      res.render('pokepedia/region', {region, location})
    } else if (req.body.regionName === 'alola') {
      const region = await pokedex.getPokedexByName('updated-alola');
      const location = await pokedex.getRegionByName("alola");
      res.render('pokepedia/region', {region, location})
    } else if (req.body.regionName === 'galar') {
      const region = await pokedex.getPokedexByName('galar');
      const location = await pokedex.getRegionByName("galar");
      res.render('pokepedia/region', {region, location})
    }

    } catch (error) {
        res.render('not-found')
        console.log('Error searching the pokemon', error);
    }
})

router.get('/search-types', async (req, res) => {
    try {
      const search = req.query.typeName;
      const searchStr = String(search);
      const searchLowerCase = searchStr.toLowerCase();
      const types = await pokedex.getTypeByName(searchLowerCase)
      res.render('pokepedia/types', types);    
    } catch (error) {
      res.render('not-found')
      console.log('Error searching the pokemon', error);
    } 
})


router.get('/moves/:name', async (req, res) => {
  try {
    console.log(req.params.name);
    const moves = await pokedex.getMoveByName(req.params.name);
    console.log(moves);
    // console.log(location);
    res.render('pokepedia/movesLearn', moves)
  } catch (error) {
    res.render('not-found')
    console.log('Error searching the pokemon', error);
}
})

router.get('/location/:name', async (req, res) => {
  try {
    console.log(req.params.name);
    // console.log(await pokedex.getLocationAreaByName('cerulean-city-area'));
    const location = await pokedex.getLocationByName(req.params.name);
    console.log(location);
    res.render('pokepedia/location', location)
  } catch (error) {
    res.render('not-found')
    console.log('Error searching the pokemon', error);
}
})

router.get('/areas/:name', async (req, res) => {
  try {
    console.log(req.params.name);
    const area = await pokedex.getLocationAreaByName(req.params.name);
    res.render('pokepedia/area', area)
  } catch (error) {
    res.render('not-found')
    console.log('Error searching the pokemon', error);
}
})


module.exports = router;