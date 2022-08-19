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

export const getContacts = createAsyncThunk(
	'user/getContacts',
	async (userId: number, thunkAPI) => {
		try {
			const { data } = await UserService.getContacts(userId);
			return thunkAPI.fulfillWithValue(data);
		} catch (e: any) {
			console.log(e.response?.data);
			return thunkAPI.rejectWithValue(e.response?.data);
		}
	}
);


export const deleteContact = createAsyncThunk(
	'user/deleteContact',
	async (contactId: number, thunkAPI) => {
		try {
			const {data} = await UserService.deleteContact(contactId);
			return thunkAPI.fulfillWithValue(contactId);
		} catch (e: any) {
			console.log(e.response?.data);
			return thunkAPI.rejectWithValue(e.response?.data);
		}
	}
);