import {
    CREATE_PROJECT, CREATE_PROJECT_FAILURE, CREATE_PROJECT_SUCCESS,
    GET_PROJECTS, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE,
    GET_PROJECT_VISITORS, GET_PROJECT_VISITORS_SUCCESS, GET_PROJECT_VISITORS_FAILURE,
    ADD_CREDITS,
    ADD_CREDITS_SUCCESS,
    ADD_CREDITS_FAILURE,
    GET_CREDITS,
    GET_CREDITS_SUCCESS,
    GET_CREDITS_FAILURE,
    GENERATE_API_KEY,
    GENERATE_API_KEY_SUCCESS,
    GENERATE_API_KEY_FAILURE,
    GET_API_KEYS,
    GET_API_KEYS_SUCCESS,
    GET_API_KEYS_FAILURE,
    GET_SUB_USERS,
    GET_SUB_USERS_SUCCESS,
    GET_SUB_USERS_FAILURE,
    ADD_SUB_USER,
    ADD_SUB_USER_SUCCESS,
    ADD_SUB_USER_FAILURE
} from "../../constants";
import { addCredits, getApiKeys, getSubUsers } from "./action";

const initial_state = {
    createProject: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },

    addCredits: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },

    getCredits: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },
    addSubUser: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },

    getSubUsers: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },

    getProjects: {
        data: null,
        message: "",
        error: "",
        loading: false,
    },
    getProjectVisitors: { // New state for project visitors
        data: null,
        message: "",
        error: "",
        loading: false,
    },
    getApiKeys: { // New state for project visitors
        data: null,
        message: "",
        error: "",
        loading: false,
    },
    generateApiKey: { // New state for project visitors
        data: null,
        message: "",
        error: "",
        loading: false,
    },
};

const projectReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case GET_PROJECTS:
            return {
                ...state,
                getProjects: {
                    ...state.getProjects,
                    loading: true,
                    data: null, // Reset data while loading
                },
            };

        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                getProjects: {
                    ...state.getProjects,
                    loading: false,
                    message: payload.message,
                    data: payload.data,
                    error: null,
                },
            };

        case GET_PROJECTS_FAILURE:
            return {
                ...state,
                getProjects: {
                    ...state.getProjects,
                    loading: false,
                    error: payload,
                },
            };

        case CREATE_PROJECT:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    loading: true,
                    data: null, // Reset data while loading
                },
            };

        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    loading: false,
                    message: payload.message,
                    data: payload.data,
                    error: null,
                },
            };

        case CREATE_PROJECT_FAILURE:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    loading: false,
                    error: payload,
                },
            };



            case ADD_CREDITS:
                return {
                    ...state,
                    addCredits: {
                        ...state.addCredits,
                        loading: true,
                        data: null, // Reset data while loading
                    },
                };
    
            case ADD_CREDITS_SUCCESS:
                return {
                    ...state,
                    addCredits: {
                        ...state.addCredits,
                        loading: false,
                        message: payload.message,
                        data: payload.data,
                        error: null,
                    },
                };
    
            case ADD_CREDITS_FAILURE:
                return {
                    ...state,
                    addCredits: {
                        ...state.addCredits,
                        loading: false,
                        error: payload,
                    },
                };
    


                
            case GET_CREDITS:
                return {
                    ...state,
                    getCredits: {
                        ...state.getCredits,
                        loading: true,
                        data: null, // Reset data while loading
                    },
                };
    
            case GET_CREDITS_SUCCESS:
                return {
                    ...state,
                    getCredits: {
                        ...state.getCredits,
                        loading: false,
                        message: payload.message,
                        data: payload.data,
                        error: null,
                    },
                };
    
            case GET_CREDITS_FAILURE:
                return {
                    ...state,
                    getCredits: {
                        ...state.getCredits,
                        loading: false,
                        error: payload,
                    },
                };
    

                case GENERATE_API_KEY:
                    return {
                        ...state,
                        generateApiKey: {
                            ...state.generateApiKey,
                            loading: true,
                            data: null, // Reset data while loading
                        },
                    };
        
                case GENERATE_API_KEY_SUCCESS:
                    return {
                        ...state,
                        generateApiKey: {
                            ...state.generateApiKey,
                            loading: false,
                            message: payload.message,
                            data: payload.data,
                            error: null,
                        },
                    };
        
                case GENERATE_API_KEY_FAILURE:
                    return {
                        ...state,
                        generateApiKey: {
                            ...state.generateApiKey,
                            loading: false,
                            error: payload,
                        },
                    };
        

                    case GET_API_KEYS:
                        return {
                            ...state,
                            getApiKeys: {
                                ...state.getApiKeys,
                                loading: true,
                                data: null, // Reset data while loading
                            },
                        };
            
                    case GET_API_KEYS_SUCCESS:
                        return {
                            ...state,
                            getApiKeys: {
                                ...state.getApiKeys,
                                loading: false,
                                message: payload.message,
                                data: payload.data,
                                error: null,
                            },
                        };
            
                    case GET_API_KEYS_FAILURE:
                        return {
                            ...state,
                            getApiKeys: {
                                ...state.getApiKeys,
                                loading: false,
                                error: payload,
                            },
                        };
            
        // Handle GET_PROJECT_VISITORS actions
        case GET_PROJECT_VISITORS:
            return {
                ...state,
                getProjectVisitors: {
                    ...state.getProjectVisitors,
                    loading: true,
                    data: null, // Reset data while loading
                },
            };

        case GET_PROJECT_VISITORS_SUCCESS:
            return {
                ...state,
                getProjectVisitors: {
                    ...state.getProjectVisitors,
                    loading: false,
                    message: payload.message,
                    data: payload.data,
                    error: null,
                },
            };

        case GET_PROJECT_VISITORS_FAILURE:
            return {
                ...state,
                getProjectVisitors: {
                    ...state.getProjectVisitors,
                    loading: false,
                    error: payload,
                },
            };








        // SUB USERS

        case GET_SUB_USERS:
            return {
                ...state,
                getSubUsers: {
                    ...state.getSubUsers,
                    loading: true,
                    data: null, // Reset data while loading
                },
            };

        case GET_SUB_USERS_SUCCESS:
            return {
                ...state,
                getSubUsers: {
                    ...state.getSubUsers,
                    loading: false,
                    message: payload.message,
                    data: payload.data,
                    error: null,
                },
            };

        case GET_SUB_USERS_FAILURE:
            return {
                ...state,
                getSubUsers: {
                    ...state.getSubUsers,
                    loading: false,
                    error: payload,
                },
            };



            case ADD_SUB_USER:
                return {
                    ...state,
                    addSubUser: {
                        ...state.addSubUser,
                        loading: true,
                        data: null, // Reset data while loading
                    },
                };
    
            case ADD_SUB_USER_SUCCESS:
                return {
                    ...state,
                    addSubUser: {
                        ...state.addSubUser,
                        loading: false,
                        message: payload.message,
                        data: payload.data,
                        error: null,
                    },
                };
    
            case ADD_SUB_USER_FAILURE:
                return {
                    ...state,
                    addSubUser: {
                        ...state.addSubUser,
                        loading: false,
                        error: payload,
                    },
                };
    
        default:
            return state;
    }
};

export default projectReducer;
