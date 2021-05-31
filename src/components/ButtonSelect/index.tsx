import React from "react";
import {LabelRadioButton, InputRadioButton} from "./style";
import IStyled from "../../interfaces/styled";

const ButtonSelect: React.FunctionComponent<IStyled> = ({
	children,
	isSelected,
	customColor,
	htmlFor,
	id,
	value,
	checked,
	onClick,
	...config
}) => {
	return (
		<LabelRadioButton
			isSelected={isSelected}
			customColor={customColor}
			htmlFor={htmlFor}
			{...config}
		>
			<InputRadioButton
				type='radio'
				id={id}
				value={value}
				checked={checked}
				onClick={onClick}
			/>
			{children}
		</LabelRadioButton>
	);
};

export default ButtonSelect;
