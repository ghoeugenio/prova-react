import styled from 'styled-components';
import {East} from '@styled-icons/material';

export const Container = styled.header`
	height: 4.3rem;
	text-align: center;
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid #ebebeb;

	div {
		&:last-of-type {
			width: 20rem;
		}
	}

	@media (max-width: 600px) {
		margin-left: -5rem;
	}
`;

export const Logo = styled.button`
	font-size: 2.5rem;
	letter-spacing: 0px;
	color: #707070;
	opacity: 1;

	border: none;
	background-color: transparent;
	border-bottom: 5px solid #b5c401;

	margin-left: 0rem;
	margin-top: 1rem;
	@media (max-width: 600px) {
		margin-left: 1rem;
	}
`;

export const DrawerHeader = styled.div`
	width: 16rem;
	margin-right: 0rem;
`;

export const ButtonHeader = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;

	margin-top: 2rem;

	font-size: 1.25rem;
	color: #707070;

	vertical-align: middle;
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;

export const SelScreen = styled.button`
	border: none;
	background-color: transparent;
	color: #707070;
	opacity: 1;
	cursor: pointer;

	margin-top: 2rem;
	padding-left: 2rem;
	position: absolute;

	font-size: 1.25rem;
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
	@media (max-width: 600px) {
		padding-left: 0rem;
	}
`;

export const IconRightHeader = styled(East)`
	vertical-align: middle;
	width: 1.25rem;
	height: 1.25rem;
	margin-left: 0.2rem;
`;
