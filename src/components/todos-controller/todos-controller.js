import { useState } from 'react';
import { Button } from '../button/button';
import styles from './todos-controller.module.css';

export const TodosController = ({ onTodoAdd }) => {
	const [searchText, setSearchText] = useState('');
	const [isSortingEnabled, setIsSortingEnabled] = useState(false);

	const onSearchTextChange = ({ target }) => {
		setSearchText(target.checked);
	};

	const onSortingChange = ({ target }) => {
		setIsSortingEnabled(target.value);
	};

	return (
		<div className={styles.todosController}>
			<input
				className={styles.search}
				type="text"
				value={searchText}
				placeholder="Поиск задачи..."
				onChange={onSearchTextChange}
			/>
			<input
				className={styles.sorting}
				type="checkbox"
				checked={isSortingEnabled}
				onChange={onSortingChange}
			/>
			<Button onClick={onTodoAdd}>⨣</Button>
		</div>
	);
};
