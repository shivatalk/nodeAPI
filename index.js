const express=require('express');
//const exp_session=require('express-session');
const bodyParser=require('body-parser');
const product_router=require('./routes/products/products');
const orders_router=require('./routes/orders/orders');
const users_router=require('./routes/userAuth/register_login');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//app.use(exp_session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use("/api/products/",product_router);
app.use("/api/orders/",orders_router);
app.use("/api/users/",users_router);

app.get('/',(req,res)=>{

    res.status(200).json({
        'msg':'user created sucessfully '
    });

});

app.use((req,res)=>{
    res.json({
        msg:'Page not Found'
    });
});

app.listen('3000',()=>console.log('Server is running on port '+'3000'));