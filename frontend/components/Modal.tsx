import clsx from "clsx"
import { List } from "./List"
import { Button } from "./Button"
import { Loading } from "./Loading"

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
				"w-5/6 md:w-1/5 flex flex-col items-center transition delay-100 ease-in-out shadow-xl z-30 absolute bottom-[130%] md:right-1/2 right-[45%] transform translate-x-1/2 rounded bg-white border border-primary/10"
			)}>
			{!isLoading && <Button onClick={onClick} iconUrl="/assets/close.png" />}

			{isLoading ? (
				<Loading />
			) : (
				<div className="px-8 py-4">
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
