import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// ToDo: configurar interceptores
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers, // esparcir todos los headers que vengan en la configuración
        'x-token': localStorage.getItem('token'),
    }

    return config;
} )

export default calendarApi;
