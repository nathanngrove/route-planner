import isAppleDevice from "../../../utils/isAppleDevice";

type GoButtonProps = {
	lat: number;
	lng: number;
};

const GoButton = ({ lat, lng }: GoButtonProps) => {
	return (
		<a
			className="directions-button"
			href={
				isAppleDevice()
					? `maps://maps.google.com/?q=${lat},${lng}`
					: `https://maps.google.com/?q=${lat},${lng}`
			}
			target="_blank">
			GO
		</a>
	);
};

export default GoButton;
