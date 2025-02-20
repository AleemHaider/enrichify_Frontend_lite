import { ENRICH_DATA, ENRICH_DATA_DETAILS, GET_SEARCH, REQUESTS, RESET_SEARCH, SET_TABLE_DATA,} from "../../constants/index"
export const getSearch = (data) => {
    return ({
        type: GET_SEARCH,
        payload: data
    })
}
export const setTableData = (data) => {
    return ({
        type: SET_TABLE_DATA,
        payload: data
    })
}

export const resetSearch = () => {
    return ({
        type: RESET_SEARCH,
    })
}

export const enrichData = (data) => {
    return ({
        type: ENRICH_DATA,
        payload: data
    })
}
export const enrichDataDetails = (data) => {
    return ({
        type: ENRICH_DATA_DETAILS,
        payload: data
    })
}

export const requests = (data) => {
    return ({
        type: REQUESTS,
        payload: data
    
    })
}

