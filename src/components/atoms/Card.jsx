import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className }) => {
	return (
		<div
			className={`bg-elevation-300 p-4 rounded-lg ${className}`}
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
