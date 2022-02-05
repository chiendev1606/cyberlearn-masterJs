import { Tooltip } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { Avatar, Modal, Popover, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchActionGetAllComment, dispatchActionUpdateTaskSaga } from '../../../sagas/jiraSaga/actions';
import { dispatchActionChangeVisibleModal } from '../actions/actions';
import {
	getStatusSelector,
	getUserSelector,
	prioritiesSelector,
	reporterSelector,
	taskDetailSelector,
	userSelector,
} from '../Selectors/CyberBugSelectors';

const ModalCyberBug = () => {
	const dispatch = useDispatch();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const taskDetail = useSelector(taskDetailSelector);
	const status = useSelector(getStatusSelector);
	const priorities = useSelector(prioritiesSelector);
	const usersProject = useSelector(getUserSelector);
	const reporter = useSelector(reporterSelector);
	const user = useSelector(userSelector);

	const refEditor = useRef(null);

	const [visibleEditor, setVisibleEditor] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		dispatch(
			dispatchActionChangeVisibleModal({
				showModal,
				handleCancel,
			})
		);
	}, [dispatch]);

	return (
		<>
			<div>
				<div
					className="modal fade"
					id="searchModal"
					tabIndex={-1}
					role="dialog"
					aria-labelledby="searchModal"
					aria-hidden="true">
					<div className="modal-dialog modal-search">
						<div className="modal-content">
							<div className="modal-header">
								<div className="search-block">
									<input className="search" />
									<i className="fa fa-search" />
								</div>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<p>RECENT ISSUES</p>
								<div style={{ display: 'flex' }}>
									<div className="icon">
										<i className="fa fa-bookmark" />
									</div>
									<div>
										<p>cyberlearn</p>
										<p>BUG-238066</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Info Modal */}
				<Modal
					title="Basic Modal"
					width={1000}
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}>
					<div className="modal-dialog modal-info">
						<div className="modal-content">
							<div className="modal-header">
								<div className="task-title">
									<i className="fa fa-bookmark" />
									<span>TASK-{taskDetail.taskId}</span>
								</div>
								<div style={{ display: 'flex' }} className="task-click">
									<div>
										<i className="fab fa-telegram-plane" />
										<span style={{ paddingRight: 20 }}>Give feedback</span>
									</div>
									<div>
										<i className="fa fa-link" />
										<span style={{ paddingRight: 20 }}>Copy link</span>
									</div>
									<i className="fa fa-trash-alt='icon'" style={{ cursor: 'pointer' }} />
								</div>
							</div>
							<div className="modal-body">
								<div className="container-fluid">
									<div className="row">
										<div className="col-8">
											<p className="issue">{taskDetail.taskName}</p>
											<div className="description">
												{!visibleEditor && (
													<h5
														style={{ cursor: 'pointer' }}
														dangerouslySetInnerHTML={{ __html: taskDetail.description }}
														onClick={() => {
															setVisibleEditor(true);
														}}
													/>
												)}
												{visibleEditor && (
													<div className="mt-4">
														<Editor
															apiKey="h3tobb2dzm8tdlttg4n7q69r0sqyshw7qwfh5prnjulj6ujg"
															onInit={(evt, editor) => (refEditor.current = editor)}
															// onChange={handleEditorChange}
															initialValue={taskDetail.description}
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
																content_style:
																	'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
															}}
														/>
														<div className="my-3">
															<button
																className="btn btn-success mr-3"
																onClick={() => {
																	if (refEditor.current) {
																		dispatch(
																			dispatchActionUpdateTaskSaga({
																				...taskDetail,
																				description: refEditor.current.getContent(),
																			})
																		);
																	}
																	setVisibleEditor(false);
																}}>
																Save
															</button>
															<button
																className="btn btn-danger"
																onClick={() => {
																	setVisibleEditor(false);
																}}>
																Cancel
															</button>
														</div>
													</div>
												)}
											</div>
											{/* <div style={{ fontWeight: 500, marginBottom: 10 }}>
												Jira Software (software projects) issue types:
											</div> */}
											{/* <div className="title">
												<div className="title-item">
													<h3>
														BUG <i className="fa fa-bug" />
													</h3>
													<p> A bug is a problem which impairs or prevents the function of a product. </p>
												</div>
												<div className="title-item">
													<h3>
														STORY <i className="fa fa-book-reader" />
													</h3>
													<p> A user story is the smallest unit of work that needs to be done. </p>
												</div>
												<div className="title-item">
													<h3>
														TASK <i className="fa fa-tasks" />
													</h3>
													<p>A task represents work that needs to be done</p>
												</div>
											</div> */}
											<div className="comment">
												<h6>Comment</h6>
												<div className="block-comment" style={{ display: 'flex' }}>
													<div className="avatar">
														<img src={user.avatar} alt="icon" />
													</div>
													<div className="input-comment">
														<input
															type="text"
															placeholder="Add a comment ..."
															onKeyPress={e => {
																if (e.key === 'Enter') {
																}
															}}
														/>
														<p>
															<span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
															<span>
																press
																<span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>
																	M
																</span>
																to comment
															</span>
														</p>
													</div>
												</div>
												<div className="lastest-comment">
													{taskDetail.lstComment
														? taskDetail.lstComment.map(comment => (
																<div key={comment.id} className="comment-item">
																	<div className="display-comment" style={{ display: 'flex' }}>
																		<div className="avatar">
																			<img src={comment.avatar} alt="icon" />
																		</div>
																		<div>
																			<p style={{ marginBottom: 5 }}>{comment.name}</p>
																			<p style={{ marginBottom: 5 }}>{comment.commentContent}</p>
																			<div>
																				<span style={{ color: '#929398' }}>Edit</span>•
																				<span style={{ color: '#929398' }}>Delete</span>
																			</div>
																		</div>
																	</div>
																</div>
														  ))
														: ''}
												</div>
											</div>
										</div>
										<div className="col-4">
											<div className="status">
												<h6>STATUS</h6>
												<Select
													className="custom-select"
													value={taskDetail.statusId}
													onChange={value => {
														dispatch(
															dispatchActionUpdateTaskSaga({
																...taskDetail,
																statusId: value.toString(),
															})
														);
													}}>
													{status.map(item => (
														<Select.Option value={item.statusId} key={item.statusId}>
															{item.statusName}
														</Select.Option>
													))}
												</Select>
											</div>
											<div className="assignees">
												<h6>ASSIGNEES</h6>
												<Avatar.Group size="large" maxCount={7}>
													{taskDetail.assigness?.map(member => (
														<Tooltip key={member.id} title={member.name} placement="top">
															<Avatar src={member.avatar} />
														</Tooltip>
													))}

													<Popover
														content={() => (
															<Select
																mode="multiple"
																allowClear
																value={taskDetail.assigness.map(item => item.id)}
																onChange={value => {
																	dispatch(
																		dispatchActionUpdateTaskSaga({
																			...taskDetail,
																			listUserAsign: [
																				...(taskDetail.assigness
																					? []
																					: taskDetail.assigness.map(item => item.id)),
																				...value,
																			],
																		})
																	);
																}}
																className="w-100">
																{usersProject.map(user => (
																	<Select.Option key={user.userId} value={user.userId}>
																		{user.name}
																	</Select.Option>
																))}
															</Select>
														)}
														title="Title"
														trigger="click">
														<div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
															<i className="fa fa-plus" style={{ marginRight: 5 }} />
															<span>Add more</span>
														</div>
													</Popover>
												</Avatar.Group>
											</div>
											<div className="reporter">
												<h6>REPORTER</h6>
												<div style={{ display: 'flex' }} className="item">
													<Tooltip title={reporter.id}>
														<Avatar size="large">{reporter.name}</Avatar>
													</Tooltip>
												</div>
											</div>
											<div className="priority" style={{ marginBottom: 20 }}>
												<h6>PRIORITY</h6>
												<Select
													className="w-50"
													value={taskDetail.priorityId}
													onChange={value => {
														dispatch(dispatchActionUpdateTaskSaga({ ...taskDetail, priorityId: value }));
													}}>
													{priorities.map(priority => (
														<Select.Option key={priority.priorityId} value={priority.priorityId}>
															{priority.priority}
														</Select.Option>
													))}
												</Select>
											</div>
											<div className="estimate">
												<h6>ORIGINAL ESTIMATE (HOURS)</h6>
												<input
													type="number"
													className="estimate-hours"
													value={taskDetail.originalEstimate}
													onChange={e => {
														dispatch(
															dispatchActionUpdateTaskSaga({
																...taskDetail,
																originalEstimate: Number(e.target.value),
															})
														);
													}}
												/>
											</div>
											<div className="time-tracking">
												<h6>TIME TRACKING</h6>
												<div style={{ display: 'flex' }}>
													<i className="fa fa-clock" />
													<div style={{ width: '100%' }}>
														<div className="progress">
															<div
																className="progress-bar"
																role="progressbar"
																style={{ width: '25%' }}
																aria-valuenow={taskDetail.timeTrackingSpent}
																aria-valuemin={0}
																aria-valuemax={
																	Number(taskDetail.timeTrackingRemaining) +
																	Number(taskDetail.timeTrackingSpent)
																}
															/>
														</div>
														<div style={{ display: 'flex', justifyContent: 'space-between' }}>
															<p className="logged">{taskDetail.timeTrackingSpent}h logged</p>
															<p className="estimate-time">{taskDetail.timeTrackingRemaining}h estimated</p>
														</div>
													</div>
												</div>
											</div>
											<div style={{ color: '#929398' }}>Create at a month ago</div>
											<div style={{ color: '#929398' }}>Update at a few seconds ago</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default ModalCyberBug;
