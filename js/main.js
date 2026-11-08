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


// ===== Les variables =====
let searchTerm = "";
let activeCategory = "all";
let mode = "grille";
let currentPage = 1;
let produitsParPage = 8;
let panier = [];


let panierSauvegarde = localStorage.getItem("panier");
if (panierSauvegarde !== null) {
    panier = JSON.parse(panierSauvegarde);
}



const appliquerFiltres = () => {
    
    let resultat = produits.filter(produit => {
        let matchNom = produit.nom.toLowerCase().includes(searchTerm.toLowerCase());

        let matchCategorie = false;
        if (activeCategory === "all") {
            matchCategorie = true;
        } else if (produit.categorie.toLowerCase() === activeCategory) {
            matchCategorie = true;
        }

        return matchNom && matchCategorie;
    });

    
    let totalPages = Math.ceil(resultat.length / produitsParPage);
    let debut = (currentPage - 1) * produitsParPage;
    let fin = debut + produitsParPage;
    let pageProduits = resultat.slice(debut, fin);

  
    afficherProduit(pageProduits, mode);

    
    if (totalPages === 0) {
        totalPages = 1;
    }
    pageInfo.textContent = "Page " + currentPage + " / " + totalPages;
    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage >= totalPages;
};



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
    currentPage = currentPage - 1;
    appliquerFiltres();
});

btnNext.addEventListener("click", () => {
    currentPage = currentPage + 1;
    appliquerFiltres();
});



const sauvegarderPanier = () => {
    
    localStorage.setItem("panier", JSON.stringify(panier));
};

const afficherPanier = () => {
    
    panierListe.innerHTML = panier.map(p => {
        return `<li class="flex justify-between text-sm border-b border-gray-200 pb-1">
                    <span>${p.nom} x${p.quantite}</span>
                    <span>${p.prix * p.quantite} DH</span>
                </li>`;
    }).join("");

    
    panierCount.textContent = panier.reduce((total, p) => total + p.quantite, 0);

    
    panierTotal.textContent = panier.reduce((total, p) => total + p.prix * p.quantite, 0);

    
    if (panier.length > 0) {
        panierVide.classList.add("hidden");
    } else {
        panierVide.classList.remove("hidden");
    }
};

const ajouterAuPanier = produit => {
    
    let existe = panier.some(p => p.id === produit.id);

    if (existe === true) {
        
        let ligne = panier.find(p => p.id === produit.id);
        ligne.quantite = ligne.quantite + 1;
    } else {
        
        let nouvelleLigne = {
            id: produit.id,
            nom: produit.nom,
            prix: produit.prix,
            quantite: 1
        };
        panier.push(nouvelleLigne);
    }

    sauvegarderPanier();
    afficherPanier();
};



catalogue.addEventListener("click", e => {
    
    if (e.target.dataset.add === undefined) {
        return;
    }

    let id = Number(e.target.dataset.add);
    let produit = produits.find(p => p.id === id);
    ajouterAuPanier(produit);
});


catalogue.addEventListener("dragstart", e => {
    let id = e.target.dataset.id;
    e.dataTransfer.setData("text/plain", id);
});


panierZone.addEventListener("dragover", e => {
    e.preventDefault();
});


panierZone.addEventListener("drop", e => {
    e.preventDefault();


    let id = Number(e.dataTransfer.getData("text/plain"));
    console.log("ID dyal l'produit:", id);

    let produit = produits.find(p => p.id === id);
    ajouterAuPanier(produit);
});



appliquerFiltres();
afficherPanier();