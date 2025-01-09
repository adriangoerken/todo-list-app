import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import Container from '../components/organisms/Container';
import FeatureCard from '../components/molecules/FeatureCard';
import HeroSection from '../components/organisms/HeroSection';
import CTAButtons from '../components/molecules/CTAButtons';

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
				<HeroSection />

				{/* Feature Highlights */}
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
					<FeatureCard
						title="Organize by Priority"
						description="Sort tasks by priority to focus on what matters
							most."
					/>
					<FeatureCard
						title="Drag-and-Drop"
						description="Reorder tasks quickly and intuitively with
							drag-and-drop."
					/>
					<FeatureCard
						title="Multiple Lists"
						description="Manage multiple lists for personal, work, and more."
					/>
					<FeatureCard
						title="Mark as Done"
						description="Keep track of completed tasks effortlessly."
					/>
				</div>

				{/* Call-to-Action Buttons */}
				<CTAButtons />
			</section>
		</Container>
	);
};

export default IndexPage;
