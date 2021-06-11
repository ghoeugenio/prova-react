import React, {Fragment, ReactElement} from 'react';
import ReactDOM from 'react-dom';

import {BackdropUI, ModalUI, ModalAccount} from './style';

interface IModal {
	children?: React.ReactNode;
	onClose?: Function | undefined;
	typeModal?: boolean | undefined;
}

const Backdrop: React.FunctionComponent<IModal> = ({onClose}): ReactElement => {
	return <BackdropUI onClick={onClose} />;
};

const ModalOverlay: React.FunctionComponent<IModal> = ({
	children,
	typeModal,
}) => {
	if (typeModal) {
		return (
			<ModalAccount>
				<div>{children}</div>
			</ModalAccount>
		);
	} else {
		return (
			<ModalUI>
				<div>{children}</div>
			</ModalUI>
		);
	}
};

const portalElement: any = document.getElementById('overlays');

const Modal: React.FunctionComponent<IModal> = ({
	children,
	onClose,
	typeModal,
}) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={onClose} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay typeModal={typeModal}>
					{children}
				</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
