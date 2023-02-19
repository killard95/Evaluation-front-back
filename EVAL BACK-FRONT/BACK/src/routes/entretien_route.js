const express = require("express");

const router = express.Router();

const entretienController = require("../controller/entretien_controller");

// route qui permet de récupérer l'intégralité des produits entretien de la liste
// GET '/entretien'
// Ex: http://localhost:5000/entretien
router.get('/entretien', entretienController.getAllDataTab);

// route qui permet de récupérer un produit entretien par son id
// GET '/entretien/:id'
// Ex: http://localhost:5000/entretien/1
router.get("/entretien/:id", entretienController.getDataById);

// route qui permet de récupérer un produit entretien par son name
// GET '/entretien/search/:titre'
// Ex: http://localhost:5000/entretien/name/sopalin
router.get("/entretien/name/:name", entretienController.getDataByName);

// route qui permet d'ajouter un produit entretien dans la liste
// POST '/entretien'
// Ex: http://localhost:5000/entretien
router.post("/entretien", entretienController.createData);

// route qui permet de mettre à jour un produit entretien dans la liste par son id
// PUT '/entretien/:id'
// Ex: http://localhost:5000/entretien/2
router.put("/entretien/:id", entretienController.updateData);

// route qui permet de supprimer un produit entretien de la liste par son id
// DELETE '/entretien/:id'
// Ex: http://localhost:5000/entretien/3
router.delete("/entretien/:id", entretienController.deleteDataById);

// Export du module router pour utiliser les routes dans d'autres fichiers
module.exports = router;