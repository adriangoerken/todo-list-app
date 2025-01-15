import React, { useEffect } from 'react';
import { useAuth } from '../providers/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import Container from '../components/organisms/Container';
import FeatureCard from '../components/molecules/FeatureCard';
import HeroSection from '../components/organisms/HeroSection';
import CTAButtons from '../components/molecules/CTAButtons';
import { useTranslation } from 'react-i18next';

const IndexPage = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [t] = useTranslation('global');

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, [user, navigate]);

	return (
		<Container className="flex flex-grow justify-center">
			<section className="flex flex-col flex-grow self-center max-w-screen-md mx-auto text-center px-4">
				{/* Hero Section */}
				<HeroSection />

				{/* Feature Highlights */}
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
					<FeatureCard
						title={t('FeatureCard.cardOne.title')}
						body={t('FeatureCard.cardOne.body')}
					/>
					<FeatureCard
						title={t('FeatureCard.cardTwo.title')}
						body={t('FeatureCard.cardTwo.body')}
					/>
					<FeatureCard
						title={t('FeatureCard.cardThree.title')}
						body={t('FeatureCard.cardThree.body')}
					/>
					<FeatureCard
						title={t('FeatureCard.cardFour.title')}
						body={t('FeatureCard.cardFour.body')}
					/>
				</div>

				{/* Call-to-Action Buttons */}
				<CTAButtons />
			</section>
		</Container>
	);
};

export default IndexPage;
