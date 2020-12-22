var connect = require('./models/create');

const express = require('express');
const path =require('path');
const hbs=require('express-handlebars');
const bodyParser = require('body-parser');

connect.connect();
const clientController = require('./controllers/clientController');
var app = express();

// bodyParser va analyser la structure de l'url et contruire le req.body
app.use(bodyParser.urlencoded({extended: true}));

//__dirname permet de donner le chemin absolu du fichier views
app.set('views', path.join(__dirname, '/views/'));
//permet à l'application de lire les handle bars/ difficher le contenu du fichier layout sur l'écran utilisateur
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'',layoutsDir:__dirname+'/views'}));
app.set('view engine', 'hbs');

app.listen(8000, () => {
    console.log("Server work on port 3000");
});

// si l'url match avec /client la fonction clientController est appelé
app.use('/client',clientController);