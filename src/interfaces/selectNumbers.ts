export default interface ISelectNumbers {
	game_id: number;
	type?: string;
	price: number;
	color?: string;
	date?: Date | string | number;
	numbers: string;
	onDelete?: Function | void;
}
