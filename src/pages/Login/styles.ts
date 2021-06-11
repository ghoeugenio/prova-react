import styled from 'styled-components';
interface IPropsLogin {
	isError: boolean;
}

export const ContainerMain = styled.div`
	display: flex;
	margin-top: 5rem;
	@media (max-width: 800px) {
		display: block;
	}
`;

export const Main = styled.div`
	text-align: center;
	color: #707070;
	width: 30%;
	font-family: 'Robotao';
	margin-left: 5rem;
	cursor: default;
	@media (max-width: 800px) {
		margin-left: 0rem;
	}
`;

export const HeaderTitle = styled.p`
	font-size: 4rem;
`;

export const MainTitle = styled.button`
	width: 9rem;
	height: 2.5rem;
	margin-top: 0rem;

	cursor: initial;
	background-color: #b5c401;
	border-color: transparent;
	border-radius: 6.25rem;

	font-size: 1.4rem;
`;

export const FooterTitle = styled.p`
	margin-top: -0.2rem;
	font-size: 5.2rem;
	text-align: center;
`;

export const Background = styled.div`
	width: 22rem;
`;

//modular components

export const Container = styled.div`
	margin-left: 20rem;
	text-align: center;
	padding-top: 5rem;

	@media (max-width: 1050px) {
		margin-left: 10rem;
	}

	@media (max-width: 900px) {
		margin-left: 5rem;
	}
	@media (max-width: 700px) {
		margin-left: 2rem;
	}
`;

export const Title = styled.p`
	font-size: 2.25rem;
	color: #707070;
	width: 22rem;
`;

export const BoxForm = styled.div`
	width: 22rem;

	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 25px #00000014;
	border: 1px solid #dddddd;
	border-radius: 14px;
	opacity: 1;

	button {
		:last-child {
			color: #b5c401;
			margin-bottom: 2.5rem;
		}
	}
`;

export const Input = styled.input<IPropsLogin>`
	background-color: transparent;
	text-align: left;
	padding-left: 2rem;
	letter-spacing: 0px;
	opacity: 1;
	border: none;
	border-bottom: 2px solid
		${(props: IPropsLogin) => (props.isError ? '#ff6961' : '#ebebeb')};

	color: #9d9d9d;
	font: 1rem;

	width: 20rem;
	height: 4rem;

	:focus {
		outline: none;
	}
`;

export const ForgotButton = styled.button`
	border: none;
	color: #c1c1c1;
	cursor: pointer;
	background-color: transparent;

	font-family: 'Roboto Regular';

	margin-top: 1.5rem;
	margin-left: 7rem;
	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;
