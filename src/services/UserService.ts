import { AxiosResponse } from 'axios';
import $api from '@/http';

export type LoginResponseProps = {
	accessToken: string;
	user: {
		id: number;
		email: string;
	}
}

class UserService {
	static async login(email: string, password: string): Promise<AxiosResponse<LoginResponseProps>> {
		return $api.post<LoginResponseProps>('/login', { email, password });
	}
}

export default UserService;