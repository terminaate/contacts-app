import React, { FC, useEffect, useState } from 'react';
import { ContactProps } from '@/pages/ContactsPage/ContactsPage';
import cl from './Contact.module.css';
import { Avatar, IconButton } from '@mui/material';
import editImg from '!/img/edit.svg';
import closeImg from '!/img/close.svg';
import { deleteContact } from '@/store/reducers/userAPI';
import { useAppDispatch } from '@/store';

const Contact: FC<{ contact: ContactProps }> = ({ contact }) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedContact, setEditedContact] = useState<ContactProps>(contact);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setEditedContact(contact);
	}, [contact]);

	const editButtonHandler = () => {
		if (isEditing) {
		} else {
			setIsEditing(true);
		}
	};

	const deleteButtonHandler = () => {
		if (isEditing) {
			setIsEditing(false);
			setEditedContact(contact);
		} else {
			dispatch(deleteContact(contact.id));
		}
	};

	return (
		<div className={cl.contactContainer}>
			<div className={cl.contactInfoContainer}>

				{isEditing ? (
					<label>
						<input type='file' />
						<Avatar style={{ borderRadius: '0' }} sx={{ width: 70, height: 70 }} src={editedContact.photo} />
					</label>
				) : (
					<Avatar style={{ borderRadius: '0' }} sx={{ width: 70, height: 70 }} src={contact.photo} />
				)}
				<div className={cl.contactInfo}>
					<span>{contact.title}</span>
					<span>{contact.description}</span>
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