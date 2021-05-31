export default interface ISelectNumbers {
	type: string;
	price: number;
	color: string;
	date?: string;
	numbers: Array<string>;
	onDelete?: Function | void;
	inCart: boolean;
}
