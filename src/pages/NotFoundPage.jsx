import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const NotFoundPage = () => {
	return (
		<Container classNames="flex flex-grow justify-center">
			<section className="text-center flex flex-col justify-center items center h96">
				<h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
				<Link to="/">Go Back</Link>
			</section>
		</Container>
	);
};

export default NotFoundPage;
