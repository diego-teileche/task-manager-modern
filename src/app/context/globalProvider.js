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

			toast.success("Task deleted")
			allTasks()
		} catch (error) {
			console.log(error)
			toast.error("Something went wrong")
		}
	}

	useEffect(() => {
		allTasks()
	}, [])

	return (
		<GlobalContext.Provider value={{ theme, tasks, deleteTask, isLoading }}>
			<GlobalUpdateContext.Provider value={{}}>
				{children}
			</GlobalUpdateContext.Provider>
		</GlobalContext.Provider>
	)
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)
