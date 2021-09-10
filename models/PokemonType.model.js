const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case

const PokemonTypeSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }
});

const PokemonType = model("PokemonType", PokemonTypeSchema);

module.exports = PokemonType;