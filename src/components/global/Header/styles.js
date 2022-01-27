import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
	menu: {
		marginLeft: 'auto',
	},
	logo: {
		textDecoration: 'none',
		color: '#fff',
	},
	link: {
		textDecoration: 'none',
		color: '#fff',
		margin: '0 10px',
	},
	error: {
		color: 'red',
	},
}));
