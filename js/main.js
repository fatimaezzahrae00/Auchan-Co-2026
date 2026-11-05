import { getProductJSON } from "./api.js";
import { afficherProduit } from "./ui.js";


let produits = await getProductJSON();
console.table(produits);


const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filter-btn");
const btnGrille = document.getElementById("btn-grille");
const btnListe = document.getElementById("btn-liste");


let searchTerm = "";
let activeCategory = "all";
let mode = "grille";


function appliquerFiltres() {
    const resultat = []; 

    produits.forEach(produit => {
        
        const matchNom = produit.nom.toLowerCase().includes(searchTerm.toLowerCase());

        
        const matchCategorie =
            activeCategory === "all" ||
            produit.categorie.toLowerCase() === activeCategory;

        
        if (matchNom && matchCategorie) {
            resultat.push(produit);
        }
    });

    afficherProduit(resultat, mode); 
}


searchInput.addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    appliquerFiltres();
});


filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        appliquerFiltres();
    });
});


btnGrille.addEventListener("click", () => {
    mode = "grille";
    appliquerFiltres();
});

btnListe.addEventListener("click", () => {
    mode = "liste";
    appliquerFiltres();
});


appliquerFiltres();


