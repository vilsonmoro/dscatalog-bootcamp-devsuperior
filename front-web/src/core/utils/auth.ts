import jwtDecode from "jwt-decode";
export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123'; 

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    userFirstName: string;
    userId: number
}


export type Role = 'ROLE_OPERATOR' | 'ROLE-ADMIN';

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role;
}

//localStorage é um objeto do browser (aba application)
export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
    const sessionData = localStorage.getItem("authData") ?? '{}'; //operador de coalescencia
    const parsedSessionData = JSON.parse(sessionData);
    return parsedSessionData as LoginResponse; //casting
}

//yarn add jwt-decode
//yarn add @types/jwt-decode
export const getAccessTokenDecoted = () => {
    const sessionData = getSessionData();
    const tokenDecoded = jwtDecode(sessionData.access_token);
    return tokenDecoded as AccessToken;
}

export const isTokenValid = () =>{
    //destructing
    const { exp } = getAccessTokenDecoted();
    return Date.now() <= (exp * 1000);
}

export const isAuthenticated = () => {
    //access_token não pode estar expirado
     //"authData" no localStorage
    const sessionData = getSessionData();
    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (routeRoles: Role[] = []) => {
  if(routeRoles.length === 0){
      return true;
  }
  const {authorities } = getAccessTokenDecoted();
  return routeRoles.some(role => authorities.includes(role));
}