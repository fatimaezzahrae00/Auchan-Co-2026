import { getProductJSON } from "./api.js";
export function afficherProduit(produits)
{
    let fcatalogue=document.getElementById("catalogue");
    fcatalogue.innerHTML=produits.map(produit => {
    return `<article  class="bg-white border border-gray-200 rounded-xl shadow-sm transition hover:-translate-y-2 hover:shadow">
                <img src="${produit.image}" alt="" class="w-full h-50">
                <div class="p-4 leading-normal">
                    <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${produit.nom}</h3>
                    <p class="mb-3 font-normal text-gray-700">
                        FRUIT
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