import styled from "styled-components";
import IStyled from "../../interfaces/styled";

export const LabelRadioButton = styled.label<IStyled>`
	border: 2px solid ${(props: IStyled) => props.customColor};
	background-color: ${(props: IStyled) =>
		props.isSelected ? props.customColor : "#fff"};
	border-radius: 6.25rem;
	cursor: pointer;

	padding: 0.2rem 1.5rem;
	margin: 0.5rem 0.5rem;

	color: ${(props: IStyled) =>
		props.isSelected ? "#fff" : props.customColor};
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;

export const InputRadioButton = styled.input`
	display: none;
`;
