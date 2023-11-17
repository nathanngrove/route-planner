import { useState } from "react";

type NotificationBannerProps = {
	message: string;
	type: "error" | "info";
};

const NotificationBanner = ({ message, type }: NotificationBannerProps) => {
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
