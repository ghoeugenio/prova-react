import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";

import {
	Container,
	Drawer,
	BlockDrawer,
	BlockRecentGames,
	ListButtons,
	Title,
	TitleButton,
	ItemListButtons,
	EmptyList,
} from "./styles";
import ButtonSelect from "../../components/ButtonSelect";
import ButtonActions from "../../components/ButtonActions";

import IRoute from "../../interfaces/route";
import IData from "../../interfaces/data";
import IButton from "../../interfaces/button";
import ISelectNumbers from "../../interfaces/selectNumbers";

import Header from "../../components/Header";
import GameMade from "../../components/GameMade";

const propsButton: IButton = {
	iconSize: "1.25rem",
	fontSize: "1.25rem",
	fontColor: "#B5C401",
};

const Home: React.FunctionComponent<IRoute> = () => {
	const history = useHistory();
	const gameData = useAppSelector((state) => state.game.game);
	const currentUser = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const token: string | null = localStorage.getItem("token");
	const [selectedGame, setSelectedButton] = useState<IData>(gameData[0]);
	const [recentGames, setRecentGames] = useState<Array<ISelectNumbers>>();

	useEffect(() => {
		token !== "4UTH3NT1C4T3D" && history.push("/");
		if (currentUser.id === 0) {
			history.push("/");
			localStorage.clear();
		}
	}, [history, token, currentUser]);

	useEffect(() => {
		setRecentGames(
			currentUser.game.filter(
				(item) => item.type === selectedGame.type
			)
		);
	}, [selectedGame, currentUser]);

	const newBetHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();
		console.log(recentGames);
		history.push("/game");
	};

	return (
		<Container>
			<Header />
			<Drawer>
				<BlockDrawer>
					<Title>Recent Games</Title>
					<TitleButton>Filter</TitleButton>
					<ListButtons>
						{gameData.map((item: IData) => (
							<ItemListButtons key={item.type}>
								<ButtonSelect
									isSelected={
										selectedGame?.type ===
										item.type
									}
									customColor={item.color}
									htmlFor={item.type}
									id={item.type}
									value={item.type}
									checked={
										selectedGame?.type ===
										item.type
									}
									onClick={() =>
										setSelectedButton(item)
									}
								>
									{item.type}
								</ButtonSelect>
							</ItemListButtons>
						))}
					</ListButtons>
				</BlockDrawer>
				<BlockDrawer>
					<ButtonActions
						iconSize={propsButton.iconSize}
						fontSize={propsButton.fontSize}
						fontColor={propsButton.fontColor}
						side={false}
						onClick={newBetHandler}
					>
						New Bet
					</ButtonActions>
				</BlockDrawer>
			</Drawer>
			<BlockRecentGames>
				{recentGames?.length === 0 && (
					<EmptyList>No found games of this type.</EmptyList>
				)}
				{recentGames?.map((item) => (
					<GameMade
						type={item.type}
						color={item.color}
						price={item.price}
						numbers={item.numbers}
						inCart={false}
						date={item.date}
					/>
				))}
			</BlockRecentGames>
		</Container>
	);
};
export default Home;
