import {ENRICH_DATA, ENRICH_DATA_DETAILS, ENRICH_DATA_DETAILS_FAILURE, ENRICH_DATA_DETAILS_SUCCESS, ENRICH_DATA_FAILURE, ENRICH_DATA_SUCCESS, GET_SEARCH, GET_SEARCH_FAILURE, GET_SEARCH_SUCCESS, REQUESTS, REQUESTS_FAILURE, REQUESTS_SUCCESS, RESET_SEARCH, SET_TABLE_DATA} from "../../constants";
const initial_state = {
    getSearch:{
        data:"empty",
        message: "",
        error: "",
        loading: false,
    },
    enrichData:{
        data:"empty",
        message: "",
        error: "",
        loading: false,
    },
    enrichDataDetails:{
        data:null,
        message: "",
        error: "",
        loading: false,
    },
    requests:{
        data:null,
        message: "",
        error: "",
        loading: false,
    },
    tableData:{
        data:null,
    }
  
}
const homeReducer = (state = initial_state, { type, payload }) => {
    console.log("payload",payload)
    switch (type) {

        case SET_TABLE_DATA:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    data:payload.data,
                }
            };
        
        case RESET_SEARCH:
            return {
                ...state,
                getSearch: {
                    ...state.getSearch,
                    // loading: true,
                    data:"empty"
                }
            };
        
      
        case GET_SEARCH:
            return {
                ...state,
                getSearch: {
                    ...state.getSearch,
                    loading: true,
                    data:payload.data,
                }
            };
        
            case GET_SEARCH_SUCCESS:
            console.log("Get Search Success",payload.data)
            return {
                ...state,
                getSearch: {
                    ...state.getSearch,
                    loading: false,
                    message: payload.message,
                    data:payload.data,
                    error: null
                }
            };
        case GET_SEARCH_FAILURE:
            return {
                ...state,
                getSearch: {
                    ...state.getSearch,
                    loading: false,
                    error: payload,
                }
            };            
        
            case ENRICH_DATA:
                return {
                    ...state,
                    enrichData: {
                        ...state.enrichData,
                        loading: true,
                    }
                };        
            case ENRICH_DATA_SUCCESS:
                console.log("Get Search Success",payload.data)
                return {
                    ...state,
                    enrichData: {
                        ...state.enrichData,
                        loading: false,
                        message: payload.message,
                        data:payload.data,
                        error: null
                    }
                };
            case ENRICH_DATA_FAILURE:
                return {
                    ...state,
                    enrichData: {
                        ...state.enrichData,
                        loading: false,
                        error: payload,
                    }
                };            
            



                case ENRICH_DATA_DETAILS:
                    return {
                        ...state,
                        enrichDataDetails: {
                            ...state.enrichDataDetails,
                            loading: true,
                        }
                    };        
                case ENRICH_DATA_DETAILS_SUCCESS:
                    console.log("Get Search Success",payload.data)
                    return {
                        ...state,
                        enrichDataDetails: {
                            ...state.enrichDataDetails,
                            loading: false,
                            message: payload.message,
                            data:payload.data,
                            error: null
                        }
                    };
                case ENRICH_DATA_DETAILS_FAILURE:
                    return {
                        ...state,
                        enrichDataDetails: {
                            ...state.enrichDataDetails,
                            loading: false,
                            error: payload,
                        }
                    };            
                

                case REQUESTS:
                    return {
                        ...state,
                        requests: {
                            ...state.requests,
                            loading: true,
                            data:payload?.data,
                        }
                    };        
                case REQUESTS_SUCCESS:
                    console.log("Get Search Success",payload.data)
                    return {
                        ...state,
                        requests: {
                            ...state.requests,
                            loading: false,
                            message: payload.message,
                            data:payload.data,
                            error: null
                        }
                    };
                case REQUESTS_FAILURE:
                    return {
                        ...state,
                        requests: {
                            ...state.requests,
                            loading: false,
                            error: payload,
                        }
                    };            
                
            default:
                return state;
        }
}
export default homeReducer
       