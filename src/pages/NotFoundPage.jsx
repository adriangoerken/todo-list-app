import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<section className="text-center flex flex-col justify-center items center h96">
			<h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
			<Link to="/">Go Back</Link>
		</section>
	);
};

export default NotFoundPage;
