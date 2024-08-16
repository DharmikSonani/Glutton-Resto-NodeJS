import { FETCH_SERVER_DOMAIN } from "../Constants";

const initialState = '';

export const ServerDomainReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SERVER_DOMAIN:
            return action.data;
        default:
            return state;
    }
}