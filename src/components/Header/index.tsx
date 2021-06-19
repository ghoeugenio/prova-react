import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import ButtonActions from '../ButtonActions';
import IHeader from '../../interfaces/header';
import IButton from '../../interfaces/button';
import IUser from '../../interfaces/users';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import {currentUserActions} from '../../store/Redux/currentUser';
import {fetchGames} from '../../store/Redux/game';
import api from '../../services/api';
import {Container, Logo, ButtonHeader, DrawerHeader, SelScreen} from './style';

const propsButton: IButton = {
	iconSize: '1.25rem',
	fontSize: '1.25rem',
	fontColor: '#707070',
	widthButton: '5rem',
};

const Header: React.FunctionComponent<IHeader> = ({
	isActiveButton,
	text,
	onClick,
}) => {
	const gameData: any = useAppSelector((state) => state.game.game);
	const currentUser: IUser = useAppSelector(
		(state) => state.currentUser.currentUser
	);
	const dispatch = useAppDispatch();
	const token = 'Bearer ' + localStorage.getItem('token');
	const history = useHistory();

	useEffect(() => {
		!localStorage.getItem('token') && history.push('/');
		if (currentUser.id === 0) {
			try {
				api.get('users', {
					headers: {
						Authorization: token,
					},
				}).then((response) => {
					console.log(response.data);
					const user: IUser = {
						id: response.data.id,
						name: response.data.name,
						email: response.data.email,
					};
					dispatch(currentUserActions.setCurrentUser(user));
				});
			} catch (err) {
				history.push('/');
				localStorage.clear();
			}
		}
		if (gameData.length < 1) {
			try {
				dispatch(fetchGames());
			} catch (err) {
				history.push('/');
				localStorage.clear();
			}
		}
	}, [currentUser, dispatch, gameData, history, token]);

	const logoutHandler = () => {
		localStorage.clear();
		history.push('/');
	};

	const accountHandler = () => {
		history.push('/user');
	};

	return (
		<Container>
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
