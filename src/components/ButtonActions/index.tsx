import React from "react";
import IButton from "../../interfaces/button";

import {ActionButton, IconLeft, IconRight} from "./style";

const ButtonActions: React.FunctionComponent<IButton> = ({
	children,
	type,
	fontColor,
	fontSize,
	iconSize,
	onClick,
	side,
}) => {
	return (
		<ActionButton
			type={type}
			fontColor={fontColor}
			fontSize={fontSize}
			onClick={onClick}
		>
			{side && <IconLeft iconSize={iconSize} />}
			{children}
			{!side && <IconRight iconSize={iconSize} />}
		</ActionButton>
	);
};

export default ButtonActions;
