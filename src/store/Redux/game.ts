import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchGames = createAsyncThunk('games/fetch', async () => {
	const response = await api.get('game');
	return await response.data;
});

const InitialStateGames = {game: [], status: '', error: false};

const gameSlice = createSlice({
	name: 'game',
	initialState: InitialStateGames,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGames.pending, (state, {payload}) => {
			state.status = 'loading';
			state.error = false;
		});
		builder.addCase(fetchGames.fulfilled, (state, {payload}) => {
			state.game = payload;
			state.status = 'complete';
		});
		builder.addCase(fetchGames.rejected, (state, {payload}) => {
			if (!payload) {
				state.error = true;
			}
			state.status = 'complete';
		});
	},
});

export default gameSlice.reducer;
