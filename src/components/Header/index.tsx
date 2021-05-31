import React, {useState} from "react";
import {useHistory} from "react-router-dom";

import ButtonActions from "../ButtonActions";
import Modal from "../Modal";
import GameMade from "../GameMade";
import IHeader from "../../interfaces/header";
import IButton from "../../interfaces/button";
import {useAppSelector} from "../../hooks/hooks";
import {
	Container,
	Logo,
	ButtonHeader,
	DrawerHeader,
	SelScreen,
	EmptyGames,
} from "./style";

const propsButton: IButton = {
	iconSize: "1.25rem",
	fontSize: "1.25rem",
	fontColor: "#707070",
};

const Header: React.FunctionComponent<IHeader> = ({
	isActiveButton,
	text,
	onClick,
}) => {
	const currentUser = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const [modal, setModal] = useState<boolean>(false);
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

	return (
		<Container>
			{modal && (
				<Modal onClose={onCloseModalHandler} typeModal={true}>
					<p>{`Usuário: ${currentUser.name}`}</p>
					<p>{`E-mail: ${currentUser.email}`}</p>
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
