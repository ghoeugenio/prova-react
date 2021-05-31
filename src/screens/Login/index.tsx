import React, {Fragment, useEffect} from "react";
import {useAppSelector, useAppDispatch} from "../../hooks/hooks";
import {gameActions} from "../../store/game";
import api from "../../api";
import {Main, HeaderTitle, MainTitle, FooterTitle} from "./styles";
import IRoute from "../../interfaces/route";

import LoginAccount from "./componentsLogin/LoginAccount";
import ForgetAccount from "./componentsLogin/ForgetAccount";
import RegisterAccount from "./componentsLogin/RegisterAccount";

const Login: React.FunctionComponent<IRoute> = () => {
	const loginScreen = useAppSelector((state) => state.login.loginScreen);
	const dispatchGame = useAppDispatch();

	useEffect(() => {
		api.then((response) => {
			dispatchGame(gameActions.setGame(response.data.types));
		}).catch((err) => {
			console.log(err);
		});
	}, [dispatchGame]);

	return (
		<Fragment>
			{loginScreen === "login" ? (
				<LoginAccount />
			) : loginScreen === "forget" ? (
				<ForgetAccount />
			) : (
				<RegisterAccount />
			)}

			<Main>
				<HeaderTitle>
					The
					<br /> Greatest
					<br /> App
				</HeaderTitle>
				<MainTitle>for</MainTitle>
				<FooterTitle>LOTTERY</FooterTitle>
			</Main>
		</Fragment>
	);
};

export default Login;
