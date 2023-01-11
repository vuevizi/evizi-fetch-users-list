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