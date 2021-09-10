const router = require("express").Router();

router.get("/create", async (req, res, next) => {
    try {
    const pokemons = await Pokemon.find()
    res.render("pokemons/create", {pokemons});
    } catch {
        res.redirect('/not-found')
    }
  });

router.post('/create', async (req, res) => {
    const { name, rating, description } = req.body;
    await Pokemon.create({ name, rating, description });
    res.redirect('/');
})

module.exports = router;