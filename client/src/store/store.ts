import {IUser} from "../types/IUser";
import {makeAutoObservable, runInAction} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../types/response/AuthResponse";
import {API_URL} from "../http/todoApi";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading: {[key: string]: boolean} = {};

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(loading: {[key: string]: boolean}) {
        runInAction(() => {
            this.isLoading = loading;
        })
    }

    async login(emailOrUsername: string, password: string) {
        try {
            const response = await AuthService.login(emailOrUsername, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);

            const user = response.data.user
            this.setUser(user);

            return response;
        } catch (e: any) {
            return e.response;
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);

            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);

            const user = response.data.user
            this.setUser(user);
        } catch (e: any) {
            throw new Error(e)
        }
    }
}
