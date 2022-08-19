import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, editContact, getContacts, login, register } from '@/store/reducers/userAPI';
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
		// Извиняюсь за использование здесь типа any, просто я не смог найти для action типа

		const handleReject = (state: UserState, action: any) => {
			state.user.error = action.payload;
		};

		const handlePending = (state: UserState) => {
			state.user.error = null;
		};

		const asyncThunks = [login, register, getContacts, deleteContact, addContact];
		for (let asyncThunk of asyncThunks) {
			builder.addCase(asyncThunk.pending, handlePending);
			builder.addCase(asyncThunk.rejected, handleReject);
		}

		const handleAuth = (state: UserState, action: any) => {
			state.user = { ...action.payload.user, accessToken: action.payload.accessToken, error: null, authorized: true };
			localStorage.setItem('accessToken', state.user.accessToken!);
			localStorage.setItem('user', JSON.stringify({ id: state.user.id, email: state.user.email }));
		};

		builder.addCase(login.fulfilled, handleAuth);
		builder.addCase(register.fulfilled, handleAuth);

		builder.addCase(getContacts.fulfilled, (state, action: any) => {
			state.user.contacts = action.payload;
		});

		builder.addCase(deleteContact.fulfilled, (state, action: any) => {
			state.user.contacts = state.user.contacts.filter(contact => contact.id !== action.payload);
		});

		builder.addCase(addContact.fulfilled, (state, action: any) => {
			state.user.contacts = [...state.user.contacts, action.payload];
		});

		builder.addCase(editContact.fulfilled, (state, action: any) => {
			state.user.contacts[state.user.contacts.findIndex((obj: ContactProps) => obj.id === action.payload.id)] = action.payload;
		});
	}
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;