import React, {useState, useEffect, useMemo, useCallback} from 'react';

import ButtonActions from '../../../components/ButtonActions';
import Modal from '../../../components/Modal';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {loginActions} from '../../../store/Redux/login';
import {Container, Title, BoxForm, Input} from '../styles';
import IButton from '../../../interfaces/button';
import loading from '../../../assets/loading.gif';
import api from '../../../services/api/index';

interface IRestorePassword {
	token: string;
	password: string;
	password_confirmation: string;
}

const propsButton: IButton = {
	iconSize: '1.5rem',
	fontSize: '2rem',
	fontColor: '#707070',
	widthButton: '22rem',
};

const RestoreAccount: React.FC = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector((state) => state.token.token);

	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [modal, setModal] = useState<boolean>(false);
	const [modalProps, setModalProps] = useState<string>('');
	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [passwordConfirmError, setPasswordConfirmError] =
		useState<boolean>(false);

	const regexPassword = useMemo(() => /^([a-zA-Z0-9]{8,})$/, []);

	useEffect(() => {
		password.match(regexPassword) || password.length === 0
			? setPasswordError(false)
			: setPasswordError(true);
		passwordConfirm === password || passwordConfirm.length === 0
			? setPasswordConfirmError(false)
			: setPasswordConfirmError(true);
	}, [password, passwordConfirm, regexPassword]);

	const backHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();

		dispatch(loginActions.setLogin());
	};

	const submitHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		setModalProps('loading');
		setModal(true);

		if (!password.match(regexPassword) || passwordConfirm !== password) {
			setModalProps('Insira dados válidos!');
			setModal(true);
			return;
		}

		try {
			var newPassword: IRestorePassword = {
				token: token,
				password: password,
				password_confirmation: passwordConfirm,
			};

			await api.put('password', newPassword);

			setModalProps('Nova senha definida!');
			setModal(true);
		} catch (err) {
			setModalProps('Email não cadstrado!');
			setModal(true);
		}
	};

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
		(modalProps === 'Usuário cadastrado com sucesso!' ||
			modalProps === 'Nova senha definida!') &&
			dispatch(loginActions.setLogin());
	};

	return (
		<Container>
			{modal &&
				(modalProps === 'loading' ? (
					<Modal onClose={onCloseModalHandler}>
						<img src={loading} alt="loading..." />
					</Modal>
				) : (
					<Modal onClose={onCloseModalHandler}>
						<p>{modalProps}</p>
						<button onClick={onCloseModalHandler}>OK</button>
					</Modal>
				))}
			<Title>Restore password</Title>
			<BoxForm>
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
					Save Password
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

export default RestoreAccount;
