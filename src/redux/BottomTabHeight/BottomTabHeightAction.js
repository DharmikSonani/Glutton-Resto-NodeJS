import { FETCH_BOTTOM_TAB_HEIGHT } from "../Constants"

export const setBottomTabHeightInRedux = (data) => {
    return {
        type: FETCH_BOTTOM_TAB_HEIGHT,
        data: data,
    }
}