"use client"

import styled from "styled-components"

interface Props {
	children: React.ReactNode
}

const GlobalStyleProvider = ({ children }: Props) => {
	return <GlobalStyles>{children}</GlobalStyles>
}

const GlobalStyles = styled.div`
	padding: 2.5rem;
	display: flex;
	gap: 2.5rem;
	height: 100%;
	transition: all 0.3s ease;

	@media screen and (max-width: 768px) {
		padding: 1rem;
		gap: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
	}
`

export default GlobalStyleProvider
