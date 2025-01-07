import axios from "axios";
// const key = process.env.REACT_APP_X_KEY;
// const value = process.env.REACT_APP_X_VALUE;

export const axiosInterceptorHandler = (navigate, language) => {
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        (err) => {
            // navigate("*");
            return Promise.reject(err);
        }
    );

    axios.interceptors.request.use(
        (config) => {
            // config.headers[key] = value;
            config.headers["accept-language"] = language;
            return config;
        },
        (req) => {
            return req;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
}