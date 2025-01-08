import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';

const DeleteButton = ({ onclick }) => (
	<button onClick={onclick} className="text-xl">
		<MdDeleteForever />
	</button>
);

DeleteButton.propTypes = {
	onclick: PropTypes.func.isRequired,
};

export default DeleteButton;
