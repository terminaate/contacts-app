import React, { useEffect } from 'react';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';

const ContactsPage = () => {
	const {authorized} = useAppSelector(state => state.userSlice.user);
	const navigate = useNavigate()

	useEffect(() => {
		if (!authorized) {
			console.log("Unauthorized");
			navigate("/login")
		}
	}, [])


	return (
		<div>
			Contacts
		</div>
	);
};

export default ContactsPage;