import { useNotifications } from "../../context/NotificationsProvider";
import NotificationBanner from "./NotificationBanner";

const NotificationContainer = () => {
	const notifications = useNotifications();

	return (
		<div className="notifications-container">
			{!!notifications &&
				notifications.map((notification, i) => {
					return (
						<NotificationBanner
							message={notification.message}
							type={notification.type}
							key={i}
						/>
					);
				})}
		</div>
	);
};

export default NotificationContainer;
