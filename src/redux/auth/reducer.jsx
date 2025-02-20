import {
    LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT,
    OTP_VERIFICATION,
    OTP_VERIFICATION_FAILURE,
    OTP_VERIFICATION_SUCCESS,
    RESEND_OTP,
    RESEND_OTP_FAILURE,
    RESEND_OTP_RESET,
    RESEND_OTP_SUCCESS,
    SET_STATUS_NULL,
} from '../../constants/index'
const initial_state = {
    isAuthenticated:localStorage.getItem("authToken") &&localStorage.getItem("authToken") !== undefined
      ? true
      : false,
    login: {
        message: null,
        error: null,
        loading: false,
        status: null,
        data: null,
    },
    resendOTP: {
        message: null,
        error: null,
        loading: false,
        status: null,
    },
    verification: {
        message: null,
        error: null,
        loading: false,
        status: null,
    },
}
const authReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                }
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('status', payload.status);
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    message: payload.message,
                    status:payload.status,
                    error: null
                }
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: payload,
                }
            };
        case LOGOUT:
            localStorage.removeItem('authToken');

            // Remove other items if needed
            return {
                ...state,
                login: {
                    ...state.login,
                    isAuthenticated: false,
                  
                },
            };

        case OTP_VERIFICATION:
                return {
                  ...state,
                  verification: {
                    ...state.verification,
                    loading: true,
                  },
                };
        case OTP_VERIFICATION_SUCCESS:
                localStorage.setItem("authToken", payload.token);
                localStorage.setItem('status', payload.status);
                return {
                  ...state,
                  verification: {
                    ...state.verification,
                    loading: false,
                    message: payload.message,
                    status: payload.status,
                  },
                };
        case OTP_VERIFICATION_FAILURE:
                return {
                  ...state,
                  verification: {
                    ...state.verification,
                    loading: false,
                    error: payload.message,
                  },
                };
        
        case RESEND_OTP:
                return {
                  ...state,
                  resendOTP: {
                    ...state.resendOTP,
                    loading: true,
                  },
                };
        case RESEND_OTP_SUCCESS:
                return {
                  ...state,
                  resendOTP: {
                    ...state.resendOTP,
                    loading: false,
                    message: payload.message,
                    status: payload.status,
                  },
                };
        case RESEND_OTP_FAILURE:
                return {
                  ...state,
                  resendOTP: {
                    ...state.resendOTP,
                    loading: false,
                    status: payload.status,
                  },
                };            
        case SET_STATUS_NULL:
        return {
          ...state,
          login: {
            ...state.login,
            status: null,
          },
        };
        
        case RESEND_OTP_RESET:
                return {
                  ...state,
                  resendOTP: {
                    ...state.resendOTP,
                    loading: false,
                    status: null,
                  },
                };
              
        default:
            return state;
    }
};
export default authReducer
