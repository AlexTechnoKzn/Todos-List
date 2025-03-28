export const debounce = (fn, delay) => {
	let timeId;

	return (...args) => {
		clearTimeout(timeId);
		timeId = setTimeout(fn, delay, ...args);
	};
};
