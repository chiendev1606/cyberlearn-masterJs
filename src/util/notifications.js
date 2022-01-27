import { notification } from 'antd';

export const Notification = (type, msg, desc = '') => {
	notification[type]({
		message: msg,
		description: desc,
	});
};
