"use client"

import { useGlobalState } from "@/app/context/globalProvider"
import { edit, trash } from "@/app/utils/Icons"
import styled from "styled-components"
import formatDate from "../../utils/formatDate"

interface Props {
	id: string
	title: string
	description: string
	date: string
	isCompleted: boolean
}

const TaskItem = ({ id, title, description, date, isCompleted }: Props) => {
	const { theme } = useGlobalState()

	return (
		<TaskItemStyled theme={theme}>
			<h2>{title}</h2>
			<p>{description}</p>
			<p className="date">{formatDate(date)}</p>
			<div className="task-footer">
				{isCompleted ? (
					<button className="completed">Completed</button>
				) : (
					<button className="incompleted">Incompleted</button>
				)}

				<button className="edit">{edit}</button>
				<button className="delete">{trash}</button>
			</div>
		</TaskItemStyled>
	)
}

const TaskItemStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.2rem 1rem;
	border-radius: 1rem;
	background-color: ${(props) => props.theme.borderColor2};
	box-shadow: ${(props) => props.theme.shadow7};
	border: 2px solid ${(props) => props.theme.borderColor2};
	height: 12rem;
	gap: 0.5rem;

	p {
		font-size: 0.7rem;
	}

	.date {
		margin-top: auto;
	}

	> h2 {
		font-size: 1rem;
		font-weight: 600;
	}

	.task-footer {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		button {
			font-size: 0.7rem;
		}
	}

	button {
		border: none;
		outline: none;
		cursor: pointer;

		i {
			font-size: 1rem;
			color: ${(props) => props.theme.colorGrey2};
		}
	}

	.edit {
		margin-left: auto;
	}

	.completed,
	.incompleted {
		display: inline-block;
		padding: 0.3rem 0.7rem;
		background: ${(props) => props.theme.colorDanger};
		border-radius: 30px;
	}

	.completed {
		background: ${(props) => props.theme.colorGreenDark};
	}
`

export default TaskItem
