import { combineReducers } from "redux";
import { AuthReducer } from "./Authentication/AuthReducer";
import { UserDataReducer } from "./UserData/UserDataReducer";
import { BottomTabHeightReducer } from "./BottomTabHeight/BottomTabHeightReducer";
import { FavouriteRestaurantsReducer } from "./FavouriteRestaurants/FavouriteRestaurantsReducer";
import { ServerDomainReducer } from "./ServerDomain/ServerDomainReducer";

export default rootReducer = combineReducers({
    AuthReducer,
    UserDataReducer,
    BottomTabHeightReducer,
    FavouriteRestaurantsReducer,
    ServerDomainReducer,
})
