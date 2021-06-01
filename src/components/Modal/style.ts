import styled from "styled-components";

export const BackdropUI = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 20;
	background-color: rgba(0, 0, 0, 0.75);
`;

export const ModalUI = styled.div`
	position: fixed;
	width: 30%;
	top: 30%;
	left: 30%;
	background-color: white;
	padding: 1rem;
	border-radius: 14px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	z-index: 30;
	animation: slide-down 300ms ease-out forwards;
	text-align: center;

	p {
		opacity: 1;
		color: #000;
	}

	button {
		width: 3rem;
		height: 1.5rem;
		background-color: #000;
		opacity: 1;
		border: none;
		border-radius: 2rem;
		color: #fff;
	}

	@media (min-width: 768px) {
		width: 40rem;
		left: calc(50% - 20rem);
	}
`;

export const ModalAccount = styled.div`
	position: fixed;
	width: 40%;
	height: 100vh;
	left: 23%;
	background-color: white;
	padding: 1rem;
	border-radius: 14px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	z-index: 30;
	animation: slide-down 300ms ease-out forwards;
	text-align: left;
	overflow: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
	scroll p {
		opacity: 1;
		color: #000;
	}

	button {
		width: 3rem;
		height: 1.5rem;
		background-color: #000;
		opacity: 1;
		border: none;
		border-radius: 2rem;
		color: #fff;
		cursor: pointer;
		&:hover {
			opacity: 0.7;
			transition: all 250ms linear;
		}
	}
	@media (max-width: 800px) {
		width: 50%;
	}
`;
