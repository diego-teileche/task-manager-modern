import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Task Manager | Completed Tasks",
	description: "Completed tasks of the most Modern Task Manager",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
