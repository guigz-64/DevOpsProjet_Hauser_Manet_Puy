const express = require('express');
const database = require('./database');
const app = express();

database.initializeMongo();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

app.get('/testFind', function (req, res) {
    database.Client.find(function (err, clients) {
        if (err) return res.error(err);
        console.log(clients);
        res.json(clients);
    });
});

