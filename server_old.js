//Variables et affichage
let message =  "Hello Nodejs";

console.log(message);


//Création de fichier

const fs = require("fs"); //fs est la libraire de gestion de fichiers par défaut (filesystem)

fs.writeFile("test.txt", "Hello World !", function(err) {

    if (err) {

        console.log(err);
    }

    else {

        console.log("Done !");
    }

});


//Cration d'un serveur web (http)
const http = require ("http");
const html = require ("./htmlmodule");// On utilise ./ pour spécifier le fichier "htmlmodule.js"

const server = http.createServer(function(req, res) {

    if (req.url == "/")  {
        html(res, "views/home.html");
        
    }
    else if (req.url == "/music") {
        html(res, "views/music.html");
    }
 
    else {
        html(res,  "views/404.html");
    }

});

//start server on port 3000
server.listen(3000, function() {

    console.log("Server run on port 3000");

});


