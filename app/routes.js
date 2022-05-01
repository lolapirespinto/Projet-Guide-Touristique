var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);


module.exports = function(app, passport) {
    app.get('/', function(req, res){
     res.render('index.ejs');
    });
   
    app.get('/login', function(req, res){
     res.render('login.ejs', {message:req.flash('loginMessage')});
    });
   
    app.post('/login', passport.authenticate('local-login', {
     successReturnToOrRedirect: "/profil",
     failureRedirect: '/login',
     failureFlash: true
    }),
     function(req, res){
      if(req.body.remember){
       req.session.cookie.maxAge = 1000 * 60 * 3;
      }else{
       req.session.cookie.expires = false;
      }
      res.redirect('/');
     });
   
    app.get('/signup', function(req, res){
     res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
   
    app.post('/signup', passport.authenticate('local-signup', {
     successRedirect: '/profil',
     failureRedirect: '/signup',
     failureFlash: true
    }));
   
    app.get('/profil', isLoggedIn, function(req, res){
     res.render('profil.ejs', {
      user:req.user
     });
    });


    app.get('/favoris/:id', isLoggedIn, function(req, res){
        if(req.user) {
            mail = req.user.username;
            let select = `SELECT * FROM favoris WHERE mail = '${mail}' AND ActivitesId = ${req.params.id}`;
            connection.query(select,(err, rows) => {
                if(err) throw err;
                else if(rows.length){
                    console.log("activité déjà en favorite!")
                    res.redirect('back');
                }else {
                    let sql = `INSERT INTO favoris VALUES ('${mail}',${req.params.id})`;
                    connection.query(sql, (err) => {
                        if(err) throw err;
                        console.log("activité ajoutée en favoris!");
                        res.redirect('back');
                    });
                }
            });
        } 
        else {
            res.redirect('/login');
        }
    });

    app.get('/mesfavoris', isLoggedIn, function(req, res){
        if(req.user) {
            mail = req.user.username;
            let select =`SELECT * FROM activites,favoris WHERE favoris.mail = '${mail}' AND activites.ActivitesId=favoris.ActivitesId;`
            connection.query(select,(err, rows) => {
                if(err) throw err;
                else {
                    var data = rows;
                    res.render('favoris', {data:data});
                }
            });
        }
        else {
            res.redirect('/login');
        }
    });

    app.get('/logout', function(req,res){
     req.logout();
     res.redirect('/');
    })
   };

   function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
     return next();
    res.redirect('/login');
   }