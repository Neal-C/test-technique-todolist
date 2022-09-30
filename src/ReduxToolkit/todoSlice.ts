import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ITODO } from '../Types/itodo';
import { generateID, getFromLocalStorage } from '../utilFunctions';
import { STORAGE_TODOS_KEY } from '../Constants';

const INITIAL_STATE: Array<ITODO> = getFromLocalStorage(STORAGE_TODOS_KEY) ?? [
	{ id: generateID(), title: 'escape earth', description: 'description', is_done: false },
	{ id: generateID(), title: 'take control of Mars', description: 'description', is_done: false },
	{ id: generateID(), title: 'hunt divergents on Mars', description: 'description', is_done: false },
	{ id: generateID(), title: 'establish dynasty', description: 'description', is_done: false },
];

const TODO_SLICE = createSlice({
	name: 'TODOS',
	initialState: INITIAL_STATE,
	reducers: {
		createAndPushNewTODOAtTop: (
			CURRENT_STATE,
			ACTION: PayloadAction<Pick<ITODO, 'title' | 'description'>>
		) => {
			const NEW_TODO: ITODO = {
				id: generateID(),
				title: ACTION.payload.title as string,
				description: ACTION.payload.description as string,
				is_done: false,
			};
			CURRENT_STATE.unshift(NEW_TODO);
		},
		deleteTODOById: (CURRENT_STATE, ACTION: PayloadAction<number | string>) => {
			return CURRENT_STATE.filter((TODO) => {
				return TODO.id !== ACTION.payload;
			});
		},
		clearAllTODOs: (CURRENT_STATE) => {
			window.localStorage.clear();
			CURRENT_STATE = [];
			return CURRENT_STATE;
		},
		toggleIsDoneStateAtGivenId: (CURRENT_STATE, ACTION: PayloadAction<number | string>) => {
			const TODO_TO_TOGGLE = CURRENT_STATE.find((todo) => todo.id === ACTION.payload);

			if (!TODO_TO_TOGGLE) return;

			TODO_TO_TOGGLE.is_done = !TODO_TO_TOGGLE.is_done;

			CURRENT_STATE = CURRENT_STATE.sort((a, b): number => {
				if (a.is_done && !b.is_done) {
					return 1;
				}
				if (b.is_done && !a.is_done) {
					return -1;
				}
				return 0;
			});

			return CURRENT_STATE;
		},
		updateTODOById: (CURRENT_STATE, ACTION: PayloadAction<Partial<ITODO>>) => {
			let TODO_TO_UPDATE = CURRENT_STATE.find((todo) => todo.id === ACTION.payload.id);

			if (TODO_TO_UPDATE) {
				TODO_TO_UPDATE.is_done = ACTION.payload.is_done ?? TODO_TO_UPDATE.is_done;
				TODO_TO_UPDATE.title = ACTION.payload.title ?? TODO_TO_UPDATE.title;
				TODO_TO_UPDATE.description = ACTION.payload.description ?? TODO_TO_UPDATE.description;
			}

			return CURRENT_STATE;
		},
	},
});

export type RootState = ReturnType<typeof STORE_INSTANCE.getState>;
export type AppDispatch = typeof STORE_INSTANCE.dispatch;

export const {
	clearAllTODOs,
	createAndPushNewTODOAtTop,
	deleteTODOById,
	toggleIsDoneStateAtGivenId,
	updateTODOById,
} = TODO_SLICE.actions;

//! testing purposes
export const todoReducer = TODO_SLICE.reducer;

export const STORE_INSTANCE = configureStore({
	reducer: {
		TODOS: TODO_SLICE.reducer,
	},
});
