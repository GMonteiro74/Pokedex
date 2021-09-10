const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
    name: String, 
    // imageUrl: String,
    rating: Number,
    description: String,
    // type: {
    //     type: String,
    //     required: true,
    //     enum: ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy", "shadow"],
    // },
}); 

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
