import React, { useState } from "react";

const Error = ({ message }) => {
	const [visible, setVisible] = useState(true);

	setTimeout(() => {
		setVisible(false);
	}, 6000);

	return visible && <div className="error-message">{message}</div>;
};

export default Error;
