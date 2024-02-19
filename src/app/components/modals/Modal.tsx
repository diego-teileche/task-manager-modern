"use client"

import { useGlobalState } from "@/app/context/globalProvider"
import styled from "styled-components"

interface Props {
	content: React.ReactNode
}

const Modal = ({ content }: Props) => {
	const { closeModal, theme } = useGlobalState()

	return (
		<ModalStyled theme={theme}>
			<div className="modal-overlay" onClick={closeModal}></div>
			<div className="modal-content">{content}</div>
		</ModalStyled>
	)
}

const ModalStyled = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;

	.modal-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.65);
		filter: blur(20px);
	}

	.modal-content {
		padding: 2rem;
		position: relative;
		max-width: 450px;
		width: 100%;
		z-index: 100;
		background-color: ${(props) => props.theme.colorBg2};
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
		border-radius: 1rem;
	}
`

export default Modal
