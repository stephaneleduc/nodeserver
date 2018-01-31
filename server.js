const mysql = require("mysql");
const connection = require ("./connection");

connection.connect(function(err) {
    if (err) {

        console.error('error connecting : ' + err.stack);
        return;
    }

    console.log("connected as id: " + connection.threadId);

});

    const express = require('express');
    const app = express();

    //define template engine
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views/'); //Dossier qui contient les views

    //Dossier Public | Static files
    app.use(express.static('views/public'));


    app.get("/", function (req, res) {
        res.render("home", { title: "Homepage" });
    });

    //Accès à la page music
    app.get("/music", function (req, res) {

        var sql = 'SELECT * FROM musics';
        let musicslist = [];

        let error= "";

        connection.query (sql, function(err, results, fields) {
        if (err) {
            console.log( err);
            error = err.message;
        }
        else {
            musicslist = results;
        }

        res.render("music", {music: musicslist, title: "Music", error: error});
            
        });

        //res.render("music", {music: musicslist, title: "Music"});  // music correspond à la route /music
    });

    //Accès à la page music avec des paramètres 
    app.get("/music/:cat/:artiste", function (req, res) {
        console.log(req.params.cat);
        console.log(req.params.artiste);
        res.sendFile(__dirname + "/views/music.html");
    });


    //default route ( à mettre à la fin)
    app.use(function (req, res) {
        res.render("404", {title: "404 Not Found"});
    });

    app.listen(3000, function () {
        console.log('App listening on port 3000!');
    });
    
