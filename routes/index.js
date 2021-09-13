const router = require("express").Router();

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

router.get('/pokepedia', (req, res) => {
  console.log(loggedInUser);
  res.render('pokepedia/index');
})

router.get('/auth', (req, res) => {
  res.render('auth/index');
})


module.exports = router;
