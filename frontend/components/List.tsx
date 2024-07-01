import clsx from "clsx"
import { LeavingArriving, Mission } from "./Modal"

type ListProps = {
	title: string
	missions: LeavingArriving
	numberOfItems: number
	isArriving?: boolean
}

export const List = ({
	title,
	missions,
	numberOfItems,
	isArriving,
}: ListProps) => {
	return (
		<>
			<p className="mt-3">
				<span
					className={clsx(
						!isArriving ? "text-green-600" : "text-red-600",
						"underline underline-offset-2"
					)}>
					{numberOfItems}
				</span>{" "}
				{title}
			</p>

			<ul className="mt-3">
				{Object.keys(missions).map((date) => (
					<li key={date}>
						<div>
							<div className="flex items-center justify-start">
								<p className="puce w-2 h-2 bg-slate-300 rounded-full mr-4"></p>
								<p className="text-green-600">{date}</p>
							</div>

							{missions[date].map((mission: Mission) => (
								<p
									key={mission.id}
									className="text-xs text-slate-300 border-l border-l-slate-300 pl-4 ml-1 my-2">
									{mission.firstname} {mission.lastname}
								</p>
							))}
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
