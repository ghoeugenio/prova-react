import ISelectNumbers from "./selectNumbers";
export default interface IUserRegister {
	id: number;
	name: string | undefined;
	email: string | undefined;
	password: string | undefined;
	game: Array<ISelectNumbers>;
}
