import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dispatchActionDeleteUser } from '../../../sagas/jiraSaga/actions';
import { dispatchActionChangeSearchText, dispatchActionUserEdit } from '../actions/actions';
import { ChangeModalEditUserVisibleSelector, getUserByFilterSelector } from '../Selectors/CyberBugSelectors';
import ModalEditUser from './ModalEditUser';

const UserManagement = props => {
	const dispatch = useDispatch();
	const dataUser = useSelector(getUserByFilterSelector);
	const showModal = useSelector(ChangeModalEditUserVisibleSelector);

	const handleChangeInput = e => {
		dispatch(dispatchActionChangeSearchText(e.target.value));
	};

	const columns = [
		{
			title: 'STT',
			key: 'index',
			render: (text, record, index) => index + 1,
		},
		{
			title: 'Id',
			key: 'userId',
			dataIndex: 'userId',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => {
				if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) {
					return -1;
				}
				return 1;
			},
			sortDirections: ['ascend'],
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			sorter: (a, b) => {
				if (a.email.toLowerCase().trim() < b.email.toLowerCase().trim()) {
					return -1;
				}
				return 1;
			},
			sortDirections: ['ascend'],
		},

		{
			title: 'Phone',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<Space size="middle">
					<button
						className="btn btn-primary"
						onClick={() => {
							dispatch(dispatchActionUserEdit(record));
							showModal();
						}}>
						Edit
					</button>
					<button
						className="btn btn-danger"
						onClick={() => {
							dispatch(dispatchActionDeleteUser(record.userId));
						}}>
						Delete
					</button>
				</Space>
			),
		},
	];

	return (
		<>
			<ModalEditUser />
			<div className="w-100">
				<div className="m-4">
					<NavLink to="/signup" className="">
						Create user
					</NavLink>
				</div>
				<div className="m-3 w-50">
					<Input placeholder="Search..." prefix={<SearchOutlined />} onChange={handleChangeInput} />
				</div>
				<Table columns={columns} rowKey="userId" dataSource={dataUser} />
			</div>
		</>
	);
};

export default UserManagement;
