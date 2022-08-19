import { AxiosResponse } from 'axios';
import { ContactProps } from '@/pages/ContactsPage/ContactsPage';
import $api from '@/http';

class ContactsService {
	static async getContacts(userId: number): Promise<AxiosResponse<ContactProps[]>> {
		return $api.get<ContactProps[]>(`/contacts?userId=${userId}`);
	}

	static async deleteContact(contactId: number): Promise<AxiosResponse<{}>> {
		return $api.delete<{}>(`/contacts/${contactId}`);
	}

	static async addContact(contactData: ContactProps): Promise<AxiosResponse<ContactProps>> {
		return $api.post<ContactProps>('/contacts', contactData);
	}

	static async editContact(contactData: ContactProps): Promise<AxiosResponse<ContactProps>> {
		return $api.patch<ContactProps>(`/contacts/${contactData.id}`, contactData);
	}
}

export default ContactsService;