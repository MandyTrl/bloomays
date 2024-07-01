const base = require("../middlewares/airtableConnexion")
const formatDate = require("../utils/formatDate")

const sortMissions = (missions) => {
	let arrivingMissions = {}
	let leavingMissions = {}

	const today = new Date()
	const oneMonthLater = new Date()
	oneMonthLater.setMonth(today.getMonth() + 1)

	missions.forEach((mission) => {
		const beginDate = new Date(mission.beginDate)
		const endDate = new Date(mission.endDate)

		// mission entrantes entre la date actuelle jusqu'à j+1mois
		if (
			formatDate(beginDate) >= formatDate(today) &&
			formatDate(beginDate) <= formatDate(oneMonthLater)
		) {
			const keyBeginDate = formatDate(beginDate)
			if (!arrivingMissions[keyBeginDate]) {
				arrivingMissions[keyBeginDate] = []
			}
			arrivingMissions[keyBeginDate].push(mission)
		}

		// mission sortantes entre la date actuelle jusqu'à j+1mois
		if (
			formatDate(endDate) >= formatDate(today) &&
			formatDate(endDate) <= formatDate(oneMonthLater)
		) {
			const keyEndDate = formatDate(endDate)
			if (!leavingMissions[keyEndDate]) {
				leavingMissions[keyEndDate] = []
			}
			leavingMissions[keyEndDate].push(mission)
		}
	})

	return {
		arriving: arrivingMissions,
		leaving: leavingMissions,
	}
}

const formatMissionData = async (mission) => {
	const bloomerId = mission.bloomer[0]
	const bloomerTable = await base("bloomers").find(bloomerId)

	return {
		firstname: bloomerTable.fields.firstname,
		lastname: bloomerTable.fields.lastname,
		beginMission: mission.beginDate,
		endMission: mission.endDate,
		id: mission.id,
	}
}

const reformatMissions = async (sortedMissions) => {
	let arriving = {}
	let leaving = {}

	// attends que toutes les promesses de formattage soient résolues
	const awaitAllFormated = async (missions) => {
		return await Promise.all(
			missions.map(async (mission) => {
				const formattedMission = await formatMissionData(mission)
				return formattedMission
			})
		)
	}

	// extrait les clés "dates" des missions entrantes et sortantes
	const incomingKeyDate = Object.keys(sortedMissions.arriving)
	const outgoingKeyDate = Object.keys(sortedMissions.leaving)

	// Promise.all permet d'exécuter plusieurs opérations asynchrones en parallèle
	await Promise.all(
		incomingKeyDate.map(async (date) => {
			arriving[date] = await awaitAllFormated(sortedMissions.arriving[date])
		})
	)

	await Promise.all(
		outgoingKeyDate.map(async (date) => {
			leaving[date] = await awaitAllFormated(sortedMissions.leaving[date])
		})
	)

	return { arriving, leaving }
}

async function getArrivingAndLeavingMissions() {
	return new Promise((resolve, reject) => {
		let missions = []

		base("missions")
			.select()
			.eachPage(
				function page(records, fetchNextPage) {
					records.forEach(function (record) {
						missions.push(record.fields) // récupére tous les champs
					})
					fetchNextPage()
				},

				// fonction "done" appellée une fois que toutes les pages soient récupérées
				function done(err) {
					if (err) {
						reject(err)
					} else {
						const sortedMissions = sortMissions(missions)

						const arrivingAndleavingMissionsFormatted =
							reformatMissions(sortedMissions)

						resolve(arrivingAndleavingMissionsFormatted)
					}
				}
			)
	})
}

module.exports = getArrivingAndLeavingMissions
