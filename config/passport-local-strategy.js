const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');


passport.use(new LocalStrategy({

    usernameField: 'email',
    passReqToCallback: true
}, function (req, email, password, done) {
    //find user and established an identity
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            req.flash('error', err);
            return done(err);
        }

        return done(null, user);
    });
}

));

//serializinf the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, done) {
        if (err) { console.log('error in finding the user --> Passport'); return done(err); }

        return done(null, user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {

    //how do I find out if the request is authenticated
    //passport put a method on req called isAuthenticated
    //if the user is sign-in then pass on the request to the next function(controller's action)

    if (req.isAuthenticated()) {
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//once the user is signed in

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in the user from the session cookie
        //and we are just sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}
