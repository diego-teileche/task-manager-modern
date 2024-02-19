"use client"

import { useGlobalState } from "@/app/context/globalProvider"
import styled from "styled-components"

interface Props {
	icon?: React.ReactNode
	name?: string
	background?: string
	padding?: string
	borderRad?: string
	fw?: string
	fs?: string
	click?: () => void
	type?: "submit" | "button" | undefined
	border?: string
}

const Button = ({
	icon,
	name,
	background,
	padding,
	borderRad,
	fw,
	fs,
	click,
	type,
	border,
}: Props) => {
	const { theme } = useGlobalState()

	return (
		<ButtonStyled
			type={type}
			theme={theme}
			style={{
				background: background,
				padding: padding || "0.5rem 1rem",
				borderRadius: borderRad || "0.5rem",
				fontWeight: fw || "500",
				fontSize: fs,
				border: border || "none",
			}}
			onClick={click}
		>
			{icon && icon}
			{name}
		</ButtonStyled>
	)
}

const ButtonStyled = styled.button`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.colorWhite};
	z-index: 5;
	cursor: pointer;

	i {
		margin-right: 0.5rem;
		color: ${(props) => props.theme.colorGrey0};
		font-size: 0.8rem;
	}
`

export default Button
