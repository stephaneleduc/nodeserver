const express = require('express');
const app = express();

//define template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/'); //Dossier qui contient les views

//Dossier Public
app.use(express.static('views/public'));


app.get("/", function (req, res) {
    res.render("home", { title: "Homepage" });
});

//Accès à la page music
app.get("/music", function (req, res) {
    const musicslist = [
        "Johnny Hallyday",
        "Muse",
        "Metallica"
    ];

    res.render("music", {music: musicslist, title: "Music"});  // music correspond à la route /music
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
  

