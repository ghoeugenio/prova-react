import React, {useState, useCallback} from "react";

import ButtonActions from "../../../components/ButtonActions";
import Modal from "../../../components/Modal";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {loginActions} from "../../../store/Redux/login";
import IButton from "../../../interfaces/button";
import IUserRegister from "../../../interfaces/users";

import {Container, Title, BoxForm, Input} from "../styles";

const propsButton: IButton = {
	iconSize: "1.5rem",
	fontSize: "2rem",
	fontColor: "#707070",
	widthButton: "22rem",
};

const ForgetAccount: React.FC = () => {
	const [modal, setModal] = useState<boolean>(false);
	const [modalProps, setModalProps] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;

	const users: Array<IUserRegister> = useAppSelector(
		(state) => state.users.users
	);
	const dispatch = useAppDispatch();

	const backHandler = (event: React.SyntheticEvent): void => {
		event.preventDefault();

		dispatch(loginActions.setLogin());
	};

	const emailInputHandler = useCallback(
		(event: React.FormEvent<HTMLInputElement>) => {
			setEmail(event.currentTarget.value);
		},
		[]
	);

	const sendLinkHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (!email.match(regexEmail)) {
			setModalProps("Insira dados válidos!");
			setModal(true);
			return;
		}

		var flag: boolean = false;
		users.forEach((item) => {
			if (item.email === email) {
				setModalProps(`Sua senha é: ${item.password}`);
				setModal(true);
				flag = true;
			}
		});
		if (!flag) {
			setModalProps(`Usuário não existe`);
			setModal(true);
		}
	};

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
			<Title>Reset password</Title>
			<BoxForm>
				<Input
					placeholder='Email'
					value={email}
					onChange={emailInputHandler}
					type='email'
				/>
				<ButtonActions
					type='submit'
					iconSize={propsButton.iconSize}
					fontSize={propsButton.fontSize}
					fontColor={propsButton.fontColor}
					widthButton={propsButton.widthButton}
					side={false}
					onClick={sendLinkHandler}
				>
					Send Link
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

export default ForgetAccount;
