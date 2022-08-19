import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import cl from './ContactsPage.module.css';
import { Input } from '@mui/material';
import { getContacts } from '@/store/reducers/userAPI';

export type ContactProps = {
	title: string;
	description: string;
	photo: string;
	id: number;
	userId: number;
}


const ContactsPage = () => {
	const { authorized, contacts, id } = useAppSelector(state => state.userSlice.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!authorized) {
			navigate('/login');
		} else {
			dispatch(getContacts(id!));
		}
	}, []);


	return (
		<div className={cl.contactsPage}>
			<div className={cl.contactsContainer}>
				<h2>Contacts</h2>
				<Input placeholder={'Поиск'} className={cl.contactsSearchInput} />
				<div className={cl.contacts}>
					{JSON.stringify(contacts)}
				</div>
			</div>
		</div>
	);
};

export default ContactsPage;