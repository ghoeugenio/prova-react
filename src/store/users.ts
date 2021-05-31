import {createSlice} from "@reduxjs/toolkit";
import IUserRegister from "../interfaces/users";

interface Users {
	users: IUserRegister[];
}

const userSlice = createSlice({
	name: "users",
	initialState: {users: []},
	reducers: {
		setNewUser(state: Users, action) {
			state.users.push(action.payload);
		},
		setNewGame(state: Users, action) {
			var currentUserIndex = state.users.findIndex(
				(item) => item.id === action.payload.id
			);
			state.users[currentUserIndex].game = state.users[
				currentUserIndex
			].game.concat(action.payload.data);
		},
	},
});

export const usersActions = userSlice.actions;

export default userSlice.reducer;
