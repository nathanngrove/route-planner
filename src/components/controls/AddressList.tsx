import React from "react";

type AddressListProps = {
	children: React.ReactNode
}

const AddressList = ({ children } : AddressListProps) => {
	return <ul className="address-list">{children}</ul>;
};

export default AddressList;
