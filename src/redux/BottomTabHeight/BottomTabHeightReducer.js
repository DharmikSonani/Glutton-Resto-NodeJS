import { FETCH_BOTTOM_TAB_HEIGHT } from "../Constants";

const initialState = '';

export const BottomTabHeightReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOTTOM_TAB_HEIGHT:
            return action.data;
        default:
            return state;
    }
}