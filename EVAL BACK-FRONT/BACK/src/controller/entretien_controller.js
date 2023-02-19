const fs = require('fs');
// J'enregistre la route pour accéder à la liste dans cette constante
const pathToData = "./src/model/liste.json";

// Méthode pour récupérer tous les produits entretien de la liste
exports.getAllDataTab = (request, response) =>{
    // J'utilise readfile pour lire la liste
    fs.readFile(pathToData, (err, data) =>{
        // S'il y a une erreur lors de la lecture de la liste
        if (err) {
            // J'affiche sous la forme d'un json le message suivant
            response.status(500).json({
                message: "probleme pendant la lecture de la liste",
                error: err
            })
            // Sinon
        } else {
            //  j'affiche tous les produits entretien sous la forme d'un JSON
            response.status(200).json(JSON.parse(data).entretien);
        }
    })
}

// Méthode pour récupérer un produit entretien par son id
exports.getDataById = (request, response) =>{
    // J'utilise readfile pour lire la liste
    fs.readFile(pathToData, (err, data) =>{
        // S'il y a une erreur lors de la lecture de la liste
        if (err) {
            // J'affiche sous la forme d'un json le message suivant
            response.status(500).json({
                message: "probleme pendant la lecture de la liste",
                error: err
            })
        // Sinon
        } else {
            // J'enregistre tous les produits entretien dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit entretien, dont l'id correspond à l'id demandé dans la requete, dans cette constante
            const dataById = existingData.entretien.find((obj) => obj.id === parseInt(request.params.id));
            // Si un produit entretien correspond à cet id
            if (dataById) {
                // J'affiche ce produit sous la forme d'un json
                response.status(200).json(dataById)
            // Sinon
            } else {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément entretien ne correspond à cet id",
                    error: err
                })
            }
        }
    })
}

// Méthode pour récupérer un produit entretien par son name
exports.getDataByName = (request, response) =>{
    // J'utilise readfile pour lire la liste
    fs.readFile(pathToData, (err, data) =>{
        // S'il y a une erreur lors la lecture de la liste
        if (err) {
            // J'affiche sous la forme d'un json le message suivant
            response.status(500).json({
                message: "probleme pendant la lecture de la liste",
                error: err
            })
        // Sinon
        } else {
            // J'enregistre tous les produits entretien dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit entretien, dont le name correspond au name demandé dans la requete, dans cette constante
            const dataByName = existingData.entretien.find((obj) => obj.name === request.params.name)
            // Si un produit entretien correspond à ce name
            if (dataByName) {
                // J'affiche ce produit entretien sous la forme d'un json
                response.status(200).json(dataByName);
            // Sinon
            } else {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément entretien ne correspond à ce name",
                    error: err
                })
            }
        }
    })
}

// Méthode pour ajouter un nouveau produit entretien à la liste
exports.createData = (request, response) =>{
    // J'utilise readfile pour lire la liste
    fs.readFile(pathToData, (err,data) =>{
        // S'il y a une erreur lors de la lecture de la liste
        if (err) {
            // J'affiche sous la forme d'un json le message suivant
            response.status(500).json({
                message: "probleme lors de la lecture de la liste",
                error: err
            })
        // Sinon
        } else {
            // J'enregistre tous les produits entretien dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le dernier produit entretien, présent dans la liste, dans cette constante
            const lastData = existingData.entretien[existingData.entretien.length-1];
            // S'il n'y a aucun produit entretien dans la liste
            if (existingData.entretien.length == 0) {
                // J'insére le nouveau produit entretien, dans la liste, en lui donnant l'id 1 
                existingData.entretien.push({ "id": 1, "name": request.body.name})
            // Sinon
            } else {
                // J'insére le nouveau produit entretien, dans la liste, en lui donnant l'id du dernier produit présent +1
                existingData.entretien.push({ "id": lastData.id+1, "name": request.body.name });
            }
            // J'utilise writefile pour écrire dans la liste
            fs.writeFile(pathToData, JSON.stringify(existingData), (writeErr) =>{
                // S'il y a une erreur lors de l'écriture de la liste
                if (writeErr) {
                    // J'affiche sous la forme d'un json un message d'échec
                    response.status(500).json({
                        message: "probleme lors de l'écriture de la liste",
                        error: err
                    })
                // Sinon
                } else {
                    // J'affiche sous la forme d'un json un message de réusite 
                    response.status(200).json({
                        message: "La liste vient d'etre mises à jour avec un nouveau produit"
                    })
                }
            })
        }
    })
}

