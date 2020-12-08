const mongoose = require('mongoose');

const DATABASE_CONNECTION = 'mongodb://mongo/test';

var clientSchema = mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String
});

Client = exports.Client = mongoose.model('Client', clientSchema);

exports.initializeMongo = function() {
    mongoose.connect(DATABASE_CONNECTION);
    console.log('Trying to connect to ' + DATABASE_CONNECTION);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: we might not be as connected as I thought'));
    db.once('open', function() {
        console.log('We are connected you and I:');
        addRandomClient();
    });
};

function insert(req,res){
    //nous créons une instance de l'objet client qui a été créer dans le fichier client.model
    var client = new Client();
    client.fullName = req.body.fullName;
    client.email = req.body.email;
    client.mobile = req.body.mobile;
    client.save((err,docs)=>{
        if(!err){
            //si la sauvegarde réussi le client est rediriger vers le chemin suivant
            res.redirect('client/testFind');
        } 
        else{
            console.log('Error during insertion'+err);
        }
    

    });
      
};





//////////////////////////////////////////////
//Function to add a random client in the db //
//////////////////////////////////////////////

var addRandomClient = function() {
    var silence = new Client({
        name: 'Silence' + Math.random(),
        email: 'Silence' + Math.random(),
        phoneNumber: 'Silence' + Math.random()
    });

    silence.save(function (err, fluffy) {
        if (err) return console.error(err);
        console.log('There is a new Client around here');
    });
};



