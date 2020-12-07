const mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    fullName:{
        type: String
    },
    email:{
        type: String
    },
    mobile:{
        type:String
    }
});

mongoose.model('Client',clientSchema);