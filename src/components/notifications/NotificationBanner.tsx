import { useState } from "react";
import { Notification } from "../../context/NotificationsProvider";

const NotificationBanner = ({ message, type }: Notification) => {
	const [visible, setVisible] = useState(true);

	setTimeout(() => {
		setVisible(false);
	}, 6000);

	return (
		visible && (
			<div
				className={`notification ${
					type === "error"
						? "error-notification"
						: "info-notification"
				} `}>
				{message}
			</div>
		)
	);
};

export default NotificationBanner;
