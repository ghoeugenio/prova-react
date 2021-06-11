import {configureStore} from '@reduxjs/toolkit';

import loginReducer from './login';
import gameReducer from './game';
import currentUserReducer from './currentUser';
import tokenReducer from './token';

const store = configureStore({
	reducer: {
		login: loginReducer,
		game: gameReducer,
		currentUser: currentUserReducer,
		token: tokenReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
