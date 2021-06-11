import React from 'react';
import {useHistory} from 'react-router-dom';

import ButtonActions from '../ButtonActions';
import IHeader from '../../interfaces/header';
import IButton from '../../interfaces/button';
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
	const history = useHistory();

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
