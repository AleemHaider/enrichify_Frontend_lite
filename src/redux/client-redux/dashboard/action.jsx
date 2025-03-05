import { CLIENT_GET_DASHBOARD, CLIENT_GET_USER, UPDATE_PASSWORD, } from "../../../constants/index"

export const getDashboard = () => {
    return ({
        type: CLIENT_GET_DASHBOARD,
    })
}

export const getClientUser = (data) => {
    return ({
        type: CLIENT_GET_USER,
        payload: data
    })
}

export const updatePassword = (data) => {
    return ({
        type: UPDATE_PASSWORD,
        payload: data
    })
}