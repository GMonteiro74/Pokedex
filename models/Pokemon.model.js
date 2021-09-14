const mongoose = require ("mongoose");

const pokemonSchema = mongoose.Schema({
    name: String, 
    imageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    reviews: [
      {
        name: String, 
        comment: String,
    },
    ],
    rating: [],
    description: String,
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PokemonType" 
    },
}, {
    timestamps:true,
}); 

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
