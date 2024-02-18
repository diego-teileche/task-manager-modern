import prisma from "@/app/utils/connect"
import { NextResponse } from "next/server"

export const DELETE = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	try {
		const { id } = params

		const task = await prisma.task.delete({
			where: { id },
		})

		return NextResponse.json(task)
	} catch (error) {
		console.log("Error deleting task:", error)
		return NextResponse.json({ error: "Error deleting task", status: 500 })
	}
}
