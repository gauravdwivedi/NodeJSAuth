const User = require('../model/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.createUser = async function (req, res) {
    console.log(req.body);
    try {
        if (req.body.password != req.body.confirm_password) {

            return res.redirect('back');
        }

        let password;

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                password = hash;
            })
        })

        console.log('Hashed Pass:', password);
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create({
                email: req.body.email,
                password: password,
                name: req.body.name
            })
        } else {
            console.log("User Already Exits!");
        }
    } catch (err) {
        console.log(err);
    }
}

//steer to Login Page
module.exports.login = function (req, res) {

    return res.render('login', {
        title: "Login User"
    });
}


//steer to SignUp page
module.exports.signup = function (req, res) {

    return res.render('register',
        {
            title: 'Sign-up New User'
        });
}

