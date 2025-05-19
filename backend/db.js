const mongoose = require('mongoose');

const mongoURL = '' //MOngo db
const mongoDb = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // const fetched_data = await mongoose.connection.db.collection('food_items').find({}).toArray(
        //     async function (err, data) {
        //         const food_category = await mongoose.connection.db.collection('food_category').find({}).toArray(function (err, cat_data) {
        //             if (err) {
        //                 console.error("Error fetching food category:", err);
        //             } else {
        //                 global.food_category = cat_data;
        //                 global.food_item = data;
        //             }
        //         });
        //     }
        // );
        const fetched_data = await mongoose.connection.db.collection('food_items').find({}).toArray();
        const category = await mongoose.connection.db.collection('food_category').find({}).toArray();

        global.food_items = fetched_data;
        global.food_category = category;
        // console.log(fetched_data);
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = mongoDb;
