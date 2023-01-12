import axios, {AxiosResponse} from "axios";
const baseUrl = "https://api.github.com";
const axiosClient = axios.create({
    baseURL:baseUrl,
    headers: {
        "Content-type" : "application/json",
        "Authorization": "Bearer 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",
    }})
axiosClient.interceptors.response.use(function (response:AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default axiosClient;