import React from "react";
import Places from "../controls/AddressInput";
import AddressList from "../controls/AddressList";
import usePlacesAutocomplete from "use-places-autocomplete";
import OptimizeRouteButton from "../controls/OptimizeRouteButton";
import { GoogleMap } from "@react-google-maps/api";
import { Address } from "../../pages";

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

	return (
		<div className={`panel ${fullPanel ? "panel-max" : "panel-min"}`}>
			<div
				className="panel-handle"
				onClick={() => {
					setFullPanel((prevPanel) => {
						return !prevPanel;
					});
				}}></div>
			<Places
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
			{addresses.length !== 0 && (
				<AddressList
					addresses={addresses}
					setAddresses={setAddresses}
				/>
			)}
			<OptimizeRouteButton
				addresses={addresses}
				setAddresses={setAddresses}
			/>
		</div>
	);
};

export default Panel;
