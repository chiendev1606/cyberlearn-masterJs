import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import Menu from '../pages/Cyberbug/Components/Menu';
import ModalCyberBug from '../pages/Cyberbug/Components/ModalCyberBug';
import { isLoginSelector } from '../pages/Cyberbug/Selectors/CyberBugSelectors';
import Sidebar from '../pages/Cyberbug/Sidebar';
import UserLogin from '../pages/LoginCyberbug/Login/UserLogin';

const CyberBugTemplate = ({ Component, ...restProps }) => {
	const isLogin = useSelector(isLoginSelector);

	return (
		<Route
			{...restProps}
			render={propsCyberBug => {
				return (
					<>
						<ModalCyberBug />
						{isLogin ? (
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
