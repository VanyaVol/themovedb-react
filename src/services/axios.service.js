import axios from "axios";

import baseURL from "../configs/urls";

const token = "c900a4d13dc7f320149786c1460418e9";

const axiosService = axios.create({
    baseURL: baseURL,
    params: {
        "api_key": token,
        "language": "en"
    }
});

export {axiosService};