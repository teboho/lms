'use client';
import { makeAxiosInstance } from "@/providers/authProvider";
import { jwtDecode } from "jwt-decode";

// "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "1",
// "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "admin",
// "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": "admin@aspnetboilerplate.com",
// "AspNet.Identity.SecurityStamp": "94062bc0-fb26-60f5-79f9-3a118de4417a",
// "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Admin",
// "sub": "1",
// "jti": "8932248b-b924-4c20-bc79-6bb04cb93be2",
// "iat": 1712760224,
// "nbf": 1712760224,
// "exp": 1712846624,
// "iss": "LMS_Backend",
// "aud": "LMS_Backend"

export enum TokenProperies {
    claims = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/",
    sub = "sub",
    jti = "jti",
    iat = "iat",
    nbf = "nbf",
    exp = "exp",
    iss = "iss",
    aud = "aud",
    nameidentifier = `${claims}nameidentifier`, // use
    name = `${claims}name`,
    emailaddress = `${claims}emailaddress`,
    securitystamp = "AspNet.Identity.SecurityStamp",
    role = `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
}

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
    static decodedToken() {
        return jwtDecode(Utils.getAccessToken());
    }
    // static
}