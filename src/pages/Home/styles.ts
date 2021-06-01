import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;
`;

export const Drawer = styled.div`
	justify-content: space-between;
	display: flex;
	@media (max-width: 949px) {
		margin-left: -5rem;
	}
	@media (max-width: 700px) {
		margin-left: 0rem;
	}
`;
export const BlockDrawer = styled.div`
	width: 90rem;
	display: flex;
	margin-left: 5rem;
	:last-of-type {
		width: 10rem;
		margin-left: 0rem;
		margin-right: 3.5rem;
	}
	@media (max-width: 700px) {
		display: block;
	}
`;

export const BlockRecentGames = styled.div`
	margin-left: 5rem;
	@media (max-width: 949px) {
		margin-left: 0rem;
	}
`;

export const Title = styled.p`
	text-align: center;
	letter-spacing: 0px;
	font-size: 1.5rem;
	color: #707070;
	text-transform: uppercase;
	opacity: 1;
`;

export const ListButtons = styled.ul`
	display: flex;
	list-style-type: none;
	justify-content: space-between;
	margin-top: 2rem;
	margin-left: -5rem;
	@media (max-width: 949px) {
		display: block;
	}
`;

export const ItemListButtons = styled.li`
	height: 3rem;
`;

export const TitleButton = styled.p`
	color: #868686;
	margin: 2rem 3rem;
	margin-left: 1rem;
`;

export const EmptyList = styled.button`
	width: 20rem;
	font-size: 1rem;
	color: #868686;

	border: none;
	background-color: transparent;
	cursor: default;
`;
