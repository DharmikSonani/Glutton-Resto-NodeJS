import { FETCH_FAVOURITE_RESTAURANTS, REMOVE_FAVOURITE_RESTAURANTS } from "../Constants";

const initialState = [];

export const FavouriteRestaurantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAVOURITE_RESTAURANTS:
            return action.data;
        case REMOVE_FAVOURITE_RESTAURANTS:
            return [];
        default:
            return state;
    }
}