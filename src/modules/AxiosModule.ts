import axios from 'axios'

export enum endPoint {
    confirm = '',
}

const Axios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'x-http-token': localStorage.getItem('faves-for-token'),
    },
    proxy: false,
})

export default Axios
