import React from "react";
import ISelectNumbers from "../../interfaces/selectNumbers";
import {
	Container,
	ButtonDelete,
	IconTrash,
	CartProps,
	Numbers,
	PriceType,
	Price,
	Type,
	DatePrice,
} from "./style";

const GameMade: React.FunctionComponent<ISelectNumbers> = ({
	type,
	price,
	color,
	numbers,
	onDelete,
	inCart,
	date,
}) => {
	return (
		<Container>
			{inCart && (
				<ButtonDelete onClick={onDelete}>
					<IconTrash />
				</ButtonDelete>
			)}
			<CartProps color={color}>
				<Numbers>
					<p>{numbers.join(", ")}</p>
				</Numbers>
				{!inCart && (
					<DatePrice>
						<Type color={color}>
							{date}
							{" - "}
						</Type>
						<Price color={color} inCart={inCart}>
							{"- "}
							R$:{" "}
							{price
								.toFixed(2)
								.toString()
								.replace(/[.]/, ",")}
						</Price>
					</DatePrice>
				)}
				<PriceType>
					<Type color={color}>{type}</Type>
					{inCart && (
						<Price color={color} inCart={inCart}>
							R$:{" "}
							{price
								.toFixed(2)
								.toString()
								.replace(/[.]/, ",")}
						</Price>
					)}
				</PriceType>
			</CartProps>
		</Container>
	);
};

export default GameMade;
