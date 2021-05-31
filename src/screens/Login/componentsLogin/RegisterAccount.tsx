import React, {useState, useEffect, useMemo, useCallback} from "react";

import ButtonActions from "../../../components/ButtonActions";
import Modal from "../../../components/Modal";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {loginActions} from "../../../store/login";
import {usersActions} from "../../../store/users";
import {Container, Title, BoxForm, Input} from "../styles";
import IButton from "../../../interfaces/button";
import IUserRegister from "../../../interfaces/users";

const propsButton: IButton = {
	iconSize: "1.5rem",
	fontSize: "2rem",
	fontColor: "#707070",
};

const generateID = (): number => {
	return +(Math.random() * 10000000).toFixed(0);
};

const RegisterAccount: React.FC = () => {
	const dispatch = useAppDispatch();
	const existingUser: Array<IUserRegister> = useAppSelector(
		(state) => state.users.users
	);

	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [id, setId] = useState<number>(generateID());
	const [modal, setModal] = useState<boolean>(false);
	const [modalProps, setModalProps] = useState<string>("");
	const [nameError, setNameError] = useState<boolean>(false);
	const [emailError, setEmailError] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<boolean>(false);

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
	}, [name, email, password, regexEmail, regexName, regexPassword]);

	const backHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();

		dispatch(loginActions.setLogin());
	};

	const submitHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (
			!email.match(regexEmail) ||
			!password.match(regexPassword) ||
			!name.match(regexName)
		) {
			setModalProps("Insira dados válidos!");
			setModal(true);
			return;
		}

		var aux: IUserRegister = {
			id: id,
			name: name,
			email: email,
			password: password,
			game: [],
		};
		if (existingUser.find((item) => item.email === email)) {
			setModalProps("O email já está cadastrado!");
			setModal(true);
			return;
		}
		setEmail("");
		setName("");
		setPassword("");
		setId(generateID());
		dispatch(usersActions.setNewUser(aux));
		setModalProps("Usuário cadastrado com sucesso!");
		setModal(true);
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

	const onCloseModalHandler = () => {
		setModal(false);
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
					placeholder='Name'
					value={name}
					onChange={nameInputHandler}
					type='text'
					isError={nameError}
				/>
				<Input
					placeholder='Email'
					value={email}
					onChange={emailInputHandler}
					type='email'
					isError={emailError}
				/>
				<Input
					placeholder='Password'
					value={password}
					onChange={passwordInputHandler}
					type='password'
					isError={passwordError}
				/>
				<ButtonActions
					type='submit'
					iconSize={propsButton.iconSize}
					fontSize={propsButton.fontSize}
					fontColor={propsButton.fontColor}
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
				side={true}
				onClick={backHandler}
			>
				Back
			</ButtonActions>
		</Container>
	);
};

export default RegisterAccount;
