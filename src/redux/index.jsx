import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import homeReducer from "./home/reducer";
import { LOGOUT } from "../constants";
import projectReducer from "./projects/reducer";
import clientAuthReducer from "./client-redux/auth/reducer";

const appReducers = combineReducers({
    authReducer: authReducer,
    homeReducer: homeReducer,
    projectReducer: projectReducer,
    clientAuthReducer: clientAuthReducer
})
const reducers = (state, action) => {
    if (action.type === LOGOUT) {
        localStorage.clear()
        state = undefined; // Reset the state to undefined, which will reset all reducers
    }
    return appReducers(state, action);
};

export default reducers;