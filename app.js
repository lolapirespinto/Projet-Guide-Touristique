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
  return res;
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
  return res;
}

//Informations des addresses pour trouver les activités à proximité"
function long_lat() {
  let res = [];
  $query = 'SELECT * FROM activites';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) {
      res.push(i.Longitude);
      res.push(i.Longitude);
    }
    for (let i = 0; i <res.length; ++i) {
      console.log(res[i].Longitude);
      console.log(res[i].Latitude);
    }
  });
  return res;
}

//Tous les commenataires pour une activité particulière
function commentaire(id_act) {
  let res = [];
  var id = "SELECT * FROM Commentaire WHERE ActivitesId = ?";
  connection.query(id, id_act, function(err, rows) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) {
      res.push(i);
    }
    for (let i = 0; i <res.length; ++i) {
      console.log(res[i].Commentaire);
    }
  });
  return res;
}

//Tous les pseudos des utilisateurs 
function utilisateurs() {
  let res = [];
  $query = 'SELECT Pseudo FROM utilisateur';
  connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("La requête n'a pas fonctionnée.");
        return;
    }
    for (var i of rows) {
      res.push(i);
    }
    for (let i = 0; i <res.length; ++i) {
      console.log(res[i].Pseudo);
    }
  });
  return res;
}


//musees();
//restaurants(); 
//jardins();
siteshistoriques();
//utilisateurs();
//commentaire(2);



/*var pool = mysql.createPool({
  connectionLimit : 100,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database:'guide_touristique',
  port: '8889',
  debug    : false 
});

function executeQuery(query, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
        return callback(err, null);
    }
    else if (connection) {
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if (err) {
                return callback(err, null);
            }
            return callback(null, rows);
        })
    }
    else {
        return callback(true, "No Connection");
    }
  });
}


function getResult(query,callback) {
  executeQuery(query, function (err, rows) {
     if (!err) {
        callback(null,rows);
     }
     else {
        callback(true,err);
     }
  });
}

function getServers() {
  getResult('SELECT * FROM activites',function(err,rows){
    if(!err){
        return rows;
    }else{
        console.log(err);
    }
  });   
}*/

//exports.getList = getList;
//var getResult = executeQuery;
//console.log(getServers());

