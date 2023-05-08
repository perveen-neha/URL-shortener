const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID : {
        type: String,
        unique: true,
        required: true
    },

    redirectURL : {
        type : String,
        required : true
    },

    visitHistory : [{ timeStamp : { type : Number}}],
    createdAt : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
},
      {timestamps: true}
)

const URL = mongoose.model('url', urlSchema);

module.exports = URL;