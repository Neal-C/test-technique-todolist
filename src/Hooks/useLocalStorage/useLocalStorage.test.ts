// @vitest-environment happy-dom

import { describe, it, beforeEach, expect, afterEach } from 'vitest';
import { getFromLocalStorage, setToLocalStorage } from '../../utilFunctions';


describe.concurrent('useLocaleStorage()', () => {
	
	beforeEach((context: any) => {
		window.localStorage.setItem('TEST_KEY', JSON.stringify('TEST_VALUE'));
		// const [getFromLocalStorage, setToLocaleStorage] = useLocalStorage();
		context.getFromLocalStorage = getFromLocalStorage;
		context.setToLocalStorage = setToLocalStorage;
	});

	afterEach(() => {
		window.localStorage.clear();
	});

	it('should store value into LocaleStorage', ({ setToLocalStorage }: any) => {
		//Arrange
		const VALUE = 'value';
		const KEY = 'KEY';
		//Act
		setToLocalStorage(KEY, VALUE);
		let result = JSON.parse(window.localStorage.getItem(KEY) as string);
		expect(result).toBeDefined();
		expect(result).toEqual(VALUE);
	});

	it('should JSON.stringify objects', ({ setToLocalStorage }: any) => {
		const VALUE = {id: 1};
		const KEY = 'KEY';
		setToLocalStorage(KEY, VALUE);
		let result = window.localStorage.getItem(KEY);

		expect(result).toEqual(JSON.stringify(VALUE))
	});

	it('should get value from LocalStorage when key exists', ({
		getFromLocalStorage,
	}: any) => {
		expect(getFromLocalStorage('TEST_KEY')).toBe('TEST_VALUE');
	});
});
