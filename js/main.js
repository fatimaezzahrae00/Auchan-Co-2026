import { getProductJSON } from "./api.js";
import { afficherProduit } from "./ui.js";
let produits=[]
produits= await  getProductJSON();
console.table(produits)
afficherProduit(produits)

const searchInput = document.getElementById ("search");
const filterBtns = document.querySelectorAll(".filter-btn");
// console.log(filterBtns.length);
const btnGrille = document.getElementById("btn-grille");
const btnListe = document.getElementById("btn-liste");

let searchTerm = "";
let activeCategory = "all";
let mode = "grille";

function appliquerFilters() {
    const resultat = produits.filter (p=> {
    const matchNom = p.nom.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategorie = activeCategory === "all" || p.categorie.toLowerCase() === activeCategory;
        return matchNom && matchCategorie;
    });
    afficherProduit(resultat, mode);
}
searchInput.addEventListener("input" , e => {
    searchTerm = e.target.value.trim()
    appliquerFilters();
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