

const express = require('express');
const router = express.Router();
const User = require('./user');
const cors = require('cors');  // delete later
const bodyParser = require('body-parser');


// GET route for reading data
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});


//POST route for updating data
/*
router.post('/login',  function (req, res, next) {
    console.log(req.body);

    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }
    // Case: Account Creation

    return
    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        };

        User.create(userData, function (error, user) {
            if (error) {
                const payload = {status: 1};
                return res.json(payload);
            } else {
                const payload = {status: 0};
                req.session.userId = user._id;
                return res.json(payload);
            }
        });
    // Case: logging on
    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        const err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});
*/

// GET route after registering
router.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});


module.exports = router;