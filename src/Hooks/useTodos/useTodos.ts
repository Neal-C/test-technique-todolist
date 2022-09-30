import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
	clearAllTODOs,
	createAndPushNewTODOAtTop,
	deleteTODOById,
	toggleIsDoneStateAtGivenId,
	updateTODOById,
} from '../../ReduxToolkit/todoSlice';
import { ITODO } from '../../Types/itodo';

import type { RootState, AppDispatch } from '../../ReduxToolkit/todoSlice';
import { useCallback } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//!This is calling useAppSelector even in component throughoutat don't need it
//! This right here is a discouraged pattern, don't wrap RTK actions

export function useTodos() {
	const TODOS: Array<ITODO> = useAppSelector((state) => state.TODOS);

	const dispatch = useAppDispatch();

	const toggleIsDoneStateById = useCallback((id: number | string) => {
		return dispatch(toggleIsDoneStateAtGivenId(id));
	},[])

	function clearAllTheTODOS() {
		return dispatch(clearAllTODOs());
	}

	function createNewTODO(TODO: Pick<ITODO, "description"|"title">) {
		return dispatch(createAndPushNewTODOAtTop(TODO));
	}

	function deleteById(id: string | number) {
		return dispatch(deleteTODOById(id));
	}

	function updateTheTODOById(TODO: Partial<ITODO>) {
		return dispatch(updateTODOById(TODO));
	}

	return {
		TODOS,
		toggleIsDoneStateById,
		clearAllTheTODOS,
		createNewTODO,
		deleteById,
		updateTheTODOById
	} as const;
}
