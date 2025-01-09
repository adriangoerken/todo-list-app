import React from 'react';
import { BarLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<BarLoader color="#ffffff" />
		</div>
	);
};

export default Loader;
