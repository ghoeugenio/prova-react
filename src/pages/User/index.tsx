import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {currentUserActions} from '../../store/Redux/currentUser';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import api from '../../services/api';

import {Container, Title, Input, BoxForm, Submit, DivInfo} from './styles';

const User: React.FunctionComponent = () => {
	const currentUser = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const dispatchUser = useAppDispatch();
	const history = useHistory();
	const token = 'Bearer ' + localStorage.getItem('token');
	const [modal, setModal] = useState<boolean>(false);
	const [modalProps, setModalProps] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
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

	useEffect(() => {
		api.get('users/', {headers: {Authorization: token}}).then(
			(response) => {
				const user = {
					id: response.data.id,
					name: response.data.name,
					email: response.data.email,
				};
				dispatchUser(currentUserActions.setCurrentUser(user));
			}
		);
	}, [dispatchUser, token, modal]);

	const changeNameHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!name.match(regexName)) {
			setModalProps('Nome inválido!');
			setModal(true);
			return;
		}

		try {
			await api.put(
				'/users',
				{name: name},
				{headers: {Authorization: token}}
			);
			setModalProps('Nome alterado com sucesso!');
			setModal(true);
			setName('');
		} catch (err) {
			setModalProps('Erro ao alterar nome!');
			setModal(true);
		}
	};

	const changeEmailHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!email.match(regexEmail)) {
			setModalProps('Email inválido!');
			setModal(true);
			return;
		}

		try {
			await api.put(
				'/users',
				{email: email},
				{headers: {Authorization: token}}
			);
			setModalProps('Email alterado com sucesso!');
			setModal(true);
			setEmail('');
		} catch (err) {
			setModalProps('Erro ao alterar email!');
			setModal(true);
		}
	};

	const changePasswordHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!password.match(regexPassword)) {
			setModalProps('Senha inválida!');
			setModal(true);
			return;
		}

		if (password !== passwordConfirm) {
			setModalProps('As senhas não correspodem!');
			setModal(true);
			return;
		}

		try {
			await api.put(
				'/users',
				{password: password},
				{headers: {Authorization: token}}
			);
			setModalProps('Senha alterada com sucesso!');
			setModal(true);
			setPassword('');
			setPasswordConfirm('');
		} catch (err) {
			setModalProps('Erro ao alterar senha!');
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

	const onClickHeaderHandler = () => {
		history.push('/home');
	};

	const onCloseModal = () => {
		setModal(false);
	};

	return (
		<Container>
			<Header
				isActiveButton={true}
				text="Home"
				onClick={onClickHeaderHandler}
			/>
			{modal && (
				<Modal onClose={onCloseModal}>
					<p>{modalProps}</p>
					<button onClick={onCloseModal}>OK</button>
				</Modal>
			)}
			<BoxForm>
				<DivInfo>
					<p>Nome:</p>
					<p>{currentUser.name}</p>
				</DivInfo>

				<DivInfo>
					<p>Email:</p>
					<p>{currentUser.email}</p>
				</DivInfo>
			</BoxForm>
			<BoxForm>
				<Title>Alterar nome</Title>
				<Input
					placeholder="Name"
					value={name}
					onChange={nameInputHandler}
					type="text"
					isError={nameError}
				/>
				<Submit onClick={changeNameHandler}>Alterar</Submit>
			</BoxForm>
			<BoxForm>
				<Title>Alterar email</Title>
				<Input
					placeholder="Email"
					value={email}
					onChange={emailInputHandler}
					type="email"
					isError={emailError}
				/>
				<Submit onClick={changeEmailHandler}>Alterar</Submit>
			</BoxForm>
			<BoxForm>
				<Title>Alterar senha</Title>
				<Input
					placeholder="Nova senha"
					value={password}
					onChange={passwordInputHandler}
					type="password"
					isError={passwordError}
				/>
				<Input
					placeholder="Repita a senha"
					value={passwordConfirm}
					onChange={passwordConfirmInputHandler}
					type="password"
					isError={passwordConfirmError}
				/>
				<Submit onClick={changePasswordHandler}>Alterar</Submit>
			</BoxForm>
		</Container>
	);
};

export default User;
