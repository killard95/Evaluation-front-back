// Lorsque la page est prete
$(document).ready(() =>{
    // J'enregistre le l'url de l'application dans cette constante
    const apiBaseUrl = "http://localhost:5000/";

    // je créer cette variable globale vide pour éviter les doublons
    let prod =""
    // Fonction pour récupérer tous les produits de la liste
    function getAllProduits() {
        // J'enregistre la valeur choisi dans le menu déroulant pour modifier la route vers la liste
        const categorie = $("#produits").val()
        // requete ajax
        $.ajax({
            // type de la requete
            type: "GET",
            // route de la requete
            url: apiBaseUrl + categorie,
            // type de contenu de la requete
            contentType: 'application/json; charset=utf-8',
            // type de données récupérer
            dataType: 'json',
            // En cas de réussite
            success: (result) =>{
                // variable vide pour afficher la  liste
                let text = '';
                // boucle afin d'ajouter chaque élémentd de la liste 
                result.forEach(obj =>{
                    text += `<p> ${obj.id} ${obj.name} </p>`
                    prod += `<p> ${obj.id} ${obj.name} </p>`
                })
                // J'affiche dans un des élément HTML la liste qui se modifie en temps réel
                $("#affichProduits").html(text);
                console.log(result);
            },
            // En cas d'erreur
            error: (xhr, status, error) =>{
                console.log(xhr);
                console.log(status);
                console.log(error);
                // J'affiche un pop up qui contient un message d'erreur
                alert("status: " + status + " error: " + error)
            }
        })
    }

    // Fonction pour ajouter un nouveau produit à la liste
    function createProduits() {
        // J'enregistre la valeur choisi dans le menu déroulant pour modifier la route vers la liste
        const categorie = $("#radio_create_produits").val()
        // J'enregistre sous la forme d'un json le nouveau produit à ajouter dans cette constante
        const produitName = { name: ($("#create_produits").val()).trim() };
        // Si l'input est vide ou ne contient que des espaces
        if (($("#create_produits").val()).trim() === "" ) {
            // J'affiche un pop-up
            alert("Veuillez entrez un nom de produit a àjouter à la liste")
            // Sinon si la valeur de l'input est deja présent dans la liste
        } else if (prod.includes(($("#create_produits").val()).trim()) == true ) {
            // J'affiche un pop-up
            alert(`${($("#create_produits").val()).trim()} est deja present dans la liste.`)
            // Sinon
            } else {
                // requete ajax
                $.ajax({
                    // type de la requete
                    type: "POST",
                    // route de la requete
                    url: apiBaseUrl + categorie,
                    // données à récupérer
                    data: JSON.stringify(produitName),
                    // type de contenu de la requete
                    contentType: 'application/json; charset=utf-8',
                    // type de données à récupérer
                    dataType: 'json',
                    // En cas de réussite
                    success: (result) =>{
                        // affiche un pop-up
                        alert(`Vous venez d'ajouter ${($("#create_produits").val()).trim()} dans la catégorie ${categorie}.`)
                        console.log(result);
                        // relance la fonction getAll
                        getAllProduits()
                    },
                    // En cas d'erreur
                    error: (xhr, status, error) =>{
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        alert("status: " + status + " error: " + error)
                    }
                })
        }
    }
    

    // Fonction pour récupérer un produit par son id
    function getProduitById() {
        // J'enregistre la valeur du menu déroulant dans cette constante
        const categorie = $("#get_produit_by_id").val()
        // J'enregistre l'endroit ou afficher le résultat dans cette variable
        let produitById = document.getElementById("affich_by_id");
        // J'enregistre la valeur de l'input ou j'entre l'id dans cette constante
        const id = $("#id_produit").val();
        // Si l'input est vide
        if ($("#id_produit").val() == ""){
            // J'affiche un pop-up
            alert("Veuillez entrez une id pour obtenir le produit correspondant")
        // Sinon
        } else {
            // requete ajax
            $.ajax({
                // type de la requete
                type: "GET",
                // route de la requete
                url: apiBaseUrl + categorie + "/" + id,
                // type de contenu de la requete
                contentType: 'application/json; charset=utf-8',
                // type de données à récupérer
                dataType: 'json',
                // En cas de réussite
                success: (result) =>{
                    console.log(result);
                    // Affiche dans la cible le message suivant
                    produitById.innerHTML = `Le produit de la catégorie ${categorie} dont l'id correspond à ${result.id} est ${result.name}`;
                },
                // En cas d'échec
                error: (xhr, status, error) =>{
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    alert("Aucun produit ne correspond à cet id")
                }
            })
        }
    }

    // Fonction pour mettre un jour un produit de la liste
    function updateProduitById() {
        // J'enregistre la valeur du menu déroulant dans cette constante
        const categorie = $("#update_produit_by_id").val()
        // J'enregistre la valeur renseignée en tant qu'id dans cette constante
        const id = $("#id_produit_update").val();
        // J'enregistre sous la forme d'un json le nouveau produit à ajouter dans cette constante
        const name = { name: ($("#name_produit_update").val()).trim() };
        // Si un des input est vide ou si le nom du produit ne contient que des espaces
        if (($("#name_produit_update").val()).trim() == "" || id == "") {
            // Affiche un pop-up
            alert("Veuillez entrez un nom de produit et un id pour mettre à jour un produit de la liste")
        // Sinon si la valeur de l'input est deja présent dans la liste
        } else if (prod.includes(($("#name_produit_update").val()).trim()) == true ) {
            // Affiche un pop-up
            alert(`${($("#name_produit_update").val()).trim()} est deja present dans la liste.`)
            // Sinon
        } else {
                // requete Ajax
                $.ajax({
                    // type de la requete
                    type: "PUT",
                    // route de la requete
                    url: apiBaseUrl + categorie + "/" + id,
                    // Type de contenu de la requete
                    contentType: 'application/json; charset=utf-8',
                    // Type de données à récupérer
                    data: JSON.stringify(name),
                    // Type de données
                    dataType: 'json',
                    // En cas de réussite
                    success: (result) =>{
                        // Je supprime ce produit de prod qui me sert à éviter les doublons
                        prod -= `<p> ${result.id} ${result.name} </p>`;
                        // J'affiche un pop-up
                        alert(`Vous venez de mettre à jour ${($("#name_produit_update").val()).trim()} dans la catégorie ${categorie}.`)
                        console.log(result);
                        // Je relance la fonction getAll
                        getAllProduits()
                    },
                    // En cas d'échec
                    error: (xhr, status, error) =>{
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        alert("Aucun produit ne correspond à cet id")
                    }
                })
        }
    }

    // Fonction pour supprimer un produit de la liste
    function deleteProduitById() {
        // J'enregistre la valeur du menu déroulant dans cette constante
        const categorie = $("#delete_produit_by_id").val()
        // J'enregistre la valeur renseignée en tant qu'id dans cette constante
        const id = $("#id_produit_delete").val();
        // Si l'input de l'id est vide
        if (id == ""){
            // Affiche un pop-up
            alert("Veuillez entrez un id pour supprimer un produit de la liste")
        // Sinon
        } else {
            // Requete ajax
            $.ajax({
                // Type de requete
                type: "DELETE",
                // route de la requete
                url: apiBaseUrl + categorie + "/" + id,
                // Type de contenu de la requete
                contentType: 'application/json; charset=utf-8',
                // Type de données à récupérer
                dataType: 'json',
                // En cas de réussite
                success: (result) =>{
                    // retire ce produit de la variable prod qui me sert à éviter les doublons
                    prod -= `<p> ${result.id} ${result.name} </p>`;
                    // Affiche un pop-up
                    alert(`Vous venez de supprimer un produit de la catégorie ${categorie}.`)
                    console.log(result);
                    // Relance la fonction getAll
                    getAllProduits()
                },
                // En cas d'echec
                error: (xhr, status, error) =>{
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    alert("Aucun produit ne correspond à cet id")
                }
            })
        }
    }


    // Evenement sur les différents boutons 
    $("#create_button").click(createProduits);
    $("#get_all_produits").click(getAllProduits);
    $("#get_by_id_button").click(getProduitById);
    $("#update_produit_button").click(updateProduitById)
    $("#delete_produit_button").click(deleteProduitById);
})