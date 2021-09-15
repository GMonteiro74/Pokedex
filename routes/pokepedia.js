const router = require("express").Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();


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
      // console.log(pokeMoves);

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

router.get('/search-region', async (req, res) => {

    try{
    const region = await pokedex.getPokedexByName(req.query.regionName);
  
    console.log(region.pokemon_entries);
    res.render('pokepedia/region', region)
    } catch (error) {
        res.render('not-found')
        console.log('Error searching the pokemon', error);
    }
})

router.get('/evolution/:name', async (req, res) => {
  try {
    const evolutions = await pokedex.getEvolutionChainsList(req.params.name);
    console.log(evolutions);
  } catch (error) {
    res.render('not-found');
    console.log(error);
  }
})

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