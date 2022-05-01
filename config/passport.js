var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var dbconfig = require('./database');
var bodyParser = require("body-parser");
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
    passport.serializeUser((user, done)=> {done(null, user); });
    passport.deserializeUser((user, done)=>{done(null, user);
    });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
    
    let body = req.body;
   connection.query("SELECT * FROM users WHERE  username =?",
   [username], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'Ce compte existe déjà!'));
    }else{
      
    const salt = bcrypt.genSaltSync();
    
     var newUserMysql = {
      fullname: body.fullname,
      username: body.username,
      password: bcrypt.hashSync(password, salt)
     };

     var insertQuery = "INSERT INTO users (fullname,username, password) values (?,?, ?)";

     connection.query(insertQuery, [ newUserMysql.fullname,newUserMysql.username, newUserMysql.password],
      function(err, rows){
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
  nameField:'name',
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
   connection.query("SELECT * FROM users WHERE username =?",[username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'Mauvaise adresse mail'));
    }
    if(!bcrypt.compareSync(password, rows[0].password))
     return done(null, false, req.flash('loginMessage', 'Mauvais mot de passe'));

    return done(null, rows[0]);
   });
  })
 );
};