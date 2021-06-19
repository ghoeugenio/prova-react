import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import api from '../../services/api';
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
} from './styles';
import ButtonSelect from '../../components/ButtonSelect';
import ButtonActions from '../../components/ButtonActions';

import IRoute from '../../interfaces/route';
import IData from '../../interfaces/data';
import IButton from '../../interfaces/button';
import formateDate from '../../utils/formateDate';
import Header from '../../components/Header';
import GameMade from '../../components/GameMade';

const propsButton: IButton = {
	iconSize: '1.25rem',
	fontSize: '1.25rem',
	fontColor: '#B5C401',
	widthButton: '11rem',
};

interface IBets {
	id: number;
	game_id: number;
	user_id: number;
	price: number;
	numbers: string;
	created_at: Date;
	updated_at: Date;
}

const Home: React.FunctionComponent<IRoute> = () => {
	const history = useHistory();
	const gameData: any = useAppSelector((state) => state.game.game);
	const currentUser = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const token = 'Bearer ' + localStorage.getItem('token');
	const [selectedGame, setSelectedButton] = useState<IData>(gameData[0]);
	const [recentBets, setRecentBets] = useState<Array<IBets>>();

	useEffect(() => {
		try {
			api.get('games/bet/all', {
				headers: {
					Authorization: token,
				},
			}).then((response) => {
				setRecentBets(response.data);
			});
		} catch (err) {
			return;
		}
	}, [selectedGame, currentUser, token]);

	const newBetHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();
		history.push('/bet');
	};

	const getColor = (id: number): string => {
		const index = gameData.findIndex((item: any) => {
			return item.id === id;
		});

		return gameData[index].color;
	};

	const getType = (id: number): string => {
		const index = gameData.findIndex((item: any) => {
			return item.id === id;
		});

		return gameData[index].type;
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
										selectedGame?.id === item.id
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
									{item.type.replace(/[-]/g, '')}
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
						widthButton={propsButton.widthButton}
						side={false}
						onClick={newBetHandler}
					>
						New Bet
					</ButtonActions>
				</BlockDrawer>
			</Drawer>
			{selectedGame ? (
				<BlockRecentGames>
					{recentBets?.length === 0 ||
						(!recentBets && (
							<EmptyList>
								No found Bets of this type.
							</EmptyList>
						))}
					{recentBets?.map(
						(item) =>
							item.game_id === selectedGame.id && (
								<GameMade
									game_id={item.game_id}
									type={getType(item.game_id)}
									color={getColor(item.game_id)}
									price={item.price}
									numbers={item.numbers}
									date={formateDate(item.created_at)}
								/>
							)
					)}
				</BlockRecentGames>
			) : null}
		</Container>
	);
};
export default Home;
