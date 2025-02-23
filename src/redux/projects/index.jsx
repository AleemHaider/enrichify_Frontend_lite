import { call, put, takeLatest } from "redux-saga/effects";
import { callApi } from "../../API/APIs";
import {ADD_CREDITS, ADD_CREDITS_FAILURE, ADD_CREDITS_SUCCESS, ADD_SUB_USER, ADD_SUB_USER_FAILURE, ADD_SUB_USER_SUCCESS, CREATE_PROJECT, CREATE_PROJECT_FAILURE, CREATE_PROJECT_SUCCESS, ENRICH_DATA, ENRICH_DATA_DETAILS, ENRICH_DATA_DETAILS_FAILURE, ENRICH_DATA_DETAILS_SUCCESS, ENRICH_DATA_FAILURE, ENRICH_DATA_SUCCESS, GENERATE_API_KEY, GENERATE_API_KEY_FAILURE, GENERATE_API_KEY_SUCCESS, GET_API_KEYS, GET_API_KEYS_FAILURE, GET_API_KEYS_SUCCESS, GET_CREDITS, GET_CREDITS_FAILURE, GET_CREDITS_SUCCESS, GET_PROJECT_VISITORS, GET_PROJECT_VISITORS_FAILURE, GET_PROJECT_VISITORS_SUCCESS, GET_PROJECTS, GET_PROJECTS_FAILURE, GET_PROJECTS_SUCCESS, GET_SEARCH, GET_SEARCH_FAILURE, GET_SEARCH_SUCCESS, GET_SUB_USERS, GET_SUB_USERS_FAILURE, GET_SUB_USERS_SUCCESS, REQUESTS, REQUESTS_FAILURE, REQUESTS_SUCCESS} from "../../constants";
import { toast } from "react-toastify";
function* watcherGetProjects(data) {

    let url=`/ProjectController/getProject`;
    const Data = yield call(callApi, url, 'POST',"",true);
    console.log("..................................",Data.data)
    // console.log(Data.data)
    if (Data.status===200) {
            console.log("Data.data",Data.data)
            yield put({type : GET_PROJECTS_SUCCESS,payload:Data.data});       
    }
    else{
        yield put({type:GET_PROJECTS_FAILURE,payload:Data.data.error})
        toast.error(Data.data.message)
    }
}

function* watcherCreateProject(data) {
    // let url=`/Google_analytics_controller/get_data?google_keyword=${data.payload.keyword}&geo=${data.payload.geo}`;
    // let url=`/Google_analytics_controller/get_data`;
    let url=`/ProjectController/projectAdd`;
    

    // ?google_keyword=${data.payload.keyword}&geo=${data.payload.geo}
    const Data = yield call(callApi, url, 'POST',{title:data.payload.title,site_url:data.payload.site_url,type:data.payload.type},true);
    console.log("..................................",Data.data)
    // console.log(Data.data)
    if (Data.status===200) {
            console.log("Data.data",Data.data)
            yield put({type : CREATE_PROJECT_SUCCESS,payload:Data.data});
            yield put({type : GET_PROJECTS}); 
    }
    else{
        yield put({type:CREATE_PROJECT_FAILURE,payload:Data.data.error})
        toast.error(Data.data.message)
    }
}

function* watcherGetProjectVisitors(data) {
    let url = `/Visitor/projectVisitorsGet`;
    const Data = yield call(callApi, url, 'POST', { secret_key: data.payload.secret_key }, true);

    if (Data.status === 200) {
        yield put({ type: GET_PROJECT_VISITORS_SUCCESS, payload: Data.data });
    } else {
        yield put({ type: GET_PROJECT_VISITORS_FAILURE, payload: Data.data.error });
        toast.error(Data.data.message);
    }
}

function* watcherGetSubUsers(data) {
    let url = `/ProjectController/getSubUser`;
    const Data = yield call(callApi, url, 'POST', { secret_key: data.payload.secret_key }, true);

    if (Data.status === 200) {
        yield put({ type: GET_SUB_USERS_SUCCESS, payload: Data.data });
    } else {
        yield put({ type: GET_SUB_USERS_FAILURE, payload: Data.data.error });
        toast.error(Data.data.message);
    }
}

function* watcherAddSubUser(data) {
    console.log(data);
    let url = `/ProjectController/userAddApi`;
    const Data = yield call(callApi, url, 'POST', data.payload, true);

    if (Data.status === 200) {
        yield put({ type: ADD_SUB_USER_SUCCESS, payload: Data.data });
        yield put({ type: GET_SUB_USERS_SUCCESS, payload: {secret_key:data.payload.secret_key}});

    } else {
        yield put({ type: ADD_SUB_USER_FAILURE, payload: Data.data.error });
        toast.error(Data.data.message);
    }
}
function* watcherGetApiKeys(data) {
    console.log("data.payload.secret_key",data.payload.secret_key)
    let url = `/getApiKey`;
    const Data = yield call(callApi, url, 'POST',{secret_key:data.payload.secret_key} , true);

    if (Data.status === 200) {
        yield put({ type: GET_API_KEYS_SUCCESS, payload: Data.data });
    } 
    else {
        yield put({ type: GET_API_KEYS_FAILURE, payload: Data.data.error });
        toast.error(Data.data.message);
    }
}

function* watcherGenerateApiKey(data) {
    let url = `/generateApiKey`;
    const Data = yield call(callApi, url, 'POST', data.payload, true);

    if (Data.status === 200) {
        yield put({ type: GENERATE_API_KEY_SUCCESS, payload: Data.data });
        yield put({ type: GET_API_KEYS, payload:{secret_key: data.payload.secret_key} });

    } else {
        yield put({ type: GENERATE_API_KEY_FAILURE, payload: Data.data.error });
        toast.error(Data.data.message);
    }
}
function* watcherAddCredits(data) {
    console.log(data);
    let url = `/ProjectController/creditAddApi`;
    const Data = yield call(callApi, url, 'POST', data.payload, true);

    if (Data.status === 200) {
        yield put({ type: ADD_CREDITS_SUCCESS, payload: Data.data });
        yield put({ type: GET_CREDITS, payload: {secret_key:data.payload.secret_key}});

    } else {
        yield put({ type: ADD_CREDITS_FAILURE, payload: Data.data.error });
        toast.error(Data.data.message);
    }
}

function* watcherGetCredits(data) {
    console.log(data);
    let url = `/ProjectController/getProjectCredit`;
    const Data = yield call(callApi, url, 'POST', data.payload, true);
    if (Data.status === 200) {
        yield put({ type: GET_CREDITS_SUCCESS, payload: Data.data });
    } else {
        yield put({ type: GET_CREDITS_FAILURE, payload: Data.data.error });
        toast.error(Data.data.message);
    }
}


export default function* watchProjects() {
    yield takeLatest(GET_PROJECTS,watcherGetProjects)
    yield takeLatest(ADD_CREDITS,watcherAddCredits)
    yield takeLatest(GET_CREDITS,watcherGetCredits)
    yield takeLatest(CREATE_PROJECT,watcherCreateProject)
    yield takeLatest(GET_API_KEYS,watcherGetApiKeys)
    yield takeLatest(GENERATE_API_KEY,watcherGenerateApiKey)
    yield takeLatest(GET_PROJECT_VISITORS, watcherGetProjectVisitors);
    yield takeLatest(GET_SUB_USERS, watcherGetSubUsers);
    yield takeLatest(ADD_SUB_USER, watcherAddSubUser);

}