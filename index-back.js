const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();
PORT=process.env.PORT

const mailgun = new Mailgun(formData);
const client = mailgun.client({
	username: process.env.mailgun_api,
	key: process.env.mailgun_key,
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/form", async (req, res) => {
	try {

        console.log(req.body);

		const { firstname, lastname, email, subject, message } = req.body;

		const messageData = {
			from: `${firstname} ${lastname} <${email}>`,
			to: process.env.mailto,
			subject: `${subject}`,
			text: `${message}`,
		};

		const response = await client.messages.create(
			process.env.mailgun_sandbox, 
			messageData
		);

		//   Le console.log de req.body nous affiche les données qui ont été rentrées dans les inputs (dans le formulaire frontend) :
		console.log("je suis passée, voici la réponse", response);
		res.status(200).json({ message: "Mail envoyé" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get("/", (req, res) => {
	res.send("server is up");
});

app.listen(PORT, () => {
	console.log("server is listening 🚀 ");
});
