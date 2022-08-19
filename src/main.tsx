import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</BrowserRouter>
);
