import { toast } from 'react-toastify';

export const handleError = (error, defaultMessage) => {
	toast.error(error || defaultMessage);
};
