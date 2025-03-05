import { UPDATE_PASSWORD, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_SUCCESS, CLIENT_GET_DASHBOARD, CLIENT_GET_DASHBOARD_FAILURE, CLIENT_GET_DASHBOARD_SUCCESS, CLIENT_GET_USER_SUCCESS, CLIENT_GET_USER_FAILURE, CLIENT_GET_USER } from "../../../constants";
const initial_state = {
    getDashboard: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },
    updatePassword: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },
    getUser: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },
}

const dashboardReducer = (state = initial_state, { type, payload }) => {
    console.log("payload", payload)
    switch (type) {

        case CLIENT_GET_DASHBOARD:
            return {
                ...state,
                getDashboard: {
                    ...state.getDashboard,
                    loading: true,
                }
            };
        case CLIENT_GET_DASHBOARD_SUCCESS:
            return {
                ...state,
                getDashboard: {
                    ...state.getDashboard,
                    loading: false,
                    message: payload.message,
                    data: payload,
                    error: null
                }
            };
        case CLIENT_GET_DASHBOARD_FAILURE:
            return {
                ...state,
                getDashboard: {
                    ...state.getDashboard,
                    loading: false,
                    error: payload,
                }
            };

            case CLIENT_GET_USER:
                return {
                    ...state,
                    getUser: {
                        ...state.getUser,
                        loading: true,
                    }
                };
            case CLIENT_GET_USER_SUCCESS:
                return {
                    ...state,
                    getUser: {
                        ...state.getUser,
                        loading: false,
                        message: payload.message,
                        data: payload,
                        error: null
                    }
                };
            case CLIENT_GET_USER_FAILURE:
                return {
                    ...state,
                    getUser: {
                        ...state.getUser,
                        loading: false,
                        error: payload,
                    }
                };

        case UPDATE_PASSWORD:
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
                    loading: true,
                }
            };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
                    loading: false,
                    message: payload.message,
                    error: null
                }
            };
        case UPDATE_PASSWORD_FAILURE:
            return {
                ...state,
                updatePassword: {
                    ...state.updatePassword,
                    loading: false,
                    error: payload,
                }
            };

        default:
            return state;
    }
}
export default dashboardReducer
