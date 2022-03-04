import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Popconfirm, Popover, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
	dipatchActionAddUserProjectSaga,
	dispatchActionDeleteProjectSaga,
	dispatchActionGetProjectsSaga,
	dispatchActionSearchUserSaga,
	dispatchRemoveUserProjectSaga,
} from '../../../sagas/jiraSaga/actions';
import { OPEN_DRAWER } from '../../../util/constants/constants';
import { dispatchActionChangeDrawerState, dispatchProjectEditReducer } from '../actions/actions';
import { projectManagementSelector, usersProjectSelector } from '../Selectors/CyberBugSelectors';
import DrawerCyberbug from './DrawerCyberbug';

function ProjectManagement(props) {
	const dispatch = useDispatch();
	const projects = useSelector(projectManagementSelector);
	const searchRef = useRef(null);
	const usersProject = useSelector(usersProjectSelector);

	const [value, setValue] = useState('');

	const onSearch = searchText => {
		if (searchRef.current) clearTimeout(searchRef.current);
		searchRef.current = setTimeout(() => {
			dispatch(dispatchActionSearchUserSaga(searchText));
		}, 300);
	};

	const handleSelect = (userId, projectId) => {
		dispatch(dipatchActionAddUserProjectSaga({ userId: Number(userId), projectId: Number(projectId) }));
		setValue('');
	};

	const onChange = (data, { label, value }) => {
		setValue(label);
	};

	useEffect(() => {
		dispatch(dispatchActionGetProjectsSaga());
	}, [dispatch]);

	const columns = [
		{
			title: 'Project Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			key: 'projectName',
			render: (record, text, index) => {
				return <NavLink to={`/cyberbug/${record.id}`}>{record.projectName}</NavLink>;
			},
			sorter: (a, b) => {
				if (a.projectName.toLowerCase().trim() < b.projectName.toLowerCase().trim()) {
					return -1;
				}
				return 1;
			},
			sortDirections: ['ascend'],
		},

		{
			title: 'Creator',
			dataIndex: 'creator',
			key: 'creator',
			render: (text, record, index) => {
				return <Tag color="gold">{record.creator.name}</Tag>;
			},
		},

		{
			title: 'Members',
			dataIndex: 'members',
			key: 'members',
			render: (text, record, index) => {
				return (
					<div className="d-flex align-center">
						<Popover
							content={
								<table className="table-bordered">
									<thead>
										<tr>
											<th>ID</th>
											<th>Avatar</th>
											<th>Username</th>
										</tr>
									</thead>
									<tbody>
										{record.members &&
											record.members.map(member => (
												<tr key={member.userId}>
													<td>{member.userId}</td>
													<td>
														<Avatar src={member.avatar}></Avatar>
													</td>
													<td>{member.name}</td>
													<td>
														<button
															className="btn btn-danger"
															onClick={() => {
																dispatch(
																	dispatchRemoveUserProjectSaga({
																		projectId: record.id,
																		userId: member.userId,
																	})
																);
															}}>
															X
														</button>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							}
							title="User in this project">
							<div>
								<Avatar.Group maxCount={2} size="large">
									{record.members.map((item, idx) => (
										<Avatar size="large" key={idx} src={item.avatar} />
									))}
								</Avatar.Group>
							</div>
						</Popover>
						<Popover
							placement="rightTop"
							title="Add users"
							content={() => (
								<AutoComplete
									value={value}
									options={usersProject}
									style={{ width: 200 }}
									onSelect={data => {
										handleSelect(data, record.id);
									}}
									onSearch={onSearch}
									placeholder="input here"
									onChange={onChange}
								/>
							)}
							trigger="click">
							<button
								className="btn btn-success"
								style={{ borderRadius: '50%', width: '40px', height: '40px' }}>
								+
							</button>
						</Popover>
					</div>
				);
			},
		},
		{
			title: 'Actions',
			key: 'id',
			render: (text, record, index) => (
				<div>
					<button
						className="btn btn-primary mr-1"
						onClick={() => {
							dispatch(dispatchProjectEditReducer(record));
							dispatch(dispatchActionChangeDrawerState(OPEN_DRAWER));
						}}>
						<FormOutlined />
					</button>
					<Popconfirm
						title="Are you sure to delete this task?"
						onConfirm={() => {
							dispatch(dispatchActionDeleteProjectSaga(record.id));
						}}
						okText="Yes"
						cancelText="No">
						<button className="btn btn-danger" onClick={() => {}}>
							<DeleteOutlined />
						</button>
					</Popconfirm>
				</div>
			),
		},
	];
	return (
		<>
			<DrawerCyberbug />
			<div style={{ flex: 1 }}>
				<Table columns={columns} rowKey="id" dataSource={projects} onChange={onChange} />
			</div>
		</>
	);
}

export default ProjectManagement;
