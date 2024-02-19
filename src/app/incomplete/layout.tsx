import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Task Manager | Incompleted Tasks",
	description: "Incomplited tasks of the most Modern Task Manager",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