// Méthode pour mettre à jour un produit présent dans la liste
exports.updateData = (request, response) =>{
    // J'utilise readfile pour la liste
    fs.readFile(pathToData, (err, data) =>{
        // S'il y a une erreur lors de la lecture de la liste
        if (err) {
            // J'affiche sous la forme d'un json le message suivant
            response.status(500).json({
                message: "probleme lors de la lecture de la liste",
                error: err
            })
        // Sinon
        } else {
            // J'enregistre tous les produits entretien dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit entretien, dont l'id correspond à l'id demandé dans la requete, dans cette constante
            const dataById = existingData.entretien.find((obj) => obj.id === parseInt(request.params.id));
            // Si aucun produit entretien ne correspond à cet id
            if (!dataById) {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément entretien ne correspond à cet id",
                    error: err
                })
            // Sinon
            } else {
                // Je remplace le name du produit (dataById) par le name de la requete
                dataById.name = request.body.name;
                // J'utilise writefile pour écrire dans la liste
                fs.writeFile(pathToData, JSON.stringify(existingData), (writeErr) =>{
                    // S'il y a une erreur lors de l'écriture de la liste
                    if (writeErr) {
                        // J'affiche sous la forme d'un json un message d'echec
                        response.status(500).json({
                            message: "probleme lors de l'écriture de la liste",
                            error: err
                        })
                    // Sinon
                    } else {
                        // J'affiche sous la forme d'un json un message de réussite
                        response.status(200).json({
                            message: "La liste vient d'etre mises à jour"
                        })
                    }
                })
            }
        }
    })
}

// Méthode pour supprimer un produit entretien de la liste
exports.deleteDataById = (request, response) =>{
    // J'utilise readfile pour lire la liste
    fs.readFile(pathToData, (err, data) =>{
        // S'il y a une erreur lors de la lecture de la liste
        if (err) {
            // J'affiche sous la forme d'un json le message suivant
            response.status(500).json({
                message: "probleme lors de la lecture de la liste",
                error: err
            })
        // Sinon
        } else {
            // J'enregistre tous les produits entretien dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit entretien, dont l'id correspond à l'id demandé dans la requete, dans cette constante 
            const dataById = existingData.entretien.find((obj) => obj.id === parseInt(request.params.id));
            // Si aucun produit entretien ne correspond à cet id
            if (!dataById) {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément entretien ne correspond à cet id",
                    error: err
                })
            // Sinon
            } else {
                // Je filtre les produits de la liste, afin de ne supprimer que celui qui correspond à l'id demandé dans la requete
                existingData.entretien = existingData.entretien.filter((obj) => obj.id != parseInt(request.params.id));
                // J'utilise writefile pour écrire dans la liste
                fs.writeFile(pathToData, JSON.stringify(existingData), (writeErr) =>{
                    // S'il y a une erreur lors de l'écriture de la liste
                    if (writeErr) {
                        // J'affiche sous la forme d'un json un message d'echec
                        response.status(500).json({
                            message: "probleme lors de l''écriture de la liste",
                            error: err
                        })
                    // Sinon
                    } else {
                        // J'affiche sous la forme d'un json un message de réussite
                        response.status(200).json({
                            message:"La liste vient d'etre mises à jour"
                        })
                    }
                })
            }
        }
    })
}