const mongoose = require('mongoose');

// connection à la base de donnée dbClient du local host 27017


function connect(){
    return new Promise((resolve, reject) =>{
        mongoose.connect('mongodb://localhost:27017/dbClient',{useNewUrlParser: true})
        .then((res, err) => {
            if (err) return reject(err);
            resolve();
        }) 
});

}


require('./clientModel');

function close(){
    return mongoose.disconnect();
}

module.exports = {connect,close};