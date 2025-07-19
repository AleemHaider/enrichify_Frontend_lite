import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_TEMPLATE, DELETE_TEMPLATE_FAILURE, DELETE_TEMPLATE_SUCCESS, GET_TEMPLATES, GET_TEMPLATES_FAILURE, GET_TEMPLATES_SUCCESS, SET_TEMPLATE, SET_TEMPLATE_FAILURE, SET_TEMPLATE_SUCCESS, UPDATE_TEMPLATE, } from '../../constants/index';
import { toast } from 'react-toastify';
import { callApi} from '../../API/APIs';

function* watcherSetTemplate(data) {
    let url='/createTemplate';
    const Data = yield call(callApi, url, 'POST',data.payload,true);
    console.log(Data);
    if(Data.status===200){
        toast.success(Data.data.message)
        yield put({type : SET_TEMPLATE_SUCCESS,payload:Data.data}); 
        yield put({type : GET_TEMPLATES});     

     
    }
    else{
        yield put({type:SET_TEMPLATE_FAILURE,payload:Data.data})
        toast.error(Data.data.message)
    }
}
function* watcherGetTemplate(data) {
    let url=`/getTemplates?secret_key=${data.payload.secret_key}`;
    const Data = yield call(callApi, url, 'GET','',true);
    console.log(Data);
    if(Data.status===200){
        toast.success(Data.data.message)
        yield put({type : GET_TEMPLATES_SUCCESS,payload:Data.data});  
        
    }
    else{
        yield put({type:GET_TEMPLATES_FAILURE,payload:Data.data})
        // toast.error(Data.data.message)
    }
}

function* watcherUpdateTemplate(data) {
    let url=`/updateTemplate`;
    const Data = yield call(callApi, url, 'POST',data.payload,true);
    console.log(Data);
    if(Data.status===200){
        toast.success(Data.data.message)
        yield put({type : GET_TEMPLATES_SUCCESS,payload:Data.data});  
        yield put({type : GET_TEMPLATES, payload:{secret_key:data.payload.secret_key}});      
    }
    else{
        yield put({type:GET_TEMPLATES_FAILURE,payload:Data.data})
        toast.error(Data.data.message)
    }
}

function* watcherDeleteTemplate(data) {
    console.log(data)
    let url=`/deleteTemplate?id=${data.payload.id}`;
    const Data = yield call(callApi, url, 'GET','',true);
    console.log(Data);
    if(Data.status===200){
        toast.success(Data.data.message)
        yield put({type : DELETE_TEMPLATE_SUCCESS,payload:Data.data});
        yield put({type:GET_TEMPLATES})     
    }
    else{
        yield put({type:DELETE_TEMPLATE_FAILURE,payload:Data.data})
        toast.error(Data.data.message)
    }
}
export default function* watchTemplate() {
    yield takeLatest(SET_TEMPLATE, watcherSetTemplate);
    yield takeLatest(GET_TEMPLATES, watcherGetTemplate);
    yield takeLatest(UPDATE_TEMPLATE, watcherUpdateTemplate);
    yield takeLatest(DELETE_TEMPLATE, watcherDeleteTemplate);
}

