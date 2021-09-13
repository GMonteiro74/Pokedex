const router = require("express").Router();

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

router.get('/pokepedia', (req, res) => {
  res.render('pokepedia/index');
})

router.get('/auth', (req, res) => {
  res.render('auth/index');
})

// router.get('/community', (req, res) => {
//   res.render('community/index');
// })

// router.get('/mypokemons', (req, res) => {
//   res.render('community/mypokemons');
// })


module.exports = router;
