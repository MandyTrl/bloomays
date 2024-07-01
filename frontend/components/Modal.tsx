import clsx from "clsx"
import { List } from "./List"
import { Button } from "./Button"

export type Mission = {
	firstname: string
	lastname: string
	beginMission: string
	endMission: string
	id: number
}

export type LeavingArriving = {
	[date: string]: Mission[]
}

export type FlowBloomays = {
	arriving: LeavingArriving
	leaving: LeavingArriving
}

type ModalProps = {
	isShow: boolean
	onClick: () => void
	missions: FlowBloomays | null
}

export const Modal = ({ isShow, onClick, missions }: ModalProps) => {
	// récupère le nombre de clées d'un objet
	const getNumberOfKeys = (obj: LeavingArriving | null): number => {
		if (!obj) {
			return 0
		}
		return Object.keys(obj).length
	}

	const bloomersArriving = getNumberOfKeys(missions && missions.arriving)
	const bloomersLeaving = getNumberOfKeys(missions && missions.leaving)

	return (
		<div
			className={clsx(
				isShow ? "opacity-100" : "opacity-0",
				"transition delay-100 ease-in-out shadow-xl z-30 absolute top-0 left-0 translate-x-1/2 translate-y-1/2 py-3 px-6 rounded bg-white"
			)}>
			<button onClick={onClick}>x</button>

			{bloomersArriving && missions ? (
				<List
					title="Bloomer(s) entrant(s)"
					missions={missions && missions.arriving}
					numberOfItems={bloomersArriving}
				/>
			) : (
				<p className="mt-3">
					<span className="text-green-600 underline underline-offset-2">0</span>{" "}
					Bloomers entrants
				</p>
			)}

			{bloomersLeaving && missions ? (
				<List
					title="Bloomer(s) sortant(s)"
					missions={missions && missions.leaving}
					numberOfItems={bloomersLeaving}
					isArriving
				/>
			) : (
				<p className="mt-3">
					<span className="text-green-600 underline underline-offset-2">0</span>{" "}
					Bloomers sortants
				</p>
			)}
		</div>
	)
}
