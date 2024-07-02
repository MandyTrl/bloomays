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
		<div className="mb-3">
			<p>
				<span
					className={clsx(
						!isArriving ? "text-green-600" : "text-red-600",
						"underline underline-offset-2 text-lg mr-1"
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
									<p className="puce w-2 h-2 bg-slate-400 rounded-full mr-4"></p>
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
													? "border-l border-l-slate-400"
													: "border-none",
												"text-xs text-slate-400 pl-4 ml-1 py-2 my-1"
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
		</div>
	)
}
