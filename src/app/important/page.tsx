"use client"

import Tasks from "../components/tasks/Tasks"
import { useGlobalState } from "../context/globalProvider"

const page = () => {
	const { importantTasks } = useGlobalState()

	return <Tasks title="Important Tasks" tasks={importantTasks} />
}

export default page
