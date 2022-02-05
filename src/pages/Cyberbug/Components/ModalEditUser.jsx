import { Button, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { dispatchActionEditUserSaga } from '../../../sagas/jiraSaga/actions';
import { dispatchActionChangeVisibleModalReducer } from '../actions/actions';
import { userEditSelector } from '../Selectors/CyberBugSelectors';

const ModalEditUser = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();
	const userEdit = useSelector(userEditSelector);

	const { handleBlur, handleSubmit, handleChange, errors, values, touched } = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: userEdit.name,
			email: userEdit.email,
			passWord: '',
			confirmPassWord: '',
			phoneNumber: userEdit.phoneNumber,
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('name is required'),
			email: Yup.string().email('Email is invalid').required('Email is required'),
			passWord: Yup.string()
				.min(4, 'password has at least 4 characters')
				.max(30, 'password has max 30 characters')
				.required('password is required'),
			confirmPassWord: Yup.string()
				.oneOf([Yup.ref('passWord'), null], 'Confirm Password not match Password')
				.required('Confirm passWord is required'),
			phoneNumber: Yup.number().required('Phone number is required'),
		}),
		onSubmit: values => {
			dispatch(dispatchActionEditUserSaga({ ...values, id: userEdit.userId }));
		},
	});

	useEffect(() => {
		dispatch(dispatchActionChangeVisibleModalReducer({ showModal, handleCancel }));
	}, [dispatch]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<Modal
				title="Edit Users"
				visible={isModalVisible}
				onOk={handleOk}
				okButtonProps={{ style: { display: 'none' } }}
				cancelButtonProps={{ style: { display: 'none' } }}
				onCancel={handleCancel}>
				<Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleSubmit}>
					<Form.Item
						label="name"
						{...(touched.name &&
							Boolean(errors.name) && {
								help: errors.name,
								validateStatus: 'error',
							})}>
						<Input value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" />
					</Form.Item>
					<Form.Item
						label="email"
						{...(touched.email &&
							Boolean(errors.email) && {
								help: errors.email,
								validateStatus: 'error',
							})}>
						<Input value={values.email} onChange={handleChange} onBlur={handleBlur} name="email" />
					</Form.Item>
					<Form.Item
						label="Phone"
						{...(touched.phoneNumber &&
							Boolean(errors.phoneNumber) && {
								help: errors.phoneNumber,
								validateStatus: 'error',
							})}>
						<Input
							type="number"
							value={values.phoneNumber}
							onChange={handleChange}
							onBlur={handleBlur}
							name="phoneNumber"
						/>
					</Form.Item>
					<Form.Item
						label="Password"
						{...(touched.passWord &&
							Boolean(errors.passWord) && {
								help: errors.passWord,
								validateStatus: 'error',
							})}>
						<Input.Password
							value={values.passWord}
							onChange={handleChange}
							onBlur={handleBlur}
							name="passWord"
						/>
					</Form.Item>
					<Form.Item
						label="Confirm Password"
						{...(touched.confirmPassWord &&
							Boolean(errors.confirmPassWord) && {
								help: errors.confirmPassWord,
								validateStatus: 'error',
							})}>
						<Input.Password
							value={values.confirmPassWord}
							onChange={handleChange}
							onBlur={handleBlur}
							name="confirmPassWord"
						/>
					</Form.Item>

					<div className="d-flex justify-content-center align-center">
						<Button onClick={handleCancel} type="danger" className="mr-2">
							Cancel
						</Button>
						<Button htmlType="submit" type="primary">
							Submit
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default ModalEditUser;
