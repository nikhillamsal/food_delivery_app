const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req,res)=>{
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    //if email is not present in the database, create a new entry : else InsertMany()
    let eId = await Order.findOne({'email':req.body.email})
    console.log("Email",eId)
    if(eId == null){
        try{
            await Order.create({
                email : req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch(error){
            console.log("Server Error : ",error.message)
            res.send( error.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email },{$push:{order_data:data}}).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            console.log("Server Error : ",error.message)
            res.send(error.message)
        }
    }
})


router.post('/myorderdata', async (req,res)=>{
    try{
        console.log("Request Body:", req.body);
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData : myData})
        

    }catch(error){
        console.log("Server Error : ",error.message)
    }
})

module.exports = router;