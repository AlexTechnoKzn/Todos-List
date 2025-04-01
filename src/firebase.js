import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCwncGTC87N9P8khuqriJXb0chVilDEhjY',
	authDomain: 'todos-list-62119.firebaseapp.com',
	projectId: 'todos-list-62119',
	storageBucket: 'todos-list-62119.firebasestorage.app',
	messagingSenderId: '92774852344',
	appId: '1:92774852344:web:0af56647574eb72ddc7d0d',
	databaseURL:
		'https://todos-list-62119-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
