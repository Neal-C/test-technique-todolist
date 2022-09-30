export const setToLocalStorage = (key: string, value: any): void => {
	if (!key && !value) return;
	if (key && typeof key === 'string') {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
};

export const getFromLocalStorage = (key: string) => {
	if (!key) return;
	if (key && typeof key === 'string') {
		try {
			return JSON.parse(window.localStorage.getItem(key) as string);
		} catch (error) {
			console.error(error);
			return null;
		}
	}
};