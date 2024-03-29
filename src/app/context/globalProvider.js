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
	const [modal, setModal] = useState(false)
	const [collapsed, setCollapsed] = useState(false)
	const theme = themes[selectedTheme]

	const openModal = () => setModal(true)

	const closeModal = () => setModal(false)

	const collapsedMenu = () => setCollapsed(!collapsed)

	const allTasks = async () => {
		setIsLoading(true)

		try {
			const res = await axios.get("/api/tasks")

			const sortedTasks = res.data.sort((a, b) => {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			})

			setTasks(sortedTasks)
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
			await axios.put("/api/tasks", task)

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
				modal,
				openModal,
				closeModal,
				allTasks,
				collapsed,
				collapsedMenu,
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
