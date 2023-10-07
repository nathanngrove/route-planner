import React, { useState, useContext } from "react";

const NotificationsContext = React.createContext<Notifications | null>(null);
const NotificationsUpdateContext = React.createContext<((type: string, newNotification: string) => void)>(()=>{});

type Notifications = { 
	info: Array<string>
	error: Array<string>
};

export function useNotifications() {
	return useContext(NotificationsContext);
}

export function useNotificationsUpdate() {
	return useContext(NotificationsUpdateContext);
}

type NotificationsProviderProps = {
	children: React.ReactNode
}

const NotificationsProvider = ({ children } : NotificationsProviderProps) => {
	const [notifications, setNotifications] = useState<Notifications>({info: [], error: []});

	function updateNotifications(type : string, newNotification : string) {
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
