// Je déclare une constante pour exporter le module express
const express = require('express');
// Je déclare une constante pour créer une application en utilisant la fonction express
const app = express();
// Je déclare une constante pour exporter le module body-parser
const bodyParser = require('body-parser');
// Le contenu du ody sera lu en JSON grace à body-parser
app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

// J'importe les routes de l'application
const alimentaireRoute = require("./src/routes/alimentaire_route");
const entretienRoute = require("./src/routes/entretien_route");

// Route par défaut qui renvoi une string
// GET "/"
// Ex: http://localhost:5000/
app.get("/", (request, response) =>{
    // J'utilise la réponse d'express pour envoyer la string
    response.send("C'est bueno frérot");
});

// J'enregistre les routes de l'application
app.use(alimentaireRoute);
app.use(entretienRoute);

// J'exporte la constante app pour la rendre utilisable dans d'autres fichiers
module.exports = app;