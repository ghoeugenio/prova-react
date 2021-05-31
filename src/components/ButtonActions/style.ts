import styled from "styled-components";
import {East, West} from "@styled-icons/material";
import IButton from "../../interfaces/button";

export const ActionButton = styled.button<IButton>`
	border: none;
	cursor: pointer;
	background-color: transparent;

	width: 11rem;
	margin-top: 2rem;

	font-size: ${(props: IButton) => props.fontSize};
	color: ${(props: IButton) => props.fontColor};

	vertical-align: middle;
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;

export const IconRight = styled(East)<IButton>`
	vertical-align: middle;
	width: ${(props: IButton) => props.iconSize};
	height: ${(props: IButton) => props.iconSize};
	margin: 0rem 0.4rem;
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;

export const IconLeft = styled(West)<IButton>`
	vertical-align: middle;
	width: ${(props: IButton) => props.iconSize};
	height: ${(props: IButton) => props.iconSize};
	margin: 0rem 0.4rem;
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;
