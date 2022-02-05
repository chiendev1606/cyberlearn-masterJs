import React from 'react';
import { Route } from 'react-router';
import { Header } from '../components/global/Header/Header';
import Menu from '../pages/Cyberbug/Components/Menu';
import ModalCyberBug from '../pages/Cyberbug/Components/ModalCyberBug';
import Sidebar from '../pages/Cyberbug/Sidebar';

const CyberBugTemplate = ({ Component, ...restProps }) => {
	return (
		<Route
			{...restProps}
			render={propsCyberBug => {
				return (
					<>
						<Header />
						<ModalCyberBug />
						<div className="jira" style={{ width: '100%' }}>
							<Sidebar />
							<Menu />
							<Component {...propsCyberBug} />
						</div>
					</>
				);
			}}
		/>
	);
};

export default CyberBugTemplate;
