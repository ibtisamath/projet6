// Récupération des éléments du DOM
const gallery = document.getElementById("gallery");
const filters = document.querySelector(".filters");

// Fonction asynchrone pour effectuer une requête API et récupérer les œuvres
const getApi = async () =>
  (await fetch("http://localhost:5678/api/works")).json();
// Fonction asynchrone pour effectuer une requête API et récupérer les catégories
const getCategories = async () =>
  (await fetch("http://localhost:5678/api/categories")).json();
// Fonction pour créer un élément dans la galerie
const displayApi = (api) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  // Attribution des valeurs à chaque élément
  img.src = api.imageUrl;
  figcaption.textContent = api.title;

  // Ajout des éléments à la figure
  figure.classList.add("itemGallery");
  figure.append(img, figcaption);

  // Ajout de la figure à la galerie
  gallery.appendChild(figure);
};