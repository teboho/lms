// Usage: import Utils from 'utils';
'use client';
import { makeAxiosInstance } from "@/providers/authProvider";

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
    static get userId() {
        return parseInt(localStorage.getItem("userId"));
    }
    static getPatronId() {
        return parseInt(localStorage.getItem("userId"));
    }
}