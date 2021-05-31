import styled from "styled-components";
import ISelectNumbers from "../../interfaces/selectNumbers";
import {Trash} from "@styled-icons/bootstrap";

export const Container = styled.div<ISelectNumbers>`
	display: flex;
	padding-bottom: 2rem;
`;

export const ButtonDelete = styled.button`
	width: 20%;

	cursor: pointer;
	background-color: transparent;
	border: none;
	vertical-align: middle;
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;

export const IconTrash = styled(Trash)`
	width: 1.5rem;
	height: 1.5rem;
	color: #888888;
`;

export const CartProps = styled.div<ISelectNumbers>`
	border-left: 5px solid ${(props: ISelectNumbers) => props.color};
	border-radius: 0.2rem;
	width: 80%;

	div {
		min-height: 2rem;
		max-height: 3rem;
		margin-top: -1rem;
	}
`;

export const Numbers = styled.div`
	margin-left: 0.7rem;

	p {
		color: #868686;
		font-size: 1rem;
	}
`;

export const PriceType = styled.div`
	display: flex;
	margin-left: 0.7rem;
`;

export const Price = styled.p<ISelectNumbers>`
	margin-left: ${(props: ISelectNumbers) => props.inCart && "0.5rem"};
	font-family: ${(props: ISelectNumbers) =>
		props.inCart && "Roboto Regular"};
	color: ${(props: ISelectNumbers) =>
		props.inCart ? "#868686" : props.color};
	opacity: 1;
`;

export const Type = styled.p<ISelectNumbers>`
	color: ${(props: ISelectNumbers) => props.color};
	padding-bottom: 2rem;
`;

export const DatePrice = styled.div`
	margin-left: 0.7rem;
	display: flex;
	p {
		color: #868686;
		font: 1rem;
		font-family: "Roboto Regular";
	}
`;
