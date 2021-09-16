const router = require("express").Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();


router.post('/search', async (req, res) => {

  if (req.body.searchType === 'pokemon') {
      res.render('pokepedia/search-pokemon');
      console.log(await pokedex.getLocationAreaByName("canalave-city-area"));
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
      // console.log(pokeMoves);

      const promisesArray = [];

      pokeMoves.forEach(move => {
        promisesArray.push(pokedex.getMoveByName(move.move.name));
      });

      const allMoves = await Promise.all(promisesArray);
      console.log(allMoves[0].learned_by_pokemon);

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
      console.log(region);
      res.render('pokepedia/region', region)
    } else if (req.body.regionName === 'johto') {
      const region = await pokedex.getPokedexByName('updated-johto');
      res.render('pokepedia/region', region)
    } else if (req.body.regionName === 'hoenn') {
      const region = await pokedex.getPokedexByName('hoenn');
      res.render('pokepedia/region', region)
    } else if (req.body.regionName === 'sinnoh') {
      const region = await pokedex.getPokedexByName('updated-johto');
      res.render('pokepedia/region', region)
    } else if (req.body.regionName === 'unova') {
      const region = await pokedex.getPokedexByName('updated-unova');
      res.render('pokepedia/region', region)
    } else if (req.body.regionName === 'alola') {
      const region = await pokedex.getPokedexByName('updated-alola');
      res.render('pokepedia/region', region)
    } else if (req.body.regionName === 'galar') {
      const region = await pokedex.getPokedexByName('galar');
      res.render('pokepedia/region', region)
    }

    } catch (error) {
        res.render('not-found')
        console.log('Error searching the pokemon', error);
    }
})

// router.get('/evolution/:name', async (req, res) => {
//   try {
//     const evolutions = await pokedex.getEvolutionChainsList(req.params.name);
//     console.log(evolutions);
//   } catch (error) {
//     res.render('not-found');
//     console.log(error);
//   }
// })

router.get('/search-types', async (req, res) => {
    try {
      const search = req.query.typeName;
      const searchStr = String(search);
      const searchLowerCase = searchStr.toLowerCase();
      const types = await pokedex.getTypeByName(searchLowerCase)
      // console.log(types.pokemon[0].pokemon.name);
      res.render('pokepedia/types', types);    
    } catch (error) {
      res.render('not-found')
      console.log('Error searching the pokemon', error);
    } 
})

// router.get('/moves-learned', async (req, res) => {
//   try {
//     const moves = await pokedex.getMoveByName(move.move.name); 
//     res.render('pokepedia/movesLearn', moves);
//   } catch (error) {
//     res.render('not-found')
//     console.log('Error searching the pokemon', error);
//   }
  
// })

module.exports = router;