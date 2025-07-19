import { GET_LEAD_DETAILS, SET_TEMPLATE, GET_LEAD_DETAILS_SUCCESS, SET_TEMPLATE_FAILURE, GET_LEAD_DETAILS_FAILURE, SET_TEMPLATE_SUCCESS, GET_TEMPLATES, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, UPDATE_TEMPLATE, UPDATE_TEMPLATE_SUCCESS, UPDATE_TEMPLATE_FAILURE, DELETE_TEMPLATE, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE} from "../../constants/index";
const initial_state = {
    setTemplate:{
        data:null,
        message: "",
        error: "",
        loading: false,
    },
    updateTemplate:{
        data:null,
        message: "",
        error: "",
        loading: false,
    },
    deleteTemplate:{
        data:null,
        message: "",
        error: "",
        loading: false,
    },
    getTemplates:{
        data:null,
        message: "",
        error: "",
        loading: false,
    },

    getSearch:{
        data:"",
        message: "",
        error: "",
        loading: false,
    },

}
const templateReducer = (state = initial_state, { type, payload }) => {
    console.log("payload",payload)
    switch (type) {   
            case SET_TEMPLATE:
                return {
                    ...state,
                    setTemplate: {
                        ...state.setTemplate,
                        loading: true,
                        data:payload.data,
                    }
                };
            case SET_TEMPLATE_SUCCESS:
                console.log("GET_SEARCH_LEAD_SUCCESS",payload)
                return {
                    ...state,
                    setTemplate: {
                        ...state.setTemplate,
                        loading: false,
                        message: payload.message,
                        data:payload?.template_id,
                        error: null
                    }
                };
            case SET_TEMPLATE_FAILURE:
                return {
                    ...state,
                    setTemplate: {
                        ...state.setTemplate,
                        loading: false,
                        error: payload,
                    }
                };                  
        


                case UPDATE_TEMPLATE:
                    return {
                        ...state,
                        updateTemplate: {
                            ...state.updateTemplate,
                            loading: true,
                            data:payload.data,
                        }
                    };
                case UPDATE_TEMPLATE_SUCCESS:
                    console.log("GET_SEARCH_LEAD_SUCCESS",payload)
                    return {
                        ...state,
                        updateTemplate: {
                            ...state.updateTemplate,
                            loading: false,
                            message: payload.message,
                            data:payload?.template_id,
                            error: null
                        }
                    };
                case UPDATE_TEMPLATE_FAILURE:
                    return {
                        ...state,
                        updateTemplate: {
                            ...state.updateTemplate,
                            loading: false,
                            error: payload,
                        }
                    };                  
            

                    case DELETE_TEMPLATE:
                        return {
                            ...state,
                            deleteTemplate: {
                                ...state.deleteTemplate,
                                loading: true,
                                data:payload.data,
                            }
                        };
                    case DELETE_TEMPLATE_SUCCESS:
                        console.log("GET_SEARCH_LEAD_SUCCESS",payload)
                        return {
                            ...state,
                            deleteTemplate: {
                                ...state.deleteTemplate,
                                loading: false,
                                message: payload.message,
                                data:payload?.data,
                                error: null
                            }
                        };
                    case DELETE_TEMPLATE_FAILURE:
                        return {
                            ...state,
                            deleteTemplate: {
                                ...state.deleteTemplate,
                                loading: false,
                                error: payload,
                            }
                        };                  
                
            case GET_TEMPLATES:
                return {
                    ...state,
                    getTemplates: {
                        ...state.getTemplates,
                        loading: true,
                        data:null,
                    }
                };
            case GET_TEMPLATES_SUCCESS:
                console.log("GET_SEARCH_LEAD_SUCCESS",payload)
                return {
                    ...state,
                    getTemplates: {
                        ...state.getTemplates,
                        loading: false,
                        message: payload.message,
                        data:payload?.data,
                        error: null
                    }
                };
            case GET_TEMPLATES_FAILURE:
                return {
                    ...state,
                    getTemplates: {
                        ...state.getTemplates,
                        loading: false,
                        error: payload,
                    }
                };    
                default:
                return state;
        }
}
export default templateReducer