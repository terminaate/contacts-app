import { AxiosResponse } from 'axios';
import $api from '@/http';
import { ContactProps } from '@/pages/ContactsPage/ContactsPage';

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

	static async getContacts(userId: number): Promise<AxiosResponse<ContactProps[]>> {
		return $api.get<ContactProps[]>(`/contacts?userId=${userId}`);
	}
}

export default UserService;