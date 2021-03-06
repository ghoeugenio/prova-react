import React, {useState, useEffect, useMemo, useCallback} from 'react';

import ButtonActions from '../../../components/ButtonActions';
import Modal from '../../../components/Modal';
import {useAppDispatch} from '../../../hooks/hooks';
import {loginActions} from '../../../store/Redux/login';
import {Container, Title, BoxForm, Input} from '../styles';
import IButton from '../../../interfaces/button';
import api from '../../../services/api/index';

interface IUserRegister {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const propsButton: IButton = {
	iconSize: '1.5rem',
	fontSize: '2rem',
	fontColor: '#707070',
	widthButton: '22rem',
};

const RegisterAccount: React.FC = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [modal, setModal] = useState<boolean>(false);
	const [modalProps, setModalProps] = useState<string>('');
	const [nameError, setNameError] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [passwordConfirmError, setPasswordConfirmError] =
		useState<boolean>(false);

	const regexName = useMemo(() => /^([a-zA-Z0-9]{2,})/, []);
	const regexEmail = useMemo(
		() => /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i,
		[]
	);
	const regexPassword = useMemo(() => /^([a-zA-Z0-9]{8,})$/, []);

	useEffect(() => {
		name.match(regexName) || name.length === 0
			? setNameError(false)
			: setNameError(true);
		email.match(regexEmail) || email.length === 0
			? setEmailError(false)
			: setEmailError(true);
		password.match(regexPassword) || password.length === 0
			? setPasswordError(false)
			: setPasswordError(true);
		passwordConfirm === password || passwordConfirm.length === 0
			? setPasswordConfirmError(false)
			: setPasswordConfirmError(true);
	}, [
		name,
		email,
		password,
		passwordConfirm,
		regexEmail,
		regexName,
		regexPassword,
	]);

	const backHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();

		dispatch(loginActions.setLogin());
	};

	const submitHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (
			!email.match(regexEmail) ||
			!password.match(regexPassword) ||
			!name.match(regexName) ||
			passwordConfirm !== password
		) {
			setModalProps('Insira dados v??lidos!');
			setModal(true);
			return;
		}

		try {
			var user: IUserRegister = {
				name: name,
				email: email,
				password: password,
				password_confirmation: passwordConfirm,
			};

			await api.post('users', user);

			setModalProps('Usu??rio cadastrado com sucesso!');
			setModal(true);
		} catch (err) {
			setModalProps('O usu??rio j?? existe!');
			setModal(true);
		}
	};

	const nameInputHandler = useCallback(
		(event: React.FormEvent<HTMLInputElement>) => {
			setName(event.currentTarget.value);
		},
		[]
	);

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

	const passwordConfirmInputHandler = useCallback(
		(event: React.FormEvent<HTMLInputElement>) => {
			setPasswordConfirm(event.currentTarget.value);
		},
		[]
	);

	const onCloseModalHandler = () => {
		setModal(false);
		modalProps === 'Usu??rio cadastrado com sucesso!' &&
			dispatch(loginActions.setLogin());
	};

	return (
		<Container>
			{modal && (
				<Modal onClose={onCloseModalHandler}>
					<p>{modalProps}</p>
					<button onClick={onCloseModalHandler}>OK</button>
				</Modal>
			)}
			<Title>Registration</Title>
			<BoxForm>
				<Input
					placeholder="Name"
					value={name}
					onChange={nameInputHandler}
					type="text"
					isError={nameError}
				/>
				<Input
					placeholder="Email"
					value={email}
					onChange={emailInputHandler}
					type="email"
					isError={emailError}
				/>
				<Input
					placeholder="Password"
					value={password}
					onChange={passwordInputHandler}
					type="password"
					isError={passwordError}
				/>
				<Input
					placeholder="Confirm password"
					value={passwordConfirm}
					onChange={passwordConfirmInputHandler}
					type="password"
					isError={passwordConfirmError}
				/>
				<ButtonActions
					type="submit"
					iconSize={propsButton.iconSize}
					fontSize={propsButton.fontSize}
					fontColor={propsButton.fontColor}
					widthButton={propsButton.widthButton}
					side={false}
					onClick={submitHandler}
				>
					Register
				</ButtonActions>
			</BoxForm>
			<ButtonActions
				iconSize={propsButton.iconSize}
				fontSize={propsButton.fontSize}
				fontColor={propsButton.fontColor}
				widthButton={propsButton.widthButton}
				side={true}
				onClick={backHandler}
			>
				Back
			</ButtonActions>
		</Container>
	);
};

export default RegisterAccount;
