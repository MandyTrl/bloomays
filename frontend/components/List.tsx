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
			<p className="mb-2">
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
				{Object.keys(missions).map((date, index: number) => {
					const isLastItem = index === numberOfItems - 1

					return (
						<li key={date}>
							<div>
								<div className="flex items-center justify-start">
									<p className="puce w-2 h-2 bg-slate-300 rounded-full mr-4"></p>
									<p
										className={clsx(
											!isArriving ? "text-green-600" : "text-red-600"
										)}>
										{date}
									</p>
								</div>

								{missions[date].map((mission: Mission, index: number) => {
									return (
										<p
											key={mission.id}
											className={clsx(
												!isLastItem
													? "border-l border-l-slate-300"
													: "border-none",
												"text-xs text-slate-300 pl-4 ml-1 py-2 my-1"
											)}>
											{mission.firstname} {mission.lastname}
										</p>
									)
								})}
							</div>
						</li>
					)
				})}
			</ul>
		</>
	)
}
