import { useEffect, useState } from 'react';
import { TodosController, Todo } from './components';
import { createTodo, readTodos, updateTodo, deleteTodo } from './api';
import { addTodoInTodos, todoFinde, removeTodoInTodos, setTodoInTodos } from './utils';
import styles from './App.module.css';
import { NEW_TODO_ID } from './constats';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [searchingPhrase, setSerchingPhrase] = useState('');
	const [isAbcSorting, setIsAbcSorting] = useState(false);

	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos));
	};

	const onTodoSave = (todoId) => {
		const { title, completed } = todoFinde(todos, todoId) || {};

		if (todoId === NEW_TODO_ID) {
			createTodo({ title, completed }).then((id) => {
				let updatedTodos = setTodoInTodos(todos, {
					id: NEW_TODO_ID,
					isEditing: false,
				});
				updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
				updatedTodos = addTodoInTodos(updatedTodos, { id, title, completed });
				setTodos(updatedTodos);
			});
		} else {
			updateTodo({ id: todoId, title, completed }).then(() => {
				setTodos(setTodoInTodos(todos, { id: todoId, isEditing: false }));
			});
		}
	};

	const onTodoEdit = (id) => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }));
	};

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }));
	};
	const onTodoComletedChange = (id, newCompleted) => {
		const { title } = todoFinde(todos, id) || {};

		updateTodo({ id, title, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		});
	};

	const onTodoRemove = (id) => {
		deleteTodo(id).then(() => setTodos(removeTodoInTodos(todos, id)));
	};

	useEffect(() => {
		readTodos(searchingPhrase, isAbcSorting).then((loadedTodos) =>
			setTodos(loadedTodos),
		);
	}, [searchingPhrase, isAbcSorting]);

	return (
		<div className={styles.app}>
			<TodosController
				onTodoAdd={onTodoAdd}
				onSearch={setSerchingPhrase}
				onSorting={setIsAbcSorting}
			/>
			<div>
				{todos.map(({ id, title, completed, isEditing = false }) => (
					<Todo
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={() => onTodoEdit(id)}
						onTitleChange={(newCompleted) =>
							onTodoTitleChange(id, newCompleted)
						}
						onComletedChange={(newTitle) =>
							onTodoComletedChange(id, newTitle)
						}
						onSave={() => onTodoSave(id)}
						onRemove={() => onTodoRemove(id)}
					/>
				))}
			</div>
		</div>
	);
};
