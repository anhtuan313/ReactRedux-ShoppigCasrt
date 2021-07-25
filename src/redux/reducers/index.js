import {combineReducers}  from "redux"
import userReducer from "./user";
import productReducer from "./shopping_cart_item";
const rootReducer = combineReducers({

userReducer,
productReducer


});

export default rootReducer;