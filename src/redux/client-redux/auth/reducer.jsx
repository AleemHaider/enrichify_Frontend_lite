import {
  CLIENT_EMPTY_FORGOT,
  CLIENT_FORGOT_PASSWORD,
  CLIENT_FORGOT_PASSWORD_FAILURE,
  CLIENT_FORGOT_PASSWORD_SUCCESS,
  CLIENT_LOGIN, CLIENT_LOGIN_FAILURE, CLIENT_LOGIN_SUCCESS,
  CLIENT_RESET_PASSWORD,
  CLIENT_RESET_PASSWORD_FAILURE,
  CLIENT_RESET_PASSWORD_SUCCESS,
  LOGOUT_CLIENT,
  OTP_VERIFICATION,
  OTP_VERIFICATION_FAILURE,
  OTP_VERIFICATION_SUCCESS,
  RESEND_OTP,
  RESEND_OTP_FAILURE,
  RESEND_OTP_RESET,
  RESEND_OTP_SUCCESS,
  SET_STATUS_NULL,
} from '../../../constants/index'
const initial_state = {
  isAuthenticated: localStorage.getItem("cAuthToken") && localStorage.getItem("cAuthToken") !== undefined
    ? true
    : false,
  loading: false,
  login: {
    message: null,
    error: null,
    loading: false,
    status: null,
    data: null,
  },
  forgotPassword: {
    message: null,
    error: null,
    loading: false,
    status: null,
  },
  resetPassword: {
    message: null,
    error: null,
    loading: false,
    status: null,
  },
}
const clientAuthReducer = (state = initial_state, { type, payload }) => {
  switch (type) {
    case CLIENT_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
        }
      };
    case CLIENT_LOGIN_SUCCESS:
      localStorage.setItem('cAuthToken', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        login: {
          ...state.login,
          loading: false,
          message: payload.message,
          status: payload.status,
          error: null
        }
      };
    case CLIENT_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: payload,
        }
      };

    case LOGOUT_CLIENT:
      localStorage.removeItem('cAuthToken');
      return {
        ...state,
        isAuthenticated: false,
        login: {
          ...state.login,
          isAuthenticated: false,
        },
      };

    case CLIENT_FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
        forgotPassword: {
          ...state.forgotPassword,
          loading: true,
        },
      };
    case CLIENT_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          message: payload.message,
          status: true,
        },
      };
    case CLIENT_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          status: false,
        },
      };

    case CLIENT_RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        resetPassword: {
          ...state.resetPassword,
          loading: true,
        },
      };
    case CLIENT_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPassword: {
          ...state.resetPassword,
          loading: false,
          message: payload.message,
          status: true,
        },
      };
    case CLIENT_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        resetPassword: {
          ...state.resetPassword,
          loading: false,
          status: false,
        },
      };

    case CLIENT_EMPTY_FORGOT:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          status: null,
        },
        resetPassword: {
          ...state.resetPassword,
          status: null,
        },
      };

    default:
      return state;
  }
};
export default clientAuthReducer
