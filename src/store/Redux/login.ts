import {createSlice} from "@reduxjs/toolkit";

const initialLogin = {loginScreen: "login"};

const loginSlice = createSlice({
	name: "login",
	initialState: initialLogin,
	reducers: {
		setLogin(state) {
			state.loginScreen = "login";
		},
		setRegister(state) {
			state.loginScreen = "register";
		},
		setForget(state) {
			state.loginScreen = "forget";
		},
	},
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
