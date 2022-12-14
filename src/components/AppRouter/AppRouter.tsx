import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import ContactsPage from '@/pages/ContactsPage';
import { DialogTitle } from '@mui/material';
import cl from './AppRouter.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout, updateUser } from '@/store/reducers/userSlice';
import RegisterPage from '@/pages/RegisterPage';

const AppRouter = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.userSlice);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (localStorage.getItem('accessToken') && localStorage.getItem('user')) {
			dispatch(updateUser({
				accessToken: localStorage.getItem('accessToken'),
				authorized: true,
				...JSON.parse(localStorage.getItem('user')!)
			}));
		}
	}, []);


	useEffect(() => {
		dispatch(updateUser({ error: null }));
	}, [location]);

	const logoutHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

	const redirectToGithub = () => {
		window.open('https://github.com/terminaate/contacts-app', '_blank');
	};

	return (
		<>
			<div className={cl.header}>
				<DialogTitle onClick={redirectToGithub}>Contacts App</DialogTitle>
				{user.authorized && (<DialogTitle onClick={logoutHandler}>{String(user.email)}</DialogTitle>)}
			</div>
			<Routes>
				<Route path={'/'} element={<Navigate to={user.authorized ? '/contacts' : '/login'} />} />
				<Route element={<LoginPage />} path={'/login'} />
				<Route element={<RegisterPage />} path={'/register'} />
				<Route element={<ContactsPage />} path={'/contacts'} />
			</Routes>
		</>
	);
};

export default AppRouter;