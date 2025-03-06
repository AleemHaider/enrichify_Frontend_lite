import {DELETE_TEMPLATE, GET_SEARCH, GET_TEMPLATES, SET_TEMPLATE, UPDATE_TEMPLATE } from "../../constants/index"

export const setTemplate= (data) => {
    return ({
        type: SET_TEMPLATE,
        payload: data   
    })
}
export const updateTemplate= (data) => {
    return ({
        type: UPDATE_TEMPLATE,
        payload: data   
    })
}
export const deleteTemplate= (data) => {
    return ({
        type: DELETE_TEMPLATE,
        payload: data   
    })
}


export const getTemplates= (data) => {
    return ({
        type: GET_TEMPLATES,
        payload: data   
    })
}
