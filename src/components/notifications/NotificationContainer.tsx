import React from "react";

type NotificationContainerProps = {
	children: React.ReactNode
}

const NotificationContainer = ({ children } : NotificationContainerProps) => {
	return <div className="notifications-container">{children}</div>;
};

export default NotificationContainer;
