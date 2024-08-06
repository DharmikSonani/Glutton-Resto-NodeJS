import { FETCH_AUTH_ID, REMOVE_AUTH_ID } from "../Constants"

export const setAuthIDInRedux = (data) => {
    return {
        type: FETCH_AUTH_ID,
        data: data,
    }
}

export const removeAuthIDFromRedux = () => {
    return {
        type: REMOVE_AUTH_ID,
        data: '',
    }
}