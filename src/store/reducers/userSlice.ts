import { createSlice } from '@reduxjs/toolkit';
import { getContacts, login } from '@/store/reducers/userAPI';
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
			state.user = { ...action.payload };
		},
		logout(state) {
			state.user = initialState.user;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('user');
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action: any) => {
			state.user = { ...action.payload.user, accessToken: action.payload.accessToken, error: null, authorized: true };
			localStorage.setItem('accessToken', state.user.accessToken!);
			localStorage.setItem('user', JSON.stringify({ id: state.user.id, email: state.user.email }));
		});

		builder.addCase(login.pending, (state) => {
			state.user.error = null;
		});

		builder.addCase(login.rejected, (state, action) => {
			state.user.error = (action.payload as string);
		});

		builder.addCase(getContacts.fulfilled, (state, action: any) => {
			state.user.contacts = action.payload;
		});

		builder.addCase(getContacts.pending, (state) => {
			state.user.error = null;
		});

		builder.addCase(getContacts.rejected, (state, action) => {
			state.user.error = (action.payload as string);
		});
	}
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;