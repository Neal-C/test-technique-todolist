import { FormEvent, useRef } from 'react';
import { useTodos } from '../../Hooks';

export function TodoForm() {
	const { createNewTODO, clearAllTheTODOS } = useTodos();

	const TITLE_REF = useRef<HTMLInputElement | null>(null);
	const DESCRIPTION_REF = useRef<HTMLInputElement | null>(null);

	const formReset = () => {
		(TITLE_REF.current as HTMLInputElement).value = '';
		(DESCRIPTION_REF.current as HTMLInputElement).value = '';
	};

	function handleTodoFormSubmit(event: FormEvent) {
		event.preventDefault();
		try {
			if (!TITLE_REF) return;
			if (!TITLE_REF.current?.value.trim()) return;

			createNewTODO({
				title: TITLE_REF.current.value,
				description: DESCRIPTION_REF?.current?.value ?? "",
			});
		} finally {
			formReset();
		}
	}

	return (
		<section className='mt-3 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
			<form onSubmit={handleTodoFormSubmit}>
				<div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
					<div>
						<label className='text-gray-700 dark:text-gray-200' htmlFor='title'>
							Enter a title
						</label>
						<input
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
				<div className='flex justify-end mt-6'>
					<button
						onClick={clearAllTheTODOS}
						type='button'
						className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
						Clear the todos
					</button>
				</div>
			</form>
		</section>
	);
}
