//Signup with email
//Sign-In
//Sign-out
//Forgot password
//reset password after sign-in
//password stored in db in encrypted form
//Display notification
//re-captcha on sign-up and sign-in



const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const PORT = 8000;
const app = express();
//db
const db = require('./config/mongoose');
const path = require('path');

//session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//TODO:passportJWT

const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMiddleware = require('./middlewares/flash');




//setup assets files folder
app.use(express.static(path.join(__dirname, "/assets")));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//set view engine
app.set("view engine", "ejs");
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("views", "./views");

app.use(passport.initialize());
//TODO:passport.session


app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error in starting server"); return;
    }

    console.log(`Server started on ${PORT}`);
});



