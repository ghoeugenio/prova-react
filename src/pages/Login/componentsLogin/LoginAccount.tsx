import React, {useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import ButtonActions from '../../../components/ButtonActions';
import Modal from '../../../components/Modal';
import {useAppDispatch} from '../../../hooks/hooks';
import {loginActions} from '../../../store/Redux/login';
import {currentUserActions} from '../../../store/Redux/currentUser';
import {Container, Title, BoxForm, Input, ForgotButton} from '../styles';
import IButton from '../../../interfaces/button';
import IUser from '../../../interfaces/users';
import api from '../../../services/api';

const propsButton: IButton = {
	iconSize: '1.5rem',
	fontSize: '2rem',
	fontColor: '#707070',
	widthButton: '22rem',
};

const LoginAccount: React.FC = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [modalProps, setModalProps] = useState<string>('');
	const [modal, setModal] = useState<boolean>(false);

	const history = useHistory();
	const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
	const regexPassword = /^([a-zA-Z0-9]{8,})$/;

	const forgetHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();
		dispatch(loginActions.setForget());
	};

	const registerHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();
		dispatch(loginActions.setRegister());
	};

	const submitHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!email.match(regexEmail) || !password.match(regexPassword)) {
			setModalProps('Insira dados válidos!');
			setModal(true);
			return;
		}
		try {
			await api
				.post('sessions', {email: email, password: password})
				.then((response) => {
					localStorage.setItem(
						'token',
						response.data.token.token
					);
					const currentUser: IUser = {
						id: response.data.user.id,
						name: response.data.user.name,
						email: response.data.user.email,
					};
					dispatch(
						currentUserActions.setCurrentUser(currentUser)
					);
					history.push('/home');
				});
		} catch (err) {
			setModalProps('Usuário ou senha incorretos!');
			setModal(true);
		}
	};

	const emailInputHandler = useCallback(
		(event: React.FormEvent<HTMLInputElement>) => {
			setEmail(event.currentTarget.value);
		},
		[]
	);

	const passwordInputHandler = useCallback(
		(event: React.FormEvent<HTMLInputElement>) => {
			setPassword(event.currentTarget.value);
		},
		[]
	);

	const onCloseModal = () => {
		setModal(false);
	};

	return (
		<Container>
			{modal && (
				<Modal onClose={onCloseModal}>
					<p>{modalProps}</p>
					<button onClick={onCloseModal}>OK</button>
				</Modal>
			)}
			<Title>Authentication</Title>
			<BoxForm>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={emailInputHandler}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={passwordInputHandler}
				/>
				<ForgotButton type="button" onClick={forgetHandler}>
					I forgot my password
				</ForgotButton>
				<ButtonActions
					type="submit"
					iconSize={propsButton.iconSize}
					fontSize={propsButton.fontSize}
					fontColor={propsButton.fontColor}
					widthButton={propsButton.widthButton}
					side={false}
					onClick={submitHandler}
				>
					Login
				</ButtonActions>
			</BoxForm>
			<ButtonActions
				iconSize={propsButton.iconSize}
				fontSize={propsButton.fontSize}
				fontColor={propsButton.fontColor}
				widthButton={'22rem'}
				side={false}
				onClick={registerHandler}
			>
				Sign Up
			</ButtonActions>
		</Container>
	);
};

export default LoginAccount;
