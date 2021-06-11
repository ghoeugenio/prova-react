import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Home from './pages/Home';
import RestorePassword from './components/RestorePassword/RestorePassword';
import User from './pages/User';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/home" component={Home} />
				<Route path="/bet" component={Game} />
				<Route path="/user" component={User} />
				<Route
					path="/redirect/:token"
					component={RestorePassword}
				/>
			</Switch>
		</BrowserRouter>
	);
}
