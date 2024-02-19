"use client"

import Tasks from "../components/tasks/Tasks"
import { useGlobalState } from "../context/globalProvider"

const page = () => {
	const { incompletedTasks } = useGlobalState()

	return <Tasks title="Incompleted Tasks" tasks={incompletedTasks} />
}

export default page
