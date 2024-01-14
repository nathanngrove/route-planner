import React, { useState, useContext } from "react";

const NotificationsContext = React.createContext<Notification[]>([]);
const NotificationsUpdateContext = React.createContext<
	({ type, message }: Notification) => void
>(({ type, message }: Notification) => {});

type NotificationClass = "error" | "info";

export type Notification = {
	type: NotificationClass;
	message: string;
};

export function useNotifications() {
	return useContext(NotificationsContext);
}

export function useNotificationsUpdate() {
	return useContext(NotificationsUpdateContext);
}

type NotificationsProviderProps = {
	children: React.ReactNode;
};

const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	function updateNotifications({ type, message }: Notification) {
		setNotifications((oldNotifications) => {
			if (notifications.length === 0) return [{ type, message }];
			else return [...oldNotifications, { type, message }];
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
