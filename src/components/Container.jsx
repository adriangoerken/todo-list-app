import React from 'react';

const Container = ({ children, classNames = '' }) => {
	return (
		<div className={`container mx-auto p-6 ${classNames}`}>{children}</div>
	);
};

export default Container;
