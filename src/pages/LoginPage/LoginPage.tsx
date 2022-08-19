import cl from './LoginPage.module.css';
import { Button, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import { login } from '@/store/reducers/userAPI';


const LoginPage = () => {
	const [emailInput, setEmailInput] = useState<string>('tntwnik@gmail.com');
	const [emailError, setEmailError] = useState<string>('');
	const [passwordInput, setPasswordInput] = useState<string>('1234567');
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
				<h1>Login</h1>
				<div className={cl.loginInputsContainer}>
					<div className={cl.loginInputContainer}>
						<Input value={emailInput} placeholder={'Почта*'}
									 onChange={e => setEmailInput(e.target.value)} />
						{emailError && (<span className={cl.error}>{emailError}</span>)}
					</div>
					<div className={cl.loginInputContainer}>
						<Input value={passwordInput} placeholder={'Пароль*'}
									 onChange={e => setPasswordInput(e.target.value)} />
						{passwordError && (<span className={cl.error}>{passwordError}</span>)}
					</div>
				</div>
				{serverError && (<div className={cl.serverError}>{serverError}</div>)}
				<Button onClick={loginButtonHandler} className={cl.loginButton}>Login</Button>
			</div>
		</div>
	);
};

export default LoginPage;