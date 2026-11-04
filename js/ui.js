import { getProductJSON } from "./api.js";
export function afficherProduit(produits ,mode ="grille")
{
    let fcatalogue=document.getElementById("catalogue");
    if (mode==="liste"){
        fcatalogue.className = "flex flex-col gap-4 py-8 px-8" ;
        } else 
            fcatalogue.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 px-8";
        
    fcatalogue.innerHTML=produits.map(produit => {
    return `<article  class="bg-white border border-gray-200 rounded-xl shadow-sm transition hover:-translate-y-2 hover:shadow ${mode === "liste" ? "flex flex-row" : ""}">
                <img src="${produit.image}" alt="${produit.nom}" class="${mode === "liste" ? "w-32 sm:w-48 object-cover" : "w-full h-50"}">
                <div class="p-4 leading-normal flex-1">
                    <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${produit.nom}</h3>
                    <p class="mb-3 font-normal text-gray-700">
                        ${produit.categorie}
                    </p>
                    <div class="flex items-center justify-between">
                        <span class="text-3xl font-bold text-gray-900">${produit.prix} DH</span>                                                               
                        <button type="button"
                            class="text-white bg-green-700 hover:bg-green-800  px-5 py-2.5 rounded-lg">
                            Ajouter au panier
                        </button>
                    </div>
                </div>

            </article>`
    }).join("")
}
