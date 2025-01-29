import React from 'react';
import PropTypes from 'prop-types';

const H2 = ({ text }) => {
	return (
		<h2 className="text-3xl font-semibold tracking-normal text-white mb-2">
			{text}
		</h2>
	);
};

H2.propTypes = {
	text: PropTypes.string.isRequired,
};

export default H2;
