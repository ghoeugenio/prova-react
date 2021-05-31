import {BrowserRouter, Switch, Route} from "react-router-dom";

import Login from "./screens/Login";
import Game from "./screens/Game";
import Home from "./screens/Home";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/home' component={Home} />
				<Route path='/game' component={Game} />
			</Switch>
		</BrowserRouter>
	);
}
