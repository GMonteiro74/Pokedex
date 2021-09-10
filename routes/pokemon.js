const router = require("express").Router();
const Pokemon = require("../models/Pokemon.model");
// const fileUpload = require("../config/cloudinary");

const Pokemon = require('../models/Pokemon.model');

router.get('/create', (req, res) => {
    res.render("create");
});

router.post('/create', async (req, res) => {
    const { name, rating, description } = req.body;
    await Pokemon.create({ name: name, rating: rating, description: description });
    res.redirect('/');
});

module.exports = router;