import Image from "next/image"
import { LeavingArrivingBloomers } from "@/components/LeavingArrivingBloomers"

export default function Home() {
	return (
		<main className="w-full flex min-h-screen flex-col items-center justify-around md:justify-start p-4">
			<Image
				src="/assets/full-logo.png"
				alt="Bloomays Logo"
				width={300}
				height={0}
				priority
				className="md:self-start md:mb-[28%]"
			/>

			<LeavingArrivingBloomers />
		</main>
	)
}
