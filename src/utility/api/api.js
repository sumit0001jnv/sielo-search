import axios from 'axios';
let newAxios = axios.create();

newAxios.interceptors.request.use(function (config) {

    var token = JSON.parse(localStorage.getItem('pdf_parser_app') || '{}').token || 'token will come here';

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});


export default newAxios;