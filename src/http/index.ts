import axios from 'axios';

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

$api.interceptors.response.use((config) => config);

export default $api;