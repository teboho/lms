// Usage: import Utils from 'utils';

import { makeAxiosInstance } from "@/providers/AuthProvider";

export default class Utils {
    static getAccessToken() {
        const tokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY;
        return localStorage.getItem(tokenKey);
    }
    static getApiUrl() {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    static getPatronUserInfo(id: number) {
        const instance = makeAxiosInstance(Utils.getAccessToken());
        
        return instance.get(`/api/services/app/User/Get?Id=${id}`);
    }
}