export default interface IData {
	id: number;
	type: string;
	description: string;
	range: number;
	price: number;
	'max-number': number;
	color: string;
	'min-cart-value': number;
	created_at?: Date;
	updated_at?: Date;
}
