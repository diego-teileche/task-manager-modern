"use client"

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import styled from "styled-components"
import { useGlobalState } from "@/app/context/globalProvider"
import { plus } from "@/app/utils/Icons"
import Button from "../button/Button"
import Image from "next/image"

const CreateContent = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [date, setDate] = useState("")
	const [completed, setCompleted] = useState(false)
	const [important, setImportant] = useState(false)
	const { theme, allTasks, closeModal } = useGlobalState()

	const handleChange = (name: string) => (e: any) => {
		switch (name) {
			case "title":
				setTitle(e.target.value)
				break
			case "description":
				setDescription(e.target.value)
				break
			case "date":
				setDate(e.target.value)
				break
			case "completed":
				setCompleted(e.target.checked)
				break
			case "important":
				setImportant(e.target.checked)
				break
			default:
				break
		}
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		const task = {
			title,
			description,
			date,
			completed,
			important,
		}

		try {
			const res = await axios.post("/api/tasks", task)

			if (res.data.error) toast.error(res.data.error)

			allTasks()
			closeModal()
			toast.success("Task created succesfully!!")
		} catch (error) {
			toast.error("Something went wrong")
			console.log(error)
		}
	}

	return (
		<CreateContentStyled onSubmit={handleSubmit} theme={theme}>
			<div className="title-image">
				<h1>Create a Task</h1>
				<Image
					width={50}
					height={50}
					src="/task-manager-logo.png"
					alt="Task Manager Logo"
				/>
			</div>
			<div className="input-control">
				<label htmlFor="title" className="label">
					Title
				</label>
				<input
					type="text"
					id="title"
					value={title}
					name="title"
					placeholder="Title"
					onChange={handleChange("title")}
				/>
			</div>

			<div className="input-control">
				<label htmlFor="description" className="label">
					Description
				</label>
				<textarea
					id="description"
					value={description}
					name="description"
					placeholder="Description"
					onChange={handleChange("description")}
					rows={4}
				/>
			</div>

			<div className="input-control">
				<label htmlFor="date" className="label">
					Date
				</label>
				<input
					type="date"
					id="date"
					value={date}
					name="date"
					placeholder="Date"
					onChange={handleChange("date")}
				/>
			</div>

			<div className="input-control toggler">
				<label htmlFor="completed">Completed</label>
				<input
					type="checkbox"
					id="completed"
					value={completed.toString()}
					name="completed"
					placeholder="Completed"
					onChange={handleChange("completed")}
					className="input"
				/>
			</div>

			<div className="input-control toggler">
				<label htmlFor="important">Important</label>
				<input
					type="checkbox"
					id="important"
					value={important.toString()}
					name="important"
					placeholder="Important"
					onChange={handleChange("important")}
					className="input"
				/>
			</div>

			<div className="submit-btn flex justify-end">
				<Button
					type={"submit"}
					name={"Create Task"}
					icon={plus}
					padding="0.6rem 1.2rem"
					borderRad="0.5rem"
					fw="500"
					fs="0.8rem"
					background={theme.colorGreenDark}
				/>
			</div>
		</CreateContentStyled>
	)
}

const CreateContentStyled = styled.form`
	.title-image {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;

		> h1 {
			font-size: clamp(0.8rem, 3vw, 1.2rem);
			font-weight: 600;
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
	}

	color: ${(props) => props.theme.colorGrey1};

	.input-control {
		position: relative;
		margin: 0.8rem 0;
		font-weight: 500;

		label {
			margin-bottom: 0.1rem;
			display: inline-block;
			font-size: clamp(0.6rem, 3vw, 0.9rem);
		}

		.label {
			position: relative;

			&::after {
				content: "";
				position: absolute;
				bottom: -0.05rem;
				left: 0;
				width: 1rem;
				height: 0.1rem;
				background-color: ${(props) => props.theme.colorPrimaryGreen};
				border-radius: 0.5rem;
			}
		}

		span {
			color: ${(props) => props.theme.colorGrey3};
		}

		input,
		textarea {
			width: 100%;
			margin-top: 0.5rem;
			padding: 0.3rem;
			resize: none;
			background-color: ${(props) => props.theme.colorGreyDark};
			color: ${(props) => props.theme.colorGrey2};
			border-radius: 0.5rem;
		}
	}

	.submit-btn button {
		transition: all 0.3s ease;

		i {
			color: ${(props) => props.theme.colorGrey0};
		}

		&:hover {
			background: ${(props) => props.theme.colorPrimaryGreen} !important;
			color: ${(props) => props.theme.colorWhite} !important;
		}
	}

	.toggler {
		display: flex;
		align-items: center;

		.input {
			position: relative;
			margin: 10px;
			width: 80px;
			height: 20px;
			background: #222;
			border-radius: 20px;
			outline: none;
			appearance: none;
			box-shadow: -5px -5px 20px rgba(202, 202, 202, 0.1),
				5px 5px 10px rgba(0, 0, 0, 0.1),
				inset -2px -2px 5px rgba(255, 255, 255, 0.1),
				inset 2px 2px 5px rgba(0, 0, 0, 0.5), 0 0 0 2px #1f1f1f;
			cursor: pointer;
			transition: 0.5s;
		}

		.input:checked {
			background: ${(props) => props.theme.colorGreenDark};
		}

		.input:before {
			content: " ";
			position: absolute;
			top: 0;
			left: 0;
			width: 40px;
			height: 20px;
			background: linear-gradient(to top, #000, #555);
			border-radius: 20px;
			box-shadow: 0 0 0 1px #232323;
			transform: scale(0.98, 0.96);
			z-index: 10;
			transition: 0.5s;
		}

		.input:checked:before {
			left: 40px;
		}

		.input:after {
			content: "on";
			position: absolute;
			top: 50%;
			left: 23%;
			transform: translate(-50%, -50%);
			text-transform: uppercase;
			font-weight: bold;
			font-size: 9px;
			color: transparent;
			background-color: ${(props) => props.theme.colorPrimaryGreen};
			text-shadow: 1px 1px 1px ${(props) => props.theme.colorPrimaryGreen};
			background-clip: text;
			-webkit-background-clip: text;
			-moz-background-clip: text;
			transition: 0.8s;
			display: none;
		}

		.input:checked:after {
			display: inline-flex;
			z-index: 1;
		}
	}
`

export default CreateContent
