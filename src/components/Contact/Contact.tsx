import React, { FC, useEffect, useState } from 'react';
import { ContactProps } from '@/pages/ContactsPage/ContactsPage';
import cl from './Contact.module.css';
import { Avatar, IconButton, Input } from '@mui/material';
import editImg from '!/img/edit.svg';
import closeImg from '!/img/close.svg';
import { deleteContact, editContact } from '@/store/reducers/userAPI';
import { useAppDispatch } from '@/store';

const Contact: FC<{ contact: ContactProps }> = ({ contact }) => {
	const [editedContactActive, setEditedContactActive] = useState<boolean>(false);
	const [editedContactPhoto, setEditedContactPhoto] = useState<string>('');
	const [editedContact, setEditedContact] = useState<ContactProps>(contact);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setEditedContact(contact);
	}, [contact]);

	const editButtonHandler = () => {
		if (editedContactActive) {
			dispatch(editContact({ ...editedContact, photo: editedContactPhoto }));
			setEditedContactActive(false);
		} else {
			setEditedContactActive(true);
		}
	};

	const deleteButtonHandler = () => {
		if (editedContactActive) {
			setEditedContactActive(false);
			setEditedContact(contact);
		} else {
			dispatch(deleteContact(contact.id));
		}
	};

	const onAvatarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setEditedContactPhoto(reader.result as string);
		};
		reader.onerror = (error) => {
			console.log('Error: ', error);
		};
	};

	const onTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedContact({ ...editedContact, title: e.target.value });
	};

	const onDescInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedContact({ ...editedContact, description: e.target.value });
	};

	return (
		<div className={cl.contactContainer}>
			<div className={cl.contactInfoContainer}>

				{editedContactActive ?
					<label>
						<input onChange={onAvatarInputChange} style={{ display: 'none' }} type='file' />
						<Avatar style={{ borderRadius: '0', cursor: 'pointer' }} sx={{ width: 70, height: 70 }}
										src={editedContactPhoto} />
					</label> : <Avatar style={{ borderRadius: '0' }} sx={{ width: 70, height: 70 }} src={contact.photo} />
				}
				<div className={cl.contactInfo}>
					{editedContactActive ? (
						<>
							<Input placeholder={'Название контакта*'} value={editedContact.title} onChange={onTitleInputChange} />
							<Input placeholder={'Описание контакта'} value={editedContact.description} onChange={onDescInputChange} />
						</>
					) : (
						<>
							<span>{contact.title}</span>
							<span>{contact.description}</span>
						</>
					)}
				</div>
			</div>
			<div className={cl.contactEditButtons}>
				<IconButton onClick={editButtonHandler}>
					<img src={editImg} alt='' />
				</IconButton>
				<IconButton onClick={deleteButtonHandler}>
					<img src={closeImg} alt='' />
				</IconButton>
			</div>
		</div>
	);
};

export default Contact;