import styled from 'styled-components';

interface IPropsLogin {
	isError: boolean;
}

export const Container = styled.div`
	height: 100vh;
	flex: 1;
`;

export const Title = styled.p`
	font-size: 1.25rem;
	color: #707070;

	margin-left: 1rem;
	width: 22rem;
`;

export const BoxForm = styled.div`
	width: 100%;
	margin-top: 2rem;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 25px #00000014;
	border: 1px solid #dddddd;
	border-radius: 14px;
	opacity: 1;
`;

export const Input = styled.input`
	background-color: transparent;
	text-align: left;
	padding-left: 2rem;
	letter-spacing: 0px;
	opacity: 1;
	border-radius: 0.5rem;
	border: 2px solid #707070;
	border-bottom: 2px solid
		${(props: IPropsLogin) => (props.isError ? '#ff6961' : '')};

	color: #9d9d9d;
	font: 1rem;

	width: 15rem;
	height: 3rem;

	margin-bottom: 1rem;
	margin-left: 1rem;

	:focus {
		outline: none;
	}
`;

export const Submit = styled.button`
	margin-left: 2rem;
	height: 3.3rem;
	width: 8rem;

	border: 2px solid #707070;
	background-color: #707070;
	border-radius: 0.5rem;
	cursor: pointer;

	color: #fff;
	font: 1rem;

	&:hover {
		opacity: 0.7;
		transition: all 250ms linear;
	}
`;

export const DivInfo = styled.div`
	display: flex;

	p {
		margin-left: 1rem;

		color: #707070;
		font: 1rem;
	}
`;
