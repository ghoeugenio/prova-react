import {createSlice} from '@reduxjs/toolkit';
import IUser from '../../interfaces/users';

interface CurrentUser {
	currentUser: IUser;
}

const initialCurrentUserState: CurrentUser = {
	currentUser: {id: 0, name: '', email: ''},
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: initialCurrentUserState,
	reducers: {
		setCurrentUser(state, action) {
			state.currentUser = action.payload;
		},
	},
});

export const currentUserActions = currentUserSlice.actions;

export default currentUserSlice.reducer;
