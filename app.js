/*-------------------Connection avec notre base de données--------------------------*/
//killall -9 node
const mysql = require('mysql');
const express = require('express');

//Information d'identifications pour accèder à notre bdd.
const connection = mysql.createConnection({
  host: 'localhost',
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
const app = express();

/*--------- Requêtes de récupération de données nécessaire pour notre appli ----------------*/

//Informations de toutes les activités de type Musées
app.get('/getMusees', (req, res) => {
  let sql = 'SELECT * FROM activites  WHERE Categorie="Musées"';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});

//Informations de toutes les activités de type Restaurants
app.get('/getRestaurants', (req, res) => {
  let sql = 'SELECT * FROM activites WHERE Categorie="Restaurants"';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});

//Informations de toutes les activités de type Jardins publics
app.get('/getJardins', (req, res) => {
  let sql = 'SELECT * FROM activites WHERE Categorie="Jardins publics"';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});

//Informations de toutes les activités de type Sites historiques"
app.get('/getSites', (req, res) => {
  let sql = 'SELECT * FROM activites WHERE Categorie="Sites historiques"';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});

//Informations des addresses pour trouver les activités à proximité"
app.get('/getAdresse', (req, res) => {
  let sql = 'SELECT Adresse FROM activites';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});

//Tous les donnnées d'une activité
app.get('/getSites', (req, res) => {
  let sql = 'SELECT * FROM activites';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});

//Tous les pseudos des utilisateurs 
app.get('/getPseudos', (req, res) => {
  let sql = 'SELECT Pseudo FROM utilisateur';
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});

//Tous les commentaires pour une activité particulière
/*app.get('/getPseudos', (req, res) => {
  let sql = "SELECT * FROM Commentaire WHERE ActivitesId = ?";
  let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
  });
});*/


//démarrage serveur 
app.listen('3000', () => {
  console.log('Server started on port 3000');
});