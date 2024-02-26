// Récupération des éléments du DOM
const Form = document.querySelector("Form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// connexion de l'utilisateur
function getusers ()  {
  Form.addEventListener("submit", (event) => {
    event.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;
  
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if( response.ok) {
        window.location.href = "../index.html";
      }else{  
        const errorForm = document.getElementById("errorForm")
        errorForm.textContent = "les informations utilisateur / mot de passe ne sont pas correctes"
      }
      return response.json();
    })

    .then((data) => {
      localStorage.setItem("token", data.token);
    })
    .catch((error) => {
      console.error(error);
    });
});
}
getusers()

