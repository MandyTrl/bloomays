import Image from "next/image"
import { LeavingArrivingBloomers } from "@/components/LeavingArrivingBloomers"

export default function Home() {
	return (
		<main className="w-full max-h-screen h-full flex-col items-center justify-around p-4 md:p-16 relative">
			<Image
				src="/assets/full-logo.png"
				alt="Bloomays Logo"
				width={300}
				height={0}
				priority
				className="md:self-start hover:-rotate-3 hover:scale-105 transition-all duration-150 ease-in-out"
			/>

			<LeavingArrivingBloomers />
		</main>
	)
}
