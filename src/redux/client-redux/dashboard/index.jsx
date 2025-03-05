import { call, put, takeLatest } from "redux-saga/effects";
import { CLIENT_GET_DASHBOARD_FAILURE, CLIENT_GET_DASHBOARD_SUCCESS, CLIENT_GET_DASHBOARD, UPDATE_PASSWORD, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_SUCCESS, CLIENT_GET_USER, CLIENT_GET_USER_SUCCESS, CLIENT_GET_USER_FAILURE } from "../../../constants";
import { toast } from "react-toastify";
import { callClientApi } from "../../../API/ClientAPIs";

function* watcherGetUser() {
    let url = '/getUser';
    const Data = yield call(callClientApi, url, 'GET', "", true);
    console.log("..................................", Data.data)

    if (Data.status === 200) {
        console.log("Data.data", Data.data)
        yield put({ type: CLIENT_GET_USER_SUCCESS, payload: Data.data });
    }
    else {
        yield put({ type: CLIENT_GET_USER_FAILURE, payload: Data.data.error })
        toast.error(Data.data.message);
    }
}

function* watcherGetDashboard() {
    let url = `/dashboard`;
    const Data = yield call(callClientApi, url, 'POST', "", true);
    console.log("..................................", Data.data)

    if (Data.status === 200) {
        yield put({ type: CLIENT_GET_DASHBOARD_SUCCESS, payload: Data.data });
    }
    else {
        yield put({ type: CLIENT_GET_DASHBOARD_FAILURE, payload: Data.data.error })
        toast.error(Data.data.message)
    }
}

function* watcherUpdatePassword(data) {
    let url = '/update_password'
    const Data = yield call(callClientApi, url, 'POST', data.payload, true);
    console.log("..................................", Data.data)

    if (Data.status === 200) {
        console.log("Data.data", Data.data)
        yield put({ type: UPDATE_PASSWORD_SUCCESS, payload: Data.data });
        toast.success(Data.data.message)
    }
    else {
        yield put({ type: UPDATE_PASSWORD_FAILURE, payload: Data.data.error })
        toast.error(Data.data.message);
    }
}

export default function* watchDashboard() {
    yield takeLatest(CLIENT_GET_USER, watcherGetUser)
    yield takeLatest(CLIENT_GET_DASHBOARD, watcherGetDashboard)
    yield takeLatest(UPDATE_PASSWORD, watcherUpdatePassword)
}