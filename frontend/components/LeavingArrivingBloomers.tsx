"use client"
import React, { useEffect, useState } from "react"
import { Button } from "./Button"
import { FlowBloomays, Modal } from "./Modal"

export const LeavingArrivingBloomers = () => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const [missions, setMissions] = useState<FlowBloomays | null>(null)

	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!

	const fetchMissions = async () => {
		try {
			const response = await fetch(`${backendUrl}missions`)
			if (!response.ok) {
				throw new Error("Network response was not ok")
			}
			const data = await response.json()
			setMissions(data)
		} catch (error) {
			console.error("Error fetching missions:", error)
		}
	}

	const handleClick = () => {
		setIsShow((prevState: boolean) => !prevState)
		fetchMissions()
	}

	return (
		<div>
			<Button title="Flux des bloomers" onClick={handleClick} />
			<Modal isShow={isShow} onClick={handleClick} missions={missions} />
		</div>
	)
}
