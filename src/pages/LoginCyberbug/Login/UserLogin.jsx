import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	FormHelperText,
	TextField,
	Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { dispatchActionSignInSaga } from '../../../sagas/jiraSaga/actions';
import { errorSelector } from '../selectors/selectors';

const UserLogin = props => {
	const dispatch = useDispatch();
	const errorSever = useSelector(errorSelector);

	const { values, handleSubmit, handleBlur, errors, touched, handleChange } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

			email: Yup.string().email('Invalid email').required('Required'),
		}),

		onSubmit: values => {
			dispatch(dispatchActionSignInSaga(values));
		},
	});

	return (
		<>
			<Container maxWidth="xs" sx={{ mt: 5 }}>
				<CssBaseline />
				<Box
					component="main"
					maxWidth="xs"
					sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Avatar sx={{ bgcolor: 'primary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant="h5">Sign in</Typography>
				</Box>

				<Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
					<TextField
						size="normal"
						name="email"
						label="Email Address"
						type="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.email && Boolean(errors.email)}
						helperText={touched.email && errors.email}
					/>

					<TextField
						size="normal"
						name="password"
						label="Password"
						type="password"
						variant="outlined"
						fullWidth
						margin="normal"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.password && Boolean(errors.password)}
						helperText={touched.password && errors.password}
					/>
					<FormHelperText margin="dense" error={Boolean(errorSever)}>
						{errorSever}
					</FormHelperText>

					<FormControlLabel
						control={<Checkbox defaultChecked color="primary" />}
						sx={{ mt: 2, mb: 3 }}
						label="Remember me"
					/>

					<div className="d-flex justify-content-center">
						<Button type="submit" variant="contained" color="primary" className="mr-2">
							Sign in
						</Button>
						<Button type="button" variant="contained" color="secondary">
							<NavLink style={{ color: 'white' }} to="/signup">
								Sign Up
							</NavLink>
						</Button>
					</div>
				</Box>
			</Container>
		</>
	);
};

export default UserLogin;
