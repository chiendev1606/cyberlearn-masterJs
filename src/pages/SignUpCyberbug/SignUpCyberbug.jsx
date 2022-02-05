import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Space, Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { dispatchActionSignUpSaga } from '../../sagas/jiraSaga/actions';

const SignUpCyberbug = () => {
	const [sizeImg, setSizeImg] = useState({ width: window.innerHeight / 2, height: window.innerWidth / 2 });

	const dispatch = useDispatch();

	const { values, handleReset, handleSubmit, touched, handleBlur, handleChange, errors } = useFormik({
		initialValues: {
			email: '',
			passWord: '',
			phoneNumber: null,
			name: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email('Email is invalid').required('Email cannot be blank '),
			passWord: Yup.string()
				.min(5, 'passWord has at least 5 characters')
				.max(30, 'passWord has max 30 characters')
				.required('passWord cannot be blank'),
			name: Yup.string().required('name cannot be blank'),
			phoneNumber: Yup.number('phone number must be number').required('phone number cannot be blank'),
		}),
		onSubmit: values => {
			console.log(values);
			dispatch(dispatchActionSignUpSaga({ values, handleReset }));
		},
	});

	useEffect(() => {
		setSizeImg({ width: window.innerHeight, height: window.innerWidth / 2 });
	}, []);

	return (
		<div className="container-fluid">
			<Row align="center">
				<Col span={12}>
					<img
						src={`https://picsum.photos/${Math.trunc(sizeImg.height)}/${Math.trunc(sizeImg.width)}`}
						alt="logo"
					/>
				</Col>
				<Col span={12}>
					<div style={{ marginTop: '100px' }}>
						<Typography.Title className="text-center" level="5" type="success">
							Sign up
						</Typography.Title>
						<Form wrapperCol={{ span: 8 }} size="large" layout="horizontal" onFinish={handleSubmit}>
							<Row gutter={[10, 20]}>
								<Col span={24}>
									<Form.Item
										name="email"
										align="center"
										{...(touched.email &&
											Boolean(errors.email) && {
												help: errors.email,
												validateStatus: 'error',
											})}>
										<Input
											value={values.email}
											type="text"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="Email..."
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										name="passWord"
										align="center"
										{...(touched.passWord &&
											Boolean(errors.passWord) && {
												help: errors.passWord,
												validateStatus: 'error',
											})}>
										<Input
											value={values.passWord}
											type="passWord"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="passWord..."
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										name="phoneNumber"
										align="center"
										{...(touched.phoneNumber &&
											Boolean(errors.phoneNumber) && {
												help: errors.phoneNumber,
												validateStatus: 'error',
											})}>
										<Input
											value={values.phoneNumber}
											type="number"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="PhoneNumber..."
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										name="name"
										align="center"
										{...(touched.name &&
											Boolean(errors.name) && {
												help: errors.name,
												validateStatus: 'error',
											})}>
										<Input
											value={values.name}
											type="text"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="Name..."
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item align="center">
										<div className="w-100 d-flex justify-content-center">
											<Space size="small">
												<Button type="primary" htmlType="submit">
													Sign Up
												</Button>
												<Button type="danger">Sign In</Button>
											</Space>
										</div>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default SignUpCyberbug;
