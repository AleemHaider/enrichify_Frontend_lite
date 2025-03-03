import { CLIENT_LOGIN, LOGOUT, OTP_VERIFICATION, RESEND_OTP, SET_STATUS_NULL} from "../../../constants/index"

export const loginClient = (data) => {
    return ({
        type: CLIENT_LOGIN,
        payload: data
    })
}

export const optVerification = (data) => {
    return ({
        type: OTP_VERIFICATION,
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

export const logout = () => {
    return ({
        type: LOGOUT,
    })
}