const express = require("express");

const router = express.Router();

const alimentaireController = require("../controller/alimentaire_controller");

// route qui permet de récupérer l'intégralité des produits alimentaires de la liste
// GET '/alimentaire'
// Ex: http://localhost:5000/alimentaire
router.get('/alimentaire', alimentaireController.getAllDataTab);

// route qui permet de récupérer un produit alimentaire par son id
// GET '/alimentaire/:id'
// Ex: http://localhost:5000/alimentaire/1
router.get("/alimentaire/:id", alimentaireController.getDataById);

// route qui permet de récupérer un produit alimentaire par son name
// GET '/alimentaire/search/:titre'
// Ex: http://localhost:5000/alimentaire/name/biscuits
router.get("/alimentaire/name/:name", alimentaireController.getDataByName);

// route qui permet d'ajouter un produit alimentaire dans la liste
// POST '/alimentaire'
// Ex: http://localhost:5000/alimentaire
router.post("/alimentaire", alimentaireController.createData);

// route qui permet de mettre à jour un produit alimentaire dans la liste par son id
// PUT '/alimentaire/:id'
// Ex: http://localhost:5000/alimentaire/2
router.put("/alimentaire/:id", alimentaireController.updateData);

// route qui permet de supprimer un produit alimentaire de la liste par son id
// DELETE '/alimentaire/:id'
// Ex: http://localhost:5000/alimentaire/3
router.delete("/alimentaire/:id", alimentaireController.deleteDataById);

// Export du module router pour utiliser les routes dans d'autres fichiers
module.exports = router;