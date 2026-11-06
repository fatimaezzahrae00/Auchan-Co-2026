import { getProductJSON } from "./api.js";
import { afficherProduit } from "./ui.js";


let produits = await getProductJSON();
console.table(produits);


const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filter-btn");
const btnGrille = document.getElementById("btn-grille");
const btnListe = document.getElementById("btn-liste");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageInfo = document.getElementById("page-info");


let searchTerm = "";
let activeCategory = "all";
let mode = "grille";
let currentPage = 1;
const produitsParPage = 8;


function appliquerFiltres() {
    // filter() 3la l'tableau original
    const resultat = produits.filter(produit => {
        const matchNom = produit.nom.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategorie =
            activeCategory === "all" ||
            produit.categorie.toLowerCase() === activeCategory;
        return matchNom && matchCategorie;
    });

    
    const totalPages = Math.ceil(resultat.length / produitsParPage);
    const debut = (currentPage - 1) * produitsParPage;
    const fin = debut + produitsParPage;
    const pageProduits = resultat.slice(debut, fin);

    
    afficherProduit(pageProduits, mode);

    
    pageInfo.textContent = `Page ${currentPage} / ${totalPages || 1}`;
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage >= totalPages;
}



searchInput.addEventListener("input", e => {
    searchTerm = e.target.value.trim();
    currentPage = 1;
    appliquerFiltres();
});



filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        currentPage = 1;
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



btnPrev.addEventListener("click", () => {
    currentPage--;
    appliquerFiltres();
});

btnNext.addEventListener("click", () => {
    currentPage++;
    appliquerFiltres();
});



appliquerFiltres();