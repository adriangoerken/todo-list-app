import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthContextProvider';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../components/Container';

const IndexPage = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, [user, navigate]);

	return (
		<Container classNames="flex flex-grow justify-center">
			<section className="flex flex-col flex-grow self-center max-w-screen-md mx-auto text-center px-4">
				{/* Hero Section */}
				<h1 className="text-4xl md:text-5xl font-bold mb-6">
					Welcome to
					<br />
					<span className="text-blue-700">WorkingTitle</span>!
				</h1>
				<p className="text-lg md:text-xl mb-8">
					Organize your tasks with ease. Create multiple lists,
					prioritize, mark as done, and drag-and-drop to reorder your
					tasks seamlessly.
				</p>

				{/* Feature Highlights */}
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
					<div className="bg-gray-800 p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-2 text-blue-700">
							Organize by Priority
						</h3>
						<p>
							Sort tasks by priority to focus on what matters
							most.
						</p>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-2 text-blue-700">
							Drag-and-Drop
						</h3>
						<p>
							Reorder tasks quickly and intuitively with
							drag-and-drop.
						</p>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-2 text-blue-700">
							Multiple Lists
						</h3>
						<p>
							Manage multiple lists for personal, work, and more.
						</p>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-2 text-blue-700">
							Mark as Done
						</h3>
						<p>Keep track of completed tasks effortlessly.</p>
					</div>
				</div>

				{/* Call-to-Action Buttons */}
				<div className="mt-10 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
					<Link
						to="signin"
						className="border border-blue-700 hover:border-blue-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md transition-all"
					>
						Sign In
					</Link>
					<Link
						to="signup"
						className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-all"
					>
						Sign Up
					</Link>
				</div>
			</section>
		</Container>
	);
};

export default IndexPage;
