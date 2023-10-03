import { createStore, applyMiddleware, combineReducers } from "redux";
import searchReducer from "./reducers/searchReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    words_array:searchReducer
})

const store=createStore(rootReducer,applyMiddleware(thunk));

export default store;
