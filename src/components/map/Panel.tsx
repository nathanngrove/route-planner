import React from "react";
import AddressList from "../controls/AddressList";
import usePlacesAutocomplete from "use-places-autocomplete";
import OptimizeRouteButton from "../controls/OptimizeRouteButton";
import { GoogleMap } from "@react-google-maps/api";
import { Address } from "../../pages";
import AddressInput from "../controls/AddressInput";
import useSwipe from "../../utils/useSwipe";
import InfoBox from "../controls/InfoBox";

function getCenterOfCoords(addresses: Array<Address>) {
	if (addresses.length === 1) return addresses[0].latLng;

	let center = { lat: 0, lng: 0 };

	addresses.forEach(({ address, latLng }) => {
		const { lat, lng } = latLng;

		center.lat += lat;
		center.lng += lng;
	});

	center.lat = center.lat / addresses.length;
	center.lng = center.lng / addresses.length;

	return center;
}

type PanelProps = {
	mapRef: React.MutableRefObject<GoogleMap | undefined>;
	addresses: Array<Address>;
	setAddresses: (addresses: Array<Address>) => void;
	fullPanel: boolean;
	setFullPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const Panel = ({
	mapRef,
	addresses,
	setAddresses,
	fullPanel,
	setFullPanel,
}: PanelProps) => {
	const { ready, value, setValue, suggestions, clearSuggestions } =
		usePlacesAutocomplete();

	const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe({
		direction: "vertical",
		downFunction: () => setFullPanel(false),
		upFunction: () => setFullPanel(true),
	});

	return (
		<div className={`panel ${fullPanel ? "panel-max" : "panel-min"}`}>
			<div
				className="panel-handle"
				onClick={() => {
					setFullPanel((prevPanel) => {
						return !prevPanel;
					});
				}}
				onTouchStart={(e) => {
					onTouchStart(e);
				}}
				onTouchMove={(e) => {
					onTouchMove(e);
				}}
				onTouchEnd={() => {
					onTouchEnd();
				}}></div>
			<div className="panel-content-container">
				<AddressInput
					addresses={addresses}
					setAddresses={(position) => {
						const newAddresses = [...addresses, position];
						const center = getCenterOfCoords(newAddresses);
						setAddresses(newAddresses);
						mapRef.current?.panTo(center);
						setValue("");
					}}
					ready={ready}
					value={value}
					setValue={setValue}
					suggestions={suggestions}
					clearSuggestions={clearSuggestions}
					setFullPanel={setFullPanel}
				/>
				<div className="flex-grow">
					{addresses.length === 0 && <InfoBox />}
					{addresses.length !== 0 && (
						<AddressList
							addresses={addresses}
							setAddresses={setAddresses}
							fullPanel={fullPanel}
						/>
					)}
				</div>
				<OptimizeRouteButton
					addresses={addresses}
					setAddresses={setAddresses}
				/>
			</div>
		</div>
	);
};

export default Panel;
