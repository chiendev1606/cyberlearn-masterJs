import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<div className="collapse navbar-collapse">
					<div className="navbar-nav">
						<NavLink className="nav-link active" to="/home">
							Home
						</NavLink>
						<NavLink className="nav-link" to="/Features">
							Features
						</NavLink>
						<NavLink className="nav-link" to="/hoc">
							hoc
						</NavLink>
						<NavLink className="nav-link" to="/todoList">
							TodoList
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};
