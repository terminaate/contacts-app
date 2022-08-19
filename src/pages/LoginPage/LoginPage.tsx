import cl from './LoginPage.module.css';
import { Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/store/reducers/userAPI';


const LoginPage = () => {
	const [emailInput, setEmailInput] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [passwordInput, setPasswordInput] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const dispatch = useAppDispatch();
	const { authorized, error: serverError } = useAppSelector(state => state.userSlice.user);
	const navigate = useNavigate();

	const loginButtonHandler = () => {
		setEmailError('');
		setPasswordError('');
		if (!emailInput) return setEmailError('Поле не должно быть пустым!');
		if (!passwordInput) return setPasswordError('Поле не должно быть пустым!');

		dispatch(login({ email: emailInput, password: passwordInput }));
	};

	useEffect(() => {
		if (authorized) {
			navigate('/contacts');
		}
	}, [authorized]);

	return (
		<div className={cl.loginPage}>
			<div className={cl.loginContainer}>
				<h1>Страница входа</h1>
				<div className={cl.loginInputsContainer}>
					<div className={cl.loginInputContainer}>
						<Input value={emailInput} placeholder={'Почта*'}
									 onChange={e => setEmailInput(e.target.value)} />
						{emailError && (<span className={cl.error}>{emailError}</span>)}
					</div>
					<div className={cl.loginInputContainer}>
						<Input type={'password'} value={passwordInput} placeholder={'Пароль*'}
									 onChange={e => setPasswordInput(e.target.value)} />
						{passwordError && (<span className={cl.error}>{passwordError}</span>)}
					</div>
				</div>
				{serverError && (<div className={cl.serverError}>{serverError}</div>)}
				<div className={cl.loginButtonsContainer}>
					<Link to={'/register'}>Ещё нету аккаунта?</Link>
					<Button onClick={loginButtonHandler} className={cl.loginButton}>Войти</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;