import { FETCH_FAVOURITE_RESTAURANTS, REMOVE_FAVOURITE_RESTAURANTS } from "../Constants"

export const setFavouriteRestaurantsInRedux = (data) => {
    return {
        type: FETCH_FAVOURITE_RESTAURANTS,
        data: data,
    }
}

export const removeFavouriteRestaurantsFromRedux = () => {
    return {
        type: REMOVE_FAVOURITE_RESTAURANTS,
        data: [],
    }
}