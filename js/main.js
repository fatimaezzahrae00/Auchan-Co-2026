import { getProductJSON } from "./api.js";
import { afficherProduit } from "./ui.js";
let produits=[]
produits= await  getProductJSON();
console.table(produits)
afficherProduit(produits)
