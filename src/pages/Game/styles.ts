import styled from "styled-components";
import {Cart} from "@styled-icons/boxicons-regular";

interface IPropsLabel {
	isSelected: boolean;
}

export const Container = styled.div`
	height: 100vh;
	display: flex;
	@media (max-width: 810px) {
		display: block;
	}
`;

export const DrawerBet = styled.div`
	width: 60%;
	margin-left: 5rem;
	@media (max-width: 900px) {
		margin-left: 0rem;
	}
`;

export const BlockTitle = styled.div`
	display: flex;
	p {
		vertical-align: middle;
		color: #707070;
		text-transform: uppercase;
		opacity: 1;
		display: flex;
		margin-right: 0.2rem;
		&:last-of-type {
			font-family: "Roboto Regular";
		}
	}
`;

export const BlockListButtons = styled.ul`
	display: flex;
	list-style-type: none;
	@media (max-width: 900px) {
		display: block;
	}
`;

export const ItemListButtons = styled.li`
	height: 3rem;
`;

export const TitleButton = styled.p`
	text-align: left;
	color: #868686;
	opacity: 1;
`;

export const BlockDescription = styled.div`
	p {
		color: #868686;
		&:last-child {
			font-family: "Roboto Regular";
		}
	}
`;

export const BlockNumbers = styled.div`
	display: grid;
	list-style-type: none;
	grid-template-columns: repeat(10, 1fr);
	@media (max-width: 1000px) {
		grid-template-columns: repeat(8, 1fr);
	}
	@media (max-width: 800px) {
		grid-template-columns: repeat(5, 1fr);
	}
`;

export const NumberInput = styled.input`
	display: none;
`;

export const NumberLabel = styled.label<IPropsLabel>`
	cursor: pointer;
	border-radius: 100%;
	background-color: ${(props: IPropsLabel) =>
		props.isSelected ? "green" : "#adc0c4"};

	width: 3.5rem;
	height: 3.5rem;

	margin-left: 0.2rem;
	margin-top: 2rem;

	font-family: "Roboto Regular";
	color: #fff;

	text-align: center;
	vertical-align: middle;
	p {
		cursor: pointer;
	}
`;

export const BlockOptions = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: space-between;
`;

export const ButtonsGame = styled.div`
	button {
		width: 10rem;
		height: 3.5rem;

		margin-right: 1.5rem;

		background-color: #fff;
		border: 1px solid #27c383;
		border-radius: 10px;
		opacity: 1;
		cursor: pointer;

		color: #27c383;
		&:hover {
			opacity: 0.7;
			transition: all 250ms linear;
		}
		@media (max-width: 600px) {
			width: 7rem;
		}
	}
`;

export const ButtonAddToCart = styled.div`
	button {
		width: 13rem;
		height: 3.5rem;

		margin-right: 1.5rem;

		background-color: #27c383;
		border: 1px solid #27c383;
		border-radius: 10px;
		opacity: 1;
		cursor: pointer;

		color: #fff;
		&:hover {
			opacity: 0.7;
			transition: all 250ms linear;
		}
		@media (max-width: 600px) {
			width: 9rem;
		}
	}
`;

export const IconCart = styled(Cart)`
	vertical-align: middle;
	width: 1.5rem;
	height: 1.5rem;
	margin: 0rem 0.4rem;
`;

export const DrawerCart = styled.div`
	width: 40%;
	margin-top: 2.5rem;
`;

export const CartUI = styled.div`
	width: 20rem;

	background-color: #fff;
	border: 1px solid #e2e2e2;
	border-radius: 1rem;
	opacity: 1;
`;

export const TitleCart = styled.p`
	margin-left: 1rem;
	text-align: left;
	vertical-align: middle;
	font-size: 1.5rem;
	color: #707070;
	text-transform: uppercase;
	opacity: 1;
`;

export const ItemCart = styled.div``;

export const PriceCart = styled.div`
	display: flex;
	margin-left: 1rem;
	p {
		text-align: center;
		font-size: 1.5rem;
		color: #707070;
		text-transform: uppercase;
		&:last-of-type {
			margin-left: 0.2rem;
			font-family: "Roboto Regular";
		}
	}
`;

export const ButtonSave = styled.button`
	width: 20rem;
	height: 6rem;

	background: #f4f4f4 0% 0% no-repeat padding-box;
	border: 1px solid #e2e2e2;
	opacity: 1;
	font-size: 2rem;
	border-bottom-right-radius: 1rem;
	border-bottom-left-radius: 1rem;

	text-align: center;
	color: #27c383;
	opacity: 1;

	cursor: pointer;

	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;

export const EmptyCart = styled.button`
	width: 20rem;
	font-size: 1rem;
	color: #707070;
	text-transform: uppercase;

	border: none;
	background-color: transparent;
	cursor: default;
`;
