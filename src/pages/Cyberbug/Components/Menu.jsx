import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userSelector } from '../Selectors/CyberBugSelectors';

const Menu = () => {
	const userLogin = useSelector(userSelector);

	return (
		<div className="menu">
			<div className="account">
				<div className="avatar">
					<img src={userLogin.avatar} alt="menu" />
				</div>
				<div className="account-info">
					<p>{userLogin.name}</p>
					<p>Report bugs</p>
				</div>
			</div>
			<div className="control">
				<div>
					<NavLink style={{ color: 'black' }} activeStyle={{ color: 'blue' }} to="/usermanagement">
						<div>
							<i className="fa fa-credit-card" />
							<span className="ml-1">User Management</span>
						</div>
					</NavLink>
				</div>
				<div>
					<NavLink style={{ color: 'black' }} activeStyle={{ color: 'blue' }} to="/projectManagement">
						<div>
							<i className="fa fa-credit-card" />
							<span className="ml-1">Project management</span>
						</div>
					</NavLink>
				</div>
				<div>
					<NavLink style={{ color: 'black' }} activeStyle={{ color: 'blue' }} to="/projectSettings">
						<div>
							<i className="fa fa-cog" />
							<span className="ml-1">Project Settings</span>
						</div>
					</NavLink>
				</div>
			</div>
			<div className="feature">
				<div>
					<i className="fa fa-truck" />
					<span>Releases</span>
				</div>
				<div>
					<i className="fa fa-equals" />
					<span>Issues and filters</span>
				</div>
				<div>
					<i className="fa fa-paste" />
					<span>Pages</span>
				</div>
				<div>
					<i className="fa fa-location-arrow" />
					<span>Reports</span>
				</div>
				<div>
					<i className="fa fa-box" />
					<span>Components</span>
				</div>
			</div>
		</div>
	);
};

export default Menu;
