import React, { useState, useContext } from "react";

const NotificationsContext = React.createContext();
const NotificationsUpdateContext = React.createContext();

const NotificationsObject = { info: [], error: [] };

export function useNotifications() {
	return useContext(NotificationsContext);
}

export function useNotificationsUpdate() {
	return useContext(NotificationsUpdateContext);
}

const NotificationsProvider = ({ children }) => {
	const [notifications, setNotifications] = useState(NotificationsObject);

	function updateNotifications(type, newNotification) {
		if (type === "info")
			setNotifications({
				...notifications,
				info: [newNotification, ...notifications.info],
			});
		if (type === "error")
			setNotifications({
				...notifications,
				error: [newNotification, ...notifications.error],
			});
	}

	return (
		<NotificationsContext.Provider value={notifications}>
			<NotificationsUpdateContext.Provider value={updateNotifications}>
				{children}
			</NotificationsUpdateContext.Provider>
		</NotificationsContext.Provider>
	);
};

export default NotificationsProvider;
