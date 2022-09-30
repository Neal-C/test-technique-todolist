import { MainContainer, TodoForm, TodoList } from '../../Components';

export function HomePage() {
	return (
		<MainContainer>
			<h1 className='text-3xl tracking-wide font-extrabold text-center sm:text-5xl'>
				 📜📃My Todo List 📑📄
			</h1>
			<TodoForm />
			<TodoList />
		</MainContainer>
	);
}
