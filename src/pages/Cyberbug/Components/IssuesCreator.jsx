import { Editor } from '@tinymce/tinymce-react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Slider } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	dispatchActionGetUserSaga,
	dispatchGetPrioritiesSaga,
	dispatchGetTaskTypeSaga,
	dispatchActionGetStatusSaga,
	dispatchActionCreateTaskSaga,
} from '../../../sagas/jiraSaga/actions';
import {
	getUserSelector,
	prioritiesSelector,
	projectManagementSelector,
	taskTypeSelector,
	getStatusSelector,
} from '../Selectors/CyberBugSelectors';
import * as Yup from 'yup';

const IssuesCreator = ({ showModal, handleCancel, handleOk, isModalVisible }) => {
	const editorRef = useRef(null);
	const dispatch = useDispatch();

	const projects = useSelector(projectManagementSelector);
	const priorities = useSelector(prioritiesSelector);
	const taskTypes = useSelector(taskTypeSelector);
	const usersProject = useSelector(getUserSelector);
	const status = useSelector(getStatusSelector);

	const { values, handleSubmit, handleBlur, handleChange, errors, touched, setFieldValue, handleReset } =
		useFormik({
			enableReinitialize: true,
			initialValues: {
				projectId: null,
				listUserAssign: [],
				taskName: '',
				description: '',
				statusId: null,
				originalEstimate: null,
				timeTrackingSpent: null,
				timeTrackingRemaining: null,
				typeId: null,
				priorityId: null,
			},
			validationSchema: Yup.object().shape({
				projectId: Yup.number().required(),
				taskName: Yup.string().required(),
				listUserAssign: Yup.array().required(),
				description: Yup.string().required(),
				statusId: Yup.number().required(),
				originalEstimate: Yup.number().required(),
				timeTrackingRemaining: Yup.number().required(),
				timeTrackingSpent: Yup.number().required(),
				typeId: Yup.number().required(),
				priorityId: Yup.number().required(),
			}),

			onSubmit: values => {
				dispatch(dispatchActionCreateTaskSaga({ values, handleReset }));
			},
		});

	// useEffect(() => {
	// 	dispatch(dispatchGetPrioritiesSaga());
	// 	dispatch(dispatchGetTaskTypeSaga());
	// 	dispatch(dispatchActionGetUserSaga());
	// 	dispatch(dispatchActionGetStatusSaga());
	// }, [dispatch]);

	const handleEditorChange = () => {
		if (editorRef.current) {
			setFieldValue('description', editorRef.current.getContent());
		}
	};

	return (
		<Modal
			title="Create Task"
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okButtonProps={{ style: { display: 'none' } }}
			cancelButtonProps={{ style: { display: 'none' } }}
			width={1000}>
			<Form
				wrapperCol={{ span: 24 }}
				labelCol={{ span: 24 }}
				onFinish={() => {
					handleSubmit();
					handleCancel();
				}}>
				<Row gutter={[20, 10]}>
					<Col span={24}>
						<Form.Item label="Projects">
							<Select
								className="w-100"
								name="projectId"
								value={values.projectId}
								onChange={value => {
									setFieldValue('projectId', value);
								}}>
								{projects.map(project => (
									<Select.Option value={project.id} key={project.id}>
										{project.projectName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="Task Name">
							<Input
								name="taskName"
								value={values.taskName}
								onChange={e => setFieldValue('taskName', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Status">
							<Select
								name="statusId"
								value={values.statusId}
								onChange={value => {
									setFieldValue('statusId', value);
								}}
								className="w-100">
								{status.map(item => (
									<Select.Option key={item.statusId} value={item.statusId}>
										{item.statusName}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="priority">
							<Select
								name="priorityId"
								value={values.priorityId}
								onChange={value => {
									setFieldValue('priorityId', value);
								}}
								className="w-100">
								{priorities.map(priority => (
									<Select.Option key={priority.priorityId} value={priority.priorityId}>
										{priority.priority}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Task Type">
							<Select
								className="w-100"
								onChange={value => {
									setFieldValue('typeId', value);
								}}
								value={values.typeId}
								name="typeId">
								{taskTypes.map(taskType => (
									<Select.Option key={taskType.id} value={taskType.id}>
										{taskType.taskType}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Assign">
							<Select
								mode="multiple"
								allowClear
								style={{ width: '100%' }}
								placeholder="Please select"
								onChange={value => {
									setFieldValue('listUserAssign', value);
								}}
								name="listUserAsign">
								{usersProject.map(user => (
									<Select.Option key={user.userId} value={user.userId}>
										{user.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={24}>
						<span>Time Tracking</span>
						<Slider
							tooltipVisible
							defaultValue={Math.trunc((values.timeTrackingRemaining + values.timeTrackingSpent) / 2)}
							min={0}
							max={values.timeTrackingRemaining + values.timeTrackingSpent}
						/>
						<div className="d-flex justify-content-between">
							<Form.Item label="Time Spent (hours)">
								<InputNumber
									value={values.timeTrackingSpent}
									onChange={value => {
										setFieldValue('timeTrackingSpent', value);
									}}
									name="timeTrackingSpent"
									className="w-100"
								/>
							</Form.Item>

							<Form.Item label="Time Remaining (hours)">
								<InputNumber
									value={values.timeTrackingRemaining}
									onChange={value => {
										setFieldValue('timeTrackingRemaining', value);
									}}
									name="timeTrackingRemaining"
									className="w-100"
								/>
							</Form.Item>
						</div>
					</Col>
					<Col span={24}>
						<Form.Item label="original Estimate">
							<InputNumber
								onChange={value => {
									setFieldValue('originalEstimate', value);
								}}
								value={values.originalEstimate}
								name="originalEstimate"
								className="w-50  d-inline-block"
							/>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Editor
							apiKey="h3tobb2dzm8tdlttg4n7q69r0sqyshw7qwfh5prnjulj6ujg"
							onInit={(evt, editor) => (editorRef.current = editor)}
							onChange={handleEditorChange}
							name="description"
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
					</Col>
					<Col span={24}>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
							<Button
								type="danger"
								htmlType="button"
								onClick={() => {
									handleReset();
									handleCancel();
								}}>
								Cancel
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default IssuesCreator;
