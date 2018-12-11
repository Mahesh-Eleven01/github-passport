const express = require("express");
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/routes');
const profileRoutes = require('./routes/profile');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const nodemailer = require("nodemailer");

const app = express();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// connect to mongodb
mongoose.connect("mongodb://localhost/github", () => {
    console.log('connected to mongodb');
});

// create home route
app.get('/', (req, res) => {
    res.render('register', { user: req.user });
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});



console.log("Server is running at port 3000")