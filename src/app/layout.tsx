import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import SideBar from "./components/sidebar/SideBar"
import GlobalStyleProvider from "./providers/GlobalStyleProvider"
import ContextProvider from "./providers/ContextProvider"
import NextTopLoader from "nextjs-toploader"

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
	title: "Task Manager",
	description: "The most Modern Task Manager",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
					integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</head>
			<body className={nunito.className}>
				<NextTopLoader
					height={2}
					color="#27ae60"
					easing="cubic-bezier(0.53, 0.21, 0, 1)"
				/>
				<ContextProvider>
					<GlobalStyleProvider>
						<SideBar />
						<div className="w-full">{children}</div>
					</GlobalStyleProvider>
				</ContextProvider>
			</body>
		</html>
	)
}
