import React, { useState } from 'react';
import cl from './NewContact.module.css';
import { Avatar, IconButton, Input } from '@mui/material';
import createImg from '!/img/create.png';
import closeImg from '!/img/close.svg';
import { ContactProps } from '@/pages/ContactsPage/ContactsPage';
import { useAppDispatch, useAppSelector } from '@/store';
import { addContact } from '@/store/reducers/userAPI';

const NewContact = () => {
	const { id: userId } = useAppSelector(state => state.userSlice.user);
	const dispatch = useAppDispatch();
	const [newContactActive, setNewContactActive] = useState<boolean>(false);
	const [newContactPhoto, setNewContactPhoto] = useState<string>('');
	const [newContact, setNewContact] = useState<ContactProps>({
		title: '',
		description: '',
		userId
	} as ContactProps);


	const newContactButtonHandler = () => {
		if (newContactActive) {
			if (!newContact.title) return;
			dispatch(addContact({ ...newContact, photo: newContactPhoto }));
			closeNewContact();
		} else {
			setNewContactActive(true);
		}
	};

	const onAvatarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setNewContactPhoto(reader.result as string);
		};
		reader.onerror = (error) => {
			console.log('Error: ', error);
		};
	};

	const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewContact({ ...newContact, title: e.target.value });
	};

	const onDescInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewContact({ ...newContact, description: e.target.value });
	};

	const closeNewContact = () => {
		setNewContact({
			...newContact,
			title: '',
			description: ''
		});
		setNewContactActive(false);
		setNewContactPhoto('');
	};

	return (
		<div onClick={!newContactActive ? newContactButtonHandler : () => 0} data-active={newContactActive}
				 className={cl.addNewContactContainer}>
			{!newContactActive ? <span>New contact</span> :
				<>
					<div className={cl.newContactInfoContainer}>
						<label>
							<input style={{ display: 'none' }} type='file'
										 onChange={onAvatarInputChange} />
							<Avatar style={{ borderRadius: '0', cursor: 'pointer' }} sx={{ width: 70, height: 70 }}
											src={newContactPhoto} />
						</label>
						<div className={cl.newContactInfo}>
							<Input placeholder={'Название контакта*'} value={newContact.title} onChange={onTitleInputChange} />
							<Input placeholder={'Описание контакта'} value={newContact.description}
										 onChange={onDescInputChange} />
						</div>
					</div>
					<div className={cl.newContactButtons}>
						<IconButton onClick={newContactButtonHandler}>
							<img src={createImg} alt='' />
						</IconButton>
						<IconButton onClick={closeNewContact}>
							<img src={closeImg} alt='' />
						</IconButton>
					</div>
				</>
			}
		</div>
	);
};

export default NewContact;