import { Dispatch, SetStateAction } from "react"

type ButtonProps = {
	title: string
	onClick: () => void
}

export const Button = ({ title, onClick }: ButtonProps) => {
	return (
		<button
			className="bg-primary py-3 px-6 rounded-full text-white font-bold"
			onClick={onClick}>
			{title}
		</button>
	)
}
