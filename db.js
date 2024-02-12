const mongoose = require("mongoose");

const mongoURI = 'mongodb://0.0.0.0:27017/ecommerce'


const connectToMongo = () => {
    mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(() => {
            console.log('Connected to Mongo Successfully');
        })
        .catch(err => {
            console.error('Failed to connect to Mongo: ' + err);
        });
}

module.exports = connectToMongo; 