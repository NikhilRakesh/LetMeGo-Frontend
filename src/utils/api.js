import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.7:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;


export const get_api = (key = null) => {

    return axios.create({
        baseURL: 'http://192.168.0.7:8000',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${key ? key : null}`
        }
    })
}

export const get_api_form = (token = null) => {

    return axios.create({
        baseURL: 'http://192.168.0.7:8000',
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Token ${token ? token : null}`
        }
    })
}

export const get_api_form_register = (token = null) => {

    return axios.create({
        baseURL: 'http://192.168.0.7:8000',
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Token ${token ? token : null}`
        }
    })
}