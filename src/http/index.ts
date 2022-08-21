import axios from 'axios';
import store from '@/store';
import { userSlice } from '@/store/reducers/userSlice';

const baseURL = 'http://127.0.0.1:8080';

const $api = axios.create({
	baseURL
});

$api.interceptors.request.use((config) => {
	if (localStorage.getItem('accessToken')) {
		config.headers!.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
	}
	return config;
});

$api.interceptors.response.use((config) => config, (error) => {
	if (error.response.status == 401 && error.response.data === 'jwt expired' && error.config) {
		store.dispatch(userSlice.actions.logout());
	}
	throw error;
});

export default $api;