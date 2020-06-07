const express = require('express');
const exp_session = require('express-session');
const router = express.Router();
const CreateUser = require('../../MongoConnection/modelsSchema/UserSchema');
const Db = require('../../MongoConnection/DBConnect');

router.use(exp_session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
router.get('/', (req, res) => {

    res.json({ 'msg': 'registration/login Page' });

});

router.post('/register', (req, res) => {

    Db();
    const newUser = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
    }

    const user = new CreateUser(newUser);

    user.save()
        .then(data => {
            console.log('User Created Successfull');

            req.session.email = req.body.email;
            req.session.user = req.body.newUser;
            res.redirect('./dashboard')
        })
        .catch(err => {

            if (err.status == 11000) {
                console.log('Email already Exist.');
                res.redirect('./');
            }
            else {
                console.log("Some Error Occured " + err);
            }

        });
});

router.post('/login', (req, res) => {
    Db();
    CreateUser.findOne({ email: req.body.email }, (err, userdata) => {
        if (err) {
            console.log('Invalid Cridential' + err);
            res.json({
                'msg': 'user not founded'
            });
        }
        else if (userdata.password != req.body.password) {
            res.json({
                'msg': 'invalid credential'
            });
        }
        else {
            req.session.email = req.body.email;
            req.email = req.body.email;
            req.session.user = userdata;
            //console.log(req.session.user);
            res.redirect('./dashboard');
        }
        // console.log(userdata);
        // console.log(err);
        // res.json(userdata);

    });
});


router.get('/dashboard', (req, res) => {

    if (req.session && req.session.email)
        res.json({ 'msg get request ': ' ' + req.session.user['fullname'] });
    else
        res.json({ 'msg': 'login required' });
});


router.get('/logout', (req, res) => {
    if (req.session.email) {
        req.session.destroy((err) => {
            if (err)
                console.log('some Erroe while Logging out .');
            else
                res.redirect('./');
        });
    }
    else
        res.json({ 'msg': 'Already logged out' });

});



module.exports = router;