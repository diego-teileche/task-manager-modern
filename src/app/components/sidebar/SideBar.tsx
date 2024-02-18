"use client"

import styled from "styled-components"
import { useGlobalState } from "@/app/context/globalProvider"
import Image from "next/image"
import menu from "@/app/utils/menu"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { logout } from "@/app/utils/Icons"

const SideBar = () => {
	const { theme } = useGlobalState()

	const router = useRouter()
	const pathname = usePathname()

	const handleClick = (link: string) => {
		router.push(link)
	}

	return (
		<SideBarStyles theme={theme}>
			<div className="profile">
				<div className="profile-overlay"></div>
				<div className="image">
					<Image
						width={70}
						height={70}
						src="/profileMessi.jpeg"
						alt="Messi Profile Photo"
					/>
				</div>
				<h1>
					<span>Lionel</span>
					<span>Messi</span>
				</h1>
			</div>
			<ul className="nav-items">
				{menu.map((item) => {
					return (
						<li
							key={item.id}
							className={`nav-item ${pathname === item.link ? "active" : ""}`}
							onClick={() => handleClick(item.link)}
						>
							{item.icon}
							<Link href={item.link}>{item.title}</Link>
						</li>
					)
				})}
			</ul>
			<button>Logout {logout}</button>
		</SideBarStyles>
	)
}

const SideBarStyles = styled.nav`
	position: relative;
	width: ${(props) => props.theme.sidebarWidth};
	background-color: ${(props) => props.theme.colorBg2};
	border: 2px solid ${(props) => props.theme.borderColor2};
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: ${(props) => props.theme.colorGrey3};

	.profile {
		margin: 1.5rem;
		position: relative;
		padding: 1rem 0.8rem;
		border-radius: 1rem;
		cursor: pointer;
		font-weight: 500;
		color: ${(props) => props.theme.colorGrey0};
		display: flex;
		justify-content: center;
		align-items: center;

		.profile-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			backdrop-filter: blur(10px);
			z-index: 0;
			background: ${(props) => props.theme.colorBg3};
			transition: all 0.5s linear;
			border-radius: 1rem;
			opacity: 0.2;
		}

		h1 {
			font-size: 1.2rem;
			display: flex;
			flex-direction: column;
			line-height: 1.4rem;
		}

		.image,
		h1 {
			position: relative;
			z-index: 1;
		}

		.image {
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			overflow: hidden;
			transition: all 0.5s ease;
			width: 70px;
			height: 70px;

			img {
				width: 100%;
				height: auto;
				display: block;
				border-radius: 50%;
				transform: scale(1.2);
				transition: all 0.5s ease;
			}
		}

		> h1 {
			margin-left: 0.8rem;
			font-size: clamp(1.2rem, 4vw, 1.4rem);
			line-height: 100%;
		}

		&:hover {
			.profile-overlay {
				opacity: 1;
				border: 2px solid ${(props) => props.theme.borderColor2};
			}

			img {
				transform: scale(1.1);
			}
		}
	}

	.nav-item {
		position: relative;
		padding: 0.8rem 1rem 0.8rem 2.1rem;
		margin: 0.3rem 0;
		display: grid;
		grid-template-columns: 40px 1fr;
		cursor: pointer;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 0;
			height: 100%;
			background-color: ${(props) => props.theme.activeNavLinkHover};
			z-index: 1;
			transition: all 0.3s ease-in-out;
		}

		&::before {
			content: "";
			position: absolute;
			top: 0;
			right: 0;
			width: 0%;
			height: 100%;
			background-color: ${(props) => props.theme.colorGreenDark};
			border-bottom-left-radius: 5px;
			border-top-left-radius: 5px;
		}

		a {
			font-weight: 500;
			transition: all 0.3s ease-in-out;
			z-index: 2;
		}

		i {
			display: flex;
			align-items: center;
			color: ${(props) => props.theme.colorIcons};
		}

		&:hover {
			&::after {
				width: 100%;
			}
		}
	}

	.active {
		background-color: ${(props) => props.theme.activeNavLink};

		i,
		a {
			color: ${(props) => props.theme.colorIcons2};
		}
	}

	.active::before {
		width: 0.3rem;
	}

	button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 120px;
		padding: 0.4rem 0.8rem;
		border-radius: 0.8rem;
		font-weight: 500;
		font-size: 1.2rem;
		margin: 1rem 3rem;
		transition: all 0.3s ease;

		&:hover {
			color: ${(props) => props.theme.colorGrey2};
		}
	}
`

export default SideBar
