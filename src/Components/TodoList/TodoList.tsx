import { useEffect } from 'react';
import { STORAGE_TODOS_KEY } from '../../Constants';
import { useTodos } from '../../Hooks';
import { ITODO } from '../../Types/itodo';
import { setToLocalStorage } from '../../utilFunctions';
import { List } from '../List/List';
import { TODO } from '../Todo/Todo';

export function TodoList() {
	let { TODOS } = useTodos();

	useEffect(() => {
		setToLocalStorage(STORAGE_TODOS_KEY, TODOS);
	}, [TODOS]);

	return (
		<>
			{!!!TODOS.length && <h2>You ain't got nothing to do ?! 😮</h2>}
			{!!TODOS.length && (
				<List>
					{TODOS.map((currentTodo: ITODO) => {
						const { id, title, is_done } = currentTodo;
						return <TODO key={id} id={id} title={title} is_done={is_done} />;
					})}
				</List>
			)}
		</>
	);
}
