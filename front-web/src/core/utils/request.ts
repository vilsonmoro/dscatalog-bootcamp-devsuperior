import axios, { Method } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET } from './auth';

type LoginData ={
    username: string;
    password: string;
}

type RequestParams = {
   method?: Method;
   url: string;
   data?: object | string;
   params?: object;
   headers?: object;
}

const BASE_URL = 'http://localhost:8080';

export const makeRequest = ({method, url, data, params, headers}:RequestParams) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers
    });
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