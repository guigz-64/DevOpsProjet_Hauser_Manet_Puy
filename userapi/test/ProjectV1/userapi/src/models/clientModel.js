var mongoose = require('mongoose');
var Schema =mongoose.Schema;

var clientSchema = new Schema({
    fullName:{ type: String, required: true },
    email:{ type: String, required: true },
    mobile:{ type: String, required: true }
});

module.exports  = mongoose.model('Client',clientSchema);

 
