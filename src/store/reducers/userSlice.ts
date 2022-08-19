import { createSlice } from '@reduxjs/toolkit';
import { deleteContact, getContacts, login } from '@/store/reducers/userAPI';
import { ContactProps } from '@/pages/ContactsPage/ContactsPage';


export interface UserState {
	user: {
		id: null | number;
		accessToken: null | string;
		error: null | string;
		authorized: boolean;
		email: null | string;
		contacts: ContactProps[]
	}
}

const initialState: UserState = {
	user: {
		id: null,
		email: null,
		authorized: false,
		error: null,
		accessToken: null,
		contacts: []
	}
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser(state, action) {
			state.user = { ...state.user, ...action.payload };
		},
		logout(state) {
			state.user = initialState.user;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('user');
		}
	},
	extraReducers: (builder) => {
		// Простите за то что использую здесь тип any, просто я правда для action не нашёл типизации

		const handleReject = (state: UserState, action: any) => {
			state.user.error = action.payload;
		};

		const handlePending = (state: UserState) => {
			state.user.error = null;
		};

		const asyncThunks = [login, getContacts, deleteContact];
		for (let asyncThunk of asyncThunks) {
			builder.addCase(asyncThunk.pending, handlePending);
			builder.addCase(asyncThunk.rejected, handleReject);
		}

		builder.addCase(login.fulfilled, (state, action: any) => {
			state.user = { ...action.payload.user, accessToken: action.payload.accessToken, error: null, authorized: true };
			localStorage.setItem('accessToken', state.user.accessToken!);
			localStorage.setItem('user', JSON.stringify({ id: state.user.id, email: state.user.email }));
		});

		builder.addCase(getContacts.fulfilled, (state, action: any) => {
			state.user.contacts = action.payload;
		});

		builder.addCase(deleteContact.fulfilled, (state, action: any) => {
			console.log(action);
			state.user.contacts = state.user.contacts.filter(contact => contact.id !== action.payload);
		});
	}
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;