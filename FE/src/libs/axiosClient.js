import axios from "axios"
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: 'http://localhost:9999',
    withCredentials: true,
    timeout: 500000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});
axiosClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosClient.interceptors.request.use((response) => {
    return response;
})

export default axiosClient;