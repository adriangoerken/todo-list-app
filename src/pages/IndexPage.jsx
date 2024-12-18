import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthContextProvider';
import { useNavigate, Link } from 'react-router-dom';

const IndexPage = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, []);

	return (
		<>
			<Link to="signin">Sign In</Link>
			<br />
			<Link to="signup">Sign Up</Link>
		</>
	);
};

export default IndexPage;
