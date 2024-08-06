import { FETCH_USER_DATA, REMOVE_USER_DATA } from "../Constants";

const initialState = {};

export const UserDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return action.data;
        case REMOVE_USER_DATA:
            return {};
        default:
            return state;
    }
}