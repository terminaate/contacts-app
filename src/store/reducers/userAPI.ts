import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '@/services/UserService';

export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }: { email: string, password: string }, thunkAPI) => {
		try {
			const { data } = await UserService.login(email, password);
			return thunkAPI.fulfillWithValue(data);
		} catch (e: any) {
			console.log(e.response?.data);
			return thunkAPI.rejectWithValue(e.response?.data);
		}
	}
);