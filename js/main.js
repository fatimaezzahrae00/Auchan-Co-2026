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

const catalogue = document.getElementById("catalogue");
const panierZone = document.getElementById("panier");
const panierListe = document.getElementById("panier-liste");
const panierVide = document.getElementById("panier-vide");
const panierCount = document.getElementById("panier-count");
const panierTotal = document.getElementById("panier-total");


let searchTerm = "";
let activeCategory = "all";
let mode = "grille";
let currentPage = 1;
const produitsParPage = 8;
let panier = []


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
function afficherPanier() {
    panierListe.innerHTML = panier.map(p => `
        <li class="flex justify-between text-sm border-b border-gray-200 pb-1">
            <span>${p.nom}</span>
            <span>${p.prix} DH</span>
        </li>`).join("");

    panierCount.textContent = panier.length;
    panierTotal.textContent = panier.reduce((somme, p) => somme + p.prix, 0);
    panierVide.classList.toggle("hidden", panier.length > 0);
}
// ===== Drag & Drop =====
// 1. mli nbdaw nsa7bo l'carte: n7ottou l'ID f dataTransfer
catalogue.addEventListener("dragstart", e => {
    const carte = e.target.closest("article[data-id]");
    if (!carte) return;
    e.dataTransfer.setData("text/plain", carte.dataset.id);
});

// 2. l'carte fo9 l'panier: preventDefault() darouri bach l'drop ykhdm
panierZone.addEventListener("dragover", e => {
    e.preventDefault();
    panierZone.classList.add("ring-4", "ring-green-500");
});

// 3. l'carte tkhrj mn l'panier
panierZone.addEventListener("dragleave", () => {
    panierZone.classList.remove("ring-4", "ring-green-500");
});

// 4. nhbtou l'carte f l'panier
panierZone.addEventListener("drop", e => {
    e.preventDefault();
    panierZone.classList.remove("ring-4", "ring-green-500");

    const id = Number(e.dataTransfer.getData("text/plain"));
    console.log("ID dyal l'produit:", id);

    const produit = produits.find(p => p.id === id);
    if (!produit) return;

    panier.push(produit);
    afficherPanier();
});