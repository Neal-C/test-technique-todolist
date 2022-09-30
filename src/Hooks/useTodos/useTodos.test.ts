// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generateID } from '../../utilFunctions';
import {
	clearAllTODOs,
	createAndPushNewTODOAtTop,
	deleteTODOById,
	toggleIsDoneStateAtGivenId,
	updateTODOById,
	todoReducer,
} from '../../ReduxToolkit/todoSlice';
import { ITODO } from '../../Types';

//module augmentation
// also : https://vitest.dev/guide/test-context.html#extend-test-context
declare module 'vitest' {
	interface TestContext {
		TODOS: Array<ITODO>;
	}
}

describe.concurrent('useTodos()', () => {
	beforeEach((context) => {
		context.TODOS = [
			{
				id: generateID(),
				title: 'title test 1',
				description: 'description',
				is_done: false,
			},
			{
				id: generateID(),
				title: 'title test 2',
				description: 'description',
				is_done: false,
			},
			{
				id: generateID(),
				title: 'title test 3',
				description: 'description',
				is_done: false,
			},
			{
				id: generateID(),
				title: 'title test 4',
				description: 'description',
				is_done: false,
			},
		];
	});

	it('should have all initial TODOs at false state', ({ TODOS }) => {
		//Act
		const RESULT = TODOS.filter((currentTodo) => currentTodo.is_done === true);
		const HAS_TRUE_TODOs = TODOS.some(
			(currentTodo) => currentTodo.is_done === true
		);
		//Assert
		expect(RESULT).toHaveLength(0);
		expect(HAS_TRUE_TODOs).toBe(false);
	});

	it('should set the TODOS to empty array', ({ TODOS }) => {
		//Act
		let result = todoReducer(TODOS, clearAllTODOs);
		//Assert
		expect(result).toHaveLength(0);
	});

	it('should delete the TODO with given ID', ({ TODOS }: any) => {
		//Arrange
		let ID = TODOS[0].id;
		//Act
		let result = todoReducer(TODOS, deleteTODOById(ID));
		//Assert
		expect(result[0].id).not.toMatch(ID);
	});

	it('should update the todo with input values', ({ TODOS }) => {
		//Arrange
		const ID = TODOS[0].id;
		const NEW_VALUES = {
			id: ID,
			title: 'new title',
			description: 'new description',
		};
		//Act
		let result = todoReducer(TODOS, updateTODOById(NEW_VALUES));
		//Assert
		expect(result[0].id).toEqual(NEW_VALUES.id);
		expect(result[0].title).toEqual(NEW_VALUES.title);
		expect(result[0].description).toEqual(NEW_VALUES.description);
	});

	it('should create a new TODO and have the new TODO at index 0', ({
		TODOS,
	}) => {
		//Arrange
		const NEW_TODO = { title: 'new title', description: 'new description' };
		//Act
		let result = todoReducer(TODOS, createAndPushNewTODOAtTop(NEW_TODO));
		//Assert
		expect(result[0].id).not.toBe(TODOS[0].id);
		expect(result).toHaveLength(TODOS.length + 1);
	});
	it('should create a new TODO', ({ TODOS }: any) => {
		//Arrange
		const NEW_TODO = { title: 'new title', description: 'new description' };
		//Act
		let result = todoReducer(TODOS, createAndPushNewTODOAtTop(NEW_TODO));

		//Assert
		expect(result[0].title).toBe(NEW_TODO.title);
		expect(result[0].description).toBe(NEW_TODO.description);
		expect(result[0]).toHaveProperty('id');
		expect(result[0]).toHaveProperty('is_done', false);
		expect(result).toHaveLength(TODOS.length + 1);
	});

	it('should toggle the state of the todo at given id', ({ TODOS }) => {
		//Arrange
		const TARGET_TODO = TODOS.at(2);
		if (!TARGET_TODO) return;
		const TARGET_TODO_ID = TARGET_TODO.id;
		//Act
		const RESULT = todoReducer(TODOS, toggleIsDoneStateAtGivenId(TARGET_TODO_ID));
		const TARGET_INDEX = RESULT.findIndex((todo) => todo.id === TARGET_TODO_ID);
		const THE_TRUTHY_TODO = RESULT.find((todo) => todo.is_done === true);
		const TESTED_TODO = RESULT[TARGET_INDEX];
		//Assert
		expect(THE_TRUTHY_TODO).toBeDefined();
		expect(THE_TRUTHY_TODO?.is_done).toEqual(true);
		expect(TESTED_TODO.is_done).toEqual(true);
	});

	it('should have at least 1 truthy TODO after a toggle action', ({ TODOS }) => {
		//Arrange
		const TARGET_TODO = TODOS.at(2);
		if (!TARGET_TODO) return;
		const TARGET_TODO_ID = TARGET_TODO.id;
		//Act
		const RESULT = todoReducer(TODOS, toggleIsDoneStateAtGivenId(TARGET_TODO_ID));
		const HAS_RESULT_TRUTHY_TODOs = RESULT.some((todo) => todo.is_done === true);
		//Assert
		expect(HAS_RESULT_TRUTHY_TODOs).toEqual(true);
	});

	it.todo('should have falsy TODOs at the beginning and truthy TODOs at the end', () => {
		//the TODOs filter length for true and the TODOs fitler length for false should equal TODOs length after a toggle action
	});

	it('should have truthy at the end of the array after a toggle action', ({
		TODOS,
	}) => {
		//array.findLast() //after toggle the last todo should have state true
		const TARGET_TODO = TODOS.at(2);
		if (!TARGET_TODO) return;
		const TARGET_TODO_ID = TARGET_TODO.id;
		const RESULT = todoReducer(TODOS, toggleIsDoneStateAtGivenId(TARGET_TODO_ID));

		const TESTED_TODO = RESULT.at(-1);
		expect(TESTED_TODO?.is_done).toBe(true);
	});

	it('should have a falsy TODO before the first truthy TODO after a toggle action', ({
		TODOS,
	}) => {
		//array.findLast or findIndexOfLast (todo => todo.is_done === false) and next index should have a todo at true
		// Assuming those operations don't return null and return a todo;

		//Arrange
		const TARGET_TODO = TODOS.at(3);
		if (!TARGET_TODO) return;
		const TARGET_TODO_ID = TARGET_TODO.id;
		//Act
		const RESULT = todoReducer(TODOS, toggleIsDoneStateAtGivenId(TARGET_TODO_ID));
		const INDEX_OF_FIRST_TRUTHY_TODO = RESULT.findIndex(
			(todo) => todo.is_done === true
		);
		//! Node.js does not support : findLastIndex
		// const INDEX_OF_LAST_FALSY_TODO = RESULT.findLastIndex(
		// 	(todo) => todo.is_done === true
		// );
		const INDEX_OF_LAST_FALSY_TODO = INDEX_OF_FIRST_TRUTHY_TODO - 1;
		const DIFFERENCE_BETWEEN_INDEXES =
			INDEX_OF_FIRST_TRUTHY_TODO - INDEX_OF_LAST_FALSY_TODO;
		const LAST_FALSY_TODO = RESULT[INDEX_OF_LAST_FALSY_TODO];
		//Assert
		expect(DIFFERENCE_BETWEEN_INDEXES).toBe(1);
		expect(LAST_FALSY_TODO.is_done).toBe(false);
	});
});
