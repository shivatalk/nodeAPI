const express = require('express');
const exp_session=require('express-session');
const router = express.Router();
const Db = require('../../MongoConnection/DBConnect');
const Users = require('../../MongoConnection/modelsSchema/UserSchema');
const Products = require('../../MongoConnection/modelsSchema/productSchema');


router.use(exp_session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

router.get('/', async(req, res) => {

    if (req.session && req.session.email) {
        const prod_id = req.session.user['orders'];
        var order = [];
        await Db();

        for (i = 0; i < prod_id.length; i++) {

            await Products.findById(prod_id[i], (err, prod) => {

                if (err) {
                    console.log("Some error Occured.");
                    return;
                }
                else {
                    order.push(prod);
                    console.log(prod);
                    console.log(order);

                }
                
            });
        }

        res.json(order);
    }
    else
        res.json({ 'msg': 'login required' });

});


router.get('/:order_id', (req, res) => {

    res.status(200).json({

        msg: 'order fetched of id ' + req.params.order_id
    });
});

module.exports = router;