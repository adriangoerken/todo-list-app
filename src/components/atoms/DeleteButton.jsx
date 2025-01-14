import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';

const DeleteButton = ({ onClick }) => (
	<button onClick={onClick} className="text-xl">
		<MdDeleteForever />
	</button>
);

DeleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
