// Gestion de la modale
require("dotenv").config();

document.addEventListener("DOMContentLoaded", () => {
	//ouverture modale
	document.querySelector(".myBtn-modale").addEventListener("click", () => {
		document.querySelector(".modale").classList.add("display-flex");
	});
	//fermeture modale
	document.querySelector(".close-modale").addEventListener("click", () => {
		document.querySelector(".modale").classList.remove("display-flex");

	});
});

// Gestion de la form

document.addEventListener("DOMContentLoaded", () => {
	console.log("document loaded");
	document.querySelector(".form").addEventListener("submit", async (event) => {
		// console.log("document loaded2");
		// ===> Empêche le comportement par défaut de la soumission d'un formulaire = rafraîchissement de la page
		event.preventDefault();
		// console.log("document loaded3");
		// ===> On récupère les valeurs de chaque input
		const firstname = document.querySelector("#form-prenom").value;
		const lastname = document.querySelector("#form-nom").value;
		const email = document.querySelector("#form-mail").value;
		const subject = document.querySelector("#form-subject").value;
		const message = document.querySelector("#form-message").value;

		console.log("test",{ firstname, lastname, email, subject, message });

		const response = await axios.post(process.env.northlank, {
			firstname,
			lastname,
			email,
			subject,
			message,
		}).catch((error) => {
            console.log("Erreur lors de la requête:", error);
        });
console.log(response.data);
	});
});
