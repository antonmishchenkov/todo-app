import $api from "../http/todoApi";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../types/response/AuthResponse";

export default class AuthService {
    static async login(emailOrUsername: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {emailOrUsername, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}