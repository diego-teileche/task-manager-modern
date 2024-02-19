"use client"

import Tasks from "../components/tasks/Tasks"
import { useGlobalState } from "../context/globalProvider"

const page = () => {
	const { completedTasks } = useGlobalState()

	return <Tasks title="Completed Tasks" tasks={completedTasks} />
}

export default page
