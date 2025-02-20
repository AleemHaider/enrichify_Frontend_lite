import React, { useEffect } from 'react';
import MyDataTable from './MyDataTable';
import { useDispatch, useSelector } from 'react-redux';
import illu from '../../assets/svgs/undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_search_engines_041x_-2-_cl95_o7o8_pigd_-1-_wbm3_t5p8_-1-_mt5l_-2-_dhxr_-2-_nmxe.svg';
import illuwating from '../../assets/svgs/undraw_time_management_re_tk5w.svg';
import { requests } from '../../redux/home/action';
import { useNavigate, useParams } from 'react-router-dom';
import loader from '../../assets/svgs/Rolling@1x-1.0s-200px-200px.svg'
const Request = () => {
  const dispatch = useDispatch();
    const {key}=useParams();
  const data = useSelector((state) => state.homeReducer.requests.data);
  const loading = useSelector((state) => state.homeReducer.requests.loading);

  // const loading = useSelector((state) => state.homeReducer?.requests?.loading);

  useEffect(() => {
    // Always call API once on page load
    dispatch(requests({secret_key:key}));

    // Timer setup for periodic API calls every 5 seconds
    // const interval = setInterval(() => {
    //   dispatch(requests({secret_key:key}));
    // }, 5000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, [dispatch]);
const navigate=useNavigate()
  return (
    <div className="bg-gray-100  h-screen flex flex-col gap-y-2">
    
      {
      // loading ? (
      //   <div className="mt-5 p-10 bg-white rounded-lg flex flex-col justify-center items-center gap-y-2">
      //     <img className="w-80" src={illuwating} alt="Loading illustration" />
      //     <h1 className="text-gray-600 text-center sm:text-start">
      //       We’re currently working on your inquiry and will notify you as soon as the results are available.
      //     </h1>
      //     <h1 className="text-blue-600 text-center sm:text-start">
      //       Thank you for your patience!
      //     </h1>
      //   </div>
      // ) : 
      ( loading?
        <>
        <div className="flex justify-center items-center h-screen">
          <img src={loader} alt="" />
        </div>
        </>:
        <>
          {data !== 'empty' && data && data.length > 0 ? (
            <MyDataTable />
          ) :  ( 
            <div className="mt-5 p-10 bg-white rounded-lg flex flex-col justify-center items-center gap-y-2">
              <div className='flex w-full'>
                
              </div>
              <img className="w-96" src={illu} alt="No data illustration" />
              <h1 className="text-xl text-rose-500 mt-2">
                There are no results to Show
              </h1>
              <h1 className="text-gray-600 text-center sm:text-start">
                Select Geographic Location, time frequency, and Enter Keywords on which you want results
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Request;
