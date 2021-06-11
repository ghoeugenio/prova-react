import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/hooks';
import {tokenActions} from '../../store/Redux/token';
import {loginActions} from '../../store/Redux/login';

export const RestorePassword = () => {
	const {token} = useParams();
	const history = useHistory();
	const dispatch = useAppDispatch();

	if (token.length > 9) {
		dispatch(tokenActions.setToken(token));
		dispatch(loginActions.setRestore());
	}

	history.push('/');

	return (
		<div>
			<p>Loading</p>
		</div>
	);
};

export default RestorePassword;
