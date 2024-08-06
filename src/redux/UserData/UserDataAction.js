import { FETCH_USER_DATA, REMOVE_USER_DATA } from "../Constants"

export const setUserDataInRedux = (data) => {
    return {
        type: FETCH_USER_DATA,
        data: data,
    }
}

export const removeUserDataFromRedux = () => {
    return {
        type: REMOVE_USER_DATA,
        data: {},
    }
}