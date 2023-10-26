import { useState } from "react";

type ErrorProps = {
	message: string;
};

const Error = ({ message }: ErrorProps) => {
	const [visible, setVisible] = useState(true);

	setTimeout(() => {
		setVisible(false);
	}, 6000);

	return visible && <div className="error-message">{message}</div>;
};

export default Error;
