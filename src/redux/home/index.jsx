import { call, put, takeLatest } from "redux-saga/effects";
import { callApi } from "../../API/APIs";
import {ENRICH_DATA, ENRICH_DATA_DETAILS, ENRICH_DATA_DETAILS_FAILURE, ENRICH_DATA_DETAILS_SUCCESS, ENRICH_DATA_FAILURE, ENRICH_DATA_SUCCESS, GET_SEARCH, GET_SEARCH_FAILURE, GET_SEARCH_SUCCESS, REQUESTS, REQUESTS_FAILURE, REQUESTS_SUCCESS} from "../../constants";
import { toast } from "react-toastify";
function* watcherGetSearch(data) {
    // let url=`/Google_analytics_controller/get_data?google_keyword=${data.payload.keyword}&geo=${data.payload.geo}`;
    // let url=`/Google_analytics_controller/get_data`;
    let url=`/AnalyticsController/getData`;

    // ?google_keyword=${data.payload.keyword}&geo=${data.payload.geo}
    const Data = yield call(callApi, url, 'POST',{google_keyword:data.payload.keyword,geo:data.payload.geo},true);
    console.log("..................................",Data.data)
    // console.log(Data.data)
    if (Data.status===200) {
        if(Data.data?.length<=0){
            yield put({type : GET_SEARCH_SUCCESS,payload:"empty"});
        }
        else{
            console.log("Data.data",Data.data)
            yield put({type : GET_SEARCH_SUCCESS,payload:Data.data});

        }
        

       
    }
    else{
        yield put({type:GET_SEARCH_FAILURE,payload:Data.data.error})
        toast.error(Data.data.message)
    }
}
function* watcherEnrichData(data) {
    let url='/EnrichmentController/enrichmentApiRequest'
    // let url=`/Csv_Controller/ReverseIPAppend`;
    const Data = yield call(callApi, url, 'POST',data.payload,true);
    console.log("..................................",Data.data)
    // console.log(Data.data)
    if (Data.status===200) {
        console.log("Data.data",Data.data)
        yield put({type : ENRICH_DATA_SUCCESS,payload:Data.data});
        // yield put({type : REQUESTS});           

    }
    else{
        yield put({type:ENRICH_DATA_FAILURE,payload:Data.data.error})
        yield put({type : REQUESTS});           

        toast.error(Data.data.message, {
            hideProgressBar: true,
            autoClose: false,      // Prevents automatic removal
            closeOnClick: true, // Hides the timer bar
        });
    }
}

function* watcherEnrichDataDetails(data) {
    let url='/EnrichmentController/getRequestData'
    // let url=`/Csv_Controller/ReverseIPAppend`;
    const Data = yield call(callApi, url, 'POST',data.payload,true);
    console.log("..................................",Data.data)
    // console.log(Data.data)
    if (Data.status===200) {
        console.log("Data.data",Data.data)
        yield put({type : ENRICH_DATA_DETAILS_SUCCESS,payload:Data.data});
        // yield put({type : REQUESTS});           

    }
    else{
        yield put({type:ENRICH_DATA_DETAILS_FAILURE,payload:Data.data.error})
        toast.error(Data.data.message)
    }
}

function* watcherRequestsGET(data) {
    let url=`/EnrichmentController/requestGetApi`;
    const Data = yield call(callApi, url, 'POST',data.payload,true);
    console.log("..................................",Data.data)
    // console.log(Data.data)
    if (Data.status===200) {
        console.log("Data.data",Data.data)
        yield put({type : REQUESTS_SUCCESS,payload:Data.data});           
    }
    else{
        yield put({type:REQUESTS_FAILURE,payload:Data.data.error})
        toast.error(Data.data.message)
    }
}
export default function* watchHome() {
    yield takeLatest(GET_SEARCH,watcherGetSearch)
    yield takeLatest(ENRICH_DATA,watcherEnrichData)
    yield takeLatest(ENRICH_DATA_DETAILS,watcherEnrichDataDetails)
    yield takeLatest(REQUESTS,watcherRequestsGET)
}