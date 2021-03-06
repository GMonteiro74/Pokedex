// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const helpers = require('handlebars-helpers');
hbs.registerHelper(helpers());

const app = express();

// const Pokemon = require('pokemon.js');

// Pokemon.setLanguage('english');
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        sameSite: true, //both FE and BE are running on the same hostname
        httpOnly: true,
        maxAge: 360000, // session time
    },
    rolling: true,
}));



function getCurrentLoggedUser (req, res, next) {
    if (req.session && req.session.currentUser) {
        app.locals.loggedInUser = req.session.currentUser.username;
    } else {
        app.locals.loggedInUser = '';
    }
    next();
}

app.use(getCurrentLoggedUser)
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "Pokemon App";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const community = require("./routes/community");
app.use("/", community);

const pokepedia = require('./routes/pokepedia');
app.use('/', pokepedia);

const auth = require('./routes/auth');
app.use('/', auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
