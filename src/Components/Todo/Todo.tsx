import { Link } from 'react-router-dom';
import { useTodos } from '../../Hooks';

interface ITODOProps {
	id: string | number;
	title: string;
	is_done: boolean;
}

export function TODO(properties: ITODOProps) {
	const { id, title, is_done } = properties;

	const { toggleIsDoneStateById, deleteById } = useTodos();

	return (
		<li
			className='
    [&:nth-child(1n+1)]:bg-yellow-200
    [&:nth-child(2n+2)]:bg-cyan-300
    [&:nth-child(3n+3)]:bg-gradient-to-r
    [&:nth-child(3n+3)]:from-violet-500
    [&:nth-child(3n+3)]:to-fuchsia-500

      relative mt-5 p-6 text-gray-900 rounded shadow-md transition-transform hover:-translate-y-2 will-change-transform'>
			<input
				type='checkbox'
				checked={is_done}
				onChange={() => toggleIsDoneStateById(id)}
			/>
			<h3 className='relative flex justify-between align-center'>
				<span className='text-xl mb-2 font-medium'>{title}</span>
				<Link to={`/todo/${id}`} className='relative z-10 top-[6px] pl-4 text-sm cursor-pointer'>
					#DetailView
				</Link>
			</h3>
			<span className='mr-1 relative z-10'>
				{is_done ? '#Done' : '#yetToBeDone'}
			</span>
			<span
				onClick={() => deleteById(id)}
				className=' ml-1 relative z-10 cursor-pointer'>
				#Delete
			</span>
		</li>
	);
}
