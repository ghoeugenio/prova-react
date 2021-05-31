export default interface IRoute {
	path: string;
	name: string;
	exact: boolean;
	component: React.FC;
	props?: any;
}
