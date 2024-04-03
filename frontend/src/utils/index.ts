

class Utils {
    static getAccessToken() {
        const tokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY;
        return localStorage.getItem(tokenKey);
    }
}