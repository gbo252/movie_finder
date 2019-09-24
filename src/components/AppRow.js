import React from "react";
import PropTypes from "prop-types";

const AppRow = ({ children }) => {
	return (
		<div className="row App text-white position-absolute text-center d-flex justify-content-center">
			{children}
		</div>
	);
};

AppRow.propTypes = {
	children: PropTypes.object
};

export default AppRow;