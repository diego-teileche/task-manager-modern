"use client"

import styled from "styled-components"
import { useGlobalState } from "../../context/globalProvider"
import TaskItem from "../taskItem/TaskItem"
// import CreateContent from "../CreateContent"

interface Props {
	title: string
	tasks: any[]
}

const Tasks = ({ title, tasks }: Props) => {
	const { theme } = useGlobalState()

	return (
		<TaskStyled theme={theme}>
			<h1>{title}</h1>
			<div className="tasks grid">
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						title={task.title}
						description={task.description}
						date={task.date}
						isCompleted={task.completed}
						id={task.id}
					/>
				))}
			</div>
		</TaskStyled>
	)
}

const TaskStyled = styled.main`
	width: 100%;
	height: 100%;
	padding: 2rem;
	background-color: ${(props) => props.theme.colorBg2};
	border: 2px solid ${(props) => props.theme.borderColor2};
	border-radius: 1rem;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 0.5rem;
	}
`

export default Tasks
