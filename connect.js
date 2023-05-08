const mongoose = require('mongoose')


const DBurl = 'mongodb+srv://neha:nMVd9fb0qJVophFF@cluster0.hcssw3l.mongodb.net/UrlShortener?retryWrites=true&w=majority'

const connectToMongoDBAtlas = async () => {
    try {
        
       await mongoose.connect(DBurl, {
            useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log("db connected");

    } catch (error) {
        console.log("error:" ,error);
    }


}

module.exports = connectToMongoDBAtlas;

