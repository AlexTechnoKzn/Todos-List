import { get, orderByChild, query, ref, push, set, remove } from 'firebase/database';
import { db } from '../firebase';

export const createTodo = (newTodo) =>
	push(ref(db, 'todos'), newTodo).then(({ key }) => key);

export const readTodos = (searchingPhrase = '', isAbcSorting = false) => {
	const todosDbref = ref(db, 'todos');
	const sortingField = isAbcSorting ? 'title' : 'id';

	return get(query(todosDbref, orderByChild(sortingField))).then((snapshot) => {
		let loadedTodos = [];

		snapshot.forEach((todoSnapshot) => {
			const id = todoSnapshot.key;
			const { title, completed } = todoSnapshot.val();
			loadedTodos.push({ id, title, completed });
		});

		if (searchingPhrase !== '') {
			loadedTodos = loadedTodos.filter(
				({ title }) =>
					title.toLowerCase().indexOf(searchingPhrase.toLowerCase()) >= 0,
			);
		}

		return isAbcSorting ? loadedTodos : loadedTodos.reverse();
	});
};

export const updateTodo = (todoData) => set(ref(db, `todos/${todoData.id}`), todoData);

export const deleteTodo = (todoId) => remove(ref(db, `todos/${todoId}`));
