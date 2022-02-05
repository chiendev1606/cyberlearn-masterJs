import React, { useState } from 'react';
import IssuesCreator from './Components/IssuesCreator';

const Sidebar = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<>
			<div className="sideBar">
				<div className="sideBar-top">
					<div className="sideBar-icon">
						<i className="fab fa-jira" />
					</div>
					<div
						className="sideBar-icon"
						data-toggle="modal"
						data-target="#searchModal"
						style={{ cursor: 'pointer' }}>
						<i className="fa fa-search" />
						<span className="title">SEARCH ISSUES</span>
					</div>
					<div className="sideBar-icon">
						<i className="fa fa-plus" />
						<span className="title" onClick={showModal} style={{ cursor: 'pointer' }}>
							CREATE ISSUES
						</span>
					</div>
				</div>
				<div className="sideBar-bottom">
					<div className="sideBar-icon">
						<i className="fa fa-question-circle" />
						<span className="title">ABOUT</span>
					</div>
				</div>
				<IssuesCreator
					showModal={showModal}
					handleCancel={handleCancel}
					handleOk={handleOk}
					isModalVisible={isModalVisible}
				/>
			</div>
		</>
	);
};

export default Sidebar;
