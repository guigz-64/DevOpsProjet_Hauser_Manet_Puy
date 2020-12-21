const mongoose = require('mongoose');

// connection à la base de donnée dbClient du local host 27017
mongoose.connect('mongodb://mongo:27017/dbClient',{useNewUrlParser: true},(err)=>{
    if(!err){console.log('MongoDB is connected')}
    else{console.log('Error of connection'+ err)}
});

require('./client.model');