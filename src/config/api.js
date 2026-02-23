import axios from 'axios';

const api = axios.create({
    baseURL: 'https://techstorm.kesug.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

export default api;
