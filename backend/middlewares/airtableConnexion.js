// récupère les bonnes variables d'env
const dotenv = require("dotenv")
dotenv.config({ path: ".env.local" })

// connexion à Airtable
const Airtable = require("airtable")
const base = new Airtable({
	apiKey: process.env.AIRTABLE_PERSONNAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID)

module.exports = base
