import {createSlice} from "@reduxjs/toolkit";
//arquivo json - configuracoes de jogo
const gameSlice = createSlice({
	name: "game",
	initialState: {game: []},
	reducers: {
		setGame(state, action) {
			state.game = action.payload;
		},
	},
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
