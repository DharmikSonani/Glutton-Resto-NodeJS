import axios from "axios";

export const DOMAIN = `http://192.168.1.4:8000/`;
// export const DOMAIN = `https://glutton-server.vercel.app/`;
const BASE_URL = `${DOMAIN}api/`;

// GET
const CUSTOMER_BASE_URL = `${BASE_URL}/customer`;
const CUSTOMER_UPDATE_URL = `${CUSTOMER_BASE_URL}/update`;
const MANAGE_FAVORITE_URL = `${CUSTOMER_BASE_URL}/manage-favorite`;

const RESTAURANT_BASE_URL = `${BASE_URL}/restaurant`;
const ACTIVE_RESTAURANT_URL = `${RESTAURANT_BASE_URL}/active`;
const FAVOURITE_RESTAURANT_URL = `${RESTAURANT_BASE_URL}/favourite`;

// POST


// GET
export const getCustomerByUidAPI = async (uid) => {
    // const headers = {
    //     headers: {
    //         'Authorization': 'Bearer ' + authToken,
    //     }
    // }
    const res = await axios.get(`${CUSTOMER_BASE_URL}/${uid}`);
    return res;
}

export const getActiveRestaurantsAPI = async () => {
    // const headers = {
    //     headers: {
    //         'Authorization': 'Bearer ' + authToken,
    //     }
    // }
    const res = await axios.get(`${ACTIVE_RESTAURANT_URL}`);
    return res;
}


// POST
export const getFavouriteRestaurantsAPI = async (params) => {
    // const headers = {
    //     headers: {
    //         'Authorization': 'Bearer ' + authToken,
    //     }
    // }
    const res = await axios.post(`${FAVOURITE_RESTAURANT_URL}`, params);
    return res;
}

// PATCH
export const updateCustomerByUidAPI = async (uid, params) => {
    // const headers = {
    //     headers: {
    //         'Authorization': 'Bearer ' + authToken,
    //     }
    // }
    const res = await axios.patch(`${CUSTOMER_UPDATE_URL}/${uid}`, params);
    return res;
}

export const manageFavoriteByUidAPI = async (uid, params) => {
    // const headers = {
    //     headers: {
    //         'Authorization': 'Bearer ' + authToken,
    //     }
    // }
    const res = await axios.patch(`${MANAGE_FAVORITE_URL}/${uid}`, params);
    return res;
}
