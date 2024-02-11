export const basicErrorHandler = (error: Readonly<Error>) => {
	return {
		status: 'error',
		message: error.toString().replace('Error: ', '')
	};
};