
const mongoose = require("mongoose");


mongoose
.connect("mongodb+srv://admin:admin@cluster0.abotk.mongodb.net/PokeDexDB?retryWrites=true&w=majority")
.then((x) => {
  console.log(
    `Connected to Mongo! Database name: "${x.connections[0].name}"`
  );
})
.catch((err) => {
  console.error("Error connecting to mongo: ", err);
});


const PokemonType = require('../models/PokemonType.model');

const pokeTypes = [
    {name: "normal"},
    {name: "fighting"},
    {name: "flying"},
    {name: "poison"},
    {name: "ground"},
    {name: "rock"},
    {name: "bug"},
    {name: "ghost"},
    {name: "steel"},
    {name: "fire"},
    {name: "water"},
    {name: "grass"},
    {name: "electric"},
    {name: "psychic"},
    {name: "ice"},
    {name: "dragon"},
    {name: "dark"},
    {name: "fairy"},
    {name: "shadow"},
]

PokemonType.insertMany(pokeTypes).then((types) => {
    console.log(`types created: ${types.length}`);
})

