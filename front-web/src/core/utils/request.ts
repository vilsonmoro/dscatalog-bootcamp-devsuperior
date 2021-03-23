import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET, getSessionData } from './auth';
import history from 'core/utils/history';

type LoginData ={
    username: string;
    password: string;
}


const BASE_URL = 'http://localhost:8080';

//https://github.com/axios/axios#interceptors
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {     
    if(error.response.status === 401){
        history.push("/auth/login");
    } 
    return Promise.reject(error);
  });


export const makeRequest = ( params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL: BASE_URL
    });
}

export const makePrivateRequest = ( params: AxiosRequestConfig) => {
    const sessionData = getSessionData();

    const headers = {
        Authorization: `Bearer ${ sessionData.access_token }`        
    }
    return  makeRequest({ ...params, headers})
}    

export const makeLogin = (loginData: LoginData) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    //'/oauth/token'
    //'username=maria@gmail.com&password=12345&grant_type=password

    //monta url (querystring)
    //yarn add qs
    //yarn add @types/qs

    const payload = qs.stringify({...loginData, grant_type: 'password'});
    return  makeRequest({url: '/oauth/token', data: payload, method: 'POST', headers})
}