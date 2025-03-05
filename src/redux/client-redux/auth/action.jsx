import { CLIENT_EMPTY_FORGOT, CLIENT_FORGOT_PASSWORD, CLIENT_LOGIN, CLIENT_RESET_PASSWORD, LOGOUT_CLIENT, OTP_VERIFICATION, RESEND_OTP, SET_STATUS_NULL} from "../../../constants/index"

export const loginClient = (data) => {
    return ({
        type: CLIENT_LOGIN,
        payload: data
    })
}

export const clientForgotPassword = (data) => {
    return ({
        type: CLIENT_FORGOT_PASSWORD,
        payload: data
    })
}

export const clientResetPassword = (data) => {
    return ({
        type: CLIENT_RESET_PASSWORD,
        payload: data
    })
}

export const emptyForgot = (data) => {
    return ({
        type: CLIENT_EMPTY_FORGOT,
        payload: data
    })
}

export const resendOtp = (data) => {
    return ({
        type: RESEND_OTP,
        payload: data
    })
}

export const setStatusNull = () => {
    return ({
        type: SET_STATUS_NULL
    })
}

export const logoutClient = () => {
    return ({
        type: LOGOUT_CLIENT,
    })
}