import clsx from "clsx"
import Image from "next/image"

type ButtonProps = {
	title?: string
	onClick: () => void
	iconUrl?: string
}

export const Button = ({ title, onClick, iconUrl }: ButtonProps) => {
	return (
		<button
			className={clsx(
				title
					? "bg-primary py-3 px-6 rounded-full text-white font-bold hover:bg-secondary hover:scale-105"
					: "self-end mb-3 mt-2 mx-1 hover:scale-90",
				"w-fit transition-all duration-150 ease-in-out"
			)}
			onClick={onClick}>
			{iconUrl ? (
				<Image alt="" src={iconUrl} width={12} height={0} />
			) : (
				<span>{title}</span>
			)}
		</button>
	)
}
