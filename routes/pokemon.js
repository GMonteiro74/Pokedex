
const router = require("express").Router();

router.get("/create", (req, res, next) => {
    res.render("pokemons/create");
  });


module.exports = router;
