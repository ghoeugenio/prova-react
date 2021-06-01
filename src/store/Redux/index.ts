import {configureStore} from "@reduxjs/toolkit";

import loginReducer from "./login";
import gameReducer from "./game";
import usersReducer from "./users";
import currentUserReducer from "./currentUser";

const store = configureStore({
	reducer: {
		login: loginReducer,
		game: gameReducer,
		users: usersReducer,
		currentUser: currentUserReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
