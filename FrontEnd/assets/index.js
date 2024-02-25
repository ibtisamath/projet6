// Récupération des éléments du DOM
const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".filters")


//  Récupéreration des travaux
async function getworks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}
getworks();

function createworks(work) {
  //création des balises 
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl; // récupération de l'image de travaux
  figcaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

async function displayworks() {
  const works = await getworks(); 
  gallery.innerHTML = ""; // Vide la galerie avant de l'afficher
  works.forEach((work) => {
    createworks(work)
  });
}
displayworks();

//  Récupéreration des categories
async function getcategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
getcategories();

//  affrichage des categories
async function displaycategories() {
  const categories = await getcategories();
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    const filters = document.querySelector(".filters")
    filters.appendChild(btn);
    btn.id = category.id
  });
}
displaycategories();

//filtre des travaux
async function filterworks() {
  const Works = await getworks();
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((button) => {
    button.addEventListener ("click", async (e) => {
      btnId = e.target.id;
      gallery.innerHTML = ""; // Vide la galerie avant de l'affiche
      if (btnId !== "0" ) {
        const btnworks = Works.filter((work) => { 
          return work.categoryId == btnId;
        });
        btnworks.forEach ((work) => {
          createworks(work)
       });
      } else {
        displayworks();
      };
    });
  });
}

filterworks();

//Modification de la page en fonction de l'état de connexion de l'utilsateur

const header = document.querySelector("header");
const ul = document.querySelector("header ul ");
const li = document.querySelectorAll(" ul li");
const login = li[2];
login.classList = "login"
const lilogin = document.querySelector(".login")
const token = localStorage.getItem("token");

if ( token !== null)  {
  lilogin.textContent = "logout";
  lilogin.addEventListener ("click" , () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    
  })
} else {
  lilogin.textContent = "login";
  lilogin.addEventListener("click" , () => {
  window.location.href = "assets/login.html";
  })
}
  
//banner
const banner = document.querySelector(".banner"); //div banner (élement parent)
const textBanner = document.createElement("p"); //création du paragraphe de banner
textBanner.textContent = "Mode édition";
const svgIconBanner = `
<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
`;
//place textBanner dans la div Banner
banner.appendChild(textBanner);
//ajoute la chaîne SVG en tant que nœud DOM à l'élément banner
banner.innerHTML += svgIconBanner;

//modify
const modifyBtn = document.querySelector(".modify span")

if (token !== null) {
  //si il est connecter
  banner.style.display = "flex"; // affiche banner
  modifyBtn.style.display = "flex"; // affiche modify-item
  //si il n'est pas connecter
} else {
  banner.style.display = "none"; // affiche pas banner
  modifyBtn.style.display = "none"; // affiche pas modify-item
}

// récupération de éléments du Dom pour la gestion des modales

const modalWrapper = document.querySelector(".modale-wrapper"); //récupere le container des modal (élément parent)
const openModale = document.querySelector(".modify span"); // sélectionne les élément de 
const firstModal = document.querySelector(".modale-principale"); //première modale
const xmarkOne = document.querySelector(".modale-principale i"); // croix de la première modale
const secondModal = document.querySelector(".modale-secondaire"); //seconde modale
const buttonFirstModal = document.querySelector(".modale-principale-btn"); //bouton première modal
const closeModale = document.querySelector(".close-modale"); 

const iSecondModal = document.querySelectorAll(".modale-secondaire i"); //première modal
const arrow = iSecondModal[0]
const xmarkTwo = iSecondModal[2]; // croix de la seconde modale
// champs message du formulaire
const erreurChampVide = document.getElementById("error-messageChamp");
const addProject = document.getElementById("addProject");
const errorSizeImg = document.getElementById("message-erreur-taille-image");

//première modale 

openModale.addEventListener("click", OpenModal); //au click dclenche la fonction toggle modal
function OpenModal() {
  modalWrapper.style.display = "block"; // ouverture de la  modale
  firstModal.style.display = "block";
  secondModal.style.display = "none"; //seconde modal en none
}

//xmark de la première modale fermant la modale
xmarkOne.addEventListener("click", xFirstModale); //au click ferme la première modale
function xFirstModale() {
  modalWrapper.style.display = "none"; 
}

//fermeture de la modale en cliquant à l'extérieur de la modale
closeModale.addEventListener("click", CloseModale); //au click ferme la modale
function CloseModale (e) { 
  modalWrapper.style.display = "none"; //retire modale
}

//xmark de la seconde modale fermant la modale
xmarkTwo.addEventListener("click", xSecondModale); //au click ferme la modale
function xSecondModale(e) {
  modalWrapper.style.display = "none"; //retire modale
}

//deuxième modal 
buttonFirstModal.addEventListener("click", openSecondModal); // ouvre la seconde modale
function openSecondModal() {
  firstModal.style.display = "none"; //première modal en none
  secondModal.style.display = "block"; //seconde modal en block
}

//retourne à la première modal
arrow.addEventListener("click", backToFirstModal); 
function backToFirstModal() {
  const form = document.getElementById("addWork");
  const addImgworks = document.querySelector(".case-image");
  const contentaddworks = document.querySelector(".content-addworks");

  firstModal.style.display = "block"; //première modal en block
  secondModal.style.display = "none"; //seconde modal en none
  // suppression des messages 
  addProject.textContent = "";
  errorSizeImg.textContent = ""

  form.reset(); //vide le titre et catégorie du formulaire
  addImgworks.style.display = "flex"; // 
  contentaddworks.style.display = "none"; // vide le champs image
}
////////////////////////////////////////////

//affichage des works dans le première modal + des icone poubelle

