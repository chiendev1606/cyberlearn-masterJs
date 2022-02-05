import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	dispatchActionGetTaskDetailsSaga,
	dispatchGetProjectDetailsSaga,
} from '../../sagas/jiraSaga/actions';
import { dispatchActionReporterReducer } from './actions/actions';
import { projectDetailsSelector } from './Selectors/CyberBugSelectors';

const Cyberbug = ({ match }) => {
	const projectDetails = useSelector(projectDetailsSelector);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(dispatchGetProjectDetailsSaga(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<>
			<div className="main">
				<div className="header">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
							<li className="breadcrumb-item">Project Settings</li>
							<li className="breadcrumb-item">CyberLearn</li>
							<li className="breadcrumb-item active" aria-current="page">
								{projectDetails.projectName}
							</li>
						</ol>
					</nav>
				</div>
				<h3>{projectDetails.projectName}</h3>
				<div className="info" style={{ display: 'flex' }}>
					<div className="search-block">
						<input className="search" />
						<i className="fa fa-search" />
					</div>
					<div className="avatar-group" style={{ display: 'flex' }}>
						{projectDetails.members?.map(member => (
							<div className="avatar" key={member.userId}>
								<img src={member.avatar} alt={member.name} />
							</div>
						))}
					</div>
					<div style={{ marginLeft: 20 }} className="text">
						Only My Issues
					</div>
					<div style={{ marginLeft: 20 }} className="text">
						Recently Updated
					</div>
				</div>
				<div className="content" style={{ display: 'flex' }}>
					{projectDetails.lstTask?.map((task, idx) => (
						<div className="card" style={{ width: '17rem' }}>
							<div className="card-header"> {task.statusName} </div>
							<ul className="list-group list-group-flush">
								{task.lstTaskDeTail?.map((item, idx) => (
									<li
										className="list-group-item"
										onClick={() => {
											dispatch(dispatchActionGetTaskDetailsSaga(item.taskId));
											dispatch(dispatchActionReporterReducer(projectDetails.creator));
										}}
										key={idx}>
										<p>{item.taskName}</p>
										<div className="block" style={{ display: 'flex' }}>
											<div className="block-left">
												<i className="fa fa-check-square" />
												<i className="fa fa-arrow-up" />
											</div>
											<div className="block-right">
												<div className="avatar-group" style={{ display: 'flex' }}>
													{item.assigness?.map((member, idx) => (
														<div className="avatar" key={idx}>
															<img src={member.avatar} alt={member.name} />
														</div>
													))}
												</div>
											</div>
										</div>
									</li>
								))}
								{/* <li className="list-group-item">
									<p> Each issue has a single reporter but can have multiple assignees </p>
									<div className="block" style={{ display: 'flex' }}>
										<div className="block-left">
											<i className="fa fa-check-square" />
											<i className="fa fa-arrow-up" />
										</div>
										<div className="block-right">
											<div className="avatar-group" style={{ display: 'flex' }}>
												<div className="avatar">
													<img src="../assets/img/download (1).jfif" alt="icon" />
												</div>
												<div className="avatar">
													<img src="../assets/img/download (2).jfif" alt="icon" />
												</div>
											</div>
										</div>
									</div>
								</li> */}
							</ul>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Cyberbug;
