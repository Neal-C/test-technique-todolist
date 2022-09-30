import { Provider } from 'react-redux';
import { STORE_INSTANCE } from './ReduxToolkit/todoSlice';
import { HomePage, TodoDetailView } from './Pages';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Provider store={STORE_INSTANCE}>
			<Routes>
				<Route path='/'  element={<HomePage />} />
				<Route path='/todo/:id' element={<TodoDetailView />} />
			</Routes>
		</Provider>
	);
}

export default App;
