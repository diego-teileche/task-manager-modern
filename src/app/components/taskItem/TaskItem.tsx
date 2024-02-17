"use client"

import { edit, trash } from "@/app/utils/Icons"

interface Props {
	id: string
	title: string
	description: string
	date: string
	isCompleted: boolean
}

const TaskItem = ({ id, title, description, date, isCompleted }: Props) => {
	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			<p className="date">{date}</p>
			<div className="task-footer">
				{isCompleted ? (
					<button className="completed">Completed</button>
				) : (
					<button className="incompleted">Incompleted</button>
				)}

				<button className="edit">{edit}</button>
				<button className="delete">{trash}</button>
			</div>
		</div>
	)
}

export default TaskItem
