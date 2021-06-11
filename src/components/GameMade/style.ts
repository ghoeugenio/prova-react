import styled from 'styled-components';
import {Trash} from '@styled-icons/bootstrap';

interface Istyled {
	onCart: boolean;
	color: string;
}

export const Container = styled.div`
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

export const CartProps = styled.div<Istyled>`
	border-left: 5px solid ${(props: Istyled) => props.color};
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

export const Price = styled.p<Istyled>`
	margin-left: ${(props: Istyled) => props.onCart && '0.5rem'};
	font-family: ${(props: Istyled) => props.onCart && 'Roboto Regular'};
	color: ${(props: Istyled) => (props.onCart ? '#868686' : props.color)};
	opacity: 1;
`;

export const Type = styled.p<Istyled>`
	color: ${(props: Istyled) => props.color};
	padding-bottom: 2rem;
`;

export const DatePrice = styled.div`
	padding-top: 0.5rem;
	margin-left: 0.7rem;
	display: flex;
	p {
		color: #868686;
		font: 1rem;
		font-family: 'Roboto Regular';
	}
`;
