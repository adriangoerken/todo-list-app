import PropTypes from 'prop-types';
import Card from '../atoms/Card';

const FeatureCard = ({ title, body }) => (
	<Card>
		<h3 className="text-xl font-semibold mb-2 text-blue-700">{title}</h3>
		<p>{body}</p>
	</Card>
);

FeatureCard.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};

export default FeatureCard;
