import {createSlice} from "@reduxjs/toolkit";
import IUserRegister from "../../interfaces/users";

interface CurrentUser {
	currentUser: IUserRegister;
}

const initialCurrentUserState: CurrentUser = {
	currentUser: {id: 0, name: "", password: "", email: "", game: []},
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState: initialCurrentUserState,
	reducers: {
		setCurrentUser(state, action) {
			state.currentUser = action.payload;
		},
	},
});

export const currentUserActions = currentUserSlice.actions;

export default currentUserSlice.reducer;
