import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { STORAGE_TODOS_KEY } from '../../Constants';

import { useTodos } from '../../Hooks';
import { ITODO } from '../../Types';
import { setToLocalStorage } from '../../utilFunctions';

export function TodoDetailView() {
	const { TODOS, updateTheTODOById } = useTodos();

	const [editMode, setEditMode] = useState<boolean>(false);

	const { id: URL_ID } = useParams();

	const THE_TODO_ON_PAGE = useMemo(() => {
		const CURRENT_TODO = TODOS.find((todo: ITODO) => todo.id === URL_ID);
		return CURRENT_TODO;
	}, [TODOS]);

	const TITLE_REF = useRef<HTMLInputElement | null>(null);
	const DESCRIPTION_REF = useRef<HTMLInputElement | null>(null);

	function handleUpdateTodoForm(event: FormEvent) {
		event.preventDefault();
		if (!THE_TODO_ON_PAGE) return;
		if (!TITLE_REF.current?.value.trim()) return;
		updateTheTODOById({
			id: THE_TODO_ON_PAGE.id,
			title: TITLE_REF.current.value,
			description: DESCRIPTION_REF?.current?.value,
		});
		setEditMode(false);
	}

	useEffect(() => {
		setToLocalStorage(STORAGE_TODOS_KEY, TODOS);
	}, [TODOS]);

	return (
		<main>
			{!editMode && (
				<section className='max-w-md px-8 py-4 mx-auto mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800'>
					<div className='flex justify-center -mt-16 md:justify-end'>
						<img
							className='object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400'
							alt='symbol'
							src='https://picsum.photos/200/300'
						/>
					</div>

					<h2 className='mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl'>
						{THE_TODO_ON_PAGE?.title} 🧾
					</h2>
					<h3 className='mt-2 font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl'>
						State : {THE_TODO_ON_PAGE?.is_done ? 'done' : 'yet to be done'}
					</h3>

					<p className='mt-2 text-gray-600 dark:text-gray-200'>{THE_TODO_ON_PAGE?.description}</p>

					<div className='flex justify-end mt-4'>
						<Link
							className='mr-2 inline-flex ring-1 ring-slate-3000 rounded shadow-md items-center justify-between p-3 bg-gradient-to-r from-red-300 to-orange-300 mt-10 mb:mt-20'
							to='/'>
							<span>Go back to the list</span>
						</Link>
						<button
							onClick={() => setEditMode(true)}
							type='button'
							className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
							Edit the the TODO
						</button>
					</div>
				</section>
			)}
			{editMode && (
				<section className='mt-3 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
					<form onSubmit={handleUpdateTodoForm}>
						<div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
							<div>
								<label className='text-gray-700 dark:text-gray-200' htmlFor='title'>
									Enter a title
								</label>
								<input
									placeholder={THE_TODO_ON_PAGE?.title}
									ref={TITLE_REF}
									id='title'
									required
									type='text'
									className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
								/>
							</div>

							<div>
								<label className='text-gray-700 dark:text-gray-200' htmlFor='description'>
									Maybe a description
								</label>
								<input
									placeholder={THE_TODO_ON_PAGE?.description}
									ref={DESCRIPTION_REF}
									id='description'
									type='text'
									className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring'
								/>
							</div>
						</div>
						<div className='flex justify-end mt-6'>
							<button
								type='submit'
								className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
								Save
							</button>
						</div>
					</form>
				</section>
			)}
		</main>
	);
}
