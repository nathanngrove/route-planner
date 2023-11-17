import { useNotifications } from "../../context/NotificationsProvider";
import NotificationBanner from "./NotificationBanner";

const NotificationContainer = () => {
	const notifications = useNotifications();

	return (
		<div className="notifications-container">
			{notifications?.error !== null &&
				notifications?.error.map((err, i) => (
					<NotificationBanner key={i} message={err} type={"error"} />
				))}
			{notifications?.info !== null &&
				notifications?.info.map((err, i) => (
					<NotificationBanner key={i} message={err} type={"info"} />
				))}
		</div>
	);
};

export default NotificationContainer;
