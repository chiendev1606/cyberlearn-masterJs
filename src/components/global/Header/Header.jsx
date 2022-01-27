import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link, Menu, MenuItem, CssBaseline } from '@mui/material';
import { useStyles } from './styles';

export const Header = () => {
	const classes = useStyles();

	return (
		<>
			<AppBar position="static">
				<CssBaseline />
				<Toolbar>
					<Typography variant="h4">
						<NavLink to="/home" className={classes.logo}>
							Jira Clone
						</NavLink>
					</Typography>
					<div className={classes.menu}>
						<NavLink className={classes.link} to="/home">
							Home
						</NavLink>
						<NavLink className={classes.link} to="/about">
							About
						</NavLink>
						<NavLink className={classes.link} to="/login">
							Login
						</NavLink>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};
