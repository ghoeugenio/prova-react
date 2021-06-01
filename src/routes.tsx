import {BrowserRouter, Switch, Route} from "react-router-dom";

import Login from "./pages/Login";
import Game from "./pages/Game";
import Home from "./pages/Home";

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
