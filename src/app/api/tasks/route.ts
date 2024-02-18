import prisma from "@/app/utils/connect"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	try {
		const { title, description, date, completed, important } = await req.json()

		if (!title || !description || !date)
			return NextResponse.json({
				error: "Missing required fields",
				status: 500,
			})

		if (title.length < 3)
			return NextResponse.json({
				error: "Title must be at least 3 characters long",
				status: 400,
			})

		const task = await prisma.task.create({
			data: {
				title,
				description,
				date,
				isCompleted: completed,
				isImportant: important,
			},
		})

		return NextResponse.json(task)
	} catch (error) {
		console.log("Error Creating Task:", error)
		return NextResponse.json({ error: "Error creating task", status: 500 })
	}
}

export async function GET(req: Request) {
	try {
		const tasks = await prisma.task.findMany({})

		return NextResponse.json(tasks)
	} catch (error) {
		console.log("Error Getting Task:", error)
		return NextResponse.json({ error: "Error getting task", status: 500 })
	}
}

export async function PUT(req: Request) {
	try {
	} catch (error) {
		console.log("Error Updating Task:", error)
		return NextResponse.json({ error: "Error updating task", status: 500 })
	}
}
