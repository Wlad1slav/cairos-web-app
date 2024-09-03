import axios from "axios";

export const useRequest = () => {
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const fetchCSRFToken = async () => {
        const csrfToken = getCookie('csrf-token');
        if (!csrfToken) {
            await axios.get('/api/csrf-token');
        }
        axios.defaults.headers.common['x-csrf-token'] = getCookie('csrf-token');
    };

    const getUrl = (url: string) => `/api/v1/${url}`;

    const post = async (url: string, data?: Object) => {
        await fetchCSRFToken();
        return axios.post(getUrl(url), data);
    };

    const put = async (url: string, data?: Object) => {
        await fetchCSRFToken();
        return axios.put(getUrl(url), data);
    };

    const dlt = async (url: string) => {
        await fetchCSRFToken();
        return axios.delete(getUrl(url));
    };

    return { post, put, dlt };
};
