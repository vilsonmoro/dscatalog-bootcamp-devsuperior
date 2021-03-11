export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123'; 

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    userFirstName: string;
    userId: number
}
//localStorage é um objeto do browser (aba application)
export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authdata', JSON.stringify(loginResponse));
}
