import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import cl from './ContactsPage.module.css';
import { Input } from '@mui/material';
import { getContacts } from '@/store/reducers/userAPI';
import Contact from '@/components/Contact';
import NewContact from '@/components/NewContact';

export type ContactProps = {
	title: string;
	description?: string;
	photo?: string;
	id: number;
	userId: number;
}


const ContactsPage = () => {
	const { authorized, contacts, id: userId } = useAppSelector(state => state.userSlice.user);
	// localContacts - переменная где хранятся варианты поиска
	const [localContacts, setLocalContacts] = useState<ContactProps[]>(contacts ?? []);
	const [searchInput, setSearchInput] = useState<string>('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setLocalContacts(contacts);
	}, [contacts]);

	useEffect(() => {
		if (!authorized) {
			navigate('/login');
		} else {
			dispatch(getContacts(userId!));
		}
	}, []);

	const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchInput(value);

		setLocalContacts(contacts.filter(contact => contact.title.includes(value)));
	};

	return (
		<div className={cl.contactsPage}>
			<div className={cl.contactsContainer}>
				<h2>Contacts</h2>
				<Input value={searchInput} onChange={onSearchInputChange} placeholder={'Поиск'}
							 className={cl.contactsSearchInput} />
				<div className={cl.contacts}>
					{localContacts ? localContacts.map((contact) => (
							<Contact contact={contact} key={contact.id} />
						)
					) : ''}
					<NewContact />
				</div>
			</div>
		</div>
	);
};

export default ContactsPage;