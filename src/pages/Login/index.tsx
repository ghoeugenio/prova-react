import React, {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import {fetchGames} from '../../store/Redux/game';
import {
	ContainerMain,
	Main,
	Background,
	HeaderTitle,
	MainTitle,
	FooterTitle,
} from './styles';
import IRoute from '../../interfaces/route';

import LoginAccount from './componentsLogin/LoginAccount';
import ForgetAccount from './componentsLogin/ForgetAccount';
import RegisterAccount from './componentsLogin/RegisterAccount';
import RestoreAccount from './componentsLogin/RestoreAccount';

const Login: React.FunctionComponent<IRoute> = () => {
	const loginScreen = useAppSelector((state) => state.login.loginScreen);
	const dispatchGame = useAppDispatch();

	useEffect(() => {
		dispatchGame(fetchGames());
	}, [dispatchGame]);

	return (
		<ContainerMain>
			<Main>
				<HeaderTitle>
					The
					<br /> Greatest
					<br /> App
				</HeaderTitle>
				<MainTitle>for</MainTitle>
				<FooterTitle>LOTTERY</FooterTitle>
			</Main>
			<Background>
				{loginScreen === 'login' ? (
					<LoginAccount />
				) : loginScreen === 'forget' ? (
					<ForgetAccount />
				) : loginScreen === 'register' ? (
					<RegisterAccount />
				) : (
					<RestoreAccount />
				)}
			</Background>
		</ContainerMain>
	);
};

export default Login;
