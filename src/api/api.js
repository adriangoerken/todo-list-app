import axios from 'axios';
import { getCookie } from '../utils/utils';

const requestData = async (method, url, data = null, accessToken = null) => {
	try {
		const cookieLang = getCookie('language');
		const browserLanguage =
			cookieLang || navigator.language || navigator.userLanguage;

		const response = await axios({
			method: method,
			url: url,
			data: data,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': browserLanguage.substring(0, 2),
				...(accessToken && { Authorization: `Bearer ${accessToken}` }),
			},
		});

		return response.data;
	} catch (error) {
		if (error.response) {
			const responseData = error.response.data;
			console.error(
				`${method.toUpperCase()} response error:`,
				responseData.errorDebug || 'No additional error info available'
			);
			return {
				success: false,
				error:
					responseData.error ||
					'Unable to process your request. Please try again.',
				errorDebug:
					responseData.errorDebug ||
					'No additional error info available',
			};
		} else if (error.request) {
			console.error('No response received:', error.request);
			return {
				success: false,
				error: 'No response from the server. Please check your connection.',
				errorDebug: 'No server response',
			};
		} else {
			console.error(
				`${method.toUpperCase()} setup error:`,
				error.message
			);
			return {
				success: false,
				error: 'An unexpected error occurred. Please try again.',
				errorDebug: error.message,
			};
		}
	}
};

export const postData = async (url, newData, accessToken) =>
	requestData('post', url, newData, accessToken);

export const deleteData = async (url, accessToken) =>
	requestData('delete', url, null, accessToken);

export const getData = async (url, accessToken) =>
	requestData('get', url, null, accessToken);

export const putData = async (url, updatedData, accessToken) =>
	requestData('put', url, updatedData, accessToken);
