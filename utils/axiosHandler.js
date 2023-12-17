import axios from "axios";


function calculateBaseURL(context) {
    const isHttps = context.req.headers['x-forwarded-proto'] === 'https';
    const host = context.req.headers.host;
    const protocol = isHttps ? 'https://' : 'http://';
    return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${protocol}${host}`;
}

export function axiosPostHandler(url, body, headers) {
    let posturl = process.env.NODE_ENV === 'development' ? `http://localhost:3000${url}` : `${url}`
    return axios.post(posturl, body, headers);
}

export function axiosGetHandler(context, url, headers) {
    const baseURL = calculateBaseURL(context);
    return axios.get(`${baseURL}${url}`, headers);
}