"use client"

import styled from "styled-components"
import { useGlobalState } from "../../context/globalProvider"
import TaskItem from "../taskItem/TaskItem"
import { plus } from "@/app/utils/Icons"
import Modal from "../modals/Modal"
import CreateContent from "../modals/CreateContent"

interface Props {
	title: string
	tasks: any[]
}

const Tasks = ({ title, tasks }: Props) => {
	const { theme, openModal, modal } = useGlobalState()

	return (
		<TaskStyled theme={theme}>
			{modal && <Modal content={<CreateContent />} />}
			<h1>{title}</h1>
			<div className="tasks grid">
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						title={task.title}
						description={task.description}
						date={task.date}
						isCompleted={task.isCompleted}
						id={task.id}
					/>
				))}

				<button className="create-task" onClick={openModal}>
					{plus} Add New Task
				</button>
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

	.tasks {
		margin: 2rem 0;
	}

	> h1 {
		font-size: clamp(1.5rem, 2vw, 2rem);
		font-weight: 800;
		position: relative;

		&::after {
			content: "";
			position: absolute;
			bottom: -0.05rem;
			left: 0;
			width: 3rem;
			height: 0.2rem;
			background-color: ${(props) => props.theme.colorPrimaryGreen};
			border-radius: 0.5rem;
		}
	}

	.create-task {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		height: 12rem;
		color: ${(props) => props.theme.colorGrey2};
		font-weight: 600;
		cursor: pointer;
		border-radius: 1rem;
		border: 3px dashed ${(props) => props.theme.colorGrey5};
		transition: all 0.3s ease;

		&:hover {
			background-color: ${(props) => props.theme.colorGrey5};
			color: ${(props) => props.theme.colorGrey1};
		}
	}
`

export default Tasks
