import React from 'react';
import ISelectNumbers from '../../interfaces/selectNumbers';
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
} from './style';

const GameMade: React.FunctionComponent<ISelectNumbers> = ({
	type,
	price,
	color,
	numbers,
	onDelete,
	date,
}) => {
	const url = window.location.pathname;

	const onCart: boolean = url === '/bet' && true;

	return (
		<Container>
			{onCart && (
				<ButtonDelete onClick={onDelete}>
					<IconTrash />
				</ButtonDelete>
			)}
			<CartProps color={color}>
				<Numbers>
					<p>{numbers.replace(/[,]/g, ', ')}</p>
				</Numbers>
				{!onCart && (
					<DatePrice>
						<Type color={color}>
							{date}
							{' - '}
						</Type>
						<Price color={color} onCart={onCart}>
							{'- '}
							R$:{' '}
							{price
								.toFixed(2)
								.toString()
								.replace(/[.]/, ',')}
						</Price>
					</DatePrice>
				)}
				<PriceType>
					<Type color={color}>{type}</Type>
					{onCart && (
						<Price color={color} onCart={onCart}>
							R$:{' '}
							{price
								.toFixed(2)
								.toString()
								.replace(/[.]/, ',')}
						</Price>
					)}
				</PriceType>
			</CartProps>
		</Container>
	);
};

export default GameMade;
