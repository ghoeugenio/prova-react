import React, {useState, useCallback, useMemo} from "react";
import {useHistory} from "react-router-dom";

import ButtonActions from "../ButtonActions";
import Modal from "../Modal";
import GameMade from "../GameMade";
import IHeader from "../../interfaces/header";
import IButton from "../../interfaces/button";
import IUserRegister from "../../interfaces/users";
import {usersActions} from "../../store/Redux/users";
import {useAppSelector, useAppDispatch} from "../../hooks/hooks";
import {
	Container,
	Logo,
	ButtonHeader,
	DrawerHeader,
	SelScreen,
	EmptyGames,
	AccountEdit,
} from "./style";

const propsButton: IButton = {
	iconSize: "1.25rem",
	fontSize: "1.25rem",
	fontColor: "#707070",
	widthButton: "5rem",
};

const Header: React.FunctionComponent<IHeader> = ({
	isActiveButton,
	text,
	onClick,
}) => {
	const currentUser = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const users: Array<IUserRegister> = useAppSelector(
		(state) => state.users.users
	);
	const dispatchNewData = useAppDispatch();
	const [modal, setModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const regexName = useMemo(() => /^([a-zA-Z0-9]{2,})/, []);
	const regexEmail = useMemo(
		() => /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i,
		[]
	);
	const regexPassword = useMemo(() => /^([a-zA-Z0-9]{8,})$/, []);

	const history = useHistory();

	const logoutHandler = () => {
		localStorage.clear();
		history.push("/");
	};

	const accountHandler = () => {
		setModal(true);
	};

	const onCloseModalHandler = () => {
		setModal(false);
	};

	const changeNameHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!name.match(regexName)) {
			return alert("Nome inválido");
		}
		users.forEach((item: IUserRegister) => {
			if (item.id === currentUser.id) {
				dispatchNewData(
					usersActions.setNewName({data: name, id: item.id})
				);
				setName("");
				alert("Alteração feita com sucesso");
			}
		});
	};

	const changeEmailHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!email.match(regexEmail)) {
			return alert("Email inválido");
		}
		users.forEach((item: IUserRegister) => {
			if (item.id === currentUser.id) {
				dispatchNewData(
					usersActions.setNewEmail({data: email, id: item.id})
				);
				setEmail("");
				alert("Alteração feita com sucesso");
			}
		});
	};

	const changePasswordHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!password.match(regexPassword)) {
			return alert("Password inválido");
		}
		users.forEach((item: IUserRegister) => {
			if (item.id === currentUser.id) {
				dispatchNewData(
					usersActions.setNewPassword({
						data: password,
						id: item.id,
					})
				);
				setPassword("");
				alert("Alteração feita com sucesso");
			}
		});
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

	return (
		<Container>
			{modal && (
				<Modal onClose={onCloseModalHandler} typeModal={true}>
					<AccountEdit>
						<form onSubmit={changeNameHandler}>
							<p>Alterar nome</p>
							<input
								placeholder='Name'
								value={name}
								onChange={nameInputHandler}
								type='text'
							/>
							<button type='submit'>Salvar</button>
						</form>
					</AccountEdit>
					<AccountEdit>
						<form onSubmit={changeEmailHandler}>
							<p>Alterar e-mail</p>
							<input
								placeholder='Email'
								value={email}
								onChange={emailInputHandler}
								type='email'
							/>
							<button type='submit'>Salvar</button>
						</form>
					</AccountEdit>
					<AccountEdit>
						<form onSubmit={changePasswordHandler}>
							<p>Alterar senha</p>
							<input
								placeholder='Password'
								value={password}
								onChange={passwordInputHandler}
								type='password'
							/>
							<button type='submit'>Salvar</button>
						</form>
					</AccountEdit>

					<p>Todos os jogos:</p>
					{currentUser.game.length === 0 && (
						<EmptyGames>No registered games.</EmptyGames>
					)}
					{currentUser.game.map((item) => (
						<GameMade
							type={item.type}
							color={item.color}
							price={item.price}
							numbers={item.numbers}
							inCart={false}
							date={item.date}
						/>
					))}
				</Modal>
			)}
			<DrawerHeader>
				<Logo>TGL</Logo>
				{isActiveButton && (
					<SelScreen onClick={onClick}>{text}</SelScreen>
				)}
			</DrawerHeader>
			<DrawerHeader>
				<ButtonHeader onClick={accountHandler}>
					Account
				</ButtonHeader>
				<ButtonActions
					iconSize={propsButton.iconSize}
					fontSize={propsButton.fontSize}
					fontColor={propsButton.fontColor}
					widthButton={propsButton.widthButton}
					side={false}
					onClick={logoutHandler}
				>
					Sair
				</ButtonActions>
			</DrawerHeader>
		</Container>
	);
};

export default Header;
