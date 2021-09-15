const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');

const pokedex = new Pokedex();


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

router.get('/evolution/:name', async (req, res) => {
  try {
    const evolutions = await pokedex.getEvolutionChainsList(req.params.name);
    console.log(evolutions);
  } catch (error) {
    res.render('not-found');
    console.log(error);
  }
})


  module.exports = router;