const router = require("express").Router();
const Pokemon = require("../models/Pokemon.model");
// const fileUpload = require("../config/cloudinary");

// //http://localhost:3000/books
// router.get("/pokemons", async (req, res) => {
//     const pokemons = await Pokemon.find();
//     console.log(pokemons);
  
//     res.render("/", { books });
//   });

router.get("/create",  async (req, res, next) => { //fileUpload.single("image"),
    try {
    const pokemons = await Pokemon.find()
    res.render("pokemons/create", {pokemons});
    } catch {
        res.redirect('/not-found')
    }
  });

router.post('/create', async (req, res) => {
   // let fileUrlOnCloudinary = "";
   // if (req.file) {
   //   fileUrlOnCloudinary = req.file.path; //the path on cloudinary
   // }
    const { name, rating, description, type } = req.body; //imageUrl,
    await Pokemon.create({ name, rating, description, type }); //imageUrl,
    res.redirect('/');
})

module.exports = router;