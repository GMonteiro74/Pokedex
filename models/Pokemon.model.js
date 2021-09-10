const mongoose = require ("mongoose");

const pokemonSchema = mongoose.Schema({
    name: String, 
    imageUrl: String,
    rating: Number,
    description: String,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PokemonType" 
    },
}); 

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
