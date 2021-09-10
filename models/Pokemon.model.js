const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
  name: String,
  imageUrl: String,
  rating: Number,
  description: String,
  type: {
    type: Schema.Types.ObjectId,
    ref: "PokemonType",
  },
});

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
