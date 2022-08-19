import { AxiosResponse } from 'axios';
import $api from '@/http';

export type AuthResponseProps = {
	accessToken: string;
	user: {
		id: number;
		email: string;
	}
}

class UserService {
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseProps>> {
		return $api.post<AuthResponseProps>('/login', { email, password });
	}

	static async register(email: string, password: string): Promise<AxiosResponse<AuthResponseProps>> {
		return $api.post<AuthResponseProps>('/register', { email, password });
	}
}

export default UserService;