const express=require('express');
const mongoose=require('mongoose');

const router=express.Router();
const Db=require('../../MongoConnection/DBConnect');
const Products=require('../../MongoConnection/modelsSchema/productSchema');


//Fetching all product from DB (Product Collection)
router.get('/',(req,res)=>{
    
    Db();
    Products.find({},(err,result)=>{
        if(err)
        console.log('Error Occured');
        else
        {
            res.status(200).json(result);
        }
    })
    
    
});

// Fetching a Particular product using product id 

router.get('/:product_id',(req,res)=>{

    Db();
    Products.find({_id:req.params.product_id},(err,result)=>{
        if(err)
        {
            console.log('Did Not Found'+err);
        }
        else{
            res.status(200).json(result);
        }

    });
    
});


// adding a New product in Product Collection(Table)
router.post('/addProduct',(req,res)=>{
    
    Db();
    const product={
        title:req.body.title,
        subtitle:req.body.subtitle,
        price:req.body.price,
        image:req.body.image    
    }
    
    const newProduct=new Products(product);
    newProduct.save()
    .then((data)=>{res.status(200).json('Product Added Successfully '+data.title)})
    .catch((err)=>{console.log('Error Occured'+err)})

    
});

router.delete('/removeProduct/:product_id',(req,res)=>{
    
    Db();
    Products.deleteOne({_id:req.params.product_id},(err)=>{
        if(!err)
        res.status(200).json({'msg':'product remove successfully'})
        else
        res.status(404).json({'msg':'Error Occured while deleting'})

    });
    
    

    
});

module.exports=router;