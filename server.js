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
    const bodyParser = require("body-parser");

    //define template engine
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views/'); //Dossier qui contient les views

    //For catching POST datas
    app.use( bodyParser.urlencoded( { extended: true })); //for get datas
    app.use( bodyParser.json());//for post datas

    //Dossier Public | Static files
    app.use(express.static('views/public'));

    app.get("/musics/:id([0-9]+)", function(req, res) {

        const id = req.params.id;
        const sql = "Select * from musics where id = ?";
        connection.query(sql, [id], function(err, results) {
            
            let music = {};
            
            if (results.length) {

                music = results[0];
            }
            
            res.render("musics", {music:music, title: "Détails"});
        });
    });

    app.post("/addmusic", function (req, res) {

        console.log(req.body);
        const sql = "INSERT INTO musics VALUES (null, ?)";
        const title = req.body.title;
        connection.query (sql, [title], function (err, results, fields) {

            let error = "";
            if (err) {
                console.log (err);
                error = err.message;
            }
            res.redirect("/music?error=" + error);

        });
    });

    app.get("/", function (req, res) {
        res.render("home", { title: "Homepage" });
    });

    //Accès à la page music
    app.get("/music", function (req, res) {

        var sql = 'SELECT * FROM musics';
        let musicslist = [];

        let error= "";
        let insert_error = "";

        connection.query (sql, function(err, results, fields) {
        if (err) {
            console.log( err);
            error = err.message;
        }
        else {
            musicslist = results;
        }

        if (req.query.error) {

            insert_error = req.query.error;
        }


        res.render("music", {music: musicslist, title: "Music", error: error, insert_error: insert_error });
            
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
    
