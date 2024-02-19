"use client"

import { createContext, useContext, useEffect, useState } from "react"
import themes from "./themes"
import axios from "axios"
import toast from "react-hot-toast"

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
	const [selectedTheme, setSelectedTheme] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [tasks, setTasks] = useState([])
	const theme = themes[selectedTheme]

	const allTasks = async () => {
		setIsLoading(true)

		try {
			const res = await axios.get("/api/tasks")

			setTasks(res.data)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const deleteTask = async (id) => {
		try {
			await axios.delete(`/api/tasks/${id}`)

			allTasks()
			toast.success("Task deleted")
		} catch (error) {
			console.log(error)
			toast.error("Something went wrong")
		}
	}

	const updateTask = async (task) => {
		try {
			const res = await axios.put("/api/tasks", task)

			allTasks()
			toast.success("Task updated")
		} catch (error) {
			console.log("Error updating task", error)
			toast.error("Updating task failed")
		}
	}

	const completedTasks = tasks.filter((task) => task.isCompleted === true)
	const importantTasks = tasks.filter((task) => task.isImportant === true)
	const incompletedTasks = tasks.filter((task) => task.isCompleted === false)

	useEffect(() => {
		allTasks()
	}, [])

	return (
		<GlobalContext.Provider
			value={{
				theme,
				tasks,
				deleteTask,
				isLoading,
				completedTasks,
				importantTasks,
				incompletedTasks,
				updateTask,
			}}
		>
			<GlobalUpdateContext.Provider value={{}}>
				{children}
			</GlobalUpdateContext.Provider>
		</GlobalContext.Provider>
	)
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)
