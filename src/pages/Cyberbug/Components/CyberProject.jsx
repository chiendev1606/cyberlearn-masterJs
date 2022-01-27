import {
	Button,
	Container,
	CssBaseline,
	FormHelperText,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
	dispatchActionCreateProjectSaga,
	dispatchActionGetCategoryProject,
} from '../../../sagas/jiraSaga/actions';
import { projectCategorySelector } from '../Selectors/CyberBugSelectors';

const CyberProject = () => {
	
	const editorRef = useRef(null);

	const dispatch = useDispatch();

	const projectCategory = useSelector(projectCategorySelector);

	const { values, handleSubmit, handleBlur, handleChange, errors, touched, setFieldValue } = useFormik({
		initialValues: {
			name: '',
			desc: '',
			category: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.min(5, 'Project name have at least 5 characters !!!')
				.max(40, 'Project name have max 40 character !!!')
				.required(),
			desc: Yup.string().required('Descriptions project cannot be blank !!!'),
			category: Yup.number().required('Category cannot be blank'),
		}),
		onSubmit: values => {
			dispatch(
				dispatchActionCreateProjectSaga({
					projectName: values.name,
					description: values.desc,
					categoryId: values.category,
				})
			);
		},
	});

	useEffect(() => {
		dispatch(dispatchActionGetCategoryProject());
	}, [dispatch]);

	const handleEditorChange = () => {
		if (editorRef.current) {
			setFieldValue('desc', editorRef.current.getContent());
		}
	};

	return (
		<Container maxWidth="sm">
			<CssBaseline />
			<Typography variant="h4" align="center" margin={2}>
				Project Settings
			</Typography>
			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					variant="outlined"
					label="name"
					name="name"
					fullWidth
					value={values.name}
					margin="normal"
					size="small"
					onBlur={handleBlur}
					onChange={handleChange}
					error={touched.name && Boolean(errors.name)}
					helperText={touched.name && errors.name}
				/>

				<TextField
					select
					variant="outlined"
					name="category"
					label="Project category"
					size="small"
					fullWidth
					value={values.category}
					onBlur={handleBlur}
					onChange={handleChange}
					error={touched.category && Boolean(errors.category)}
					helperText={touched.category && errors.category}
					margin="normal">
					{projectCategory.map(item => (
						<MenuItem value={item.id} key={item.id}>
							{item.projectCategoryName}
						</MenuItem>
					))}
				</TextField>

				<div className="my-3">
					<Editor
						apiKey="h3tobb2dzm8tdlttg4n7q69r0sqyshw7qwfh5prnjulj6ujg"
						onInit={(evt, editor) => (editorRef.current = editor)}
						onChange={handleEditorChange}
						initialValue=""
						init={{
							height: 500,
							menubar: false,
							plugins: [
								'advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount',
							],
							toolbar:
								'undo redo | formatselect | ' +
								'bold italic backcolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
							content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						}}
					/>

					{errors.desc && <FormHelperText sx={{ color: 'red' }}>{errors.desc}</FormHelperText>}
				</div>
				<Button color="primary" type="submit" variant="contained" className="mt-4">
					Save change
				</Button>
			</Box>
		</Container>
	);
};

export default CyberProject;
