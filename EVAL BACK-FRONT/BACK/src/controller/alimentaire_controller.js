const fs = require('fs');
// J'enregistre la route pour accéder à la liste dans cette constante
const pathToData = "./src/model/liste.json";

// Méthode pour récupérer tous les produits alimentaire de la liste
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
            //  j'affiche tous les produits alimentaire sous la forme d'un JSON
            response.status(200).json(JSON.parse(data).alimentaire);
        }
    })
}

// Méthode pour récupérer un produit alimentaire par son id
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
            // J'enregistre tous les produits alimentaires dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit alimentaire, dont l'id correspond à l'id demandé dans la requete, dans cette constante
            const dataById = existingData.alimentaire.find((obj) => obj.id === parseInt(request.params.id));
            // Si un produit alimentaire correspond à cet id
            if (dataById) {
                // J'affiche ce produit sous la forme d'un json
                response.status(200).json(dataById)
            // Sinon
            } else {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément alimentaire ne correspond à cet id",
                    error: err
                })
            }
        }
    })
}

// Méthode pour récupérer un produit alimentaire par son name
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
            // J'enregistre tous les produits alimentaire dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit alimentaire, dont le name correspond au name demandé dans la requete, dans cette constante
            const dataByName = existingData.alimentaire.find((obj) => obj.name === request.params.name)
            // Si un produit alimentaire correspond à ce name
            if (dataByName) {
                // J'affiche ce produit alimentaire sous la forme d'un json
                response.status(200).json(dataByName);
            // Sinon
            } else {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément alimentaire ne correspond à ce name",
                    error: err
                })
            }
        }
    })
}

// Méthode pour ajouter un nouveau produit alimentaire à la liste
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
            // J'enregistre tous les produits alimentaire dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le dernier produit alimentaire, présent dans la liste, dans cette constante
            const lastData = existingData.alimentaire[existingData.alimentaire.length-1];
            // S'il n'y a aucun produit alimentaire dans la liste
            if (existingData.alimentaire.length === 0) {
                // J'insére le nouveau produit alimentaire, dans la liste, en lui donnant l'id 1 
                existingData.alimentaire.push({ "id": 1, "name": request.body.name})
            // Sinon
            } else {
                // J'insére le nouveau produit alimentaire, dans la liste, en lui donnant l'id du dernier produit présent +1
                existingData.alimentaire.push({ "id": lastData.id+1, "name": request.body.name });
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
            // J'enregistre tous les produits alimentaire dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit alimentaire, dont l'id correspond à l'id demandé dans la requete, dans cette constante
            const dataById = existingData.alimentaire.find((obj) => obj.id === parseInt(request.params.id));
            // Si aucun produit alimentaire ne correspond à cet id
            if (!dataById) {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément alimentaire ne correspond à cet id",
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

// Méthode pour supprimer un produit alimentaire de la liste
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
            // J'enregistre tous les produits alimentaire dans cette constante
            const existingData = JSON.parse(data);
            // J'enregistre le produit alimentaire, dont l'id correspond à l'id demandé dans la requete, dans cette constante 
            const dataById = existingData.alimentaire.find((obj) => obj.id === parseInt(request.params.id));
            // Si aucun produit alimentaire ne correspond à cet id
            if (!dataById) {
                // J'affiche sous la forme d'un json le message suivant
                response.status(404).json({
                    message: "aucun élément alimentaire ne correspond à cet id",
                    error: err
                })
            // Sinon
            } else {
                // Je filtre les produits de la liste, afin de ne supprimer que celui qui correspond à l'id demandé dans la requete
                existingData.alimentaire = existingData.alimentaire.filter((obj) => obj.id != parseInt(request.params.id));
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