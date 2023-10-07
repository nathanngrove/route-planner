import React from "react";
import Places from "../controls/Places";
import AddressList from "../controls/AddressList";
import AddressListItem from "../controls/AddressListItem";
import usePlacesAutocomplete from "use-places-autocomplete";
import OptimizeRouteButton from "../controls/OptimizeRouteButton";
import { GoogleMap } from "@react-google-maps/api";
import { Address } from "../../pages";

type PanelProps = {
	mapRef: React.MutableRefObject<GoogleMap | undefined>
	addresses: Array<Address>
	setAddresses : (addresses: Array<Address>)=>void
}

const Panel = ({ mapRef, addresses, setAddresses } : PanelProps) => {
	const { ready, value, setValue, suggestions, clearSuggestions } =
		usePlacesAutocomplete();

	return (
		<>
			<div className="panel-handle"></div>
			<Places
				addresses={addresses}
				setAddresses={(position) => {
					setAddresses([...addresses, position]);
					mapRef.current?.panTo(position.latLng);
					setValue("");
				}}
				ready={ready}
				value={value}
				setValue={setValue}
				suggestions={suggestions}
				clearSuggestions={clearSuggestions}
			/>
			<AddressList>
				{addresses.map(({ address, latLng }) => (
					<AddressListItem
						key={latLng.lat + latLng.lng}
						address={address}
						addresses={addresses}
						setAddresses={setAddresses}
					/>
				))}
			</AddressList>
			<OptimizeRouteButton />
		</>
	);
};

export default Panel;
