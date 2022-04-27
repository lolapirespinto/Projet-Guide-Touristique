/*--------------------Connection avec notre base de données---------------------------*/
//killall -9 node
const mysql = require('mysql');
const express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

var passport = require('passport');
var flash = require('connect-flash');
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
 extended: true
}));

//Information d'identifications pour accèder à notre bdd.
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database:'guide_touristique',
  port: '8889'
});

//Connection à notre bdd.
connection.connect((err) => {
  if (err) throw err;
  console.log('Connection établie!');
});

//Initialisation serveur express
//const app = express();

//EJS
app.set('views','./views') 
app.set('view engine','ejs')

app.use(session({
  secret: 'secret',
  resave:true,
  saveUninitialized: true
 }));

//Ajout des fichiers static
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/vendor',express.static(__dirname + 'public/vendor'))

//Page d'accueil avec les activités
app.get('', (req, res) => {
  var data = "";
  let sql = 'SELECT * FROM activites';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      var data = results;
      //console.log(data);
      res.render('index', {data:data});
  });
});

//Page d'accueil avec les activités
/*app.get('/profile', (req, res) => {
  var data = "";
  let sql = 'SELECT * FROM activites';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      var data = results;
      //console.log(data);
      res.render('index', {data:data});
  });
});*/

//Fiche description pour une activité particulière
app.get('/activites/:id', (req, res) => {
  var data = "";
  'SELECT * FROM users WHERE id = ?'
  let sql = `SELECT * FROM activites WHERE ActivitesId = ${req.params.id}`;
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      var data = results;
      res.render('activites',{data:data});
  });
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

//démarrage serveur 
app.listen('3000', () => {
  console.log('Le serveur écoute au port 3000');
});