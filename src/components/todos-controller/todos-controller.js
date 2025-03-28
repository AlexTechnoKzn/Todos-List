import { Button } from '../button/button';
import { Search, Sorting } from './components';
import styles from './todos-controller.module.css';

export const TodosController = ({ onTodoAdd, onSearch, onSorting }) => {
	return (
		<div className={styles.todosController}>
			<Search onSearch={onSearch} />
			<Sorting onSorting={onSorting} />
			<Button onClick={onTodoAdd}>⨣</Button>
		</div>
	);
};
