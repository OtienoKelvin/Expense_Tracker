import axios from 'axios';

const makeRequest = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
}); 

export default makeRequest