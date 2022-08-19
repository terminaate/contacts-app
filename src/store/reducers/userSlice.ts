import { createSlice } from '@reduxjs/toolkit';
import { login } from '@/store/reducers/userAPI';

export interface UserState {
	user: {
		id: null | string;
		accessToken: null | string;
		error: null | string;
		authorized: boolean;
		email: null | string;
	}
}

const initialState: UserState = {
	user: {
		id: null,
		email: null,
		authorized: false,
		error: null,
		accessToken: null
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
	}
});

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;