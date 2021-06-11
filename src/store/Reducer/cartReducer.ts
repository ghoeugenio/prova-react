import ISelectNumbers from '../../interfaces/selectNumbers';

type ICartState = {
	content: Array<ISelectNumbers>;
};

type ICartActions = {
	type: 'ADD_GAME' | 'REMOVE_GAME' | 'CLEAR_GAME';
	payload?: ISelectNumbers | number;
};

const cartReducer = (state: ICartState, action: ICartActions): any => {
	switch (action.type) {
		case 'ADD_GAME':
			return {content: [...state.content, action.payload]};
		case 'REMOVE_GAME': {
			return {
				content: state.content.filter((item, index) => {
					return index !== action.payload && item;
				}),
			};
		}
		case 'CLEAR_GAME':
			return {content: []};
		default:
			return state.content;
	}
};

export default cartReducer;
