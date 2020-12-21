const express = require('express')
const expressHandlebars = require('express-handlebars');
const userRouter = require('./routes/user')
const bodyParser = require('body-parser'); //middleware permet d’accéder à la requête faite à l’application
const methodOverride = require('method-override'); //pour simuluer DELETE

const app = express() //init app
const port = process.env.PORT || 3000 //set port

//client
const client = require('./dbClient')
client.on("error", (err) => {
  console.error(err)
})
//view
app.engine('handlebars', expressHandlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//methodeOverride
app.use(methodOverride('_method'));

// GET route du Search Page
app.get('/', function(req, res, next) {
  res.render('searchusers');
});

// POST search user route (with username)
app.post('/user/search', function(req, res, next) {
  let username = req.body.username;

  client.hgetall(username, function(err, obj){
      if(!obj){
          res.render('searchusers', {
              error: 'User does not exist'
          });
      }else{
          obj.username = username;
          res.render('details', {
              user: obj
          });
      }
  });
});

// GET add user route page list de user
app.get('/user/list', function(req, res, next) {
  let username = "lucasrietsch";

  client.hgetall(username, function(err, obj){
      if(!obj){
          res.render('list', {
              error: 'List is empty'
          });
      }else{
          obj.username = username;
          res.render('list', {
              user: obj
          });
      }
  });
});

// POST insert user route
app.post('/user/list', function(req, res, next) {
    client.hgetall();
  });

// GET add user route page ajout de user
app.get('/user/add', function(req, res, next) {
  res.render('adduser');
});

// POST insert user route
app.post('/user/add', function(req, res, next) {
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone = req.body.phone;

    client.hmset(username, [
        'firstname', firstname,
        'lastname', lastname,
        'email', email,
        'phone', phone
    ], function(err, reply){
        if(err){
            console.log(err);
        }
        console.log(reply);
        res.redirect('/');
    });
  });

  //DELETE user route (with username)
app.delete('/user/delete/:username', function(req, res, next){
    client.del(req.params.username , (err, reply) => {
      if(err){
        res.status(404);
      }
      });
    res.redirect('/');
});

app.use('/user', userRouter)

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

module.exports = server //for testing
