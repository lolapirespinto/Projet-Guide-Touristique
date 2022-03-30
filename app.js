/*-------------------Connection avec notre base de données--------------------------*/

const mysql = require('mysql');

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

/*--------- Requêtes de récupération de données nécessaire pour notre appli ----------------*/

//Informations de toutes les activités de type Musées
function musees() {
  var res = [];
  $query = 'SELECT * FROM activites  WHERE Categorie="Musées"';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) 
      res.push(i);
    for (let i = 0; i <res.length; ++i) {
        console.log(res[i].Nom);
    }
  });
}

//Informations de toutes les activités de type Restaurants
function restaurants() {
  var res = [];
  $query = 'SELECT * FROM activites WHERE Categorie="Restaurants"';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) 
      res.push(i);
    for (let i = 0; i <res.length; ++i) {
        console.log(res[i].Nom);
    }
  });
}

//Informations de toutes les activités de type Jardins publics
function jardins() {
  var res = [];
  $query = 'SELECT * FROM activites WHERE Categorie="Jardins publics"';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) 
      res.push(i);
    for (let i = 0; i <res.length; ++i) {
        console.log(res[i].Nom);
    }
  });
}

//Informations de toutes les activités de type Sites historiques"
function siteshistoriques() {
  var res = [];
  $query = 'SELECT * FROM activites WHERE Categorie="Sites historiques"';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) 
      res.push(i);
    for (let i = 0; i <res.length; ++i) {
        console.log(res[i].Nom);
    }
  });
}

//Informations des addresses pour trouver les activités à proximité"
function addresses() {
  var res = [];
  $query = 'SELECT Adresse FROM activites';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) 
      res.push(i);
    for (let i = 0; i <res.length; ++i) {
        console.log(res[i]);
    }
  });
}

//Informations des addresses pour trouver les activités à proximité"
function long_lat() {
  var res = [];
  $query = 'SELECT * FROM activites';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) 
      res.push(i);
    for (let i = 0; i <res.length; ++i) {
      console.log(res[i].Longitude);
      console.log(res[i].Latitude);
    }
  });
}

//musees();
//restaurants(); 
//jardins();
//siteshistoriques();
