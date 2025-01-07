import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';

const DeleteButton = ({ onclick }) => (
	<button onClick={onclick}>
		<MdDeleteForever />
	</button>
);

DeleteButton.propTypes = {
	onclick: PropTypes.func.isRequired,
};

export default DeleteButton;
