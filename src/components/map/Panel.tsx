import React from "react";
import AddressList from "../controls/AddressList";
import usePlacesAutocomplete from "use-places-autocomplete";
import OptimizeRouteButton from "../controls/OptimizeRouteButton";
import { GoogleMap } from "@react-google-maps/api";
import AddressInput from "../controls/AddressInput";
import useSwipe from "../../hooks/useSwipe";
import InfoBox from "../controls/InfoBox";
import { getCenterOfCoords } from "../../utils/mathUtils";
import { useAddresses } from "../../context/AddressesProvider";

type PanelProps = {
	mapRef: React.MutableRefObject<GoogleMap | undefined>;
	fullPanel: boolean;
	setFullPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const Panel = ({ mapRef, fullPanel, setFullPanel }: PanelProps) => {
	const { ready, value, setValue, suggestions, clearSuggestions } =
		usePlacesAutocomplete();

	const { addresses, setAddresses } = useAddresses();

	const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe({
		direction: "vertical",
		downFunction: () => setFullPanel(false),
		upFunction: () => setFullPanel(true),
	});

	return (
		<div className={`panel ${fullPanel ? "panel-max" : "panel-min"}`}>
			<div
				className="panel-handle"
				onClick={() => setFullPanel((prevPanel) => !prevPanel)}
				onTouchStart={(e) => onTouchStart(e)}
				onTouchMove={(e) => onTouchMove(e)}
				onTouchEnd={() => onTouchEnd()}></div>
			<div className="panel-content-container">
				<AddressInput
					setAddressesOnSelect={(position) => {
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
					{!!(addresses.length === 0) && <InfoBox />}
					{!!(addresses.length !== 0) && (
						<AddressList fullPanel={fullPanel} />
					)}
				</div>
				<OptimizeRouteButton />
			</div>
		</div>
	);
};

export default Panel;
