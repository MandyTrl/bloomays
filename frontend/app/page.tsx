import Image from "next/image"
import { LeavingArrivingBloomers } from "@/components/LeavingArrivingBloomers"

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-around p-4">
			<Image
				src="/assets/full-logo.png"
				alt="Bloomays Logo"
				width={300}
				height={0}
				priority
			/>

			<LeavingArrivingBloomers />
		</main>
	)
}
