import React, {useState, useEffect, Fragment, useReducer} from 'react';
import {useHistory} from 'react-router-dom';
import {
	Container,
	DrawerBet,
	BlockTitle,
	BlockListButtons,
	ItemListButtons,
	TitleButton,
	BlockDescription,
	BlockNumbers,
	NumberInput,
	NumberLabel,
	BlockOptions,
	ButtonsGame,
	ButtonAddToCart,
	IconCart,
	DrawerCart,
	TitleCart,
	ItemCart,
	PriceCart,
	CartUI,
	ButtonSave,
	EmptyCart,
} from './styles';
import Header from '../../components/Header';
import ButtonSelect from '../../components/ButtonSelect';
import GameMade from '../../components/GameMade';
import Modal from '../../components/Modal';
import IRoute from '../../interfaces/route';
import IData from '../../interfaces/data';
import ISelectNumbers from '../../interfaces/selectNumbers';
import IUser from '../../interfaces/users';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import cartReducer from '../../store/Reducer/cartReducer';
import api from '../../services/api';
import loading from '../../assets/loading.gif';

interface INumbers {
	selected: boolean;
	value: number;
	text: string;
}

const Game: React.FunctionComponent<IRoute> = () => {
	const gameData: any = useAppSelector((state) => state.game.game);
	const currentUser: IUser = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const dispatchGame = useAppDispatch();
	const [selectedGame, setSelectedButton] = useState<IData>(gameData[0]);
	const [listNumbers, setListNumbers] = useState<Array<INumbers>>([]);
	const [markNumbers, setMarkNumbers] = useState<number>(0);
	const [priceCart, setPriceCart] = useState<number>(0);
	const [modal, setModal] = useState<boolean>(false);
	const [modalProps, setModalProps] = useState<string>('');
	const token = 'Bearer ' + localStorage.getItem('token');

	const initialReducer = {
		content: [],
	};

	const [cartState, dispatchCart] = useReducer(cartReducer, initialReducer);

	const history = useHistory();

	useEffect(() => {
		var array = [];
		for (var i = 0; i < selectedGame?.range; i++) {
			array.push({
				selected: false,
				value: i + 1,
				text: i < 9 ? '0' + (i + 1) : (i + 1).toString(),
			});
		}
		setListNumbers(array);
		setMarkNumbers(0);
	}, [selectedGame]);

	const onClickHeaderHandler = () => {
		history.push('/home');
		setMarkNumbers(0);
	};

	const markNumberHandler = (number: INumbers) => {
		if (number.selected) {
			number.selected = false;
			setMarkNumbers(markNumbers - 1);
			return;
		}
		if (!number.selected && markNumbers >= selectedGame['max-number']) {
			return;
		}
		number.selected = true;
		setMarkNumbers(markNumbers + 1);
	};

	const completeGameHandler = () => {
		var valueAleatory: number = 0;
		var currentValueSelect: number = markNumbers;
		var auxItems: Array<INumbers> = [...listNumbers];
		if (currentValueSelect === selectedGame['max-number']) {
			setModalProps('A cartela já está completa!');
			setModal(true);
		}
		while (currentValueSelect < selectedGame['max-number']) {
			valueAleatory = Math.ceil(Math.random() * selectedGame.range);
			if (!auxItems[valueAleatory - 1].selected) {
				auxItems[valueAleatory - 1].selected = true;
				currentValueSelect++;
			}
		}
		setListNumbers(auxItems);
		setMarkNumbers(currentValueSelect);
	};

	const clearGameHandler = () => {
		var currentValueSelect: number = markNumbers;
		var auxItems: Array<INumbers> = [...listNumbers];
		var index: number = 0;
		if (currentValueSelect === 0) {
			setModalProps('Nenhum número selecionado!');
			setModal(true);
			return;
		}
		while (index < selectedGame.range) {
			auxItems[index].selected = false;
			index++;
		}
		setMarkNumbers(0);
		setListNumbers(auxItems);
	};

	const addToCartHandler = () => {
		var auxCart: Array<string> = [];
		var index: number = 0;
		var currentValueSelect: number = markNumbers;
		if (currentValueSelect !== selectedGame['max-number']) {
			setModalProps('Selecione a quantidade indicada de números!');
			setModal(true);
			return;
		}
		while (index < selectedGame.range) {
			if (listNumbers[index].selected) {
				auxCart.push(listNumbers[index].text);
			}
			index++;
		}
		clearGameHandler();
		dispatchCart({
			type: 'ADD_GAME',
			payload: {
				game_id: selectedGame.id,
				type: selectedGame.type,
				price: selectedGame.price,
				numbers: auxCart.toString(),
			},
		});
		setPriceCart(priceCart + selectedGame.price);
	};

	const onDeleteHandler = (idGame: number, price: number) => {
		dispatchCart({type: 'REMOVE_GAME', payload: idGame});
		setPriceCart(priceCart - price);
	};

	const saveGameHandler = async () => {
		if (cartState.content.length === 0) {
			setModalProps('Carrinho vazio!');
			setModal(true);
			return;
		}
		if (priceCart < 30) {
			setModalProps('Só é possivel fazer jogos a partir de R$30!');
			setModal(true);
			return;
		}
		setModalProps('loading');
		setModal(true);

		const cartContent = {
			cart: cartState.content,
			totalPrice: priceCart,
		};

		console.log(cartContent);
		try {
			await api.post('games/bet', cartContent, {
				headers: {
					Authorization: token,
				},
			});
			setModalProps('Jogo realizado. Boa Sorte!');
			setPriceCart(0);
			dispatchCart({type: 'CLEAR_GAME'});
			setModal(true);
		} catch (err) {
			setModalProps('Erro ao fazer a bet!');
			setModal(true);
		}
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

	const onCloseModalHandler = () => {
		setModal(false);
	};

	return (
		<Fragment>
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
			<Header
				isActiveButton={true}
				text="Home"
				onClick={onClickHeaderHandler}
			/>
			<Container>
				<DrawerBet>
					<BlockTitle>
						<p>New Bet for</p>
						<p>Megasena</p>
					</BlockTitle>
					<TitleButton>Choose a game</TitleButton>
					<BlockListButtons>
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
									{item.type.replace(/[-]/g, '')}
								</ButtonSelect>
							</ItemListButtons>
						))}
					</BlockListButtons>
					<BlockDescription>
						<p>Fill you bet</p>
						<p>{selectedGame?.description}</p>
					</BlockDescription>
					<BlockNumbers>
						{listNumbers.map((item: INumbers) => (
							<NumberLabel isSelected={item.selected}>
								<NumberInput
									type="checkbox"
									onClick={() =>
										markNumberHandler(item)
									}
								/>
								<p>{item.text}</p>
							</NumberLabel>
						))}
					</BlockNumbers>
					<BlockOptions>
						<ButtonsGame>
							<button onClick={completeGameHandler}>
								Complete game
							</button>
							<button onClick={clearGameHandler}>
								Clear game
							</button>
						</ButtonsGame>
						<ButtonAddToCart>
							<button onClick={addToCartHandler}>
								<IconCart />
								Add to Cart
							</button>
						</ButtonAddToCart>
					</BlockOptions>
				</DrawerBet>
				<DrawerCart>
					<CartUI>
						<TitleCart>cart</TitleCart>
						<ItemCart>
							{cartState.content.length === 0 && (
								<EmptyCart>Empty</EmptyCart>
							)}
							{cartState.content.map(
								(
									item: ISelectNumbers,
									index: number
								) => (
									<GameMade
										game_id={item.game_id}
										type={getType(item.game_id)}
										color={getColor(item.game_id)}
										price={item.price}
										numbers={item.numbers}
										onDelete={() => {
											onDeleteHandler(
												index,
												item.price
											);
										}}
									/>
								)
							)}
						</ItemCart>
						<PriceCart>
							<p>cart</p>
							<p>
								total: R$
								{priceCart
									.toFixed(2)
									.toString()
									.replace(/[.]/, ',')}
							</p>
						</PriceCart>
						<ButtonSave onClick={saveGameHandler}>
							Save
						</ButtonSave>
					</CartUI>
				</DrawerCart>
			</Container>
		</Fragment>
	);
};

export default Game;
