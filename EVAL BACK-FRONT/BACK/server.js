const app = require("./app");
// J'enregistre le port sur lequel je vais faire tourner l'application
const port = 5000

// L'application tourne sur le port enregistré dans la constante "port"
app.listen(port, () =>{
    // Affiche ce message si tout va bien
    console.log("Je suis une appli qui tourne sur le port " + port)
});