import clsx from "clsx"
import { List } from "./List"
import { Button } from "./Button"
import { Loading } from "../Loading"

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
	isLoading: boolean
}

export const Modal = ({ isShow, onClick, missions, isLoading }: ModalProps) => {
	// récupère le nombre de clées d'un objet
	const getNumberOfKeys = (obj: LeavingArriving | null): number => {
		if (!obj) {
			return 0
		}
		return Object.keys(obj).length
	}

	const bloomersArriving = getNumberOfKeys(missions && missions.arriving)
	const bloomersLeaving = getNumberOfKeys(missions && missions.leaving)

	const bloomersArrivingTitle =
		bloomersArriving == 1 ? "Bloomer entrant" : "Bloomers entrants"

	const bloomersLeavingTitle =
		bloomersLeaving == 1 ? "Bloomer sortant" : "Bloomers sortants"

	return (
		<div
			className={clsx(
				isShow ? "opacity-100" : "opacity-0",
				"w-full flex items-center justify-center transition delay-100 ease-in-out"
			)}>
			{isLoading ? (
				<Loading />
			) : (
				<div className="w-5/6 md:w-1/5 h-fit px-6 py-4 mb-4 flex flex-col items-center rounded bg-white shadow-xl">
					<Button onClick={onClick} iconUrl="/assets/close.png" />

					{bloomersArriving !== 0 && missions ? (
						<List
							title={bloomersArrivingTitle}
							missions={missions && missions.arriving}
							numberOfItems={bloomersArriving}
						/>
					) : (
						<p className="my-3">
							<span className="text-green-600">↝</span> Aucun bloomer{" "}
							<span className="text-green-600 underline underline-offset-2">
								entrant
							</span>{" "}
							sur cette période
						</p>
					)}

					{bloomersLeaving !== 0 && missions ? (
						<List
							title={bloomersLeavingTitle}
							missions={missions && missions.leaving}
							numberOfItems={bloomersLeaving}
							isArriving
						/>
					) : (
						<p className="mt-3">
							<span className="text-red-600">↝</span> Aucun bloomer{" "}
							<span className="text-red-600 underline underline-offset-2">
								sortant
							</span>{" "}
							sur cette période
						</p>
					)}
				</div>
			)}
		</div>
	)
}