async function displayWorkModal() {
  const worksModal = document.querySelector(".works-modale");
  worksModal.innerHTML = ""; //vide le HTML
  const arrayModals = await getworks();
  arrayModals.forEach((works) => {
    const img = document.createElement("img");
    const figure = document.createElement("figure");
    //ajout de la class "trash" sur les SVG
    const span = document.createElement("span"); //parent des icônes poubelle
    const trashIcon = `<i class="fas fa-trash-alt"></i>`;
    span.innerHTML = trashIcon; // mise en place des icone dans le parent
    span.id = works.id; //récupère l'id des works sur les poubelles
    figure.appendChild(img);
    figure.appendChild(span);
    worksModal.appendChild(figure);
    img.src = works.imageUrl; 
  });
  deleteWorks(); // pour la suppression des oeuvres
}
displayWorkModal(); // affiche tous les work dans la modal


//gestion  du formulaire de la deuxième modal
//récupération de case-image
const addImgworks = document.querySelector(".case-image");

//récupération de content-addworks
const contentaddworks = document.querySelector(".content-addworks");

//création d'un élément image
const previewImgSelected = document.createElement("img");

// récupération du bouton qui permet de mettre une image
const addImgBtn = document.getElementById("add-img-btn");

//gestionnaire d'évenemtn sur le boutton d'ajout d'image
addImgBtn.addEventListener("input", () => {
  const selectedImage = addImgBtn.files[0];
  const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo
  if (selectedImage.size > maxSizeInBytes) {
    //récupération de la span pour afficher un message d'erreur image trop grande
    const errorSizeImg = document.getElementById("message-erreur-taille-image");
    //ajout du texte dans la span
    errorSizeImg.textContent = "La taille de l'image ne doit pas dépasser 4 mo.";
    //réinialisation du champs image
    addImgBtn.value = "";// vide le champs image de la seconde modale

  } else {
    //création d'un objet URL pour l'image sélectionné
    const selectedImageUrl = URL.createObjectURL(selectedImage);

    //ajout de l'image sélectionné dans l'élément image créer
    previewImgSelected.src = selectedImageUrl;

    //masque le boutton d'ajout d'image 
    addImgworks.style.display = "none";

    //affchiche l'image
    contentaddworks.style.display = "block";

    contentaddworks.appendChild(previewImgSelected);
    addProject.textContent = ""; // vide le champs message
    errorSizeImg.textContent = ""

    //change la couleur du boutton valiser quand une image est sélestionné
    const validerButton = document.getElementById("submitValider");
    validerButton.style.backgroundColor = "#1d6154";
    validerButton.style.color = "white";
}
});

contentaddworks.addEventListener("click", closeimagework); // pour vider le champs image de la second modale
function closeimagework() {
  contentaddworks.style.display = "none"; //
  addImgworks.style.display = "flex";
}

addImgBtn.addEventListener("click", textaddImg); // vide le champs  message du formulaire
function textaddImg() {
  addProject.textContent = "";
  errorSizeImg.textContent = ""

}

//catégories dynamique dans le formulaire d'envoie
function categoriesForm () {
  getcategories()
  .then((categories) => {
    const categorieSelect = document.getElementById("categorie");

    categories.forEach((category) => {
      //création des catégories
      const optionElement = document.createElement("option");
      optionElement.value = category.id;
      optionElement.textContent = category.name;

      //mettre les catégories des les options du formulaire
      categorieSelect.appendChild(optionElement);
    });
    
  })
  .catch((error) => {
    console.error(error);
  });
    
};

categoriesForm()


//fonction add work pour l'ajout des travaux
function addWork() {
  //récupération du formulaire
  const form = document.getElementById("addWork");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //récupération des champs du formulaire
    const titleChamp = document.getElementById("title").value;
    const selectCategoriesChamp = document.getElementById("categorie").value;
  //vérification du remplisage des champs
  if (
    titleChamp === "" ||
    selectCategoriesChamp === "" ||
    addImgBtn.files.length === 0
  ) {
    addProject.textContent = "Un des champs est vide.";

  } else {
    //remplisage de forData
    const formData = new FormData();
    formData.append("image", addImgBtn.files[0]);
    formData.append("title", titleChamp);
    formData.append("category", selectCategoriesChamp);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
      Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    //traitement de la réponse
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        console.log(response)
        throw new Error("Erreur lors de l'ajout de l'œuvre");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Réponse de la requête : ", data);
      console.log(data);
      //appel des fonctions d'affichage des works et des works dana la modal
      displayWorkModal(); 
      displayworks();
      filterworks();

      //reset img
      addImgworks.style.display = "flex";
      contentaddworks.style.display = "none";

      //reset title & catégories
      form.reset();

      //message d'ajout de travaux
      const addProject = document.getElementById("addProject");
      addProject.textContent = "Projet ajouté avec succès";

    })
    .catch((error) => {
      console.error(error);
    });
}
});
}

addWork();

//fonction DELETE work
function deleteWorks() {
  //récupère tout les svg icone 
  const trashButton = document.querySelectorAll(".works-modale span");
  trashButton.forEach((spantrash) => {
    spantrash.addEventListener("click", () => {
      const id = spantrash.id
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch("http://localhost:5678/api/works/" + id, options)
        .then((response) => {
          if (!response.ok) {
            // Si la réponse n'est pas OK, on lance une erreur qui sera capturée dans le bloc catch
            throw new Error("Erreur lors de la suppression de l'œuvre");
          }
        })
        .then(() => {
          // Si la suppression réussit, on affiche un message dans la console et met à jour l'affichage
          console.log("Suppression réussie");
      
          displayWorkModal();
          displayworks();
        })
        // Capture des erreurs lors de la requête
        .catch((error) => {
          console.error(error);
        })
    })
  })
}   

deleteWorks();

