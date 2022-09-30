import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage(key: string, defaultValue: any) {
	const [value, setValue] = useState(() => {
		if (!key) return;
		if(typeof window === undefined) return defaultValue;
		if (key && typeof key === 'string') {
			try {
				const JSON_STRING_VALUE = window.localStorage.getItem(key);
				if (JSON_STRING_VALUE !== null) return JSON.parse(JSON_STRING_VALUE);
				return defaultValue instanceof Function ? defaultValue() : defaultValue;
			} catch (error) {
				console.error(error);
				return defaultValue;
			}
		}
	});

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	useEffect(() => {
		if (value === undefined) {
			return window.localStorage.removeItem(key);
		}
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue, remove] as const;
}
