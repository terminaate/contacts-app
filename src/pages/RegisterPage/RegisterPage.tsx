import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '@/store/reducers/userAPI';
import cl from './RegisterPage.module.css';
import { Button, Input } from '@mui/material';

const RegisterPage = () => {
	const [emailInput, setEmailInput] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [passwordInput, setPasswordInput] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const dispatch = useAppDispatch();
	const { authorized, error: serverError } = useAppSelector(state => state.userSlice.user);
	const navigate = useNavigate();

	const registerButtonHandler = () => {
		setEmailError('');
		setPasswordError('');
		if (!emailInput) return setEmailError('Поле не должно быть пустым!');
		if (!passwordInput) return setPasswordError('Поле не должно быть пустым!');

		dispatch(register({ email: emailInput, password: passwordInput }));
	};

	useEffect(() => {
		if (authorized) {
			navigate('/contacts');
		}
	}, [authorized]);

	return (
		<div className={cl.registerPage}>
			<div className={cl.registerContainer}>
				<h1>Страница регистрации</h1>
				<div className={cl.registerInputsContainer}>
					<div className={cl.registerInputContainer}>
						<Input value={emailInput} placeholder={'Почта*'}
									 onChange={e => setEmailInput(e.target.value)} />
						{emailError && (<span className={cl.error}>{emailError}</span>)}
					</div>
					<div className={cl.registerInputContainer}>
						<Input type={"password"} value={passwordInput} placeholder={'Пароль*'}
									 onChange={e => setPasswordInput(e.target.value)} />
						{passwordError && (<span className={cl.error}>{passwordError}</span>)}
					</div>
				</div>
				{serverError && (<div className={cl.serverError}>{serverError}</div>)}
				<div className={cl.registerButtonsContainer}>
					<Link to={'/login'}>Уже есть аккаунт?</Link>
					<Button onClick={registerButtonHandler} className={cl.registerButton}>Зарегестрироваться</Button>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;