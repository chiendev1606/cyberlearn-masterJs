import React from 'react';
import classes from './Loading.module.css';

const Loading = () => {
	return (
		<div className={classes.Loading}>
			<img src={require('../../../assets/loading.gif')} alt="loading" />
		</div>
	);
};

export default Loading;
