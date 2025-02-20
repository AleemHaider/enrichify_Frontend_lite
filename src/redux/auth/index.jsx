import {call,put, takeLatest} from "redux-saga/effects";
import { LOGIN,LOGIN_SUCCESS,LOGIN_FAILURE, RESEND_OTP_RESET, RESEND_OTP_SUCCESS, OTP_VERIFICATION_FAILURE, OTP_VERIFICATION_SUCCESS, OTP_VERIFICATION, RESEND_OTP, RESEND_OTP_FAILURE} from "../../constants/index";
import { callApi } from "../../API/APIs";
import { toast } from "react-toastify";
function* watcherLogin(data) {
    // /Googel_analytics_controller/get_data
    let url='/Auth_controller/login';
    // let url='/Auth_controller/signup';

    const Data = yield call(callApi, url, 'POST',data.payload);
    console.log(Data);
    if(Data.status===200){
        // toast.success(Data.data.message)
        yield put({type : LOGIN_SUCCESS,payload:Data.data});
    }
    else{
        yield put({type:LOGIN_FAILURE,payload:Data.data.error})
        toast.error(Data.data.message)
    }
}
function* watcherOtpVerification(data) {
    let url='/Auth_controller/otpVerify';
    const Data = yield call(callApi, url, 'POST',data.payload);
    if (Data.status === 200) {
        yield put({type : OTP_VERIFICATION_SUCCESS,payload:Data.data});
        localStorage.setItem('authToken',Data.data.token)
        // yield put({type : GET_USER});
    }
    else{
        yield put({type:OTP_VERIFICATION_FAILURE,payload:Data.data.message})
        toast.error(Data?.data?.message)
    }
}

function* watcherResendOtp(data) {
    
    let url='/Auth_controller/resendOtp';
    const Data = yield call(callApi, url, 'POST',data.payload);
    if (Data.status === 200) {
        yield put({ type: RESEND_OTP_RESET});
        toast.success(Data?.data?.message)
        yield put({type : RESEND_OTP_SUCCESS,payload:Data.data});
        // localStorage.setItem('authToken',Data.data.token)
        // yield put({type : GET_USER});
    }
    else{
        yield put({type:RESEND_OTP_FAILURE,payload:Data.data.message})
        toast.error(Data?.data?.message)
    }
}

export default function* watchAuth() {
    yield takeLatest(LOGIN,watcherLogin)
     yield takeLatest(OTP_VERIFICATION,watcherOtpVerification)
    yield takeLatest(RESEND_OTP,watcherResendOtp)

}
