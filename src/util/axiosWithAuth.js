import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://iwd-2022-team4.herokuapp.com/api/IWD_Homes/", 
        headers: {
            Authorization: token
        }
    });
};