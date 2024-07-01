const express = require("express")
const router = express.Router()
const getArrivingAndLeavingMissions = require("../middlewares/missions")

router.get("/", async function (req, res, next) {
	try {
		const missions = await getArrivingAndLeavingMissions()
		res.json(missions)
	} catch (err) {
		console.error(err)
		res.status(500).send("Error retrieving missions")
	}
})

module.exports = router
