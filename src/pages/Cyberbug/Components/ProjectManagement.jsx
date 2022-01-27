import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Popconfirm, Popover, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	dispatchActionDeleteProjectSaga,
	dispatchActionGetProjectsSaga,
	dispatchActionSearchUserSaga,
	dipatchActionAddUserProjectSaga,
} from '../../../sagas/jiraSaga/actions';
import { OPEN_DRAWER } from '../../../util/constants/constants';
import { dispatchActionChangeDrawerState, dispatchProjectEditReducer } from '../actions/actions';
import { projectManagementSelector, usersProjectSelector } from '../Selectors/CyberBugSelectors';
import DrawerCyberbug from './DrawerCyberbug';

function ProjectManagement() {
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
			dataIndex: 'projectName',
			key: 'projectName',
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
					<div className="d-flex align-center ">
						<Avatar.Group maxCount={2} size="large">
							{record.members.map((item, idx) => (
								<Avatar size="large" key={idx} src={item.avatar} />
							))}
						</Avatar.Group>
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
							<button className="btn btn-success" style={{ borderRadius: '50%' }}>
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
