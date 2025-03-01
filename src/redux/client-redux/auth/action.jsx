import { LOGIN, LOGOUT, OTP_VERIFICATION, RESEND_OTP, SET_STATUS_NULL} from "../../../constants/index"

export const login = (data) => {
    return ({
        type: LOGIN,
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