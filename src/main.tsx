import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

// Если вы смотрите это, то скажу заранее - большинство перерисовок в приложении идут как я понял из-за компонентов mui

// TOOD
// Поработать над оптимизацией приложения

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</BrowserRouter>
);
