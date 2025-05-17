const express = require('express');
const router = express.Router();

router.post('/foodData',async (req,res)=>{
    try {
        await res.send([global.food_items,global.food_category]);
    }
    catch (error) {
        console.error("Error fetching food items:", error.message);
        res.send("Internal Server Error");
    }
})

module.exports = router;