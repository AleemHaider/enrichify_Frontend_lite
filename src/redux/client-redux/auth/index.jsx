import { call, put, takeLatest } from "redux-saga/effects";
import { CLIENT_LOGIN, CLIENT_LOGIN_SUCCESS, CLIENT_LOGIN_FAILURE, RESEND_OTP_RESET, RESEND_OTP_SUCCESS, OTP_VERIFICATION_FAILURE, OTP_VERIFICATION_SUCCESS, OTP_VERIFICATION, RESEND_OTP, RESEND_OTP_FAILURE, CLIENT_FORGOT_PASSWORD, CLIENT_FORGOT_PASSWORD_SUCCESS, CLIENT_FORGOT_PASSWORD_FAILURE, CLIENT_RESET_PASSWORD_SUCCESS, CLIENT_RESET_PASSWORD_FAILURE, CLIENT_RESET_PASSWORD } from "../../../constants/index";
import { toast } from "react-toastify";
import { callClientApi } from "../../../API/ClientAPIs";

function* watcherLogin(data) {
    let url = '/login';
    const Data = yield call(callClientApi, url, 'POST', data.payload);
    console.log(Data);
    if (Data.status === 200) {
        // toast.success(Data.data.message)
        yield put({ type: CLIENT_LOGIN_SUCCESS, payload: Data.data });
    }
    else {
        yield put({ type: CLIENT_LOGIN_FAILURE, payload: Data.data.error })
        toast.error(Data.data.message)
    }
}

function* watcherForgotPassword(data) {
    let url = '/forgotPassword';
    const Data = yield call(callClientApi, url, 'POST', data.payload);
    if (Data.status === 200) {
        yield put({ type: CLIENT_FORGOT_PASSWORD_SUCCESS, payload: Data.data });
    }
    else {
        yield put({ type: CLIENT_FORGOT_PASSWORD_FAILURE, payload: Data.data.message })
        toast.error(Data?.data?.message)
    }
}

function* watcherResetPassword(data) {
    let url = '/resetPassword';
    const Data = yield call(callClientApi, url, 'POST', data.payload);
    if (Data.status === 200) {
        yield put({ type: CLIENT_RESET_PASSWORD_SUCCESS, payload: Data.data });
        toast.success(Data?.data?.message)
    }
    else {
        yield put({ type: CLIENT_RESET_PASSWORD_FAILURE, payload: Data.data.message })
        toast.error(Data?.data?.message)
    }
}

export default function* watchClientAuth() {
    yield takeLatest(CLIENT_LOGIN, watcherLogin)
    yield takeLatest(CLIENT_FORGOT_PASSWORD, watcherForgotPassword)
    yield takeLatest(CLIENT_RESET_PASSWORD, watcherResetPassword)

}
