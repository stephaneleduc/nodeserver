const fs = require("fs");

let html = function (res, filename) {

    fs.exists(filename, function (exists) {

        var html = "Erreur de chargement";

        if (exists) {

            fs.readFile(filename, function(err, data) {
        
        
                if (err) {

                    console.log(err);
                    html = "Le fichier n'a pas pu être lu !";
                }
                else {

                    html = data;
                }

                res.end( html );

            });
        }

        else {

            res.end( html);
        }
    }) 

}

//Export de la variable qui est une fonction
module.exports = html;