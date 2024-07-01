"use client"
import React, { useEffect, useState } from "react"
import { Button } from "./Button"
import { FlowBloomays, Modal } from "./Modal"

export const LeavingArrivingBloomers = () => {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!

	const [isShow, setIsShow] = useState<boolean>(false)
	const [missions, setMissions] = useState<FlowBloomays | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchMissions = async () => {
		setIsLoading(true)

		try {
			const response = await fetch(`${backendUrl}missions`)
			if (!response.ok) {
				throw new Error("Network response was not ok")
			}
			const data = await response.json()
			setMissions(data)
		} catch (error) {
			console.error("Error fetching missions:", error)
		} finally {
			setIsLoading(false)
		}
	}
	const handleClick = () => {
		setIsShow((prevState: boolean) => !prevState)
		!isShow && setMissions(null)
	}

	useEffect(() => {
		if (isShow) {
			fetchMissions()
		}
	}, [isShow])

	return (
		<div className="w-full flex items-center justify-center relative">
			<Button title="Flux des bloomers" onClick={handleClick} />

			<Modal
				isShow={isShow}
				onClick={handleClick}
				missions={missions}
				isLoading={isLoading}
			/>
		</div>
	)
}
