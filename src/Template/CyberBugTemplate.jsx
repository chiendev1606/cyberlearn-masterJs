import _ from 'lodash';
import React from 'react';
import { Route } from 'react-router';
import Menu from '../pages/Cyberbug/Components/Menu';
import ModalCyberBug from '../pages/Cyberbug/Components/ModalCyberBug';
import Sidebar from '../pages/Cyberbug/Sidebar';
import UserLogin from '../pages/LoginCyberbug/Login/UserLogin';
import { USER } from '../util/constants/constants';

const CyberBugTemplate = ({ Component, ...restProps }) => {
	const user = JSON.parse(localStorage.getItem(USER)) || {};

	return (
		<Route
			{...restProps}
			render={propsCyberBug => {
				return (
					<>
						<ModalCyberBug />
						{!_.isEmpty(user) ? (
							<div className="jira" style={{ width: '100%' }}>
								<Sidebar />
								<Menu />
								<Component {...propsCyberBug} />
							</div>
						) : (
							<UserLogin />
						)}
					</>
				);
			}}
		/>
	);
};

export default CyberBugTemplate;
