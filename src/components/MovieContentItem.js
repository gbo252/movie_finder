import React from "react";
import PropTypes from "prop-types";

const MovieContentItem = ({ item, text }) => {
	return (
		<div className="col-4" style={{ display: item ? "block" : "none" }}>
			<h5 style={{ display: item ? "block" : "none" }}>{text}</h5>
			<p>{text === "Runtime" ? (item || "").replace(/h/, "h ") : item}</p>
		</div>
	);
};

MovieContentItem.propTypes = {
	item: PropTypes.string,
	text: PropTypes.string
};

export default MovieContentItem;
