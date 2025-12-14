import axios from 'axios';
// require('dotenv').config();

export const axiosInstance = axios.create({
    withCredentials: true, // This enables sending cookies
    baseURL: 'http://localhost:3000',

});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || null,
        headers: headers || null,
        params: params || null
    });
};
