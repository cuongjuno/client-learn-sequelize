import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/user',
});

export default axiosInstance;
