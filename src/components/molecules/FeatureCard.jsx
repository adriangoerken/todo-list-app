import PropTypes from 'prop-types';

const FeatureCard = ({ title, body }) => (
	<div className="bg-elevation-200 p-6 rounded-lg shadow-md">
		<h3 className="text-xl font-semibold mb-2 text-blue-700">{title}</h3>
		<p>{body}</p>
	</div>
);

FeatureCard.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};

export default FeatureCard;
