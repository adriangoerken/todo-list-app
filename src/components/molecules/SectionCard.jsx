import H2 from '../atoms/H2';

const SectionCard = ({ title, children }) => {
	return (
		<div className="bg-elevation-300 rounded-lg p-4">
			<H2 className="text-start" text={title}></H2>
			{children}
		</div>
	);
};

export default SectionCard;
