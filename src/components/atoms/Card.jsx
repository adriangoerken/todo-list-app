import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className }) => {
	return (
		<div
			className={`bg-elevation-200 p-6 rounded-lg shadow-md ${className}`}
		>
			{children}
		</div>
	);
};

Card.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Card;
